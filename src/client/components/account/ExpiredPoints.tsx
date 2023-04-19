import React from "react";
import { IUserPoints } from "../../redux/auth/slice";

const ExpiredPoints = ({
  historyType,
  recordDate,
  name,
  point,
}: IUserPoints) => {
  return (
    <div className='w-full'>
      {historyType === 1 ? (
        <div className='flex items-center justify-between w-full px-2 py-2 lg:border lg:border-solid lg:rounded-lg border-[#E5E5E5] border-b-2 border-dashed'>
          <div className='flex items-center w-full space-x-3'>
            <img
              className='h-8 lg:h-12 w-8 lg:w-12 bg-yata rounded-full px-1.5 py-2 mx-2'
              src='/myAccount/pointhistory/cart.svg'
              alt=''
            />
            <span className='flex flex-col items-start space-y-1 text-sm text-[#999999]'>
              <span>購物-交易編號 </span>
              <span className='w-full text-base font-medium lg:text-lg text-yata-brown'>
                {name.tc}
              </span>
              <span>
                {recordDate.slice(0, 10).split("-").reverse().join("-")},{" "}
                {recordDate.slice(11, 16)}
              </span>
            </span>
          </div>
          <div className='w-3/12 text-xs font-bold text-right lg:text-xl text-yata'>
            +{Math.trunc(point)}分
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-between w-full px-2 py-2 lg:border lg:border-solid lg:rounded-lg border-[#E5E5E5] border-b-2 border-dashed'>
          <div className='flex items-center space-x-3'>
            <img
              className='h-8 lg:h-12 w-8 lg:w-12 bg-[#EA5433] rounded-full px-1.5 py-2 mx-2'
              src='/myAccount/pointhistory/coupon.svg'
              alt=''
            />
            <span className='flex flex-col items-start space-y-1 text-sm text-[#999999] '>
              <span>兌換優惠券</span>
              <span className='w-full font-medium sm:text-base lg:text-lg text-yata-brown'>
                {/*OULU 100%純天然竹漿原色抹手紙*/}
                {name.tc}
              </span>
              <span>
                {recordDate.slice(0, 10).split("-").reverse().join("-")},{" "}
                {recordDate.slice(11, 16)}
              </span>
            </span>
          </div>
          <div className='text-xs font-bold lg:text-xl text-[#EA5433] text-right w-3/12'>
            {Math.trunc(point)}分
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpiredPoints;
