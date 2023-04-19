import React from "react";
import { useAppContext } from "../Context";
import Loading from "../components/common/Loading";
import Slider from "../components/home/Slider";
import HeadBanner from "../components/home/HeadBanner";
import CategoryContainer from "../components/home/Category/CategoryContainer";
import LowerBanner from "../components/home/LowerBanner";
import { useEffect, useState } from "react";
import { ICategoryCarousel } from "../redux/shopping/slice";
import { IBannerList, initBannerList } from "../redux/config/slice";
import { useAppDispatch } from "../redux/store";
import { onLoaded, onLoading, openLoginModal } from "../redux/control/slice";
import { getBannerImageApi } from "../redux/config/thunk";
import { getCarouselApi } from "../redux/shopping/thunk";


const Home = () => {
  const dispatch = useAppDispatch();
  const { name, setName } = useAppContext();
  const [carousel, setCarousel] = useState<ICategoryCarousel[]>([]);
  const [banners, setBanner] = useState<IBannerList>(initBannerList);


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

  return (
    <div>

      <Loading isLoading={carousel.length == 0} />
      
      <div className='relative lg:mt-3 underLg:mx-2 lg:mx-[12%]'>
        <Slider images={banners.topSlider} />
        <HeadBanner
          middleImages={banners.middleBanner}
          narrowImages={banners.narrowBanner}
        />
        {carousel.length > 0 && <CategoryContainer carousel={carousel} />}
        <LowerBanner images={banners.bottomBanner} />
      </div>
    </div>
  );
};

export default Home;
