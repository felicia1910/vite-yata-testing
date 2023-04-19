import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from "../../../redux/store";
import { selectImgUrl } from "../../../redux/config/index";
import React from "react";

const SocialMedia: React.FC = () => {
  const imgUrl = useAppSelector(selectImgUrl);

  return (
    <div className='w-full mb-4 lg:mb-3 lg:w-52 '>
      <div className='flex justify-center mb-3 text-lg font-bold lg:block'>
        關注我們
      </div>
      <div className='flex justify-center mb-4 space-x-3 lg:justify-start'>
        <Link to={"https://facebook.com/yatahk"}>
          <div className='flex items-center justify-center w-12 h-12 overflow-hidden bg-white cursor-pointer rounded-xl'>
            <div className='relative object-contain w-full aspect-[56/57]'>
            <img src={imgUrl+"/homepage/footer/FB.svg"} alt='Facebook' className="object-contain"/>

            </div>
          </div>
        </Link>

        <Link to={"https://www.instagram.com/yatahk/"}>
          <div className='flex items-center justify-center w-12 h-12 overflow-hidden bg-white cursor-pointer rounded-xl'>
            <div className='relative object-contain w-12 aspect-square'>
            <img src={imgUrl+"/homepage/footer/IG.svg"} alt='Instagram' className="object-contain"/>
            </div>
          </div>
        </Link>

        <Link
          to={"https://www.youtube.com/user/YATADepartmentStore"}
        >
          <div className='flex items-center justify-center w-12 h-12 overflow-hidden bg-white cursor-pointer rounded-xl'>
            <div className='relative object-contain w-12 aspect-[11/8]'>
            <img src={imgUrl+"/homepage/footer/youtube.svg"} alt='Youtube' className="object-cover w-12 h-12 transition duration-300 ease-in-out"/>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SocialMedia;
