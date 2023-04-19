import React, { useCallback, useEffect, useState } from "react";
import {
  setCartTabIndex,
  selectCartQuoteType,
  selectShoppingCartDetail,
  setCartQuoteType,
} from "../../../redux/shopping/slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { selectIsCheckOut, selectIsEdited } from "../../../redux/control/slice";
import { selectUserInfo } from "../../../redux/auth/slice";

const CartTab = () => {
  const dispatch = useAppDispatch();
  const isEdited = useAppSelector(selectIsEdited);
  const isCheckout = useAppSelector(selectIsCheckOut);
  const tabIdx = useAppSelector((state) => state.shopping.cartTabIdx);
  const cartQuoteType = useAppSelector(selectCartQuoteType);
  const detail = useAppSelector(selectShoppingCartDetail);
  const user = useAppSelector(selectUserInfo);

  const [quoteTypeList, setQuoteTypeList] = useState<number[]>([]);
  const adminCartControlshow = [0,1,2]


  useEffect(() => {
    if (detail) {
      const list: number[] = [];
      detail.map((d) => list.push(d.quote_type));
      setQuoteTypeList(list);
      // }
    }
  }, [detail]);


  const genTabText = (type: number) => {
    switch (type) {
      case 0:
        return "購物車";
      case 1:
        return "預購產品購物車";
      case 2:
        return "禮籃及果籃購物車";
    }
  };

  const genTabColor = (type: number) => {
    if (cartQuoteType == type) {
      switch (type) {
        case 0:
          return "#A6CE39";
        case 1:
          return "#FFAE50";
        case 2:
          return "#E66190";
      }
    } else {
      return isEdited || isCheckout ? "#DCDCDC" : "#ACACAC";
    }
  };

  return (
    <div
      className={`w-full pt-2 lg:pt-8 lg:flex flex-nowrap lg:border-b-2 grid grid-cols-3 gap-1 overflow-x-scroll scrollbar-hide lg:space-x-4 text-white text-base lg:px-4 mb-4 transition-all duration-300 ease-in-out ${
        cartQuoteType == 0
          ? "lg:border-yata"
          : cartQuoteType == 1
          ? "lg:border-[#FFAE50]"
          : cartQuoteType == 2
          ? "lg:border-[#E66190]"
          : ""
      }`}
      style={{
        gridTemplateColumns: `repeat(${quoteTypeList.length}, minmax(0, 1fr))`,
      }}
    >
      {quoteTypeList.filter(type=>adminCartControlshow.some(e=>type==e)).map((type, idx) => (
        <button
          key={`cart-tab-${idx}`}
          onClick={() => {
            dispatch(setCartTabIndex(idx));
            // dispatch(setCartTabIndex(idx == 2 ? 0 : idx));
            dispatch(setCartQuoteType(type));
          }}
          disabled={isEdited || isCheckout}
          className='relative w-auto py-4 text-sm transition-all duration-300 ease-in-out rounded-lg underLg:overflow-hidden lg:p-8 lg:rounded-t-lg lg:rounded-b-none lg:py-3 lg:px-0 lg:w-40 min-w-fit lg:text-base '
          style={{ backgroundColor: genTabColor(type) }}
        >
          <span>{genTabText(type)}</span>
          <div
            className={
              "absolute right-0 flex items-center justify-center w-6 h-4 transition-all duration-300 ease-in-out rounded-bl-lg lg:rounded-full lg:w-5 lg:h-5 lg:-top-2 lg:-right-2 top-0 " +
              ((isEdited || isCheckout) && cartQuoteType !== type
                ? "bg-red-300 "
                : "bg-red-500 ")
            }
          >
            <span className='text-xs text-white'>
              {detail![idx]?.item_total_qty}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default CartTab;
