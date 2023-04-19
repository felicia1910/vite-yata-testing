import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { selectWindowSize } from "../../redux/control/slice";
import { selectImgUrl } from "../../redux/config/index";
import { useAppSelector } from "../../redux/store";

type Props = {
  title?: any;
  content?: string;
  pic?: string;
  turn?: boolean[];
  setTurn?: Dispatch<SetStateAction<boolean[]>>;
  idx: number;
};

export default function Accordion({
  title,
  content,
  pic,
  turn,
  setTurn,
  idx,
}: Props) {
  const imgUrl = useAppSelector(selectImgUrl);
  const windowType = useAppSelector(selectWindowSize);
  const contentRef = useRef<HTMLDivElement>(null);
  const onMobile = windowType === "mobile";

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = turn![idx]
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [contentRef, turn]);

  const toggleAccordion = () => {
    let newTurn = [...turn!];
    newTurn[idx] = !newTurn[idx];
    setTurn!(newTurn);
  };
  return (
    <>
      <div className='flex flex-col items-center justify-center w-full px-2 text-sm lg:text-base'>
        <div
          className={`bg-transparent border-b m-3 pb-0.5 border-dashed border-[#98877A] w-full  ${turn![idx]
            }`}
        >
          <div>
            <div
              className='flex items-center justify-between h-10 mb-3 text-left cursor-pointer'
              onClick={toggleAccordion}
            >
              <span className='ml-2 font-medium lg:font-semibold'>{title}</span>
              <div className='relative w-3 h-3 mr-2 lg:h-4 lg:w-4'>
                {turn![idx] ? (
                  <img src={imgUrl + '/faq/minus.png'} alt="minus.png" />
                ) : (
                  <img src={imgUrl + '/faq/plus.png'} alt="plus.png" />

                )}
              </div>
            </div>

            <div
              ref={contentRef}
              className={`mx-4 overflow-hidden text-left lg:mt-5 transition-all max-h-0 duration-500`}
            >
              <p className='pb-3 my-3 font-normal leading-relaxed text-justify whitespace-pre-line'>
                {content}
              </p>
              {pic && (<img src={imgUrl +pic} className='w-full h-full mb-4' alt='' />)}
            </div>

            {onMobile && (
              <div
                className={` border-b border-dashed border-[#98877A] cursor-pointer w-full`}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
