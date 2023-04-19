import React from "react";
import {
  closeLackAmountModal,
  selectIsLackAmountModalOpen,
} from "../../redux/control/slice";
import { useAppSelector } from "../../redux/store";
import AnimatedModalOverlay from "./AnimatedModalOverlay";
import { useAppDispatch } from "./../../redux/store";

const LackAmountModal = () => {
  const lackAmountModal = useAppSelector(selectIsLackAmountModalOpen);
  const dispatch = useAppDispatch();
  return (
    <>
      <AnimatedModalOverlay
        showModal={lackAmountModal!}
        height={470}
        width={560}
      >
        <div className="flex flex-col items-center justify-center w-full p-2">
          <div className="pt-3 mb-5 text-xl font-bold lg:text-3xl text-yata-deep">
            溫馨提示
          </div>
          <div
            className="border border-dashed border-[#E5E5E5] mx-2 lg:px-6 py-5 px-4 rounded-lg text-[#6A3B0D] text-lg 
          lg:text-xl lg:leading-9 mb-5"
          >
            一田直送部分未達免運費要求，請選擇：{" "}
          </div>
          <div className="flex flex-col w-full space-y-4 mb-5 px-4 lg:px-8 text-[#FFFFFF]">
            <button className="border rounded-lg p-4 border-[#E5E5E5] lg:text-lg font-normal bg-[#82A90E]">
              確認結賬全部貨品
            </button>
            <button className="border flex flex-col items-center lg:block rounded-lg p-4 border-[#E5E5E5] lg:text-lg font-normal bg-[#B49D86]">
              <span>先結賬免運費貨品，</span>
              <span>其餘貨品保留在購物車</span>
            </button>
            <button
              onClick={() => {
                dispatch(closeLackAmountModal());
              }}
              className="border rounded-lg p-4 border-[#E5E5E5] lg:text-lg font-normal bg-[#FFFFFF] text-[#999999]"
            >
              返回購物車
            </button>
          </div>
        </div>
      </AnimatedModalOverlay>
    </>
  );
};

export default LackAmountModal;
