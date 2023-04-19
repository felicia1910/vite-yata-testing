
import React, { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/store";
import {
  closeDrawer,
  selectIsLoading,
  selectWindowSize,
} from "../../../redux/control/slice";

import CaretDownSvg from "../../../public/homepage/navbar/categories/caret-down";
import { selectIsAdmin } from "../../../redux/auth/slice";
import { selectImgUrl } from "../../../redux/config/index";
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface Props {
  activeDept: number | null;
  setActiveDept: (value: number | null) => void;
  over: number | null;
  setOver: (value: number | null) => void;
}

const NavBarButtons = ({
  activeDept = null,
  setActiveDept = () => null,
  over = null,
  setOver = () => null,
}: Props) => {
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const location = useLocation();
  const imgUrl = useAppSelector(selectImgUrl);
  const windowSize = useAppSelector(selectWindowSize);
  const categoryList = useAppSelector((state) => state.config.categoryList);
  const isAdmin = useAppSelector(selectIsAdmin);
  const isLoading = useAppSelector(selectIsLoading);
  const onLaptop = windowSize === "laptop";
  const onMobile = windowSize === "mobile";

  // const getIconSrc = useCallback((category: ICategoryList, isActive: boolean = false) => {
  //   const data = navbarIcons.filter(icon => icon.name == category.url_key)[0]
  //   console.log('icon data: ', data)
  //   if (!isActive) return data.iconDefaultLaptop
  // }, [categoryList])

  // getIconSrc( categoryList![0], true)

  return (
    <div className='flex flex-col items-center w-1/4 h-full lg:w-auto lg:flex-row lg:p-0'>
      {categoryList &&
        categoryList.length > 0 &&
        categoryList.map((category, idx) => (
          <button
            disabled={isLoading}
            key={
              onMobile
                ? `navbar-btns-mobile-${idx}`
                : `navbar-btns-laptop-${idx}`
            }
            className={`
                  flex justify-center text-left lg:truncate my-[2px] lg:w-28 min-w-fit items-center md:mx-0 under2xs:p-[4px] p-2 lg:h-3/5 rounded-lg lg:hover:bg-white group transition-colors duration-300 ease-in-out 
                  ${activeDept === idx ? "bg-white shadow-md" : ""}
                `}
            onClick={() => {
              router(`/category/${category.url_path}`);
              if (onMobile) dispatch(closeDrawer());
            }}
            onMouseEnter={() => {
              setOver(idx);
              setActiveDept(idx);
            }}
            onMouseLeave={() => {
              setOver(null);
            }}
          >
            {onLaptop && (
              <div className='relative object-contain w-4 h-4 '>
                <img src={imgUrl+`/homepage/navbar/categories/${category.url_key}/${
                    over === idx || activeDept === idx
                      ? "selected.svg"
                      : "default.png"
                  }`}
                  className='transition duration-300 ease-in-out'
                  alt={category.url_key} />
              </div>
            )}

            <div
              className={`
                  mx-1 font-extrabold under2xs:font-semibold under2xs:text-sm lg:font-normal lg:text-sm cursor-pointer lg:group-hover:text-yata lg:group-hover:font-semibold transition-colors duration-300 ease-in-out
                  ${activeDept === idx ? "text-yata" : "lg:text-white"}
              `}
            >
              {category.name}
            </div>

            {onLaptop && (
              <CaretDownSvg
                className='transition duration-300 ease-in-out'
                fill={over === idx || activeDept === idx ? "#A6CE39" : "#FFF"}
                width={10}
                height={10}
              />
            )}
          </button>
        ))}
    </div>
  );
};

export default NavBarButtons;
