import React from "react";
import { useAppSelector } from "../../../redux/store";
import {
  openShoppingModal,
  selectWindowSize,
} from "../../../redux/control/slice";
import { Link} from 'react-router-dom';
import {shopIntro} from '../../../routers/index';
import DownloadApp from "./DownloadApp";
import SocialMedia from "./SocialMedia";

const aboutYATA = {
  title: "關於一田",
  list: [
    { content: "一田網頁", path: "https://www.yata.hk/" },
    { content: "YATA-Fans", path: "https://www.yata.hk/tch/yata-fans/" },
    {
      content: "一田信用卡",
      path: "https://www.yata.hk/tch/yata-creditcard/",
    },
    { content: "一田BB會", path: "https://www.yata.hk/tch/yata-bbclub/" },
  ],
};

const Footer = () => {
  const windowType = useAppSelector(selectWindowSize);

  const check = true;//現在時都給過
  return (
    <footer
      className={`${!check
        ? "hidden"
        : "bottom-0 w-full p-4 px-6 text-white lg:py-8 lg:px-36 2xl:px-40 min-h-60 bg-yata"
        }`}
    >
      <div className='flex flex-col items-center justify-between lg:items-start lg:flex-row'>
        {/* About YATA */}
        <div className='w-full lg:w-40 mb-4 border-b-[0.5px] lg:border-b-0'>
          <div className='flex justify-center text-lg font-bold lg:justify-start lg:mb-3'>
            {aboutYATA.title}
          </div>
          <ul className='flex flex-wrap justify-center my-3 list-none lg:block'>
            {aboutYATA.list.map((item, idx) => (
              <li
                className='px-2 my-[0.125rem] text-sm lg:my-2 lg:px-0'
                key={`${idx}-${item.content}`}
              >
                <a href={item.path}>{item.content}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* YATA map */}
        <div className='w-full lg:w-40 mb-4 border-b-[0.5px] lg:border-b-0'>
          <div className='flex justify-center text-lg font-bold lg:mb-3 lg:justify-start'>
            {shopIntro.title}
          </div>
          <ul className='flex flex-wrap items-center justify-center my-3 list-none lg:block'>
            {shopIntro.list.map(({ path, content}, idx) => (
              <li className='px-2 my-[0.125rem] text-sm lg:my-2 lg:px-0' key={`${idx}-${content}`}>  
                <Link to={path}>{content}</Link>

              </li>
            ))}
          </ul>
          {/* <KeepShoppingModal /> */}
        </div>

        {windowType === "mobile" ? (
          <>
            <DownloadApp />
            <SocialMedia />
          </>
        ) : (
          <>
            <SocialMedia />
            <DownloadApp />
          </>
        )}
      </div>

      {/* <PaymentTypes /> */}
    </footer>
  );
};

export default Footer;
