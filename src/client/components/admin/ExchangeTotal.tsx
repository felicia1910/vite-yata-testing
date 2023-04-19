import React from "react";
import {
  EConfirmType,
  openConfirmModal,
  selectIsExchangeConfirmed,
} from "../../redux/admin/slice";
import { useAppDispatch, useAppSelector } from "./../../redux/store";

const ExchangeTotal = () => {
  const dispatch = useAppDispatch();
  const exchangeConfirmed = useAppSelector(selectIsExchangeConfirmed);
  return (
    <div className="flex flex-col w-full gap-3">
      <div>換貨金額：$49.9</div>
      <div>差價：$300.1</div>
      {!exchangeConfirmed && (
        <>
          <div className="flex justify-start items-center mt-4">
            <div>取貨店舖：</div>
            <div className="lg:w-[70%]">
              <select className="select0 border border-[#EEEEEE] text-base w-full p-1.5 rounded-md mt-1 focus:outline-none cursor-pointer transition-all ease-in-out">
                <option>請選擇取貨店舖</option>
              </select>
            </div>
          </div>
          <div className="flex justify-start items-center">
            <div>取貨日期：</div>
            <div className="lg:w-[70%]">
              <select className="select0 border border-[#EEEEEE] text-base w-full p-1.5 rounded-md mt-1 focus:outline-none cursor-pointer transition-all ease-in-out">
                <option>請選擇取貨日期</option>
              </select>
            </div>
          </div>
          <div className="flex justify-start w-full items-center pt-4">
            <button
              onClick={() => {
                dispatch(
                  openConfirmModal({
                    type: EConfirmType.warningPrice,
                    text: "無法操作: 換貨金額超出退貨金額",
                  })
                );
              }}
              className="flex justify-center lg:w-[90%] items-center bg-yata-deep text-white font-bold border rounded-lg p-3"
            >
              確認
            </button>
          </div>
        </>
      )}

      {exchangeConfirmed && (
        <>
          <div className="flex justify-start items-center mt-5">
            <div>取貨店舖：</div>
            <div className="lg:w-[70%]">沙田店</div>
          </div>
          <div className="flex justify-start items-center">
            <div>取貨日期：</div>
            <div className="lg:w-[70%]">12/9/2020</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExchangeTotal;
