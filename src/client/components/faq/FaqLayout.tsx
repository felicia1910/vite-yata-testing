// import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { useAppSelector } from "../../redux/store";
import { selectWindowSize } from "./../../redux/control/slice";
import { selectImgUrl } from "../../redux/config/index";
import Sidebar from "./Sidebar";
import { faqRoute } from "../../routers/index";
import ChevronDownSvg from "../../public/common/arrow/chevron-down";
import Accordion from "./Accordion";
import ReturnButton from "../common/ReturnButton";
import HeadTitle from "../common/HeadTitle";

type Props = {
  title?: string;
  content?: string;
  pic?: string;
  turn?: boolean[];
  setTurn?: Dispatch<SetStateAction<boolean[]>>;
  idx: number;
};

interface LayoutProps {
  handleClick: any;
  isSomeActive: any;
  turn: any;
  setTurn: any;
  data: Props[];
  title: string;
}

const FaqLayout = ({
  handleClick,
  isSomeActive,
  turn,
  setTurn,
  data,
  title,
}: LayoutProps) => {
  const windowType = useAppSelector(selectWindowSize);
  const onMobile = windowType === "mobile";
  const onLaptop = windowType === "laptop";
  const imgUrl = useAppSelector(selectImgUrl);

  return (
    <div className='flex flex-col justify-center mb-8 text-lg lg:items-center lg:w-full'>
      <div className='items-start justify-center mb-8 lg:flex lg:w-full '>
        {onLaptop && (
          <div className='flex flex-col w-3/12 px-8 mt-2'>
            <HeadTitle title={title} path={"/about/faq"} head={faqRoute.title} />
            <Sidebar data={faqRoute.list} />
          </div>
        )}

        <div className='items-center flex flex-col lg:w-7/12 lg:mt-7 w-full bg-[#FCFCFA]'>
          <div className='flex items-center justify-between w-full mb-6 lg:justify-end'>
            {onMobile && (
              <HeadTitle title={title} path={"/about/faq"} head={faqRoute.title} />
            )}

            <button
              className='flex items-center mr-3 space-x-1 text-sm font-bold border-b lg:text-base lg:space-x-2 border-yata'
              onClick={() => {
                handleClick();
              }}
            >
              <span className='text-yata min-w-fit text-ellipsis'>
                {" "}
                {!isSomeActive ? "全部展開" : "全部收合"}
              </span>
              <div
                className={
                  "relative lg:w-3 lg:h-3 h-2 w-2 flex items-center justify-center transition-all ease-in-out duration-200 " +
                  (!isSomeActive ? " rotate-0" : "rotate-180")
                }
              >
                <ChevronDownSvg fill='#A6CE39' />
              </div>
            </button>
          </div>

          {data.map((el, i) => {
            return (
              <div className='w-full' key={"faq-products-" + i}>
                <Accordion
                  title={el.title}
                  content={el.content}
                  pic={el.pic}
                  turn={turn}
                  setTurn={setTurn}
                  idx={i}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div
        className='absolute bottom-32 lg:bottom-8 lg:right-10 right-2'
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <div className='relative cursor-pointer h-9 w-9'>
          <img src={imgUrl + '/faq/back.png'} alt="pic" />
        </div>
      </div>

      {onMobile && (
        <div className='mt-20'>
          <ReturnButton btnName='返回' path='/about/faq' />
        </div>
      )}
    </div>
  );
};

export default FaqLayout;
