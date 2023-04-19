import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useRouter } from "next/router";
import {
  loginAsAdmin,
  logout,
  selectIsAdmin,
  selectUserInfo,
} from "../../redux/auth/slice";
import { getUserForAdminThunk } from "../../redux/auth/thunk";
import {
  EWarningType,
  openWarningModal,
  selectWindowSize,
} from "../../redux/control/slice";
import WarningModal from "../../components/modal/WarningModal";
import Loading from "../../components/common/Loading";

const LoginCustomer = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const windowSize = useAppSelector(selectWindowSize);
  const isAdmin = useAppSelector(selectIsAdmin);
  const [userPhone, setUserPhone] = useState({
    countryCode: "852",
    mobile: "",
  });

  const submitLoginAsMember = async () => {
    if (userPhone.mobile.length > 7) {
      const result = await dispatch(getUserForAdminThunk(userPhone));
      // console.log('dispatch(getUserForAdminThunk,',result.payload.data)
      // console.log('dispatch(getUserForAdminThunk,',result.payload.isSuccess)
      if (result.payload) {
        const detail = result.payload;
        if (detail.isSuccess) {
          router.push(windowSize == "mobile" ? "/account" : "/account/profile");
        } else {
          dispatch(
            openWarningModal({
              type: EWarningType.payment,
              text: detail.errorMsg,
            })
          );
        }
      }
    }
  };

  const submitLogoutAsAdmin = () => {
    dispatch(loginAsAdmin(false));
    dispatch(logout());
    router.push("/admin/login");
  };

  useEffect(() => {
    if (!isAdmin) {
      router.back();
    }
  }, [isAdmin]);

  return (
    <>
      {!isAdmin && <Loading isLoading />}
      <div className='flex flex-col w-full'>
        {/* <div className="mt-12 ml-4 lg:text-lg lg:ml-20">
        <span>已登入 - yataadmin</span>
        <Link href="/admin/login" passHref>
          <span className="ml-6 underline cursor-pointer text-yata underline-offset-4">
            登出
          </span>
        </Link>
      </div> */}
        <div className='flex flex-col items-center justify-center w-full pt-16 '>
          <h2 className='mb-8 text-xl font-semibold'>登入YATA eShop客戶帳號</h2>
          <div className='flex w-10/12 mb-4 space-x-2 lg:w-80 '>
            <select
              value={"852"}
              className='w-20'
              onChange={(e) => {
                setUserPhone({ ...userPhone, countryCode: e.target.value });
              }}
            >
              <option value={"852"}>+852</option>
              <option value={"853"}>+853</option>
              <option value={"86"}>+86</option>
            </select>
            <input
              type='text'
              placeholder='輸入YATA Fans電話號碼'
              className='border-b border-[#6A3B0D] py-1 w-9/12 outline-none '
              onChange={(e) => {
                setUserPhone({ ...userPhone, mobile: e.target.value });
              }}
            />
          </div>
          <button
            type='submit'
            className='w-10/12 lg:w-[22%] mb-4 font-medium text-lg text-white bg-[#82A90E] rounded-3xl my-8 py-2'
            onClick={submitLoginAsMember}
          >
            確定{" "}
          </button>
          <button
            onClick={submitLogoutAsAdmin}
            // className='font-medium underline lg:hidden text-yata-deep underline-offset-2'
            className='w-10/12 lg:w-[22%] mb-4 font-medium underline text-lg text-[#82A90E] rounded-3xl my-8 py-2'

          >
            登出 {"yata-admin"}
          </button>
        </div>
      </div>
      <WarningModal />
    </>
  );
};

export default LoginCustomer;
