import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { useMsal } from "@azure/msal-react";

import ItemColorSize from "./ItemColorSize";
import AddToCartPopup from "./AddToCartPopup";
import { IProductDetail, ICartItemQty } from "../../../redux/shopping/slice";
import WarningModal from "../../modal/WarningModal";
import { silentRequest } from "../../layout/Buttons/LoginButton";

import { useAppDispatch } from "./../../../redux/store";
import {
  addItemToCartThunk,
  removeWishList,
  updateWishList,
} from "../../../redux/shopping/thunk";
import { useAppSelector } from "../../../redux/store";
import { selectShippingMode } from "../../../redux/delivery/slice";
import { selectIsAuthenticated } from "../../../redux/auth/slice";
import { useRouter } from "next/router";
import {
  EWarningType,
  onLoading,
  openWarningModal,
} from "../../../redux/control/slice";

type Props = {
  item: IProductDetail;
};

const ItemDetail = ({ item }: Props) => {
  const initSku = {
    sku: "",
    plu: "",
    qty: 1,
    categoryId: item.categoryId ?? 0,
  };
  const initPricing = {
    save_amt: item.save_amt ?? "",
    percent_off: item.percent_off ?? "",
    rsp: item.rsp ?? "",
    psp: item.psp ?? "",
    promotions: item.promotions,
  };

  const dispatch = useAppDispatch();
  const { instance } = useMsal();
  const router = useRouter();
  const [skuQty, setSkuQty] = useState<ICartItemQty>(initSku);
  const [isAddToCart, setIsAddToCart] = useState<{
    success: boolean;
    err: string;
  } | null>(null);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [like, setLike] = useState(false);
  const [pricing, setPricing] = useState(initPricing);
  const [status, setStatus] = useState<{
    product: number;
    inventory: number;
  }>({
    product: 0,
    inventory: 1,
  });
  const shippingMode = useAppSelector(selectShippingMode);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const noSkuInfo = skuQty.plu == "" && skuQty.sku == "";
  const notAvailable =
    status.inventory == 0 || status.product == 1 || status.product == 2;

  // console.log("sku qty (no color)", skuQty);
  // console.log("product data: ", item.categoryId, item);

  useEffect(() => {
    if (!item.options && item.plu && item.sku && item.categoryId) {
      setSkuQty({
        ...skuQty,
        plu: item.plu,
        sku: item.sku,
        categoryId: item.categoryId,
      });
    } else {
      setSkuQty({
        ...skuQty,
        categoryId: item.categoryId,
      });
    }
    // console.log("item like: ", item);
    if (item.wish_list == 1) {
      setLike(true);
    }
    setStatus({
      product: item.product_status,
      inventory: item.inventory_status,
    });
  }, [item]);

  const inc = () => {
    setSkuQty({ ...skuQty, qty: skuQty.qty + 1 });
  };
  const dec = () => {
    if (skuQty.qty > 1) {
      setSkuQty({ ...skuQty, qty: skuQty.qty - 1 });
    }
  };

  const likeChangeHandler = async (e: any) => {
    e.stopPropagation();
    if (isAuthenticated) {
      if (!like) {
        setLike(true);
        setTimeout(async () => {
          const result = await dispatch(updateWishList(item.plu));
        }, 500);
      } else {
        setLike(false);
        setTimeout(async () => {
          const result = await dispatch(removeWishList(item.plu));
        }, 500);
      }
    } else {
      localStorage.setItem("redirectUrl", router.asPath);
      instance.loginRedirect(silentRequest);
    }
  };

  const toggleSubmit = async () => {
    if (!noSkuInfo) {
      setBtnLoading(true);
      // console.log("skuQty", skuQty);
      setTimeout(async () => {
        const result: any = await dispatch(addItemToCartThunk(skuQty));
        // console.log("add item result: ", result);
        if (result.payload) {
          if (result.payload.success == 1) {
            setIsAddToCart({ success: true, err: "" });
          } else {
            // console.log("error msg: ", result.payload.err[0].message);
            dispatch(
              openWarningModal({
                type: EWarningType.product,
                text: result.payload.err[0].message,
              })
            );
          }
        }
        setBtnLoading(false);
        if (!item.options && item.plu && item.sku) {
          setSkuQty({
            ...skuQty,
            qty: 1,
            plu: item.plu,
            sku: item.sku,
            categoryId: item.categoryId,
          });
        } else {
          // console.log("init sku: ", initSku);
          setSkuQty(initSku);
        }
      }, 1000);
    }
  };

  // console.log("item detail: ", item);
  // console.log("product status: ", status);

  return (
    <>
      <div className='lg:bg-cat-pink-bar lg:py-2 lg:px-2 lg:mt-3'>
        <div className='flex space-x-3 flew-row underLg:hidden'>
          <ul className='list-disc list-inside'>
            {pricing.promotions.length > 0 &&
              pricing.promotions.map((desc, idx) => {
                // console.log(item.promotions[idx]);
                return (
                  <li key={`promo-desc-${idx}`} className='text-red-text'>
                    {Object.values(desc)[0] as string}
                  </li>
                );
              })}
          </ul>
        </div>
        {pricing.save_amt == "0.00" ? (
          <div className='my-2 mr-2 text-3xl font-semibold lg:font-bold lg:text-4xl text-red-text'>
            ${pricing.rsp}
          </div>
        ) : (
          <div className='flex flex-row lg:flex-col'>
            <div className='flex items-center'>
              <div className='my-2 mr-2 text-2xl font-semibold lg:text-4xl text-red-text'>
                ${pricing.psp}
              </div>
              <div className='pt-1 my-2 mr-2 line-through lg:text-2xl lg:text-[#666666]'>
                ${pricing.rsp}
              </div>
            </div>
            <div className='flex items-center'>
              <div className='px-3 my-3 mr-2 text-sm text-white rounded-full lg:my-1 lg:px-4 lg:text-lg bg-red-text'>
                {/* {calculateDiscount(pricing.psp!, pricing.rsp, "per")}% off */}
                {pricing.percent_off}% off
              </div>
              <div className='hidden lg:block'>
                / 節省了 ${pricing.save_amt}
              </div>
            </div>
          </div>
        )}
        {/* <div className="underLg:hidden">
          <h1 className="">限售5件</h1>
        </div> */}
      </div>

      <ul className='flex space-x-3 list-disc list-inside flew-row lg:hidden'>
        {pricing.promotions.length > 0 &&
          pricing.promotions.map((desc, idx) => {
            // console.log(item.promotions[idx]);
            return (
              <li key={`promo-desc-${idx}`} className='font-bold text-red-text'>
                {Object.values(desc)[0] as string}
              </li>
            );
          })}
      </ul>

      <div className='my-4 space-y-4'>
        <div
          className='flex flex-row items-center '
          style={
            item.source_from_c != ""
              ? { height: "auto", visibility: "visible" }
              : { height: 0, margin: 0, visibility: "hidden" }
          }
        >
          <div className='w-20 min-w-[5rem] font-bold '>產地 :</div>
          <div>{item.source_from_c}</div>
        </div>

        <div
          className='flex flex-row'
          style={
            item.short_description_c != ""
              ? { height: "auto", visibility: "visible" }
              : { height: 0, margin: 0, visibility: "hidden" }
          }
        >
          <div className='w-20 min-w-[5rem] font-bold '>簡要說明 :</div>
          <div dangerouslySetInnerHTML={{ __html: item.short_description_c }} />
        </div>

        {item.options && (
          <>
            <ItemColorSize
              colorCount={item.color_count}
              colors={item.options}
              skuQty={skuQty}
              setSkuQty={setSkuQty}
              setPricing={setPricing}
              setStatus={setStatus}
            />
          </>
        )}

        <div className='flex flex-row items-center '>
          <div className='w-20 min-w-[5rem] font-bold'>數量 :</div>
          <button
            disabled={noSkuInfo}
            onClick={dec}
            className={
              "flex items-center justify-center w-10 text-lg font-bold border rounded cursor-pointer lg:text-2xl transition-all ease-in-out duration-200 " +
              (noSkuInfo ? "bg-grey-i text-grey cursor-default" : "bg-grey-bar")
            }
          >
            -
          </button>
          <div
            className={
              "w-10 mx-3 text-2xl text-center transition-all ease-in-out duration-200 " +
              (noSkuInfo ? "text-grey" : "")
            }
          >
            {skuQty.qty}
          </div>
          <button
            disabled={noSkuInfo}
            onClick={inc}
            className={
              "flex items-center justify-center w-10 text-lg font-bold border rounded cursor-pointer lg:text-2xl transition-all ease-in-out duration-200 " +
              (noSkuInfo ? "bg-grey-i text-grey cursor-default" : "bg-grey-bar")
            }
          >
            +
          </button>
        </div>
      </div>
      {/* <div>
        {AttributeNO && (
          <div className="mb-10 underLg:hidden">
            <div className="flex flex-row my-3">
              <h1 className="w-1/5 text-lg font-bold">包裝 :</h1>
              <h1 className="">籐籃</h1>
            </div>

            <div className="flex flex-row my-3">
              <div className="w-1/5">
                <h1 className="text-lg font-bold">果籃包括 :</h1>
              </div>

              <div className="">
                <h1 className="">韓國溫室網瓜(1個) 火龍果(2個)</h1>
                <h1 className="">新高梨(2個) 紅提子 (500g)</h1>
                <h1 className="">甜橙(大裝)(4個) 奇異果(4個)</h1>
              </div>
            </div>

            <div className="flex flex-row my-3">
              <h1 className="w-1/5 text-lg font-bold">簡要說明 :</h1>
              <h1 className="ml-3">
                此果籃適用於:公司送禮,開張送禮,感谢,中秋節送禮,新年送禮,探病慰問
              </h1>
            </div>
          </div>
        )}
      </div> */}
      {/* <Spinner animation='border' role='status' /> */}

      <div className='relative flex flex-row my-8 space-x-4 lg:my-auto underLg:justify-evenly'>
        <button
          className={
            "relative flex items-center justify-center py-2 text-white rounded-full min-w-fit w-80 lg:w-40 transition-all duration-200  " +
            (noSkuInfo || notAvailable
              ? "bg-yata-deep/40 cursor-default"
              : "bg-yata-deep")
          }
          disabled={btnLoading}
          onClick={async () => {
            if (isAuthenticated) {
              if (status.product == 0 && status.inventory == 1) {
                await toggleSubmit();
              }
            } else {
              dispatch(onLoading());
              localStorage.setItem("redirectUrl", router.asPath);
              instance.loginRedirect(silentRequest);
            }
            // dispatch(openFillAddressModal())
          }}
        >
          {status.product == 0 && (
            <>
              {status.inventory == 1 && (
                <>
                  <div className='relative object-contain w-5 h-5 mr-2'>
                    <Image src='/homepage/navbar/cart.svg' layout='fill' />
                  </div>
                  <span className='underLg:text-sm '>
                    {!btnLoading ? "加入購物車" : "加入中"}
                  </span>
                </>
              )}
              {status.inventory == 0 && <span>已售罄</span>}
            </>
          )}
          {status.product == 1 && <span>已下架</span>}
          {status.product == 2 && <span>即將開售</span>}

          {/* Popup when add to cart succeed */}
          <AddToCartPopup isAddToCart={isAddToCart} />
        </button>
        <button
          className='flex items-center justify-center py-2 border-2 rounded-full w-80 lg:w-48 text-red-text border-red-text'
          onClick={likeChangeHandler}
        >
          <div className='relative w-4 h-4 mr-1 transition-all ease-in-out lg:mr-2'>
            <Image
              src={
                like
                  ? "/homepage/heart-selected.svg"
                  : "/homepage/heart-default.svg"
              }
              layout='fill'
              alt='heart'
            />
          </div>
          <span className='transition-all ease-in-out underLg:text-sm'>
            {like ? "從喜愛清單中移除​" : "加入喜愛清單"}
          </span>
        </button>
      </div>

      <div
        className='fixed inset-0 bg-transparent'
        style={
          isAddToCart
            ? { visibility: "visible", pointerEvents: "initial" }
            : { visibility: "hidden", pointerEvents: "none" }
        }
        onClick={() => setIsAddToCart(null)}
      />

      <WarningModal />
    </>
  );
};
export default ItemDetail;
