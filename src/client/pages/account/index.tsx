import React, { useEffect } from "react";
import ChevronRightSvg from "../../public/common/arrow/chevron-right";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectWindowSize } from "../../redux/control/slice";
import { useRouter } from "next/router";
import Link from "next/link";
import FullLoading from "../../components/common/FullLoading";
import useWindowSize from "../../hook/useWindowSize";
import {
  loginAsAdmin,
  logout,
  selectIsAdmin,
  selectIsAuthenticated,
  selectUserInfo,
} from "../../redux/auth/slice";
import { useMsal } from "@azure/msal-react";
import Loading from "../../components/common/Loading";
import { accountOptions } from "../../utils/contents/accountOptions";
import Image from "next/image";

const Account = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const windowType = useAppSelector(selectWindowSize);
  const size = useWindowSize();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAdmin = useAppSelector(selectIsAdmin);
  const { instance } = useMsal();


  useEffect(() => {
    if (isAdmin) {
      if (!isAuthenticated) {
        router.push("/admin/login-member");
        console.log('testing,',isAuthenticated)
      }
      return}
    
    if (!isAuthenticated) {
      localStorage.setItem(
        "redirectUrl",
        size.width >= 1024 ? "/account/profile" : router.asPath
      );
      router.push("/login");
    } else {
      if (typeof window !== "undefined") {
        if (size.width >= 1024) {
          router.push("/account/profile");
        }
      }
    }
  }, [isAuthenticated, router, size]);

  return (
    <div>
      {windowType == "laptop" && <Loading isLoading={true} />}
      {isAuthenticated && windowType && windowType == "mobile" && (
        <>
          <div className='flex flex-col justify-center w-1/2 lg:w-3/12'>
            <div className='flex items-center px-5 rangeMd:pt-4 rangeSm:pt-4 rangeXs:pt-4 col-xs-6'>
              <div className='w-5 h-5 mr-2 rounded-md bg-yata' />
              <div className='text-lg font-bold'>
                {isAdmin ? "用戶帳戶": "我的帳戶"}
              </div>
            </div>
            <div className='mb-12'>
              {accountOptions
                .filter((option) =>
                  isAdmin ? option.adminAccess : option.memberAccess
                )
                .map((option, idx) => {
                  return (
                    <Link href={option.path} key={`account-${idx}`}>
                      <div className='mt-5 flex justify-between items-center text-lg px-8 py-2.5 cursor-pointer'>
                        <div className='flex items-center justify-center space-x-3'>
                          <img src={option.route} className='w-6 h-6' />
                          <div>{option.content}</div>
                        </div>
                        <ChevronRightSvg
                          width={14}
                          height={14}
                          fill={"#6A3B0D"}
                        />
                      </div>
                    </Link>
                  );
                })}
              <button
                className='mt-5 mb-5 flex items-center text-lg px-8 py-2.5 space-x-3 cursor-pointer'
                onClick={() => {
                  if (isAdmin) {
                    dispatch(loginAsAdmin(false));
                    router.push("/admin/login");
                  } else {
                    localStorage.removeItem("adb2c_access_token");
                    instance.logout();
                  }
                }}
              >
                <Image
                  className='w-6 h-5 '
                  width={20}
                  height={24}
                  src='/myAccount/dropdownList/logout-default.svg'
                />
                <span>登出{isAdmin && "管理員"}</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* {windowType && windowType == "laptop" && (
        <div className="h-screen" />
      )} */}
    </div>
  );
};

export default Account;
