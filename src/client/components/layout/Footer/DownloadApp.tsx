import React from "react";
import { useAppSelector } from "../../../redux/store";
import { selectImgUrl } from "../../../redux/config/index";
import { selectWindowSize } from "../../../redux/control/slice";
import { Link, useNavigate } from 'react-router-dom';

const DownloadApp: React.FC = () => {
  const windowType = useAppSelector(selectWindowSize);
  const onMobile = windowType === "mobile";
  const imgUrl = useAppSelector(selectImgUrl);

  return (
    <div className='mb-3 w-full lg:w-80 border-b-[0.5px] lg:border-b-0'>
      <div className='flex justify-center mb-3 text-lg font-bold lg:block'>
        立即下載 YATA-Fans
      </div>
      <div className='flex justify-center lg:justify-start'>
        <div className='items-center justify-center hidden mr-3 overflow-hidden bg-white lg:flex w-28 h-28 rounded-xl'>
          <div className='relative object-contain w-28 aspect-square'>
            <img src={imgUrl+"/homepage/footer/qr_code.jpeg"} alt='QR Code' className="object-contain"/>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center w-4/5 mb-4 space-y-3 under2xs:flex-col lg:w-40 lg:mr-3 lg:block'>
          <Link
            to={"https://apps.apple.com/hk/app/yata-fans/id1435778377"}
          >
            <div className='relative h-16 lg:h-auto lg:w-full cursor-pointer aspect-[640/221]'>
            <img src={imgUrl+"/homepage/footer/download_ios.png"} alt='download_ios' className="object-contain"/>
            </div>
          </Link>
          {/* <span className="underLg:w-8 lg:w-0" /> */}
          <Link
            to={"https://play.google.com/store/apps/details?id=hk.yata"}
          >
            <div className='relative h-16 lg:h-auto lg:w-full cursor-pointer aspect-[640/189] lg:mt-2'>
            <img src={imgUrl+"/homepage/footer/download_android.png"} alt='download_ios' className="object-cover mb-4 transition duration-300 ease-in-out"/>
            </div>
          </Link>

          <Link
            to={"https://appgallery.huawei.com/#/app/C102441155"}
          >
            <div className='relative h-16 lg:h-auto lg:w-full cursor-pointer aspect-[640/189] lg:mt-2'>
            <img src={imgUrl+"/homepage/footer/download_huawei.png"} alt='download_ios' className="object-cover mb-4 transition duration-300 ease-in-out"/>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
