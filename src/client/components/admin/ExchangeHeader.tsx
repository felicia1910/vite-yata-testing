import React from "react";

const ExchangeHeader = () => {
  return (
    <div className="flex flex-col bg-[#E8E8E8] rounded p-4 w-full">
      <span className="w-full font-bold text-lg ">換貨：</span>
      <div className="lg:flex justify-start items-center gap-4 w-full mt-7 mb-4">
        <div className="flex items-center justify-start w-full lg:w-[40%]">
          <span className="lg:w-[10%]">SKU: </span>
          <input
            type="text"
            className="bg-white rounded shadow ml-4 p-3 w-full text-base"
            placeholder="請輸入SKU"
          />
        </div>
        <div className="flex items-center justify-start w-full lg:w-[40%] lg:ml-4">
          <span className="lg:w-[26%]">數量：</span>
          <input
            type="text"
            className="bg-white rounded shadow p-3 w-full text-base"
            placeholder="請輸入數量"
          />
        </div>
        <div className="lg:w-[20%] flex justify-center items-center">
          <button className="bg-yata-deep text-white font-bold w-[60%] p-2.5 rounded">
            確認
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExchangeHeader;
