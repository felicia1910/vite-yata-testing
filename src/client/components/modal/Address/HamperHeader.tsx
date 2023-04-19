import Image from "next/image";
import React from "react";
import { selectWindowSize } from "../../../redux/control/slice";
import { useAppSelector } from "../../../redux/store";
import formattedNum from "../../../utils/contents/formattedNum";

type Props = {
  count: number;
};

const HamperHeader = ({ count }: Props) => {
  const windowType = useAppSelector(selectWindowSize);
  const hamperDesc = useAppSelector(
    (state) => state.shopping.hamperDescription
  );
  const onLaptop = windowType === "laptop";
  const onMobile = windowType === "mobile";

  return (
    <>
      {hamperDesc && (
        <div className='flex items-center justify-between w-full p-2 '>
          <div className='flex items-start justify-center space-x-2'>
            <div className='w-12 h-12 overflow-hidden border rounded-full '>
              {hamperDesc.images.length > 0 && (
                <Image
                  src={hamperDesc.images[0].images_url}
                  width={60}
                  height={60}
                />
              )}
            </div>
            <div className='flex flex-col text-sm lg:text-base lg:space-y-1'>
              <span className='font-bold'>{hamperDesc.full_name_c}</span>
              <span className='text-xs'>{hamperDesc.plu}</span>
              <span className='text-[#E94D78] lg:hidden font-bold text-base mt-1'>
                {"$"}
                {formattedNum(parseInt(hamperDesc.amount) * count)}
              </span>
            </div>
          </div>

          <div className='items-center lg:flex lg:space-x-6 justify-evenly '>
            <div className='flex-col hidden space-y-1 text-sm lg:text-base lg:flex '>
              <span>價格</span>
              <span className='text-[#E94D78] font-bold '>
                {"$"}
                {formattedNum(parseInt(hamperDesc.amount) * count)}
              </span>
            </div>
            <div className='flex flex-col items-end justify-between pr-2 space-y-4 text-sm lg:text-base lg:items-start lg:space-y-1 lg:pr-0 '>
              <span className='underLg:text-base'>數量</span>
              <span className='text-[#482809] underLg:text-base font-bold '>
                {count}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HamperHeader;
