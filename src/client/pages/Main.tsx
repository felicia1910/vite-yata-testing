import React from "react";
import "keen-slider/keen-slider.min.css";
import Footer from "../components/layout/Footer/index";
import { useAppContext } from "../Context";
import Loading from "../components/common/Loading";
import { useEffect, useState } from "react";
import { ICategoryCarousel } from "../redux/shopping/slice";
import { IBannerList, initBannerList } from "../redux/config/slice";
import { Link, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { router, categoriesList } from '../routers/index';
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getBannerImageApi } from "../redux/config/thunk";
import { getCarouselApi } from "../redux/shopping/thunk";
//home
import useWindowSize from "../hook/useWindowSize";
import {
  onLaptopSize,
  onLoaded,
  onLoading,
  onMobileSize,
  openCommonModal,
  selectIsLoading,
} from "../redux/control/slice";
import Header from "../components/layout/Header";
import {
  getCategoryListThunk,
  getConfigDataThunk,
  getPickupStoresThunk,
} from "../redux/config/thunk";
import { selectCategoryList, selectRegionList } from "../redux/config/slice";
import { setPickupStore } from "../redux/delivery/slice";
import {
  logout,
  selectIsAuthenticated,
} from "../redux/auth/slice";
import { getUserProfileThunk } from "../redux/auth/thunk";
//
import { useMsal } from "@azure/msal-react";

const Main = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const categoryList = useAppSelector(selectCategoryList);
  const { instance } = useMsal();
  const { name, setName } = useAppContext();
  const [carousel, setCarousel] = useState<ICategoryCarousel[]>([]);
  const [banners, setBanner] = useState<IBannerList>(initBannerList);
  //
  const size = useWindowSize();

  console.log('router:', router)

  useEffect(() => {
    dispatch(onLoading());
    // console.log("loading banner");
    const getBannersAndCarousel = async () => {
      const middleBanner = await getBannerImageApi("homepage-middle-banner");
      const narrowImage = await getBannerImageApi(
        "homepage-middle-narrow-banner"
      );
      const bottomImage = await getBannerImageApi("homepage-bottom");
      const homeSlider = await getBannerImageApi("homepage-top-slider");
      const result = await dispatch(getCarouselApi(1));
      setTimeout(() => {
        setBanner({
          topSlider: homeSlider,
          middleBanner: middleBanner,
          narrowBanner: narrowImage,
          bottomBanner: bottomImage,
        });
        // console.log('result.payload.items',result.payload.items)
        if (result.payload) setCarousel(result.payload.items);
        dispatch(onLoaded());
      }, 1000);
    };

    getBannersAndCarousel();
  }, []);

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
        const claims = { iss: '', exp: 0 }//jwt.decode(accessToken) as IAdb2cUserInfo;
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
      <main className='flex-1 pt-[4rem] lg:pt-[7.75rem] overflow-y-auto overflow-x-hidden'>
        {isAuthenticated != null && categoryList.length == 0 && (
          <>
            <Loading isLoading={true} />
          </>
        )}
        <div className="flex bg-white-100 font-sans items-center flex-col justify-between h-screen">
          <div className="w-full">
            <Routes>
              {router.map(({ path, component: RouteComp }, idx) => (
                <Route key={`${idx}`} path={path} element={<RouteComp />} />
              ))}
            </Routes>

            {/* 複雜的路由 */}
            <Routes>
              categoriesList
              <Route path={categoriesList.path} element={< categoriesList.component />} >
                <Route path={categoriesList.department.path}>
                  <Route path={categoriesList.department.segment.path}>
                    <Route path={categoriesList.department.segment.type.path} element={< categoriesList.department.segment.type.component />} />
                  </Route>
                </Route>
              </Route>
            </Routes>


            <Loading isLoading={carousel.length == 0} />
          </div>

          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Main;
