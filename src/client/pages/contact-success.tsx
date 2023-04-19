import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { onLoaded, onLoading } from "../redux/control/slice";
import { useAppSelector, useAppDispatch } from "../redux/store";

const ContactSuccess = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const caseNo = router.query.caseNo;
  const handleClick = () => {
    router.push("/");
  };

  useEffect(() => {
    dispatch(onLoading());
    setTimeout(() => {
      dispatch(onLoaded());
    }, 300);
  }, []);

  return (
    <div className='lg:bg-grey'>
      <div className='lg:mx-[13%] lg:py-[52px]'>
        <div className='flex text-center flex-col bg-white pt-[28px] pb-[120px] lg:py-[83px] underLg:px-10 lg:rounded-2xl items-center w-full'>
          <div>
            <Image
              src={`/common/icon-success.svg`}
              alt=''
              width={120}
              height={120}
            />
          </div>
          <h1 className='py-[20px] font-semibold text-3xl'>謝謝</h1>

          <div className='space-y-1 text-sm lg:text-lg'>
            <div>我們將盡快跟進您的個案。</div>
            <div>個案編號 {caseNo}</div>
          </div>

          <div className='pt-[50px]'>
            <button
              onClick={handleClick}
              className='px-[60px] lg:px-[90px] bg-yata-deep py-[10px] rounded-md text-white'
            >
              返回主頁
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSuccess;
