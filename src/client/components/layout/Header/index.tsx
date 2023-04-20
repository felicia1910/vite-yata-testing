import React, { useState } from "react";
import { WindowScreen } from "../../../utils/types";
import OtherButtons from "../Buttons/OtherButtons";
import SearchBar from "../NavBar/SearchBar";
import ShoppingCartButton from "../Buttons/ShoppingCartButton";
import Drawer from "../Drawer";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { selectImgUrl } from "../../../redux/config/index";
import {
  openDrawer,
  selectIsCheckOut,
  selectIsLoading,
  selectWindowSize,
} from "../../../redux/control/slice";
import Navbar from "../NavBar";
import {
  selectAdminUserInfo,
  selectIsAdmin,
} from "../../../redux/auth/slice";
import LoginButton from "../Buttons/LoginButton";
import { Link, useNavigate,useLocation } from 'react-router-dom';

const Header = () => {
  const imgUrl = useAppSelector(selectImgUrl);
  const router = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const isCheckout = useAppSelector(selectIsCheckOut);
  const isAdmin = useAppSelector(selectIsAdmin);
  const windowSize = useAppSelector(selectWindowSize);
  const adminUser = useAppSelector(selectAdminUserInfo);

  const atPaymentPage = location.pathname === "/shopping-cart/confirmation";
  const atAdminLoginPage = location.pathname === "/admin/login";
  const atAdminPickUpPage = location.pathname === "/admin/pickup/[id]";
  const atAdminMemberLoginPage = location.pathname === "/admin/login-member";
  // const atSpecialPage = atPaymentPage || atAdminLoginPage || atAdminPickUpPage;
  const atSpecialPage = atPaymentPage || atAdminLoginPage || atAdminPickUpPage;

  return (
    <header
      className={
        "fixed top-0 z-50 flex flex-col justify-center w-full transition-all duration-300 ease-in-out bg-white " +
        (atPaymentPage || atAdminLoginPage ? "shadow-md " : "")
      }
      style={{
        height: windowSize == "laptop" ? "8rem" : "4rem",
      }}
    >
      <div className='flex items-center justify-between w-full p-4 lg:py-3 lg:justify-center'>
        <>
          {/* Logo */}
          <div
            className={
              "flex items-center justify-center transition-all ease-in-out duration-300 " +
              (atSpecialPage
                ? "w-full"
                : `w-48 lg:w-80 ${
                    atAdminMemberLoginPage || isAdmin ? "" : "cursor-pointer "
                  }`)
            }
            onClick={() =>
              atSpecialPage || atAdminMemberLoginPage || isAdmin
                ? {}
                : router("/")
            }
          >
            <div
              className={
                "relative flex items-center aspect-[468/110] transition-all ease-in-out duration-300 " +
                (atSpecialPage
                  ? "underLg:max-w-[10rem] lg:w-60"
                  : "underLg:min-w-[4rem] underLg:max-w-[10rem] lg:w-48")
              }
            >
              <img src={imgUrl+'/homepage/navbar/logo_yata.svg'} alt='yata_eshop_logo' className="object-contain" />
            
            </div>
          </div>

          {/* Middle search bar */}
          {/* {!adminLoginPage && !adminPickUpPage && ( */}
          <SearchBar window={WindowScreen.laptop} />
          {/* )} */}

          {/* Right button group */}
          {/* {!adminLoginPage && !adminPickUpPage && ( */}
          <OtherButtons window={WindowScreen.laptop} />
          {/* )} */}

          {/* Mobile header button */}
          <div
            className={
              "flex items-center lg:hidden " +
              (atSpecialPage
                ? "opacity-0 w-0 pointer-events-none invisible"
                : atAdminMemberLoginPage
                ? "opacity-0 w-auto invisible"
                : "opacity-100 w-auto visible")
            }
          >
            {!isAdmin ? (
              <>
                <ShoppingCartButton window={WindowScreen.mobile} />

                <button
                  className='flex justify-center lg:hidden item-center'
                  onClick={() => (isLoading ? {} : dispatch(openDrawer()))}
                >
                  <img src={imgUrl+'/mobile/menuAndSearch.svg'} alt='menu-and-search' className="object-contain w-8 h-8"/>
                  
                </button>
                <Drawer />
              </>
            ) : (
              <>
                <LoginButton />
              </>
            )}
          </div>
        </>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
