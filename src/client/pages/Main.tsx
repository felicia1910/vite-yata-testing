import React from "react";
import "keen-slider/keen-slider.min.css";
import Footer from "../components/layout/Footer/index";
import { useAppContext } from "../Context";
import FullLoading from "../components/common/FullLoading";
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
import {
  getCategoryListThunk,
  getConfigDataThunk,
  getPickupStoresThunk,
} from "../redux/config/thunk";
import Header from "../components/layout/Header";

const Main = () => {
  const dispatch = useAppDispatch();
  const [carousel, setCarousel] = useState<ICategoryCarousel[]>([]);
  const [banners, setBanner] = useState<IBannerList>(initBannerList);
  //
  const size = useWindowSize();

  useEffect(() => {
    dispatch(onLoading());
    const storedPUStore = localStorage.getItem("pickup_location_code");
    dispatch(getCategoryListThunk());
    dispatch(getConfigDataThunk());
    dispatch(getPickupStoresThunk());
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
  }, [dispatch]);

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
      <main className='flex-1 pt-[4rem] lg:pt-[7.75rem] overflow-x-hidden'>

        {/* <div className="flex bg-white-100 font-sans items-center flex-col justify-between h-screen"> */}
          <div className="w-full">
            <Routes>
              {router.map(({ path, component: RouteComp }, idx) => (
                <Route key={`${idx}`} path={path} element={<RouteComp />} />
              ))}
              <Route path={categoriesList.path} element={< categoriesList.component />} >
                <Route path={categoriesList.department.path}>
                  <Route path={categoriesList.department.segment.path}>
                    <Route path={categoriesList.department.segment.type.path} element={< categoriesList.department.segment.type.component />} />
                  </Route>
                </Route>
              </Route>
            </Routes>

          </div>

          <Footer />
        {/* </div> */}
      </main>
    </div>
  );
};

export default Main;
