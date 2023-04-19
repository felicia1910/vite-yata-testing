import React from "react";

const CardLoading = () => {
  return (
    <div className='flex justify-center'>
      <div className='relative flex-none px-2 py-2 bg-white border-2 rounded-lg lg:mb-2 lg:mr-2 h-60 w-44 lg:w-97 animate-pulse'>
        <div className='flex flex-col items-center object-cover object-center w-full h-5/12'>
          <div className='relative object-contain w-32 bg-gray-200 rounded-lg h-28 animate-pulse ' />
        </div>

        <div className='w-full pt-2 text-xs font-semibold text-justify h-6/12'>
          <div className='flex items-center w-full h-8'>
            <div className='w-full h-6 bg-gray-200 animate-pulse' />
          </div>
          <div className='flex flex-row items-center justify-between w-auto h-7 '>
            <p className='w-1/2 h-5 leading-relaxed bg-gray-200 animate-pulse' />
          </div>
          <div className='relative w-full h-[2.4rem] py-2 mt-1 bg-yata-mid-light rounded-md animate-pulse'></div>
        </div>
      </div>
    </div>
  );
};

export default CardLoading;
