import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate,useLocation } from 'react-router-dom';
import Store from "./[id]";
import { useAppSelector } from "../../redux/store";
import { selectWindowSize } from "../../redux/control/slice";
import { useWindowDimensions } from "../../hook/useWindowDimensions";
import { Fragment } from "react";
import ReturnButton from "../../components/common/ReturnButton";
import { useGridCols } from "../../hook/useGridCols";
import { selectImgUrl } from "../../redux/config/index";

const storeName = [
  {
    title: "一田百貨",
    list: [
      { content: "沙田", route: "/store/1.jpg", id: "1" },
      { content: "大埔", route: "/store/2.jpg", id: "2" },
      { content: "荃灣", route: "/store/3.jpg", id: "3" },
    ],
  },
  {
    title: "一田超市",
    list: [
      { content: "旺角", route: "/store/4.jpg", id: "4" },
      { content: "新蒲崗", route: "/store/5.jpg", id: "5" },
      { content: "觀塘", route: "/store/6.jpg", id: "6" },
      { content: "將軍澳", route: "/store/7.jpg", id: "7" },
      { content: "葵芳", route: "/store/8.jpg", id: "8" },
      { content: "屯門", route: "/store/9.jpg", id: "9" },
      { content: "元朗", route: "/store/10.jpg", id: "10" },
      { content: "西環", route: "/store/11.jpg", id: "11" },
      { content: "北角", route: "/store/12.jpg", id: "12" },
    ],
  },
  {
    title: "KONBINI By YATA",
    list: [
      { content: "小瀝源", route: "/store/13.jpg", id: "13" },
      { content: "天水圍", route: "/store/14.jpg", id: "14" },
    ],
  },
];

function StoreLocations() {
  const imgUrl = useAppSelector(selectImgUrl);
  const [radio, setRadio] = useState("1");
  // const [gridCols, setGridCols] = useState<string>()
  const windowType = useAppSelector(selectWindowSize);
  const windowDimensions = useWindowDimensions();
  const boxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridCols = useGridCols(boxRef, containerRef, 0);

  const onMobile = windowType === "mobile";

  return (
    <>
      <div>
        <div className='flex flex-col justify-center lg:flex-row lg:w-4/5 lg:mt-9 lg:m-auto'>
          <div className='lg:w-1/4 lg:float-left '>
            <div className='flex items-center pl-3'>
              <div className='w-5 h-5 mr-2 rounded-md bg-yata' />
              <div className='font-bold'>商店位置</div>
            </div>

            <div className='h-auto mt-6 overflow-y-auto rounded-md lg:w-72 lg:bg-[#F1EFEB] lg:block'>
              {storeName.map((store, index) => (
                <div key={`store-${index}`} ref={containerRef}>
                  <div className='mb-2'>
                    <div className='pt-5 pl-3 text-xl font-bold text-yata-deep'>
                      {store.title}
                    </div>
                  </div>

                  <div className='flex flex-wrap justify-center w-auto'>
                    <div
                      className='grid gap-2 lg:block'
                      style={onMobile ? { gridTemplateColumns: gridCols } : {}}
                    >
                      {store.list.map((item, idx) => (
                        <Fragment key={`store-box-${idx}`}>
                          {onMobile ? (
                            <>
                              <Link
                                to='/store-locations/[id]'
                              >
                                <div
                                  className='pt-3 pl-3 pr-3 text-left border rounded-xl hover:border-2 hover:border-yata lg:bg-white text-yata-deep w-44'
                                  ref={boxRef}
                                >
                                  <img src={imgUrl+item.route} />
                                  <div className='my-1 font-bold'>
                                    {item.content}
                                  </div>
                                </div>
                              </Link>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setRadio(item.id);
                                }}
                                className='flex items-center justify-between h-24 py-2 pl-4 pr-2 mb-2 text-left border rounded-xl hover:border-2 hover:border-yata lg:bg-white text-yata-deep w-60'
                                style={
                                  radio === item.id
                                    ? {
                                        backgroundColor: "#FAFFEC",
                                        border: "2px solid #A6CE39",
                                      }
                                    : {}
                                }
                              >
                                <div className='font-bold'>{item.content}</div>
                                <img
                                  src={imgUrl+item.route}
                                  className='w-3/5 rounded-md'
                                />
                              </button>
                            </>
                          )}
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <br />
          </div>

          <div className='mt-16 mb-12 lg:hidden'>
            <ReturnButton btnName='返回' path='/' />
          </div>
          <div className='lg:w-9/12 lg:float-right underLg:hidden'>
            <Store id={radio} />
          </div>
        </div>
      </div>
    </>
  );
}
export default StoreLocations;
