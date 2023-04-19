import React from "react";

import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { useRouter } from "next/router";
import {
  IOrderDetail,
  IShoppingCartDetail,
} from "../../../redux/shopping/slice";
import formattedNum from "../../../utils/contents/formattedNum";

type Props = {
  detail: IShoppingCartDetail & IOrderDetail;
};

export default function TotalBill({ detail }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    quote_total,
    order_total,
    discount_total,
    quote_total_with_discount,
    grand_total,
    shipment_fee,
    packaging_fee,
  } = detail;

  console.log('detail',detail)
  return (
    <div className='w-full'>
      <div className='relative bg-white border rounded-md border-grey'>
        <div className='bg-grey-i rounded-tl-md rounded-tr-md'>
          <div className='py-2 ml-3 text-lg font-bold'>總結</div>
        </div>

        <div className='mx-6 mt-4'>
          <div className='text-lg font-bold'>購物車總結</div>
          <div className='flex flex-row justify-between mt-5 ml-3'>
            <div className=''>產品總額</div>
            <div className='text-lg font-semibold text-red-text'>
              HKD$
              {formattedNum(
                parseFloat(quote_total ? quote_total : order_total)
              )}
            </div>
          </div>
          <hr />
          <div className='flex items-center justify-between my-2 ml-3'>
            <div>優惠</div>
            <div>-HKD${formattedNum(parseFloat(discount_total))}</div>
          </div>
          {/* <div className='flex items-center justify-between my-2 ml-3 text-sm'>
            <div className='overflow-hidden text-grey-deep whitespace-nowrap'>
              週年紀念 (額外95折)
            </div>
            <div className='text-grey-deep whitespace-nowrap'>-HKD$0.00</div>
          </div>
          <div className='flex items-center justify-between ml-3 text-sm'>
            <div className='text-grey-deep whitespace-nowrap'>優惠碼</div>
            <div className='text-grey-deep whitespace-nowrap'>-HKD$0.00</div>
          </div> */}
          <hr />
          <div className='flex items-center justify-between my-2 ml-3'>
            <div>運費</div>
            <div className='text-lg font-semibold text-red-text'>
              HKD${formattedNum(shipment_fee)}
            </div>
          </div>
          <hr />
          <div className='flex items-center justify-between my-2 ml-3'>
            <div>包裝費</div>
            <div className='text-lg font-semibold text-red-text'>
              HKD${formattedNum(packaging_fee)}
            </div>
          </div>
        </div>
        <div className='pb-3 mx-3'>
          <div className='border-t-2 border-yata'></div>
          <div className='flex flex-row justify-between mx-3 mt-3'>
            <div className='text-lg font-semibold text-yata'>付款總額</div>
            <div className='text-lg font-semibold text-red-text'>
              HKD${formattedNum(parseFloat(grand_total))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
