import React, { Dispatch, SetStateAction, useEffect } from "react";
import TickSvg from "../../../public/common/tick";
import ChevronRightSvg from "../../../public/common/arrow/chevron-right";
import { Link, useNavigate,useLocation } from 'react-router-dom';

type Props = {
  isAddToCart: { success: boolean; err: string } | null;
  setIsAddToCart?: Dispatch<
    SetStateAction<{ success: boolean; err: string } | null>
  >;
};

const AddToCartPopup = ({ isAddToCart, setIsAddToCart }: Props) => {
  useEffect(() => {
    if (isAddToCart && setIsAddToCart) {
      setTimeout(() => {
        setIsAddToCart(null);
      }, 4000);
    }
  }, [isAddToCart]);
  return (
    <div
      className='absolute flex z-20 flex-col items-center -top-[4.5rem] transition-all ease-in-out duration-300 w-[20rem]'
      style={
        isAddToCart != null
          ? { opacity: 1, visibility: "visible", pointerEvents: "initial" }
          : { opacity: 0, visibility: "hidden", pointerEvents: "none" }
      }
      onClick={(e) => e.stopPropagation()}
    >
      <div className='flex items-center w-auto p-2 bg-white border border-yata-deep'>
        {isAddToCart && (
          <>
            {isAddToCart.success && (
              <div className='p-[0.4rem] mr-2 rounded-full w-8 h-8 flex items-center justify-center bg-yata-deep'>
                <TickSvg fill='#FFF' />
              </div>
            )}

            <div className='z-30 flex flex-col items-start'>
              {isAddToCart.success && (
                <>
                  <span className='text-xs text-black'>成功加到購物車</span>
                  <Link to='/shopping-cart'>
                    <div className='flex items-center text-sm border-b text-yata-deep border-yata-deep'>
                      <span className='mr-1'>前往付款</span>
                      <div className='w-[0.6rem] h-[0.6rem] flex items-center mr-1'>
                        <ChevronRightSvg fill='#82A90E' />
                      </div>
                    </div>
                  </Link>
                </>
              )}
              {isAddToCart.success == false && (
                <button className='text-sm text-black whitespace-pre-wrap max-w-[8rem] p-[0.4rem] h-8 '>
                  {isAddToCart.err}
                </button>
              )}
            </div>
          </>
        )}
      </div>
      <div
        className={`
        absolute z-20 -bottom-[0.55rem] w-5 h-5 rotate-[225deg] bg-white
        border-t border-yata-deep border-r border-r-transparent border-b border-b-transparent 
        border-l transition-color ease-in-out duration-300
      `}
      />
    </div>
  );
};

export default AddToCartPopup;
