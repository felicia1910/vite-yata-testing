import React, { Dispatch, SetStateAction, useState } from "react";
import { IProductColorSize } from "../../../redux/shopping/slice";
import { ICartItemQty, IProductSize } from "../../../redux/shopping/slice";

type IProductPricing = {
  save_amt: string;
  percent_off: string;
  rsp: string;
  psp: string;
  promotions: {}[];
};

type Props = {
  colorCount: number;
  colors: IProductColorSize;
  skuQty: ICartItemQty;
  setSkuQty: Dispatch<SetStateAction<ICartItemQty>>;
  setPricing: Dispatch<SetStateAction<IProductPricing>>;
  setStatus: Dispatch<SetStateAction<{ product: number; inventory: number }>>;
};

export default function ItemColorSize({
  colorCount,
  colors,
  skuQty,
  setSkuQty,
  setPricing,
  setStatus,
}: Props) {
  const colorList = colorCount > 0 && colors.colors;
  const sizeList = colorCount == 0 && colors.size;
  const [activeSizeList, setActiveSizeList] = useState<IProductSize[] | null>(
    null
  );

  // console.log("sku qty", skuQty);
  // console.log("active size list: ", activeSizeList);

  const toggleSizeList = (colorCode: string) => {
    // console.log("color code in function: ", colorCode);
    if (colorList) {
      const lowerSizeList = colorList.filter(
        (color) => color.color_code == colorCode
      )[0];
      if (
        lowerSizeList &&
        lowerSizeList.size &&
        lowerSizeList.size.length > 0
      ) {
        if (typeof parseInt(lowerSizeList.size![0].size_code) == "number") {
          setActiveSizeList(
            lowerSizeList.size
              .slice()
              .sort((a, b) => parseInt(a.size_code) - parseInt(b.size_code))
          );
        } else {
          setActiveSizeList(lowerSizeList.size!);
        }
      }
    }
  };

  const toggleAddSku = (content: any) => {
    // console.log("content in sku", content);
    if (
      (content as IProductColorSize) &&
      content.size &&
      content.size.length > 0
    ) {
      toggleSizeList(content.color_code);
    } else if (content.plu && content.sku) {
      console.log("content", content.product_status, content.inventory_status);
      setPricing({
        save_amt: content.save_amt,
        percent_off: content.percent_off,
        rsp: content.rsp,
        psp: content.psp,
        promotions: content.promotions,
      });
      setSkuQty({
        ...skuQty,
        plu: content.plu,
        sku: content.sku,
      });
      setStatus({
        product: content.product_status,
        inventory: content.inventory_status,
      });
    }
  };

  return (
    <>
      {colorList && (
        <div className='flex flex-row items-center'>
          {/* Items */}
          <div className='w-20 min-w-[5rem] font-bold '>顏色 :</div>
          <div className='flex flex-wrap items-center mr-2 '>
            {colorList.map((color, idx) => (
              <label
                key={"product-color-" + idx}
                className='mb-1 mr-1 cursor-pointer'
              >
                <input
                  type='radio'
                  name='options'
                  value={
                    color.size && color.size.length > 0
                      ? color.color_code
                      : color.sku
                  }
                  onChange={() => {
                    toggleAddSku(color);
                  }}
                  className='hidden peer'
                />
                <div className='inline-block px-4 py-1 transition-all ease-in-out bg-white border rounded-lg lg:border-2 border-yata-brown peer-checked:border-red-text'>
                  {color.color_description_c}
                </div>
              </label>
            ))}
            <div
              className={
                "text-sm font-medium text-red-text transition-all ml-1 ease-in-out duration-300 " +
                (activeSizeList == null && skuQty.sku == ""
                  ? "opacity-100 visible "
                  : "opacity-0 invisible")
              }
            >
              請選擇顏色
            </div>
          </div>
        </div>
      )}

      {sizeList && (
        <div className='flex flex-row'>
          {/* Items */}
          <div className='w-20 min-w-[5rem] font-bold '>尺碼 :</div>
          <div className='flex flex-wrap items-center mr-2 '>
            {sizeList.map((size, idx) => (
              <label
                key={"product-size-" + idx}
                className='mb-1 mr-1 cursor-pointer'
              >
                <input
                  type='radio'
                  name='options'
                  value={size.sku}
                  onChange={() => {
                    toggleAddSku(size);
                  }}
                  className='hidden peer'
                />
                <div className='inline-block px-4 py-1 transition-all ease-in-out bg-white border rounded-lg lg:border-2 border-yata-brown peer-checked:border-red-text'>
                  {size.size_code}
                </div>
              </label>
            ))}
            <div
              className={
                "text-sm font-medium text-red-text transition-all ml-1 ease-in-out duration-300 " +
                (skuQty.sku == ""
                  ? "opacity-100 visible "
                  : "opacity-0 invisible")
              }
            >
              請選擇尺碼
            </div>
          </div>
        </div>
      )}

      <div
        className='flex flex-row items-center transition-all duration-300 ease-in-out'
        style={
          activeSizeList && activeSizeList.length > 0
            ? {
                minHeight: 36,
                visibility: "visible",
                margin: "1rem 0 0 0",
                height: "auto",
              }
            : { minHeight: 0, visibility: "hidden", margin: 0, height: 0 }
        }
      >
        <>
          <div className='w-20 min-w-[5rem] font-bold'>尺碼 :</div>
          <div className='flex flex-wrap items-center mr-2 '>
            {activeSizeList &&
              activeSizeList.map((size, idx) => {
                // console.log('halo', size);
                return (
                  <label
                    key={"product-size-" + idx}
                    className='mb-1 mr-1 cursor-pointer'
                  >
                    <input
                      type='radio'
                      name='options1'
                      value={size.sku}
                      className='hidden peer'
                      onChange={() => {
                        toggleAddSku(size);
                      }}
                    />
                    <div className='inline-block px-3 py-1 bg-white border rounded-lg lg:border-2 border-yata-brown peer-checked:border-red-text'>
                      {size.size_code}
                    </div>
                  </label>
                );
              })}

            <div
              className={
                "text-sm font-medium text-red-text transition-all ml-1 ease-in-out duration-300 " +
                (activeSizeList && skuQty.sku == ""
                  ? "opacity-100 visible "
                  : "opacity-0 invisible")
              }
            >
              請選擇尺碼
            </div>
          </div>
        </>
      </div>
    </>
  );
}
