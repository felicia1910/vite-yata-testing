import React, { useRef } from "react";
import ChevronDownSvg from "../../public/common/arrow/chevron-down";
import ChevronUpSvg from "../../public/common/arrow/chevron-up";
import Videos from "../home/Videos";

export default function YataWikiVideo() {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleClick = (direction: string) => {
    if (rowRef.current) {
      const { scrollTop } = rowRef.current;
      const scrollTo = direction === "up" ? scrollTop - 400 : scrollTop + 400;
      rowRef.current.scrollTo({ top: scrollTo, behavior: "smooth" });
    }
  };
  return (
    <div className="relative underLg:hidden lg:mt-3 lg:w-full lg:h-128 lg:border lg:mb-3 lg:ml-4 lg:border-yata lg:rounded-xl">
      <div className="flex flex-row justify-center">
        <h1 className="pt-2 mr-4 text-yata">........</h1>
        <h1 className="pt-3 text-center">一田百科</h1>
        <h1 className="pt-2 ml-4 text-yata">........</h1>
      </div>

      <div
        className="lg:w-full lg:h-120 lg:overflow-x-scroll scrollbar-hide"
        ref={rowRef}
      >
        <Videos />
      </div>

      <div
        className="under-lg:hidden cursor-pointer absolute top-[94%] left-28 flex items-center w-8 h-8 rounded-full shadow-sm bg-grey opacity-60"
        onClick={() => handleClick("up")}
      >
        <div className='flex items-center object-contain w-5 h-5 '>
          <ChevronUpSvg fill="#82A90E" />
        </div>
      </div>

      <div
        className="underLg:hidden cursor-pointer absolute top-[94%] right-28 flex items-center w-8 h-8 rounded-full shadow-sm bg-grey opacity-60"
        onClick={() => handleClick("down")}
      >
        <div className='flex items-center object-contain w-5 h-5 '>
          <ChevronDownSvg fill="#82A90E" />
        </div>
      </div>
    </div>
  );
}
