import React, { useCallback, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { IAdb2cUserInfo, setCurrentPolicy } from "../../redux/auth/slice";
import { policyNames, scope } from "../../utils/authConfig";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import FullLoading from "../../components/common/FullLoading";
import { onLoaded, onLoading } from "../../redux/control/slice";
import {
  checkRegisterStatusApi,
  checkUserStatusApi,
  postRegisterInfo,
} from "../../redux/register/thunk";
import { useMsal } from "@azure/msal-react";
import { useRouter } from "next/router";
import { getUserProfileThunk } from "../../redux/auth/thunk";
import ReturnButton from "../../components/common/ReturnButton";
import Image from "next/image";
import { silentRequest } from "../../components/layout/Buttons/LoginButton";
import Loading from "../../components/common/Loading";

export interface IRegisterUserInfo {
  username: string;
  salutation: number;
  genderId: number;
  name: string;
  firstName: string;
  lastName: string;
  countryCode: string | null;
  countryCodeId: number;
  mobile: string;
  birthdayYYYY: number;
  birthdaymm: number;
  email: string;
  promotionCode: string;
  firstLoginTime: string;
  preferredLanguage: number;
  aadId: string;
  registerFrom?: number;
  UserDetailId?: string;
}

const LoginResult = () => {
  // const user = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { instance, accounts } = useMsal();
  // const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [loginRes, setLoginRes] = useState<{
    success: boolean;
    type: string;
    msg: string;
    fromAdb2c?: boolean;
    fromChangePw?: boolean;
  } | null>();

  // const codeChallenge =
  //   typeof window != "undefined" ? localStorage.getItem("codeChallenge") : "";
  // const codeVerifier =
  //   typeof window != "undefined" ? localStorage.getItem("codeVerifier") : "";
  // const currentPolicy =
  //   typeof window != "undefined" ? localStorage.getItem("currentPolicy") : "";
  let timer: ReturnType<typeof setTimeout> = setTimeout(() => {});

  const [redirectUrl,setRedirectUrl] = useState('')
useEffect(() => {


  return () => {
    const redirectUrl = localStorage.getItem("redirectUrl");
    setRedirectUrl(redirectUrl!)
  }
}, [])


  const redirectText = (): string => {
    if (redirectUrl) {
      if (redirectUrl.includes("/shopping-cart")) return "購物車";
      else if (redirectUrl.includes("/product")) return "產品頁面";
      else if (redirectUrl.includes("/category")) return "產品列表";
      else if (redirectUrl.includes("/account")) return "帳戶頁面";
      else return "主頁";
    } else return "主頁";
  };
  const birYYYYConvert = (bir: string) => {
    const item = parseInt(bir);
    // console.log('birYYYYTest',item)
    if (
      item == null ||
      item == undefined ||
      isNaN(item) ||
      item > 2050 ||
      item <= 1900
    ) {
      return 2050;
    }
    return item;
  };
  const birMMConvert = (bir: string) => {
    const item = parseInt(bir);
    // console.log('birMMTest',item)
    if (
      item == null ||
      item == undefined ||
      isNaN(item) ||
      item > 12 ||
      item <= 0
    ) {
      return 1;
    }
    return item;
  };

  // Function to check user type
  const checkUserType = async (accessToken: string) => {
    const user = jwt.decode(accessToken) as IAdb2cUserInfo;
    // console.log("decoded user: ", user, accessToken);
    const registeredUser: IRegisterUserInfo = {
      username:
        user["signInNames.phoneNumber"] ??
        `+${user.countryCode}${user.PhoneNumber}`,
      salutation: JSON.parse(user.title)!,
      genderId: user.title == 1 ? 1 : 2,
      name: user.name!,
      firstName: user.first_name!,
      lastName: user.last_name!,
      countryCode: user.countryCode!,
      countryCodeId:
        user.countryCode == "86" ? 2 : user.countryCode == "853" ? 3 : 4,
      mobile: user.PhoneNumber!,
      birthdayYYYY: birYYYYConvert(user.birthday!.slice(0, 4)),
      birthdaymm: birMMConvert(user.birthday!.slice(5)),
      email: user.email!,
      promotionCode: user.promotionCode ?? "",
      firstLoginTime: new Date(user.iat! * 1000).toISOString(),
      preferredLanguage: JSON.parse(user.lang!), //2 chi
      aadId: user.sub!,
      registerFrom: 1!,
      // UserDetailId: checkUser.userId
    };
    // console.log("registeredUser", registeredUser);

    const checkUser = await checkUserStatusApi(
      user.PhoneNumber!,
      registeredUser.countryCodeId
    );
    if (checkUser && checkUser.userType != "") {
      // console.log("checkUser.userType", checkUser.userType);
      switch (checkUser.userType) {
        case "exist":
          // console.log("exist user: ", user);
          // localStorage.setItem("adb2c_login_result", JSON.stringify(result));
          // localStorage.setItem("adb2c_id_token", result.id_token);
          // localStorage.setItem("adb2c_refresh_token", result.refresh_token);
          localStorage.setItem("adb2c_access_token", accessToken);
          await dispatch(getUserProfileThunk());
          setLoginRes({
            success: true,
            type: "登入",
            msg: `登入成功，點擊下方轉回至${redirectText()}`,
          });
          return;
        case "migrate":
          registeredUser.UserDetailId = checkUser.userId;
          // console.log("check user: ", checkUser.userId, registeredUser);
          const migrateResult = await postRegisterInfo(registeredUser);

          if (migrateResult?.success == false) {
            setLoginRes({
              success: false,
              type: "登入",
              msg: migrateResult.msg as string,
            });
            // console.log(migrateResult.msg);
            return;
          } else {
            // console.log("migrate success id: ", migrateResult?.id);
            const checkResult = await checkRegisterStatusApi(migrateResult?.id);

            if (checkResult.success == false) {
              setLoginRes({
                success: false,
                type: "登入",
                msg: checkResult.error!,
              });
              return;
            } else {
              // console.log("check migrate result data: ", checkResult.data);
              localStorage.setItem("adb2c_access_token", accessToken);
              await dispatch(getUserProfileThunk());
              return;
            }
          }
        case "new":
          const registerResult = await postRegisterInfo(registeredUser);
          if (registerResult?.success == true) {
            // console.log("new register success id: ", registerResult?.id);
            const checkResult = await checkRegisterStatusApi(
              registerResult?.id
            );

            if (checkResult.success == true) {
              // console.log("check new register result data: ", checkResult.data);
              localStorage.setItem("adb2c_access_token", accessToken);
              await dispatch(getUserProfileThunk());
              setLoginRes({
                success: true,
                type: "註冊",
                msg: `帳戶註冊成功，點擊下方轉回至${redirectText()}`,
              });
              // localStorage.setItem("adb2c_login_result", JSON.stringify(result));
              return;
            } else {
              setLoginRes({
                success: false,
                type: "註冊",
                msg: checkResult.error!,
              });
              return;
            }
          } else {
            setLoginRes({
              success: false,
              type: "註冊",
              msg: registerResult?.msg as string,
            });
            return;
          }
      }
    }
  };

  // Get access token from iframe login
  // const getAdb2cTokens = async (accessTokenBody: URLSearchParams, policy: string) => {
  //   // console.log("prepare to fetch refresh token:", accessTokenBody);
  //   const headers = new Headers();
  //   headers.append("Content-Type", "application/x-www-form-urlencoded");

  //   const res = await fetch(
  //     `https://${process.env.AUTH_TENANT_NAME}.b2clogin.com/tfp/${process.env.AUTH_TENANT_NAME}.onmicrosoft.com/${policy}/oauth2/v2.0/token`,
  //     {
  //       method: "POST",
  //       headers: headers,
  //       body: accessTokenBody,
  //     }
  //   );

  //   const result = await res.json();
  //   if (res.status !== 200) {
  //     setLoginRes({ success: false, msg: '請重新登入，或聯繫客服' });
  //   } else {
  //     await checkUserType(result.access_token)
  //     console.log('through iframe')
  //     dispatch(onLoaded())
  //   }
  // }

  // Get access token from MSAL login
  const getTokenSilently = async () => {
    const account = await instance.getAllAccounts()[0];
    const accessTokenRequest = {
      scopes: [scope as string, "openid", "offline_access"],
      account: account,
    };

    console.log("accessTokenRequest", accessTokenRequest);
    try {
      const res = await instance.acquireTokenSilent(accessTokenRequest);
      const result = res.accessToken;
      console.log("access token in login-result: ", res);
      await checkUserType(result);

      dispatch(onLoaded());
      // timer = setTimeout(() => {
      //   dispatch(onLoading());
      //   if (router.asPath == "/login-result") {
      //     router.push(redirectUrl ? redirectUrl : "/");
      //     localStorage.removeItem("redirectUrl");
      //   }
      // }, 4000);
    } catch (error: any) {
      if (error.name === "InteractionRequiredAuthError") {
        console.log("Error from getTokenSilently", error);
        setLoginRes({
          success: false,
          type: "登入",
          msg: "伺服器錯誤，請聯繫客服",
        });
      }
    }
  };

  // useEffect(() => {
  //   const handleEvent = (event: any) => {
  //     const { data, origin } = event;
  //     // console.log('get login-result', event)
  //     if (origin === "https://yataloyaltyuat.b2clogin.com") {
  //       console.log("get result", data);
  //       if (data == "register-done") {
  //         dispatch(setCurrentPolicy(policyNames.signUpDirectly));
  //         setIsRegistered(true);
  //       } else if (data == "login-done") {
  //         dispatch(setCurrentPolicy(policyNames.signUpSignIn));
  //       }
  //     }
  //   };

  //   window.addEventListener("message", handleEvent, false);
  //   return function cleanup() {
  //     window.removeEventListener("message", handleEvent);
  //   };
  // });

  useEffect(() => {
    dispatch(onLoading());
    clearTimeout(timer);

    if (typeof window != "undefined") {
      console.log("window location href: ", window.location);
      if (window.location.href.includes("error_description=AADB2C90037")) {
        setLoginRes({
          success: true,
          type: "更改密碼",
          msg: "請使用新密碼重新登入",
          fromChangePw: true,
        });
      }
      const queryCode = window.location.search.split("=")[1];
      // console.log("code query:", queryCode);
      // console.log("codeChallenge", codeChallenge)
      // console.log("codeVerifier", codeVerifier)
      // console.log("currentPolicy", currentPolicy);

      if (queryCode) {
        setLoginRes({
          success: true,
          type: "註冊",
          msg: "您的註冊正在處理中，請按下方「重新登入」鍵刷新帳戶狀態",
          fromAdb2c: true,
        });
      }
      if (accounts.length > 0) getTokenSilently();
    }

    // if (!currentPolicy || !queryCode || !process.env.AUTH_CLIENT_ID || !codeChallenge) {
    // console.log("no code challenge or client id can be read");
    // } else {
    //   const urlencoded = new URLSearchParams();
    //   urlencoded.append("client_id", process.env.AUTH_CLIENT_ID!);
    //   urlencoded.append("grant_type", "authorization_code");
    //   // urlencoded.append('scope', `${process.env.AUTH_CLIENT_ID!} openid offline_access`);
    //   urlencoded.append(
    //     "scope",
    //     `${scope} openid offline_access`
    //   );
    //   urlencoded.append("code", queryCode);
    //   urlencoded.append("code_verifier", codeChallenge!);

    //   getAdb2cTokens(urlencoded, currentPolicy).catch(console.error);
    //   dispatch(onLoaded())
    // }
  }, [dispatch, accounts]);

  // console.log("loginRes", loginRes);

  return (
    <>
      <Loading isLoading={loginRes == null} />
      <div className='lg:bg-grey w-full min-h-[68vh]'>
        {loginRes != null && (
          <div className='pt-16 rangeLg:px-16 rangeXl:px-24 2xl:px-40 lg:py-16'>
            <div className='flex text-center flex-col bg-white pt-[28px] pb-[120px] lg:py-[83px] underLg:px-10 lg:rounded-2xl items-center w-full'>
              <div className='relative object-contain w-32 h-32'>
                <Image
                  src={
                    loginRes.success
                      ? `/common/icon-success.svg`
                      : `/common/icon-failure.svg`
                  }
                  layout='fill'
                />
              </div>
              <h1 className='py-[20px] font-semibold text-3xl'>
                {loginRes.type}
                {loginRes.fromAdb2c
                  ? "處理中"
                  : loginRes.success
                  ? "成功"
                  : "失敗"}
              </h1>

              {loginRes.success && <div>{loginRes.msg}</div>}
              {!loginRes.success && <div>{loginRes.msg}</div>}

              <div className='pt-[50px] w-full'>
                {(loginRes.fromAdb2c || loginRes.fromChangePw) && (
                  <div className='flex items-center justify-center mb-5'>
                    <button
                      className='flex items-center justify-center w-full h-12 py-2 mx-6 mb-2 text-left text-white border lg:max-w-[16rem] transition-all ease-in-out duration-150 hover:bg-yata rounded-lg hover:border-2 hover:border-yata bg-yata-deep'
                      onClick={() => {
                        instance.loginRedirect(silentRequest);
                      }}
                    >
                      <div className='font-medium'>重新登入</div>
                    </button>
                  </div>
                )}
                {!loginRes.fromAdb2c && !loginRes.fromChangePw && (
                  <ReturnButton
                    btnName={`返回${redirectText()}`}
                    path={redirectUrl ? redirectUrl : "/"}
                    clickFunction={[
                      localStorage.removeItem("redirectUrl"),
                      clearTimeout(timer),
                    ]}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* {fail == null && (
        <Loading />
      )} */}
    </>
  );
};

export default LoginResult;
