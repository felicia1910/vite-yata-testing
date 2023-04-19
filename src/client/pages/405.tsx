import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import ReturnButton from "../components/common/ReturnButton";

const Custom405 = () => {
  const router = useRouter();

  return (
    <div className='lg:bg-grey'>
      <div className='pt-16 rangeLg:px-16 rangeXl:px-24 2xl:px-40 lg:py-16'>
        <div className='flex text-center flex-col bg-white pt-[28px] pb-[120px] lg:py-[83px] underLg:px-10 lg:rounded-2xl items-center w-full'>
          <div className='relative object-contain w-32 h-32'>
            <Image src={`/common/icon-warning.svg`} layout='fill' />
          </div>
          <h1 className='py-[20px] font-semibold text-3xl'>操作失敗</h1>

          <div className='mx-3 my-1 text-sm lg:flex lg:mt-5 lg:text-lg lg:flex-row '>
            <span>抱歉，您之前的付款過程故障，</span>
            <span>請嘗試前往「訂單記錄」重新付款。</span>
          </div>
          <div className='pt-[50px] w-full'>
            <ReturnButton btnName='返回主頁' path='/' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom405;
