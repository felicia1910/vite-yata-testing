import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ExchangeHeader from "../../../components/admin/ExchangeHeader";
import Link from "next/link";
import ItemCart from "../../../components/shopping/ShoppingCart/index";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  selectIsAuthenticated,
  selectUserInfo,
} from "../../../redux/auth/slice";
import Loading from "../../../components/common/Loading";
import { onCartCheckOut } from "../../../redux/control/slice";
import { getShoppingCartListThunk } from "../../../redux/shopping/thunk";
import { initShoppingCartList } from "../../../redux/shopping/slice";
import {
  // getOrderId,
  selectIsCalendarVisible,
} from "../../../redux/admin/slice";

const EditOrderConfirm = () => {
  const router = useRouter();
  const { id } = router.query;
  const cartDetail = useAppSelector(
    (state) => state.shopping.shoppingCartDetail
  );
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const adminEditPage = router.pathname === "/admin/edit/[id]";
  useEffect(() => {
    (async () => {
      setIsFetching(true);
      dispatch(onCartCheckOut(false));
      if (userInfo && userInfo.memberNo) {
        await dispatch(getShoppingCartListThunk());
      } else {
        dispatch(initShoppingCartList());
      }
      setIsFetching(false);
    })();
  }, [router, userInfo, dispatch]);
  console.log(isAuthenticated, "edit  ");

  // adminEditPage && dispatch(getOrderId({ id }));

  return (
    <>
      <Loading isLoading={isFetching} />

      <div
        className={`flex flex-col mb-8 text-lg lg:items-start justify-start lg:w-full bg-[#F2F2F2]`}
      >
        <div
          className={`flex items-start justify-start lg:w-[80%] px-5 space-x-1 lg:px-0 lg:mt-5 lg:whitespace-nowrap text-base lg:ml-[10%]  `}
        >
          <div className='flex items-center justify-start'>
            <Image
              src='/common/arrow/arrow-left.png'
              alt=''
              width={16}
              height={16}
            />
            <span
              className='font-bold min-w-fit lg:ml-8 ml-3'
              //onClick={() => (windowSize == "mobile" ? router.push(path) : {})}
            >
              {`{Adminusername}`}
            </span>
          </div>
          <Link href='/admin/login-member' passHref>
            <span className='pl-8 lg:pl-[8%] font-bold text-yata underline min-w-fit underline-offset-4 cursor-pointer'>
              登出此帳戶
            </span>
          </Link>
        </div>
        <div className={`flex flex-col w-full mt-5 lg:ml-[10%]`}>
          <span>原本訂單編號：{id}</span>
          <span>原本訂單總額：HK$2854</span>
        </div>
        <div className={`lg:w-[56%] mt-5 lg:ml-[10%]`}>
          <ExchangeHeader />
        </div>

        <div className='w-full'>
          {isAuthenticated &&
            cartDetail &&
            cartDetail.length > 0 &&
            cartDetail[0].item_total_qty! > 0 && <ItemCart />}
        </div>
      </div>
    </>
  );
};

export default EditOrderConfirm;
