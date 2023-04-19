import React, { useEffect } from "react";
import AccountLayout from "../../components/account/AccountLayout";
import ExpiredPoints from "../../components/account/ExpiredPoints";
import { useAppSelector } from "../../redux/store";
import {
  selectIsAuthenticated,
  selectTotalPoints,
  selectUserPoints,
} from "./../../redux/auth/slice";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAppDispatch } from "./../../redux/store";
import { getAppPointThunk, getUserPointThunk } from "../../redux/auth/thunk";

const Points = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const point = useAppSelector(selectUserPoints);
  const totalPoint = useAppSelector(selectTotalPoints);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("redirectUrl", router.asPath);
      router.push("/login");
    } else {
      dispatch(getAppPointThunk());
      dispatch(getUserPointThunk());
    }
  }, [isAuthenticated, router, dispatch]);

  return (
    <div>
      {isAuthenticated && (
        <AccountLayout isRequired={true} title='積分記錄'>
          <span className='mx-4 my-5 text-lg font-bold text-yata-brown'>
            我的積分
          </span>
          <div className='flex flex-col items-start px-6 py-4 mx-5 my-5 space-y-2 border-2 border-grey rounded-xl'>
            <div className='flex items-center space-x-3'>
              <Image
                className='w-6 h-6'
                src='/myAccount/dropdownlist/pointhistory-default.svg'
                alt=''
                width={24}
                height={24}
              />
              <span>
                積分結餘：{" "}
                <b className='lg:text-yata'>
                  {totalPoint && Math.floor(totalPoint.avaliablePoint)}
                </b>
                分
              </span>
            </div>
            <div className='flex items-center space-x-3'>
              <Image
                className='w-6 h-6'
                src='/myAccount/pointhistory/date.svg'
                alt=''
                width={24}
                height={24}
              />
              <span>
                到期日 31/12/{new Date().getFullYear()}: &nbsp;
                {totalPoint && Math.floor(totalPoint.avaliablePoint)}分
              </span>
            </div>
          </div>
          <span className='mx-4 text-lg font-bold text-yata-brown'>
            積分記錄
          </span>
          <div className='flex flex-col items-start border border-[#E5E5E5] rounded-lg mx-4 my-4'>
            {point?.map((el, i) => {
              return (
                <div key={i} className='w-full'>
                  <ExpiredPoints
                    point={el.point}
                    recordDate={el.recordDate}
                    name={el.name}
                    historyType={el.historyType}
                  />
                </div>
              );
            })}
          </div>
        </AccountLayout>
      )}
    </div>
  );
};

export default Points;
