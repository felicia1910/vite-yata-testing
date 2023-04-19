
import React, { RefObject, useRef } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import ChevronRightSvg from "../../../public/common/arrow/chevron-right";
import ItemCard from "../../shopping/Product/ItemCard";
import { ICategoryCarousel } from "../../../redux/shopping/slice";
import { Link, useNavigate } from 'react-router-dom';

interface HomeCat {
  type: string;
  route: string;
  barColor: string;
  textColor: string;
  bgColor: string;
  icon: string;
  next: string;
  tabs: {
    name: string;
    route: string;
  }[];
}

type Props = {
  cats: HomeCat;
  row: ICategoryCarousel;
};

export default function CategoryBox({ cats, row }: Props) {
  const router = useNavigate();
  const { type, route, barColor, textColor, bgColor, icon, next, tabs } = cats;
  const rowRef = useRef<HTMLDivElement>(null);

  const handleClick = (direction: string) => {
    if (rowRef.current) {
      const { scrollLeft } = rowRef.current;
      const scrollTo =
        direction === "left" ? scrollLeft - 480 : scrollLeft + 480;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  // console.log("CategoryBox row", row);

  return (
    <div className='relative'>
      <div
        className={`flex flex-row w-full mt-3 justify-between lg:justify-start rounded-lg lg:h-14 h-9`}
        style={{ backgroundColor: row.header_color }}
      >
        <h1 className={`flex my-auto lg:w-2/12 ml-3 whitespace-nowrap`}>
          <div
            className={`h-auto pr-2 mr-2 rounded `}
            style={{ background: row.button_color }}
          />
          {row.name_c}
        </h1>

        <div className='justify-end hidden lg:flex whitespace-nowrap lg:w-9/12'>
          {row.children.length > 0 &&
            row.children.map((tab, idx) => {
              // console.log('row.children,',row.children.length)
              return (
                <button
                  style={{ background: row.button_color }}
                  className={`flex px-3 py-2 my-auto ml-2 text-sm rounded-full underLg:hidden`}
                  key={`home-cat-${tab.id}-${idx}`}
                  onClick={() => router(`/category/${tab.url_path}`)}
                >
                  {tab.name}
                </button>
              )
            })}
        </div>


        <button
          className={`flex justify-end items-center my-auto pr-1 space-x-1 whitespace-nowrap lg:w-1/12 ml-1 mr-2`}
        >
          <Link to={{ pathname: `/category/${row.url_path}` }}>
            <div className="flex items-center">
              <span>更多</span>
              <ChevronRightSvg height={18} fill={row.button_color} />
            </div>
          </Link>
        </button>

      </div>

      <div
        className={`rounded-bl-lg rounded-br-lg py-3 lg:mb-10 lg:px-12 scrollbar-hide`}
        style={{ background: row.background_color }}
      >
        {/* <div ref={rowRef} className="flex overflow-scroll scrollbar-hide"> */}
        <ScrollContainer
          className='flex overflow-scroll scrollbar-hide'
          innerRef={rowRef}
        >
          {row.product_list.length > 0 &&
            row.product_list.map((detail, i) => (
              <div key={`product-list-${i}`} className='mx-1'>
                <ItemCard detail={detail} categoryId={row.category_id} />
              </div>
            ))}
        </ScrollContainer>
        {/* </div> */}
      </div>

      <div
        className={`underLg:hidden cursor-pointer absolute top-[55%] justify-center translate-y-[-50%] left-2 flex items-center w-8 h-8 rounded-full shadow-sm opacity-80`}
        style={{ background: row.button_color }}
        onClick={() => handleClick("left")}
      >
        <div className='relative flex items-center object-contain w-4 h-4 rotate-180 '>
          <ChevronRightSvg fill='#FFF' />
        </div>
      </div>

      <div
        className={`underLg:hidden cursor-pointer absolute top-[55%] translate-y-[-50%] right-2 flex items-center w-8 h-8 rounded-full justify-center shadow-sm opacity-80`}
        style={{ background: row.button_color }}
        onClick={() => handleClick("right")}
      >
        <div className='relative flex items-center object-contain w-4 h-4 '>
          <ChevronRightSvg fill='#FFF' />
        </div>
      </div>
    </div>
  );
}
