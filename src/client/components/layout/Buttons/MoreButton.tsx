import React, { useState } from "react";
import { WindowScreen } from "../../../utils/types";
import OtherButtons from "./OtherButtons";
import { useAppSelector } from "../../../redux/store";
import { selectIsLoading } from "../../../redux/control/slice";
import { selectImgUrl } from "../../../redux/config/index";

const MoreButton = () => {
  const [moreModal, setMoreModal] = useState<boolean>(false);
  const isLoading = useAppSelector(selectIsLoading);
  const imgUrl = useAppSelector(selectImgUrl);

  return (
    <>
      {moreModal && (
        <button
          disabled={isLoading}
          onClick={() => {
            setMoreModal(false);
          }}
          className='fixed inset-0 w-full h-full'
        />
      )}
      <div className='relative w-10 mx-1 lg:hidden'>
        <button
          className='flex flex-col items-center justify-center w-full h-full p-1'
          onClick={() => setMoreModal(!moreModal)}
        >
          <div className='relative w-8 h-8 lg:w-4 lg:h-4'>
            <img src={imgUrl+'/mobile/more.svg'} className="object-contain" />
          </div>
          <p className='text-sm text-white cursor-pointer'>更多</p>
        </button>

        <div
          className={`absolute right-0 w-32 bg-white border-[1px] rounded-md p-2 top-16 border-yata-brown transition-all ease-in-out duration-300 
            ${
              moreModal
                ? "opacity-100 visible"
                : " invisible opacity-0 pointer-events-none -z-10"
            }`}
        >
          <OtherButtons window={WindowScreen.mobile} />
        </div>
      </div>
    </>
  );
};

export default MoreButton;
