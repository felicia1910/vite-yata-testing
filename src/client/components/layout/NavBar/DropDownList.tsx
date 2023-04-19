import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from "../../../redux/store";
import { closeDrawer, selectWindowSize } from "../../../redux/control/slice";
import { categories } from "../../../utils/contents/categories";
import ChevronRightSvg from "../../../public/common/arrow/chevron-right";
import ChevronDownSvg from "../../../public/common/arrow/chevron-down";
import ChevronUpSvg from "../../../public/common/arrow/chevron-up";
import { selectCategoryList } from "../../../redux/config/slice";
import { selectImgUrl } from "../../../redux/config/index";

interface Props {
  activeDept: number | null;
  activeSegment: number;
  activeType?: number | null;
  setActiveSegment: (value: number) => void;
  setActiveDept?: (value: number | null) => void;
  setActiveType?: (value: number | null) => void;
}

interface Expand {}

const DropDownList = ({
  activeDept,
  activeSegment,
  activeType,
  setActiveSegment,
  setActiveDept,
  setActiveType,
}: Props) => {
  const router = useNavigate();
  const location = useLocation();
  const imgUrl = useAppSelector(selectImgUrl);
  const dispatch = useAppDispatch();
  const windowSize = useAppSelector(selectWindowSize);
  const categoryList = useAppSelector(selectCategoryList);
  const [listHeight, setListHeight] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onLaptop = windowSize === "laptop";
  const onMobile = windowSize === "mobile";

  const toggleModalClose = () => {
    setActiveSegment(0);
    setActiveDept!(null);
    setActiveType!(null);
  };

  useEffect(() => {
    if (dropdownRef.current) {
      setListHeight(dropdownRef.current.scrollHeight);
    }
  }, [dropdownRef, activeType, activeSegment]);

  return (
    <div
      key={`drop-down-${activeDept}`}
      className='w-3/4 lg:absolute lg:left-0 lg:top-14'
      onMouseLeave={() => {
        setActiveSegment!(0);
        setActiveType!(null);
      }}
      onClick={onLaptop ? toggleModalClose : () => {}}
    >
      <div
        className={`
          lg:w-[48rem] relative lg:bg-yata-medium rounded-b-xl rangeLg:left-8 rangeXl:left-24 2xl:left-40 transition-all ease-in-out duration-500 scrollbar-hide flex flex-col lg:flex-row drop-shadow-md 
          ${
            onLaptop && activeDept !== null
              ? "lg:opacity-100"
              : "lg:opacity-0 lg:-z-10"
          }
        `}
        style={{
          minHeight:
            activeDept !== null
              ? onLaptop
                ? categoryList[activeDept].children
                  ? `${categoryList[activeDept].children!.length * 4}vh`
                  : "auto"
                : "auto"
              : onLaptop
              ? "2px"
              : "auto",
          height:
            activeDept !== null
              ? onLaptop
                ? `56vh`
                : "auto"
              : onLaptop
              ? "2px"
              : "auto",
        }}
      >
        {/* Laptop view */}
        {onLaptop && (
          <>
            {/* Dept groups  */}
            <div
              className='w-2/6 pt-8 pl-6 space-y-4 overflow-scroll transition-all duration-300 ease-in-out scrollbar-hide'
              style={{
                height: activeDept !== null ? "auto" : "2px",
                visibility: activeDept !== null ? "visible" : "hidden",
              }}
            >
              {activeDept !== null &&
                categoryList[activeDept].children &&
                categoryList[activeDept].children!.length > 0 &&
                categoryList[activeDept].children!.map((dept, idx) => (
                  <div
                    key={`${idx}-${dept.name}-laptop`}
                    className={`py-1 pl-4 rounded-l-full cursor-pointer flex group justify-between transition-all ease-in-out duration-200 ${
                      activeSegment === idx ? "bg-yata-mid-light" : ""
                    } `}
                    onMouseOver={() => {
                      setActiveSegment(idx);
                      setActiveType!(null);
                    }}
                    onClick={() => {
                      // window.location.href = "/category/" + dept.url_path;
                      router("/category/" + dept.url_path);
                      toggleModalClose();
                    }}
                  >
                    <div
                      className={`cursor-pointer ${
                        activeSegment === idx ? "text-yata" : "text-white"
                      }`}
                    >
                      {dept.name}
                    </div>
                    <div className='flex items-center pr-3'>
                      <ChevronRightSvg
                        width={14}
                        height={14}
                        fill={activeSegment === idx ? "#A6CE39" : "#FFF"}
                      />
                    </div>
                  </div>
                ))}
            </div>

            {/* Segment groups */}
            <div
              className='relative flex flex-col items-start w-2/6 pb-12 pl-6 overflow-y-scroll bg-yata-mid-light scrollbar-hide min-h-80 pt-7'
              // style={{ height: activeDept !== null ? '100%' : '2px' }}
              style={{
                visibility: activeDept !== null ? "visible" : "hidden",
              }}
            >
              {activeSegment !== null && activeDept !== null && (
                <>
                  {categoryList[activeDept].children![activeSegment]?.children &&
                  categoryList[activeDept].children![activeSegment].children!
                    .length > 0
                    ? categoryList[activeDept].children![
                        activeSegment
                      ].children!.map((segment, idx) => (
                        <div
                          key={idx + segment.name + "-laptop"}
                          className={
                            "py-1 my-1 pl-3 whitespace-nowrap w-full text-sm rounded-l-full cursor-pointer flex group justify-between transition-all ease-in-out duration-200 " +
                            (activeType === idx ? "bg-white" : "")
                          }
                          onMouseOver={() => setActiveType!(idx)}
                          onClick={() => {
                            router("/category/" + segment.url_path);
                            toggleModalClose();
                            setActiveDept ? setActiveDept(null) : {};
                          }}
                        >
                          <div
                            className={`cursor-pointer break-words w-10/12 ${
                              activeType === idx
                                ? "text-yata"
                                : "text-yata-brown"
                            }`}
                          >
                            {segment.name}
                          </div>
                          {segment.children && segment.children?.length > 0 && (
                            <div className='flex items-center w-2/12 pr-3'>
                              <ChevronRightSvg
                                width={14}
                                height={14}
                                fill={
                                  activeType === idx ? "#A6CE39" : "#6A3B0D"
                                }
                              />
                            </div>
                          )}
                        </div>
                      ))
                    : activeSegment !== null &&
                      activeDept !== null && (
                        <div
                          className={
                            "py-1 my-1 pl-3 whitespace-nowrap w-full text-sm rounded-l-full cursor-pointer flex group justify-between transition-all ease-in-out duration-200 hover:bg-white"
                          }
                          onClick={() => {
                            router(
                              `/category/${
                                categoryList[activeDept].children![
                                  activeSegment
                                ].url_path
                              }`
                            );
                            toggleModalClose();
                          }}
                        >
                          <div
                            className={`cursor-pointer w-10/12 hover:text-yata text-yata-brown`}
                          >
                            {
                              categoryList[activeDept].children![activeSegment]
                                ?.name
                            }
                          </div>
                        </div>
                      )}

                  {false && (
                    <Link
                      to={`/category/${
                        categoryList[activeDept!].children![activeSegment]
                          .url_path
                      }`}
                    >
                      <button
                        className={`py-1 my-4 flex absolute bottom-0 items-center`}
                        onClick={toggleModalClose}
                      >
                        <div
                          className={`cursor-pointer text-sm text-yata font-semibold mr-1`}
                        >
                          全部產品
                        </div>
                        <div className='flex items-center pr-3'>
                          <ChevronRightSvg
                            width={14}
                            height={14}
                            fill={"#A6CE39"}
                          />
                        </div>
                      </button>
                    </Link>
                  )}
                </>
              )}
            </div>

            {/* Type groups */}
            <div
              className='relative flex flex-col items-start w-2/6 pb-12 overflow-scroll bg-white scrollbar-hide min-h-80 pt-7 rounded-br-xl'
              style={{
                visibility: activeDept !== null ? "visible" : "hidden",
              }}
            >
              {activeSegment !== null &&
              activeDept !== null &&
              activeType !== null &&
              categoryList[activeDept].children![activeSegment].children &&
              categoryList[activeDept].children![activeSegment].children!
                .length > 0 &&
              categoryList[activeDept].children![activeSegment].children![
                activeType!
              ].children &&
              categoryList[activeDept].children![activeSegment].children![
                activeType!
              ].children!.length > 0 ? (
                categoryList[activeDept].children![activeSegment].children![
                  activeType!
                ].children?.map((type, idx) => (
                  <div
                    key={"sub-cat-laptop-" + idx}
                    className='flex justify-between w-full px-6 py-1 my-1 text-sm transition-all duration-200 ease-in-out cursor-pointer whitespace-nowrap group hover:bg-yata'
                    onClick={() => {
                      router(`/category/${type.url_path}`);
                      toggleModalClose();
                      // setActiveDept ? setActiveDept(null) : {}
                    }}
                  >
                    <div
                      className={`cursor-pointer w-10/12 group-hover:text-white text-yata-brown`}
                    >
                      {type.name}
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          </>
        )}

        {/* Mobile view */}
        {onMobile && (
          <>
            {activeDept !== null &&
              categoryList[activeDept].children!.length > 0 &&
              categoryList[activeDept].children!.map((dept, idxA) => (
                <div
                  className='w-auto py-2 mb-3 ml-1 bg-white rounded-lg'
                  key={`${idxA}-${dept.name}-mobile`}
                >
                  <div
                    className='flex items-center h-8 px-4 mb-2'
                    onClick={() => {
                      dispatch(closeDrawer());
                      router(`/category/${dept.url_path}`);
                      toggleModalClose();
                    }}
                  >
                    <img  src={imgUrl+`/homepage/navbar/categories/${categoryList[activeDept].url_key}/default.svg`}
                      className='transition duration-300 ease-in-out w-7 h-7'
                      alt={dept.url_key} />
                    <div className='ml-2 font-bold'>{dept.name}</div>
                  </div>

                  {dept.children && dept.children.length > 0 ? (
                    dept.children.map((segment, idxB) => (
                      <div
                        key={`mobile-drawer-tab-${idxB}`}
                        className={
                          "flex flex-col w-full px-4 rounded-xl transition-all ease-out duration-300 " +
                          (activeSegment === idxA && activeType === idxB
                            ? "bg-[#F5F5F5] text-yata-medium my-2 py-1"
                            : "bg-white my-1")
                        }
                      >
                        <div
                          key={`${segment.name}-mobile`}
                          className='flex items-center justify-between w-full '
                          onClick={() => {
                            segment.children && segment.children.length > 0
                              ? [
                                  setActiveSegment(idxA),
                                  setActiveType!(
                                    activeType === idxB ? null : idxB
                                  ),
                                ]
                              : [
                                  dispatch(closeDrawer()),
                                  router(`/category/${segment.url_path}`),
                                  setActiveType!(null),
                                ];
                          }}
                        >
                          {/* Show angle down if the button has level 4 list */}
                          <div className='py-1 text-sm'>{segment.name}</div>
                          {segment.children && segment.children.length > 0 && (
                            <ChevronDownSvg
                              width={14}
                              height={14}
                              fill={
                                activeSegment === idxA && activeType === idxB
                                  ? "#82A70E"
                                  : "#6A3B0D"
                              }
                              className={
                                "transition-all ease-in-out duration-200 " +
                                (activeSegment === idxA && activeType === idxB
                                  ? "rotate-180"
                                  : "rotate-0")
                              }
                            />
                          )}
                        </div>

                        {/* Level 4 Dropdown List */}
                        <div
                          className='w-full overflow-hidden transition-all duration-300 ease-out '
                          style={{
                            height:
                              activeSegment === idxA && activeType === idxB
                                ? listHeight
                                : 0,
                          }}
                          ref={
                            segment.children &&
                            segment.children.length > 0 &&
                            activeSegment === idxA &&
                            activeType === idxB
                              ? dropdownRef
                              : null
                          }
                        >
                          {segment.children &&
                            segment.children.length > 0 &&
                            activeSegment === idxA &&
                            activeType === idxB &&
                            segment.children.map((type, idxC) => (
                              <div
                                key={`sub-cat-mobile-${idxC}`}
                                className='w-full py-1 pl-4 text-sm font-light cursor-pointer text-yata-medium'
                                onClick={() => {
                                  dispatch(closeDrawer());
                                  router(`/category/${type.url_path}`);
                                  setActiveType!(null);
                                }}
                              >
                                {type.name}
                              </div>
                            ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      className='px-4 py-1 text-sm '
                      onClick={() => dispatch(closeDrawer())}
                    >
                      <Link
                        to={`/category/${
                          categoryList[activeDept].children![idxA].url_path
                        }`}
                      >
                        {categoryList[activeDept].children![idxA].name}
                      </Link>
                    </div>
                  )}
                  <Link
                    to={`/category/${
                      categoryList[activeDept].children![idxA].url_path
                    }`}
                  >
                    <div
                      className={` py-1 flex px-4 text-sm`}
                      onClick={() => dispatch(closeDrawer())}
                    >
                      <div
                        className={`cursor-pointer text-sm text-yata font-semibold mr-1`}
                      >
                        全部產品
                      </div>
                      <div className='flex items-center pr-3'>
                        <ChevronRightSvg
                          width={14}
                          height={14}
                          fill={"#A6CE39"}
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default DropDownList;
