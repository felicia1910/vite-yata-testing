import React, {
  Fragment,
  useCallback,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import ShipmentGroupItems from "./ShipmentGroupItems";

import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  onCartEdit,
  selectIsEdited,
  selectIsCheckOut,
  onCartCheckOut,
  selectWindowSize,
  onLoading,
  onLoaded,
} from "../../../redux/control/slice";
import {
  emptyCartThunk,
  getCartItemCountThunk,
  getShoppingCartListThunk,
  modifyCartThunk,
} from "../../../redux/shopping/thunk";
import {
  IShoppingCartDetail,
  IUpdateCartInfo,
  selectCartQuoteType,
  selectShoppingCartDetail,
  setCartQuoteType,
  setCartTabIndex,
} from "../../../redux/shopping/slice";
import { selectShippingMode } from "../../../redux/delivery/slice";
import { selectIsCalendarVisible } from "../../../redux/admin/slice";

type Props = {
  detail: IShoppingCartDetail;
};

export default function ItemDisplayBox({ detail }: Props) {
  const initUpdateList = { quote_uuid: "", shipment_mode: "", item_lines: [] };
  const router = useRouter();
  const dispatch = useAppDispatch();
  const windowSize = useAppSelector(selectWindowSize);
  const isEdited = useAppSelector(selectIsEdited);
  const isCheckout = useAppSelector(selectIsCheckOut);
  const shippingMode = useAppSelector(selectShippingMode);
  const cartQuoteType = useAppSelector(selectCartQuoteType);
  const cartList = useAppSelector(selectShoppingCartDetail);


  const tabIdx = useAppSelector((state) => state.shopping.cartTabIdx);

  const [openCart,setOpenCart] = useState(false)
  const [updateCart, setUpdateCart] = useState<IUpdateCartInfo>(initUpdateList);
  const [wishlist, setWishlist] = useState(false);
  
  // useEffect(()=>{
  //   console.log('cartList',cartList)
  // },[cartList])

  useLayoutEffect(() => {
    // detail.shipment_group.map((grp) => {
    //grp.shipment_group_code = shippingMode+'-1';
    // });
    // if (ungroupedDetail && ungroupedDetail.length > 0) {
    // console.log("detail", detail);
    setUpdateCart({
      quote_uuid: detail.quote_uuid! ?? "",
      shipment_mode: detail.shipment_mode,
      item_lines: detail.item_lines,
      // ungroupedDetail[tabIdx]
      // ? ungroupedDetail[tabIdx].item_lines
      // : [],
    });
    // }
  }, [detail, tabIdx]);

  const toggleEmptyCart = async (quoteId: string) => {
    if (quoteId != "" && quoteId != undefined && quoteId != null) {
      dispatch(onLoading());
      const result = await dispatch(emptyCartThunk(quoteId));
      // console.log('toggleEmptyCart',result)
      setTimeout(() => {
        if (result.payload && result.payload == 1) {
          dispatch(onLoaded());
        } else {
          dispatch(onLoaded());
        }
      }, 1500);
    }
  };
  useEffect(()=>{
    if(!openCart) {setOpenCart(true);return}
    toggleWishlistEdit()
  },[wishlist ])
  const toggleWishlistEdit = async () => {

    if (updateCart.item_lines.length == 0) {
      dispatch(setCartTabIndex(tabIdx > 0 ? tabIdx - 1 : 0));
      dispatch(
        setCartQuoteType(
          tabIdx > 0
            ? cartList![tabIdx - 1].quote_type
            : cartList!.length > 1
            ? cartList![1].quote_type
            : -1
        )
      );
    }
    const result = await dispatch(modifyCartThunk(updateCart));
    setTimeout(async () => {
      if (result.payload && result.payload == 1) {
        await dispatch(getShoppingCartListThunk());
      }

    }, 1500);
  };

  const toggleSubmitEdit = async () => {
    dispatch(onLoading());
    if (updateCart.item_lines.length == 0) {
      dispatch(setCartTabIndex(tabIdx > 0 ? tabIdx - 1 : 0));
      dispatch(
        setCartQuoteType(
          tabIdx > 0
            ? cartList![tabIdx - 1].quote_type
            : cartList!.length > 1
            ? cartList![1].quote_type
            : -1
        )
      );
    }
    const result = await dispatch(modifyCartThunk(updateCart));
    setTimeout(async () => {
      if (result.payload && result.payload == 1) {
        await dispatch(getCartItemCountThunk());
        await dispatch(getShoppingCartListThunk());
      }
      dispatch(onCartEdit(false));
      dispatch(onLoaded());
    }, 1500);
  };

  // console.log("shipping detail: ", detail);
  // console.log("shippingMode", shippingMode);
  // console.log("detail.shipment_group", detail.shipment_group);
  // console.log("update cart: ", updateCart);
  const showCalendar = useAppSelector(selectIsCalendarVisible);
  const adminPickUpPage = router.pathname === "/admin/pickup/[id]";
  return (
    <>
      <div className='flex flex-row items-center justify-between px-3 py-3'>
        <div className='flex flex-row items-center'>
          <div className='text-lg font-bold text-yata-deep'>購物車</div>
          <div className='mx-6 text-lg text-yata-deep'>
            {detail.item_total_qty} 件產品
          </div>
        </div>

        {/* Modify cart button */}
        {/* Show modify cart button if not at hamper type */}
        {cartQuoteType != 2 && (
          <div className='flex flex-row transition-all duration-200 ease-in-out'>
            {isEdited && (
              <div className='flex flex-row'>
                <button
                  className='px-3 mx-1 border rounded-md cursor-pointer text-grey-deep border-grey-deep'
                  onClick={() => {
                    setUpdateCart({
                      quote_uuid: detail.quote_uuid! ?? "",
                      shipment_mode: detail.shipment_mode,
                      item_lines: detail.item_lines,
                    });
                    dispatch(onCartEdit(false));
                    // dispatch(getShoppingCartListThunk());
                  }}
                >
                  <h1>取消</h1>
                </button>
                <button
                  className='px-3 mx-1 text-white border rounded-md cursor-pointer bg-yata-deep border-yata'
                  onClick={async () => await toggleSubmitEdit()}
                >
                  <h1>保存</h1>
                </button>
              </div>
            )}
            {!isCheckout && !isEdited && !showCalendar && (
              <div
                className='px-3 mx-1 border rounded-md cursor-pointer text-yata-deep border-yata'
                onClick={() => dispatch(onCartEdit(true))}
              >
                <h1>編輯</h1>
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        {detail.shipment_group &&
          detail.shipment_group.map((grp, idx) => (
            <Fragment key={`shipping-grp-${grp.id}`}>
              <ShipmentGroupItems
                grpIdx={idx}
                quoteUUID={detail.quote_uuid!}
                shipmentGrp={grp}
                shippingMode={shippingMode}
                deliveryFeeLogic={grp.cal_delivery_fee_logic!}
                deliveryAmount={grp.cal_delivery_fee_amount!}
                totalDiscountAmount={grp.total_group_amount_with_discount}
                diffAmount={
                  grp.total_group_amount_with_discount_for_cal_del_fee!
                }
                updateCart={updateCart}
                setUpdateCart={setUpdateCart}
                setWishlist={setWishlist}
                wishlist={wishlist}
                quoteType={detail.quote_type}
              />
            </Fragment>
          ))}
        <div className='flex items-center px-3 py-5 space-x-6 underLg:justify-between lg:mx-4'>
          {!isCheckout && (
            <button
              className={
                "box-border flex items-center justify-center py-2 lg:text-lg border-[1px] rounded-full w-[48%] lg:w-44 transition-all ease-in-out duration-150 " +
                (isEdited
                  ? "bg-grey-i text-grey cursor-default"
                  : "border-yata-deep text-yata-deep")
              }
              onClick={() => router.push("/")}
              disabled={isEdited}
            >
              <div className='w-5 h-5 my-auto mr-1'>
                <Image
                  src={isEdited ? "/cart/2-white.png" : "/cart/2.png"}
                  width={28}
                  height={26}
                />
              </div>
              繼續購物
            </button>
          )}

          {(isCheckout || adminPickUpPage) && windowSize == "laptop" && (
            <button
              className='flex items-center justify-center py-2 truncate border-2 rounded-full lg:text-lg border-yata-deep text-yata-deep w-44'
              onClick={() => {
                router.back();
                setTimeout(() => {
                  dispatch(onCartCheckOut(false));
                }, 100);
              }}
            >
              返回購物車
            </button>
          )}

          {!isCheckout && (
            <button
              className={
                "flex justify-center items-center py-2 lg:text-lg truncate text-white rounded-full border-[1px]   w-[48%] lg:w-44 transition-all ease-in-out duration-150 " +
                (isEdited
                  ? "bg-grey-i text-grey cursor-default"
                  : "bg-grey-yellow border-grey-yellow")
              }
              onClick={async () => {
                await toggleEmptyCart(detail.quote_uuid!);
              }}
              disabled={isEdited}
            >
              <img src='/cart/3.png' className='w-4 h-5 my-auto mr-1' />
              清空購物車
            </button>
          )}
        </div>
      </div>
    </>
  );
}
