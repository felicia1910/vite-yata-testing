import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  onCartCheckOut,
  onLoading,
  selectWindowSize,
} from "../../redux/control/slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import AnimatedModalOverlay from "./AnimatedModalOverlay";
import {
  IShoppingCartGroup,
  IShoppingCartItem,
} from "../../redux/shopping/slice";
import { selectShippingMode } from "../../redux/delivery/slice";
import { removeUnshippingItemThunk } from "../../redux/shopping/thunk";
import ButtonLoading from "../common/ButtonLoading";

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  unshippingItems: IShoppingCartGroup | undefined;
  quoteId: string | undefined;
};

const UnshippingItemModal = ({
  showModal,
  setShowModal,
  unshippingItems,
  quoteId,
}: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const windowSize = useAppSelector(selectWindowSize);
  const shippingMode = useAppSelector(selectShippingMode);

  const [isProcessing, setIsProcessing] = useState(false);

  const genItemStr = (item: IShoppingCartItem) => {
    const { size_code, color_code, full_name_c } = item;
    if (size_code != "" && color_code == "") {
      return `${full_name_c} (${size_code})`;
    } else if (color_code != "" && size_code == "") {
      return `${full_name_c} (${color_code})`;
    } else if (color_code != "" && size_code != "") {
      return `${full_name_c} (${color_code} / ${size_code})`;
    } else {
      return full_name_c;
    }
  };

  const handleToConfirmationPage = async () => {
    if (!quoteId) return;
    setIsProcessing(true);
    dispatch(onLoading());
    const result = await dispatch(removeUnshippingItemThunk(quoteId));
    console.log(result);
    if (result.payload) {
      console.log(result.payload);
      setTimeout(() => {
        router.push("/shopping-cart/confirmation");
        dispatch(onCartCheckOut(true));
      }, 300);
    }
  };

  return (
    <AnimatedModalOverlay
      showModal={showModal}
      height={"auto"}
      width={windowSize == "mobile" ? "96%" : 600}
    >
      <div className='relative h-full min-h-[28rem] '>
        <div className='flex items-center p-2 justify-center w-full bg-white border-b-[0.5px] h-16 border-yata-brown/[.4]'>
          <div className='text-lg font-semibold lg:text-xl'>
            溫馨提示：以下產品不適用於{shippingMode == "HD" && "送貨上門"}
            {shippingMode == "PU" && "店舖自取"}模式
          </div>
        </div>

        <div
          style={{ height: "auto" }}
          className='flex flex-col items-center w-full px-8 '
        >
          <div className='flex w-full my-4 min-h-[12rem] '>
            <ul className='mb-2 leading-loose text-justify list-disc list-inside'>
              {unshippingItems &&
                unshippingItems.item_lines.map((item) => (
                  <li key={item.quote_item_id}>{genItemStr(item)}</li>
                ))}
            </ul>
          </div>

          <div className='mt-2 mb-4 text-yata-deep '>
            *如欲購買以上產品，請選擇「返回購物車」並更改取貨方式；
            如欲放棄購買上述產品，請選擇「繼續結帳」，相應產品將會從您的購物車中刪去。
          </div>

          <div className='flex items-center justify-center w-full mb-5 space-x-4 '>
            <button
              disabled={isProcessing}
              onClick={() => {
                setShowModal(false);
              }}
              className={
                "flex items-center justify-center w-full h-12 max-w-sm px-4 py-2 mb-2 text-left  border rounded-lg transition-all ease-in-out duration-300 " +
                (isProcessing
                  ? "bg-[#EEEEEE] text-grey-i"
                  : "bg-[#ACACAC] text-white")
              }
            >
              <div className='font-medium'>返回購物車</div>
            </button>
            <button
              disabled={isProcessing}
              onClick={() => {
                handleToConfirmationPage();
              }}
              className='flex items-center justify-center w-full h-12 max-w-sm px-4 py-2 mb-2 text-left text-white border rounded-lg bg-yata-deep'
            >
              <div className='font-medium'>
                {isProcessing ? <ButtonLoading /> : "繼續結帳"}
              </div>
            </button>
          </div>
        </div>
      </div>
    </AnimatedModalOverlay>
  );
};

export default UnshippingItemModal;
