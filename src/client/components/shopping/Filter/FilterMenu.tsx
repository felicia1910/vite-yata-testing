import React, { useEffect, useRef, useState } from "react";
import { NextRouter, useRouter } from "next/router";

import MoreBtn from "./MoreBtn";

import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  setFilteringBrands,
  setFilteringCountries,
  setFilteringSubCategories,
  selectFilterList,
} from "../../../redux/shopping/slice";
import { selectWindowSize } from "../../../redux/control/slice";
import { QueryProps, TExpand } from "../../../utils/types";
import { brandList, countryList } from "../../../utils/contents/categories";
import TickSvg from "../../../public/common/tick";
import ReturnButton from "../../common/ReturnButton";
import { ICategoryList, ICatFilter } from "../../../redux/config/slice";

type Props = {
  level: number;
  query: QueryProps;
  router: NextRouter;
  segmentList?: ICategoryList[];
  typeList?: ICategoryList[];
  catFilterInfo: ICatFilter;
};

const FilterMenu = ({
  level,
  query,
  router,
  segmentList,
  typeList,
  catFilterInfo,
}: Props) => {
  const { children, source_from, brand_name } = catFilterInfo;
  const initExpand: TExpand = { product: false, brand: false, origin: false };

  const dispatch = useAppDispatch();
  const filterList = useAppSelector(selectFilterList);
  const windowSize = useAppSelector(selectWindowSize);

  const onLaptop = windowSize === "laptop";
  const onMobile = windowSize === "mobile";
  const lh = onLaptop ? 56 : 92;

  const listRef = useRef<HTMLDivElement[]>([]);
  const [expand, setExpand] = useState<TExpand>(initExpand);
  const [listHeight, setListHeight] = useState<number[]>([lh, lh, lh]);

  // console.log("filter list:", filterList);
  // console.log("cat filter info: ", catFilterInfo);
  // console.log('path level: ', level)
  // console.log("list height: ", listHeight);

  // useEffect(() => {
  //   setListHeight([60, 60, 60]);
  //   console.log("list height: ", listHeight);
  // }, [router]);

  useEffect(() => {
    setExpand(initExpand);
    setListHeight([lh, lh, lh]);

    setTimeout(() => {
      let heightList = listHeight;
      for (let i = 0; i < 3; i++) {
        if (listRef.current[i]) {
          // console.log(
          //   `list scroll height ${i}: `,
          //   listRef.current[i].scrollHeight
          // );
          heightList = heightList.map((x: number, idx) => {
            return idx === i ? listRef.current[i].scrollHeight : x;
          });
        }
      }
      // console.log('all height before render: ', heightList)
      setListHeight(heightList);
    }, 500);
  }, [listRef, segmentList, typeList]);

  const laptopMinimalHeight = 64;
  const laptopListHeight = (expand: boolean, listHeight: number) => {
    return {
      height: expand
        ? onLaptop
          ? listHeight
          : "auto"
        : onLaptop
        ? "3.5rem"
        : "auto",
    };
  };
  const mobileListHeight = (expand: boolean, listHeight: number) => {
    return {
      height: expand
        ? onLaptop
          ? "auto"
          : listHeight
        : onLaptop
        ? "auto"
        : "5rem",
    };
  };

  return (
    <>
      {level !== 4 &&
        // ((level == 3 && typeList?.length! > 0) ||
        //   (level == 2 && segmentList?.length! > 0)) && (
        children.length > 0 && (
          <div
            className='w-full mb-8 overflow-hidden transition-all duration-300 ease-in-out bg-white lg:mb-0 lg:flex lg:overflow-visible'
            style={laptopListHeight(expand.product, listHeight[0])}
          >
            <div className='flex items-center lg:w-[10%] lg:border-2 pl-4 lg:pl-2 lg:border-[#D7E0AF] lg:bg-[#ECF3CB] box-content font-bold lg:font-normal'>
              產品類別 {onLaptop ? " :" : ""}
            </div>
            <div
              className='relative pt-3 mb-3 lg:w-[90%] transition-all duration-300 ease-in-out lg:border-2 lg:border-[#E5E5E5] lg:border-dotted px-3 lg:px-4 lg:pt-0 lg:mb-0 box-content overflow-hidden'
              style={mobileListHeight(expand.product, listHeight[0])}
              ref={(element) => (listRef.current[0] = element!)}
            >
              <div className='grid grid-cols-3 gap-3 lg:gap-0 lg:flex flex-wrap items-center w-full rangeLg:w-[85%] rangeXl:w-[90%] 2xl:w-[90%] lg:py-2'>
                {/* Level 2 category filtering */}
                {children.map((cat, idx) => (
                  <div
                    className='box-border flex items-center h-8 lg:h-10 lg:mr-9'
                    key={`cat-product-laptop-${idx}`}
                  >
                    {onLaptop && (
                      <>
                        <div
                          className='flex items-center justify-center p-1 mr-2 transition-all duration-300 ease-in-out border rounded-md cursor-pointer w-7 h-7'
                          style={
                            filterList.subCategories.includes(cat.id)
                              ? {
                                  borderColor: "#A6CE39",
                                  backgroundColor: "#A6CE39",
                                }
                              : {
                                  borderColor: "#6A3B0D",
                                  backgroundColor: "#FFF",
                                }
                          }
                          onClick={() => {
                            setExpand(initExpand);
                            dispatch(
                              setFilteringSubCategories({
                                name: cat.name,
                                id: cat.id,
                              })
                            );
                          }}
                        >
                          <TickSvg fill='#FFF' />
                        </div>
                        {cat.name}
                      </>
                    )}

                    {onMobile && (
                      <div
                        className='relative flex items-center w-full h-full p-1 transition-all duration-300 ease-in-out border rounded-md'
                        style={
                          filterList.subCategories.includes(cat.id)
                            ? { borderColor: "#76AB23", color: "#76AB23" }
                            : { borderColor: "#E5E5E5", color: "#6A3B0D" }
                        }
                        onClick={() => {
                          dispatch(
                            setFilteringSubCategories({
                              name: cat.name,
                              id: cat.id,
                            })
                          );
                        }}
                      >
                        <div className='w-full overflow-hidden text-sm font-semibold whitespace-nowrap'>
                          {cat.name}
                        </div>

                        <div
                          className='h-4 w-4 absolute p-[0.1rem] flex transition-all duration-300 ease-in-out items-center -top-2 -right-2 rounded-full border border-[#76AB23] bg-white'
                          style={
                            filterList.subCategories.includes(cat.id)
                              ? { opacity: "100%" }
                              : { opacity: "0%" }
                          }
                        >
                          {filterList.subCategories.includes(cat.id) && (
                            <TickSvg fill={"#76AB23"} />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {onLaptop && (
                <div
                  className={
                    "absolute top-0 right-0 flex items-center justify-end h-[3.5rem] pr-3 rangeLg:w-[15%] rangeXl:w-[10%] 2xl:w-[10%] transition-all ease-in-out duration-300 " +
                    (listHeight[0] > laptopMinimalHeight
                      ? "cursor-pointer opacity-100 visible"
                      : " opacity-0 pointer-events-none invisible")
                  }
                  // onClick={() => setExpand(initExpand)}
                >
                  <MoreBtn
                    expand={expand}
                    setExpand={setExpand}
                    type={"product"}
                  />
                </div>
              )}
            </div>
            {onMobile && (
              <div className='flex justify-center w-full'>
                <div
                  className={
                    "box-content flex items-center justify-center w-12 text-sm font-semibold transition-all duration-300 ease-in-out bg-white border rounded-md " +
                    (listHeight[0] > 92
                      ? "h-7 cursor-pointer opacity-100 "
                      : "h-0 pointer-events-none opacity-0")
                  }
                  onClick={() => {
                    setExpand({ ...expand, product: !expand.product });
                  }}
                >
                  {expand.product ? "收起" : "全部"}
                </div>
              </div>
            )}
          </div>
        )}

      {/* Brand row */}
      {brand_name.length > 0 && (
        <div
          className='w-full mb-8 overflow-hidden transition-all duration-300 ease-in-out bg-white lg:mb-0 lg:flex lg:overflow-visible'
          style={laptopListHeight(expand.brand, listHeight[1])}
        >
          <div className='flex items-center lg:w-[10%] lg:border-2 lg:pl-2 pl-4 lg:border-[#D7E0AF] font-bold lg:font-normal lg:bg-[#ECF3CB] box-content'>
            品牌 {onLaptop ? " :" : ""}
          </div>
          <div
            className='relative pt-3 mb-3 lg:w-[90%] transition-all duration-300 ease-in-out lg:border-2 lg:border-[#E5E5E5] lg:border-dotted px-3 lg:px-4 lg:pt-0 lg:mb-0 box-content overflow-hidden'
            style={mobileListHeight(expand.brand, listHeight[1])}
            ref={(element) => (listRef.current[1] = element!)}
          >
            <div className='grid grid-cols-3 gap-3 lg:gap-0 lg:flex flex-wrap items-center w-full rangeLg:w-[85%] rangeXl:w-[90%] 2xl:w-[90%] lg:py-2'>
              {brand_name.map((brand, idx) => (
                <div
                  className='box-border flex items-center h-8 lg:h-10 lg:mr-9'
                  key={`cat-brand-laptop-${idx}`}
                >
                  {onLaptop && (
                    <>
                      <div
                        className='flex items-center justify-center p-1 mr-2 transition-all duration-300 ease-in-out border rounded-md cursor-pointer w-7 h-7'
                        style={
                          filterList.brands.includes(brand.brand_name)
                            ? {
                                borderColor: "#A6CE39",
                                backgroundColor: "#A6CE39",
                              }
                            : {
                                borderColor: "#6A3B0D",
                                backgroundColor: "#FFF",
                              }
                        }
                        onClick={() => {
                          dispatch(setFilteringBrands(brand.brand_name));
                        }}
                      >
                        <TickSvg fill='#FFF' />
                      </div>
                      {brand.brand_name}
                    </>
                  )}

                  {onMobile && (
                    <div
                      className='relative flex items-center w-full h-full p-1 transition-all duration-300 ease-in-out border rounded-md'
                      style={
                        filterList.brands.includes(brand.brand_name)
                          ? { borderColor: "#76AB23", color: "#76AB23" }
                          : { borderColor: "#E5E5E5", color: "#6A3B0D" }
                      }
                      onClick={() => {
                        dispatch(setFilteringBrands(brand.brand_name));
                      }}
                    >
                      <div className='w-full overflow-hidden text-sm font-semibold whitespace-nowrap'>
                        {brand.brand_name}
                      </div>

                      <div
                        className='h-4 w-4 absolute p-[0.1rem] flex transition-all duration-300 ease-in-out items-center -top-2 -right-2 rounded-full border border-[#76AB23] bg-white'
                        style={
                          filterList.brands.includes(brand.brand_name)
                            ? { opacity: "100%" }
                            : { opacity: "0%" }
                        }
                      >
                        {filterList.brands.includes(brand.brand_name) && (
                          <TickSvg fill={"#76AB23"} />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {onLaptop && (
              <div
                className={
                  "absolute top-0 right-0 flex items-center justify-end h-[3.5rem] pr-3 rangeLg:w-[15%] rangeXl:w-[10%] 2xl:w-[10%] transition-all ease-in-out duration-300 " +
                  (listHeight[1] > laptopMinimalHeight
                    ? "cursor-pointer opacity-100 visible"
                    : " opacity-0 pointer-events-none invisible")
                }
                // onClick={() => setExpand(initExpand)}
              >
                <MoreBtn expand={expand} setExpand={setExpand} type={"brand"} />
              </div>
            )}
          </div>
          {onMobile && (
            <div className='flex justify-center w-full'>
              <div
                className={
                  "box-content flex items-center justify-center w-12 text-sm font-semibold transition-all duration-300 ease-in-out bg-white border rounded-md " +
                  (listHeight[1] > 92
                    ? "h-7 cursor-pointer opacity-100 "
                    : "h-0 pointer-events-none opacity-0")
                }
                onClick={() => {
                  setExpand({ ...expand, brand: !expand.brand });
                }}
              >
                {expand.brand ? "收起" : "全部"}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Country row */}
      {source_from.length > 0 && (
        <div
          className='w-full mb-8 overflow-hidden transition-all duration-300 ease-in-out bg-white lg:mb-0 lg:flex lg:overflow-visible'
          style={laptopListHeight(expand.origin, listHeight[2])}
        >
          <div className='flex items-center lg:w-[10%] lg:border-2 lg:pl-2 pl-4 lg:border-[#D7E0AF] font-bold lg:font-normal lg:bg-[#ECF3CB] box-content'>
            出產地 {onLaptop ? " :" : ""}
          </div>
          <div
            className='relative pt-3 mb-3 lg:w-[90%] transition-all duration-300 ease-in-out lg:border-2 lg:border-[#E5E5E5] lg:border-dotted px-3 lg:px-4 lg:pt-0 lg:mb-0 box-content overflow-hidden'
            style={mobileListHeight(expand.origin, listHeight[2])}
            ref={(element) => (listRef.current[2] = element!)}
          >
            <div className='grid grid-cols-3 gap-3 lg:gap-0 lg:flex flex-wrap items-center w-full rangeLg:w-[85%] rangeXl:w-[90%] 2xl:w-[90%] lg:py-2'>
              {source_from.map((country, idx) => (
                <div
                  className='box-border flex items-center h-8 lg:h-10 lg:mr-9'
                  key={`cat-brand-laptop-${idx}`}
                >
                  {onLaptop && (
                    <>
                      <div
                        className='flex items-center justify-center p-1 mr-2 transition-all duration-300 ease-in-out border rounded-md cursor-pointer w-7 h-7'
                        style={
                          filterList.countries.includes(country.source_from)
                            ? {
                                borderColor: "#A6CE39",
                                backgroundColor: "#A6CE39",
                              }
                            : {
                                borderColor: "#6A3B0D",
                                backgroundColor: "#FFF",
                              }
                        }
                        onClick={() => {
                          dispatch(setFilteringCountries(country.source_from));
                        }}
                      >
                        <TickSvg fill='#FFF' />
                      </div>
                      {country.source_from}
                    </>
                  )}

                  {onMobile && (
                    <div
                      className='relative flex items-center w-full h-full p-1 transition-all duration-300 ease-in-out border rounded-md'
                      style={
                        filterList.countries.includes(country.source_from)
                          ? { borderColor: "#76AB23", color: "#76AB23" }
                          : { borderColor: "#E5E5E5", color: "#6A3B0D" }
                      }
                      onClick={() => {
                        dispatch(setFilteringCountries(country.source_from));
                      }}
                    >
                      <div className='w-full overflow-hidden text-sm font-semibold whitespace-nowrap'>
                        {country.source_from}
                      </div>

                      <div
                        className='h-4 w-4 absolute p-[0.1rem] flex transition-all duration-300 ease-in-out items-center -top-2 -right-2 rounded-full border border-[#76AB23] bg-white'
                        style={
                          filterList.countries.includes(country.source_from)
                            ? { opacity: "100%" }
                            : { opacity: "0%" }
                        }
                      >
                        {filterList.countries.includes(country.source_from) && (
                          <TickSvg fill={"#76AB23"} />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {onLaptop && (
              <div
                className={
                  "absolute top-0 right-0 flex items-center justify-end h-[3.5rem] pr-3 rangeLg:w-[15%] rangeXl:w-[10%] 2xl:w-[10%] transition-all ease-in-out duration-300 " +
                  (listHeight[2] > laptopMinimalHeight
                    ? "cursor-pointer opacity-100 visible"
                    : " opacity-0 pointer-events-none invisible")
                }
                // onClick={() => setExpand(initExpand)}
              >
                <MoreBtn
                  expand={expand}
                  setExpand={setExpand}
                  type={"origin"}
                />
              </div>
            )}
          </div>
          {onMobile && (
            <div className='flex justify-center w-full'>
              <div
                className={
                  "box-content flex items-center justify-center w-12 text-sm font-semibold transition-all duration-300 ease-in-out bg-white border rounded-md " +
                  (listHeight[2] > 92
                    ? "h-7 cursor-pointer opacity-100 "
                    : "h-0 pointer-events-none opacity-0")
                }
                onClick={() => {
                  setExpand({ ...expand, origin: !expand.origin });
                }}
              >
                {expand.origin ? "收起" : "全部"}
              </div>
            </div>
          )}
        </div>
      )}

      {onMobile && <ReturnButton btnName='確認' goBack={true} />}
      {onMobile && <ReturnButton btnName='返回' goBack={true} />}
    </>
  );
};

export default FilterMenu;
