import React, { useEffect, useState, useLayoutEffect } from "react";
import CartContainer from "../../components/shopping/ShoppingCart";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useRouter } from "next/router";
import {
  onCartCheckOut,
  onLoaded,
  onLoading,
  selectIsLoading,
} from "../../redux/control/slice";
import { selectUserInfo, selectIsAuthenticated, selectAdminGrabUserInfo } from "../../redux/auth/slice";
import { getShoppingCartListThunk } from "../../redux/shopping/thunk";
import {
  initShoppingCartList,
  IShoppingCartDetail,
  setCartQuoteType,
  setCartTabIndex,
  selectCartTabIdx,
  selectShoppingCartDetail,
} from "../../redux/shopping/slice";
import Loading from "../../components/common/Loading";
import Image from "next/image";
import ReturnButton from "../../components/common/ReturnButton";
import { useMsal } from "@azure/msal-react";
import { silentRequest } from "../../components/layout/Buttons/LoginButton";

const ShoppingCart = () => {
  const router = useRouter();
  const { instance } = useMsal();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  const cartDetail = useAppSelector(selectShoppingCartDetail);
  const tabIdx = useAppSelector(selectCartTabIdx);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const adminGrabUser = useAppSelector(selectAdminGrabUserInfo)

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("redirectUrl", "/shopping-cart");
      instance.loginRedirect(silentRequest);
    }
  }, [isAuthenticated]);

  useLayoutEffect(() => {
    (async () => {
      if (router.pathname == "/shopping-cart") {
        setIsFetching(true);
        dispatch(onCartCheckOut(false));
        if (userInfo && userInfo.memberNo) {
          const result = await dispatch(getShoppingCartListThunk());
          if (result.payload && result.payload.length > 0) {
            const hasPreSaleTab = result.payload.find(
              (cart: IShoppingCartDetail) => cart.quote_type == 1
            );
            if (result.payload.length == 1) {
              dispatch(setCartTabIndex(0));
              dispatch(setCartQuoteType(result.payload[0].quote_type));
            } else {
              if (hasPreSaleTab) {
                const preSaleTabIdx = result.payload
                  .map((cart: IShoppingCartDetail) => cart.quote_type)
                  .indexOf(1);
                dispatch(
                  setCartTabIndex(preSaleTabIdx > -1 ? preSaleTabIdx : 0)
                );
                dispatch(setCartQuoteType(1));
              } else {
                dispatch(setCartTabIndex(0));
                dispatch(setCartQuoteType(result.payload[0].quote_type));
              }
            }
          }
        } else {
          dispatch(initShoppingCartList());
        }
        setIsFetching(false);
      }
    })();
    console.log("shopping cart list: ", cartDetail);
  }, [router, userInfo]);


  return (
    <>
      <Loading isLoading={isFetching || isLoading!} />
      <div className='bg-grey underLg:pt-4 underLg:pb-8'>
        {cartDetail &&
          cartDetail.length > 0 &&
          cartDetail[0].item_total_qty! > 0 && <CartContainer />}
        {cartDetail &&
          (cartDetail.length == 0 ||
            (cartDetail.length > 0 && cartDetail[0].item_total_qty! == 0)) && (
            <div className='px-4 pt-16 rangeLg:px-16 rangeXl:px-24 2xl:px-40 lg:py-16 lg:pb-40'>
              <div className='flex flex-col items-center w-full h-auto py-12 bg-white rounded-xl'>
                <div className='relative object-contain w-32 h-32'>
                  <Image src={`/common/cart.svg`} layout='fill' />
                </div>
                <h1 className='py-8 text-3xl font-semibold'>
                  您的購物車是空的
                </h1>
                <div className='w-full'>
                  <ReturnButton btnName='繼續購物' path='/' />
                </div>
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default ShoppingCart;
