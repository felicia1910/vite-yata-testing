import React from "react";
import {
  closeWarningModal,
  selectIsCommonModalOpen,
} from "../../redux/control/slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import AnimatedModalOverlay from "./AnimatedModalOverlay";
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { selectImgUrl } from "../../redux/config/index";
import { selectIsWarningModalOpen } from "../../redux/control/slice";

const WarningModal = () => {
  const dispatch = useAppDispatch();
  const warningModal = useAppSelector(selectIsWarningModalOpen);
  const windowType = useAppSelector((state) => state.control.windowSize);
  const router = useNavigate();
  const location=useLocation();
  const imgUrl = useAppSelector(selectImgUrl);

  const height = 400;

  return (
    <AnimatedModalOverlay
      showModal={warningModal!.type != "close"}
      height={height}
      width={windowType == "mobile" ? "96%" : undefined}
    >
      <div className='relative flex flex-col items-center justify-center h-full'>
        <div className='relative object-contain w-32 h-32'>
          <img src={imgUrl+`/common/icon-warning.svg`} />
        </div>
        <div className='flex flex-col items-center justify-center py-10 text-lg font-bold h-36 underXs:text-sm'>
          {warningModal!.type == "address" && (
            <>
              <span>系統最多可保存20個送貨地址​</span>
              <span>請先刪除其他紀錄，然後再新增地址​</span>
            </>
          )}
          {warningModal!.type == "payment" && (
            <>
              <p className='px-4 text-center whitespace-pre-line lg:px-12'>
                {warningModal!.text}
              </p>
            </>
          )}
          {warningModal!.type == "product" && (
            <>
              <p className='px-4 text-center whitespace-pre-line lg:px-12'>
                {warningModal!.text}
              </p>
            </>
          )}
        </div>
        <div className='flex items-center justify-center w-full mb-5'>
          <button
            onClick={() => {
              dispatch(closeWarningModal());
              if (warningModal?.back) {
                router(-1);
              }
            }}
            className='flex items-center justify-center w-full h-12 max-w-sm px-4 py-2 mx-6 mb-2 text-left text-white border rounded-lg hover:border-2 hover:border-yata bg-yata-deep'
          >
            <div className='font-medium'>關閉</div>
          </button>
        </div>
      </div>
    </AnimatedModalOverlay>
  );
};

export default WarningModal;
