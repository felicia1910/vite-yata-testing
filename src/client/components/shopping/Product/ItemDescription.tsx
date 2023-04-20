import React from "react";
import { IProductDetail } from "../../../redux/shopping/slice";

type Props = {
  item: IProductDetail;
};

export default function ItemDescription({ item }: Props) {
  return (
    <>
      <div>
        {/* Product remark, refund and delivery */}
        <div className='mb-4 lg:flex lg:flex-row lg:justify-between lg:space-x-4 lg:px-2'>
          <div className='flex flex-row my-4 lg:w-4/12'>
            <div className='w-20 text-base font-bold lg:w-1/4 min-w-[5rem] lg:min-w-fit'>
              特別說明：
            </div>
            {item.special_remarks_c != "" && (
              <li className='text-base list-none lg:list-disc'>
                {item.special_remarks_c}
              </li>
            )}
          </div>

          <div className='flex flex-row my-4 lg:w-5/12'>
            <div className='w-20 text-base font-bold lg:w-[4.5rem] min-w-[5rem] lg:min-w-fit'>
              送貨：
            </div>
            <div className='flex flex-col text-base list-none lg:list-disc'>
              <li>{item.delivery_tag_description_c}</li>
              <li>{item.shipping_mode_description_c}</li>
              <li>{item.other_shipping_rules_description_c}</li>
            </div>
          </div>

          <div className='flex flex-row my-4 lg:w-3/12'>
            <div className='w-20 text-base font-bold lg:w-[4.5rem] min-w-[5rem] lg:min-w-fit'>
              退換：
            </div>
            <div className='text-base list-none lg:list-disc'>
              <li>{item.return_policy_description_c}</li>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='bg-grey'>
          <div className='flex flex-row'>
            <div>
              <div className='px-6 py-3 text-white bg-yata-deep underLg:mx-4'>
                產品介紹
              </div>
            </div>
            {/*  <div>
              <button className="px-6 py-3 bg-grey-in">送貨詳情</button>
            </div>*/}
          </div>
        </div>
        <div
          className='p-3 bg-grey-light underLg:text-sm'
          dangerouslySetInnerHTML={{ __html: item.full_description_c }}
        />
      </div>
    </>
  );
}
