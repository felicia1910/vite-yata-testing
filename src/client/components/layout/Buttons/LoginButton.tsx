import React, { useEffect, useRef, useState } from "react";
import { selectImgUrl } from "../../../redux/config/index";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  loginProcess,
  selectIsAdmin,
  selectIsAuthenticated,
} from "../../../redux/auth/slice";
import {
  closeDrawer,
  openLoginModal,
  selectWindowSize,
} from "../../../redux/control/slice";
import AccountList from "../NavBar/AccountList";
import { useMsal } from "@azure/msal-react";
import { scope } from "../../../utils/authConfig";
import { Link, useNavigate,useLocation } from 'react-router-dom';

export const silentRequest = {
  scopes: [scope as string, "openid", "offline_access"],
};

const LoginButton = () => {
  const router = useNavigate();
  const location=useLocation();
  const imgUrl = useAppSelector(selectImgUrl);
  const { instance } = useMsal();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const username = useAppSelector(
    (state) =>
      state.auth.crmUser?.firstName + " " + state.auth.crmUser?.lastName
  );
  const windowSize = useAppSelector(selectWindowSize);
  const isAdmin = useAppSelector(selectIsAdmin);

  const [accountDropdown, setAccountDropdown] = useState<boolean>(false);
  const [btnPosition, setBtnPosition] = useState<{}>({ left: 0, bottom: 0 });
  const accountBtnRef = useRef<HTMLButtonElement>(null);

  const onMobile = windowSize === "mobile";
  const atPaymentPage = location.pathname === "/shopping-cart/confirmation";
  const atAdminLoginPage = location.pathname === "/admin/login";
  const atAdminPickUpPage = location.pathname === "/admin/pickup/[id]";

  const getButtonDimensions = () => {
    setBtnPosition({
      left: accountBtnRef.current?.getBoundingClientRect().left,
      bottom: accountBtnRef.current?.getBoundingClientRect().bottom,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", getButtonDimensions, true);
    return () =>
      window.removeEventListener("resize", getButtonDimensions, true);
  }, []);

  return (
    <>
      <div
        className={
          "relative w-16 mx-1 lg:w-auto lg:min-w-fit  " +
          (atPaymentPage || atAdminLoginPage
            ? "hidden lg:h-0"
            : "block lg:h-3/5")
        }
      >
        <button
          ref={accountBtnRef}
          className='flex flex-col items-center justify-center w-full h-full p-1 transition-colors duration-300 ease-in-out rounded-lg lg:p-2 lg:flex-row lg:bg-yata-deep lg:hover:bg-yata group'
          onClick={(e) => {
            e.preventDefault();
            isAuthenticated
              ? onMobile
                ? [router("/account"), dispatch(closeDrawer())]
                : setAccountDropdown(!accountDropdown)
              :  instance.loginRedirect(silentRequest);
          }}
        >
          {/* Icon */}
          {isAdmin ? (
            <div className='relative w-5 h-5 lg:w-4 lg:hidden'>
              <img src={imgUrl+"/myAccount/dropdownList/info-default.svg"} alt="pic" className='object-contain' />
            </div>
          ) : (
            <div className='relative w-8 h-8 lg:w-4 lg:h-4'>
              {onMobile && (
                <img src={imgUrl+"/mobile/profile.svg"} alt="pic" className='object-contain' />

              )}
              {windowSize == "laptop" && (
                <img src={imgUrl+"/homepage/navbar/my-account.svg"} alt="pic" className='object-contain' />
              )}
            </div>
          )}

          {/* Text */}
          <p
            className={`text-sm cursor-pointer text-white ${
              onMobile ? "" : "mx-1"
            }`}
          >
            {isAuthenticated
              ? onMobile
                ? isAdmin
                  ? ""
                  : "我的帳戶"
                : isAdmin
                ? "yata-admin"
                : username
              : onMobile
              ? "登入"
              : "登入/註冊"}
          </p>
        </button>

        <AccountList
          accountDropdown={accountDropdown}
          setAccountDropdown={setAccountDropdown}
        />
        {/* {pcheck && (
          <AdminAccountList
            accountDropdown={accountDropdown}
            setAccountDropdown={setAccountDropdown}
          /> */}
      </div>
    </>
  );
};

export default LoginButton;
