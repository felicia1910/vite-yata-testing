import React from "react";
import { setLang } from "../../../redux/i18n/slice";
import { closeDrawer, selectIsLoading } from "../../../redux/control/slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { WindowProps } from "../../../utils/types";
import { selectImgUrl } from "../../../redux/config/index";
import { selectIsAdmin } from "../../../redux/auth/slice";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const OtherButtons = ({ window }: WindowProps) => {
  const router = useNavigate();
  const location = useLocation();
  const imgUrl = useAppSelector(selectImgUrl);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const isAdmin = useAppSelector(selectIsAdmin);

  const onLaptop = window === "laptop";
  const onMobile = window === "mobile";
  const atPaymentPage = location.pathname === "/shopping-cart/confirmation";
  const atAdminLoginPage = location.pathname === "/admin/login";

  const handleClick = (e: any) => {
    dispatch(setLang(e.currentTarget.id));
    // console.log(e.currentTarget.id)
  };
  return (
    <div
      className={`items-center justify-center flex-nowrap overflow-hidden lg:ml-6 -ml-1 transition-all ease-in-out duration-300 
        ${onLaptop &&
        "hidden lg:flex lg:flex-row " +
        (atPaymentPage || atAdminLoginPage || isAdmin
          ? `${atPaymentPage || atAdminLoginPage ? "w-0 " : "w-80 "
          } invisible opacity-0 `
          : "w-80 visible opacity-100 ")
        }
        ${onMobile && "flex flex-col w-28 "}`}
    >
      <Link to={"/store-locations"}>
        <div
          className={
            "flex items-center justify-center mb-1 lg:mb-0 lg:mx-4 md:mx-2 group " +
            (isLoading && "pointer-events-none")
          }
          onClick={() => {
            dispatch(closeDrawer());
          }}
        >
          <img src={
            onMobile
              ? imgUrl + "/mobile/location.svg"
              : imgUrl + "/homepage/navbar/store_location.svg"
          } alt='store_location'
            className={'object-contain w-4 h-4'} />

          <p
            className={`ml-1 transition duration-300 ease-in-out cursor-pointer min-w-fit 
              ${onLaptop &&
              "text-sm group-hover:text-yata group-hover:font-semibold"
              }`}
          >
            店舖位置
          </p>
        </div>
      </Link>

      <Link to={"/contact-us"}>
        <div
          className={
            "flex items-center justify-center mb-1 lg:mb-0 lg:mx-4 md:mx-2 group" +
            (isLoading && "pointer-events-none")
          }
          onClick={() => {
            dispatch(closeDrawer());
          }}
        >
          <img src={
            onMobile
              ? imgUrl + "/mobile/contact_us.svg"
              : imgUrl + "/homepage/navbar/contact_us.svg"
          } alt='contact_us'
            className={'object-contain w-4 h-4'} />

          <p
            className={`ml-1 transition duration-300 ease-in-out cursor-pointer min-w-fit
              ${onLaptop &&
              "text-sm group-hover:text-yata group-hover:font-semibold"
              }`}
          >
            聯絡我們
          </p>
        </div>
      </Link>

      {/* <Link href={"https://egift.yata.hk/"}>
        <button className='flex items-center justify-center w-full h-12 mx-1 lg:block lg:w-auto lg:min-w-fit'>
          <div className='relative object-contain w-24 h-8 '>
            <Image src={"/homepage/navbar/e-gift.png"} layout='fill' />
          </div>
        </button>
      </Link> */}

      {/* <div className='flex items-center justify-center w-12 lg:mx-4 md:mx-2 group'>
        <p
          id='en'
          onClick={handleClick}
          className={`hidden transition duration-300 ease-in-out cursor-pointer 
            ${
              onLaptop &&
              "text-sm group-hover:text-yata group-hover:font-semibold"
            }`}
        >
          English
        </p>
      </div>
      <div className='flex items-center justify-center w-12 lg:mx-4 md:mx-2 group'>
        <p
          id='zh'
          onClick={handleClick}
          className={`hidden transition duration-300 ease-in-out cursor-pointer 
            ${
              onLaptop &&
              "text-sm group-hover:text-yata group-hover:font-semibold"
            }`}
        >
          Chinese
        </p>
      </div> */}
    </div>
  );
};

export default OtherButtons;
