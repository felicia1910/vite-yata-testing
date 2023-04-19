import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { WindowProps } from "../../../utils/types";
import { selectImgUrl } from "../../../redux/config/index";
import { selectTranslations } from "../../../redux/i18n/slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { closeDrawer } from "../../../redux/control/slice";
import { selectIsAdmin } from "../../../redux/auth/slice";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const SearchBar = ({ window }: WindowProps) => {
  const router = useNavigate();
  const location = useLocation();
  const imgUrl = useAppSelector(selectImgUrl);
  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector(selectIsAdmin);
  const [searchName, setSearchName] = useState<string>("");
  const onMobile = window === "mobile";
  const onLaptop = window === "laptop";
  const atPaymentPage = location.pathname === "/shopping-cart/confirmation";
  const atAdminLoginPage = location.pathname === "/admin/login";

  const handleClick = async () => {
    if (searchName !== "") {
      router({ pathname: "/search", search: searchName });
      setSearchName("");
      if (onMobile) {
        dispatch(closeDrawer());
      }
    }
  };
  const handleKeydown = async (data: any) => {
    if (data.key === "Enter" && searchName !== "") {
      // console.log("Input value:", searchName);
      router({ pathname: "/search", search: searchName });
      setSearchName("");
      if (onMobile) {
        dispatch(closeDrawer());
      }
    }
  };
  const t = useSelector(selectTranslations);

  return (
    <div
      className={`flex transition-all duration-300 ease-in-out ${onMobile
          ? "w-full p-2 pt-3 z-20"
          : atPaymentPage || atAdminLoginPage || isAdmin
            ? `${atPaymentPage || atAdminLoginPage ? "w-0 " : "w-80 "
            } invisible opacity-0 `
            : "w-80 visible opacity-100 "
        }`}
    >
      <div
        className={`items-center h-9    
          ${onMobile &&
          "w-full flex rounded-md overflow-hidden pr-1 bg-white shadow-md"
          }
          ${onLaptop &&
          "hidden lg:flex lg:w-full justify-between rounded-full bg-grey-input"
          }`}
      >
        <div className='flex items-center justify-center w-1/12 h-full'>
          <img src={
            imgUrl + '/homepage/navbar/search.svg'
          } alt='search'
            className='object-contain w-4 h-4' />

        </div>
        <input
          type='text'
          className={`h-full w-11/12 lg:w-9/12 outline-0 caret-[#B3A49A] text-[#B3A49A] placeholder:text-[#B3A49A] placeholder:text-sm
            ${onMobile && "bg-white"}
            ${onLaptop && "bg-grey-input"}`}
          placeholder={t?.placeholders}
          value={searchName}
          onKeyDown={handleKeydown}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button
          type='submit'
          className='items-center justify-center hidden w-2/12 h-full text-white transition duration-300 ease-in-out rounded-full lg:flex bg-yata-deep hover:bg-yata'
          onClick={handleClick}
          onKeyDown={handleKeydown}
        >
          {t?.btn}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
