import React, { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./NavBar";
import { Link, useNavigate,useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  loginProcess,
  logout,
  selectIsAuthenticated,
  selectIsLoginProcessing,
  IAdb2cUserInfo,
} from "../../redux/auth/slice";
import { restoreLoginThunk, getUserProfileThunk } from "../../redux/auth/thunk";
import useWindowSize from "../../hook/useWindowSize";
import {
  onLaptopSize,
  onLoaded,
  onLoading,
  onMobileSize,
  openCommonModal,
  selectIsLoading,
} from "../../redux/control/slice";
import FullLoading from "../common/FullLoading";
import { useMsal } from "@azure/msal-react";
import { scope } from "../../utils/authConfig";
import {
  getCategoryListThunk,
  getConfigDataThunk,
  getPickupStoresThunk,
} from "../../redux/config/thunk";
import { selectCategoryList, selectRegionList } from "../../redux/config/slice";
import Loading from "../common/Loading";
import { setPickupStore } from "../../redux/delivery/slice";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);
  const categoryList = useAppSelector(selectCategoryList);
  const regionList = useAppSelector(selectRegionList);
  const windowType = useAppSelector((state) => state.control.windowSize);
  const size = useWindowSize();
  const { instance } = useMsal();

  const noLoadingRoute =
    !location.pathname.includes("/account") &&
    !location.pathname.includes("/about/tnc") &&
    !location.pathname.includes("/about/faq");
  // && !(router.pathname.includes('/category/[category]'))
  // && !(router.pathname.includes('/category/[category]/[department]'))
  // && !(router.pathname.includes('/category/[category]/[department]/[segment]'))
  // && !(router.pathname.includes('/category/[category]/[department]/[segment]/[type]'))

  useEffect(() => {
    const handleStart = () => {
      dispatch(onLoading());
    };
    const handleComplete = () => {
      dispatch(onLoaded());
    };

    // if (noLoadingRoute) {
    //   router.events.on("routeChangeStart", handleStart);
    //   router.events.on("routeChangeComplete", handleComplete);
    //   router.events.on("routeChangeError", handleComplete);

    //   return () => {
    //     router.events.off("routeChangeStart", handleStart);
    //     router.events.off("routeChangeComplete", handleComplete);
    //     router.events.off("routeChangeError", handleComplete);
    //   };
    // }
    dispatch(onLoaded());
  }, [router, dispatch]); 

  useEffect(() => {
    const storedPUStore = localStorage.getItem("pickup_location_code");
    dispatch(getCategoryListThunk());
    dispatch(getConfigDataThunk());
    dispatch(getPickupStoresThunk());
    dispatch(
      setPickupStore(
        storedPUStore && storedPUStore != "" ? storedPUStore : "NTP"
      )
    );
    // console.log("init loading");
    const accessToken = localStorage.getItem("adb2c_access_token");
    // console.log("access token in local storage: ", accessToken);

    if (isAuthenticated === false || isAuthenticated === null) {
      if (accessToken) {
        const claims = {iss:'',exp:0}//jwt.decode(accessToken) as IAdb2cUserInfo;
        const expiredTime = new Date(
          claims.exp ? claims.exp * 1000 : Date.now()
        );
        const now = new Date(Date.now());

        if (expiredTime <= now) {
          const restoreSSO = async () => {
            try {
              const ssoRes = await instance.ssoSilent({
                scopes: [scope as string, "openid", "offline_access"],
              });
              // console.log("restore login: ", ssoRes);
              localStorage.setItem("adb2c_access_token", ssoRes.accessToken);
              localStorage.setItem(
                "adb2c_login_result",
                JSON.stringify(ssoRes)
              );

              // Store KMSI (Keep Me Signed In) for triggering re-login while SSO cookie is not valid
              localStorage.setItem("adb2c_kmsi", "true");
              dispatch(getUserProfileThunk());
            } catch (error) {
              // console.log("restore login err: ", error);
              const kmsi = localStorage.getItem("adb2c_kmsi");
              dispatch(logout());
              if (kmsi === "true") {
                localStorage.removeItem("adb2c_kmsi");
                dispatch(openCommonModal());
              }
            }
          };
          restoreSSO();
        } else {
          // console.log("Access token will be expired at: ", expiredTime);
          dispatch(getUserProfileThunk());
        }
        // dispatch(restoreLoginThunk())
      } else {
        dispatch(logout());
      }
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (size.width >= 1024) {
        dispatch(onLaptopSize());
      } else if (size.width < 1024) {
        dispatch(onMobileSize());
      }
    }
  }, [size]);

  return (
    <div className='flex flex-col overflow-y-auto'>
      <Header />
      {isAuthenticated == null && (
        <>
          <FullLoading />
          <div className='h-screen' />
        </>
      )}
      {isAuthenticated != null && categoryList.length == 0 && (
        <>
          <Loading isLoading={true} />
        </>
      )}
      {isAuthenticated != null && (
        <>
          <Loading
            isLoading={categoryList.length > 0 && !isLoading ? false : true}
          />
          <main className='flex-1 pt-[4rem] lg:pt-[7.75rem] overflow-y-auto overflow-x-hidden'>
            {children}
            <Footer />
          </main>
        </>
      )}
    </div>
  );
};

export default Layout;
