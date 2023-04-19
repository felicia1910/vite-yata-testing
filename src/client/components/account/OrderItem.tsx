import Image from "next/image";
import React, { useCallback } from "react";
import { IShoppingCartItem } from "../../redux/shopping/slice";

interface OrderArray {
  [x: string]: any;
  itemNo: any;
  item: string;
  properties?: string;
  src: string;
  actualPrice?: string;
  finalPrice: string;
  quantity: number;
}
interface OrderProps {
  data: IShoppingCartItem[];
  total: string;
}

const OrderItem = ({ data, total }: OrderProps) => {
  const renderPricing = useCallback(
    (item: IShoppingCartItem) => {
      const amtDiff = +item.rsp - +item.psp;
      if (amtDiff != 0) {
        return (
          <>
            <div className='text-lg font-semibold text-red-text'>
              ${item.psp}
            </div>
            <div className='text-xs line-through text-grey-deep sm:text-sm'>
              ${item.rsp}
            </div>
          </>
        );
      } else
        return (
          <div className='text-lg font-semibold text-red-text'>${item.rsp}</div>
        );
    },
    [data]
  );

  return (
    <div className='mb-6 lg:mb-12'>
      <div
        className='relative flex flex-row text-sm font-semibold lg:w-4/5 underLg:hidden '
        // style={{ opacity: shipmentGrp.id == 0 ? 0.7 : 1 }}
      >
        <div className='my-2 lg:w-2/12' />
        <div className='my-2 lg:w-5/12 lg:pl-3'>產品信息</div>
        <div className='my-2 lg:w-2/12 '>價格</div>
        <div className='my-2 lg:w-1/12 '>數量</div>
        <div className='my-2 lg:pl-2 lg:w-2/12 '>小計</div>
      </div>
      <div className='flex w-full'>
        {/* Group products */}
        <div className='w-full lg:w-4/5'>
          {data.map((item, i) => {
            return (
              <div
                key={`order-item-${i}`}
                className='flex flex-col transition-all duration-300 ease-in-out min-w-[22rem] h-36 border m-2 lg:mx-0 '
                // style={{ opacity: shipmentGrp.id == 0 ? 0.7 : 1 }}
              >
                <div className='relative flex flex-row items-center w-full h-full transition-all duration-300 ease-in-out '>
                  <>
                    <div className='flex items-center pl-2 lg:w-2/12'>
                      <button
                        className='relative object-contain w-[6.4rem] lg:w-full lg:max-w-[7rem] border aspect-square '
                        // onClick={() => router.push(`/product/${item.plu}`)}
                      >
                        {item.images[0] && item.images[0].images_url && (
                          <Image
                            src={item.images[0]?.images_url ?? ""}
                            layout='fill'
                          />
                        )}
                      </button>
                    </div>

                    <div className='h-full px-1 py-2 ml-2 lg:m-0 lg:w-5/12'>
                      <div className='flex flex-col justify-between h-full lg:ml-2'>
                        <div>
                          <div
                            className='line-clamp-2 max-w-[12rem] text-base pr-1 font-semibold sm:max-w-[18rem] transition-all duration-150 leading-5 cursor-pointer hover:underline hover:underline-offset-2 '
                            // onClick={() => router.push(`/product/${item.plu}`)}
                          >
                            {item.full_name_c}
                          </div>
                          {(item.size_code != "" || item.color_code != "") && (
                            <div className='text-base'>
                              {item.color_c} / {item.size_code}
                            </div>
                          )}
                          <div className='text-sm font-light '>{item.plu}</div>

                          {/* Price in mobile view */}
                          <div className='flex flex-row items-center bottom-2 lg:hidden'>
                            {renderPricing(item)}
                          </div>
                        </div>
                        {item.promotions.map((promo, idx) => {
                          if (promo.promotion_c_description != "") {
                            return (
                              <div
                                key={"cart-item-promo-" + idx}
                                className='text-sm underLg:max-w-[7rem] font-semibold truncate max text-red-text'
                              >
                                {promo.promotion_c_description}
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>

                    {/* Price in laptop view */}
                    <div className={`hidden lg:w-2/12 my-auto lg:block`}>
                      {renderPricing(item)}
                    </div>

                    {/* Item quantity */}
                    <div className='flex flex-col items-end my-auto lg:items-start underLg:overflow-hidden lg:w-1/12 underLg:absolute underLg:right-1 underLg:bottom-0 '>
                      <div className='relative inline-block mb-1 transition-all ease-in-out'>
                        <div className='flex w-12 transition-all duration-200 ease-in-out rounded lg:w-8 '>
                          <div className='w-8 px-2 py-1 text-right '>
                            <div className='font-mono text-lg text-right'>
                              {parseInt(item.qty as any)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='flex items-center justify-end px-1 space-x-1 lg:hidden'>
                        <span className='text-sm lg:hidden '>小計</span>
                        <span className='text-xl font-bold text-red-text '>
                          $
                          {parseFloat(item.discount_amount) != 0
                            ? item.row_total_with_discount
                            : item.row_total}
                        </span>
                      </div>
                    </div>

                    {/* Row total */}
                    <div className='hidden lg:pl-2 lg:w-2/12 lg:my-auto lg:block '>
                      <div className='text-lg font-semibold text-red-text'>
                        $
                        {parseFloat(item.discount_amount) != 0
                          ? item.row_total_with_discount
                          : item.row_total}
                      </div>
                    </div>
                  </>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total */}
        <div className='hidden h-auto p-5 px-3 my-2 border lg:w-1/5 lg:block'>
          <div>產品總額:</div>
          <div className='mt-2 font-semibold text-red-text'>${total}</div>
        </div>
      </div>
      <div className='box-content flex items-center justify-between h-auto px-3 py-4 m-1 border lg:w-1/5 lg:hidden'>
        <div>
          <div>產品總額:</div>
          <div className='font-semibold text-red-text'>${total}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
