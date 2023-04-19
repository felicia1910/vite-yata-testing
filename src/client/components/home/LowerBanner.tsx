import React from "react";
import { getBannerImageApi } from "../../redux/config/thunk";
import { IBannerImages } from "../../redux/config/slice";
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from "../../redux/store";
import { selectImgUrl } from "../../redux/config/index";

type Props = {
  images: IBannerImages[];
};

export default function LowerBanner({ images }: Props) {
  const router = useNavigate();
  const imgUrl = useAppSelector(selectImgUrl);
  return (
    <>
      {images.length > 0 && (
        <div className='flex w-full mb-10 space-x-2 lg:space-x-3'>
          {images.map((img, idx) => (
            <div
              key={"low-banner-" + idx}
              className='aspect-[990/326] relative w-1/2 rounded-lg overflow-hidden'
              onClick={() => {
                router(img.url_path != "" ? img.url_path : "/");
              }}
            >
              <img src={imgUrl+img.images_url} alt="pic" className='object-cover' />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
