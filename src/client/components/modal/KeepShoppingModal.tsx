import React from "react";
import { useAppSelector } from "../../redux/store";
import AnimatedModalOverlay from "./AnimatedModalOverlay";
import {
  closeShoppingModal,
  selectIsKeepShoppingModalOpen,
} from "./../../redux/control/slice";
import { useAppDispatch } from "./../../redux/store";
import { useRouter } from 'next/router';

const KeepShoppingModal = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const keepShoppingModal = useAppSelector(selectIsKeepShoppingModalOpen);

  return (
    <>
      <AnimatedModalOverlay
        showModal={keepShoppingModal!}
        height={470}
        width={560}
      >
        <div className="flex flex-col items-center justify-center w-full p-2 lg:p-4">
          <div className="pt-3 mb-5 text-xl font-bold lg:text-3xl text-yata-deep">
            感謝您的訂單
          </div>
          <div
            className="border border-dashed flex justify-center items-center flex-col w-full space-y-5 border-[#E5E5E5] mx-2 lg:px-6 py-5 px-3 rounded-lg text-[#6A3B0D] text-center text-lg lg:text-xl lg:leading-7 mb-5"
          >
            <div className="text-yata-brown">
              餘下貨品可在購物車改爲免費店鋪自取。
            </div>
            <div className="text-yata-deep">
              {" "}
              注意：庫存會因應所選店鋪改變。
            </div>
          </div>
          <div className="flex flex-col w-full space-y-4 mb-5 px-4 lg:px-8 text-[#FFFFFF]">
            <button
              onClick={() => {
                dispatch(closeShoppingModal());
                router.push('/shopping-cart')
              }}
              className="border rounded-lg p-4 border-[#E5E5E5] text-xl  font-normal bg-[#82A90E]"
            >
              返回購物車
            </button>
            <button
              onClick={() => {
                dispatch(closeShoppingModal());
                router.push('/')
              }}
              className="border rounded-lg p-4 border-[#E5E5E5] text-xl  font-normal bg-[#B49D86]"
            >
              回主頁繼續瀏覽
            </button>
          </div>
        </div>
      </AnimatedModalOverlay>
    </>
  );
};

export default KeepShoppingModal;
