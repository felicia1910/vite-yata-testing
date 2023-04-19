import React from "react";
import { QueryProps } from "../../utils/types";
import { useAppDispatch } from "../../redux/store";
import { onLoading } from "../../redux/control/slice";
import { Link, useNavigate, Route, Routes, useRoutes } from 'react-router-dom';

type Props = {
  btnName: string;
  path?: string;
  goBack?: boolean;
  clickFunction?: void | void[];
};

const ReturnButton = ({
  btnName,
  path = "/account",
  goBack,
  clickFunction,
}: Props) => {
  const router = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div className='flex items-center justify-center mb-4'>
      <button
        className='flex items-center justify-center w-full h-12 py-2 mx-6 text-left text-white border lg:max-w-[16rem] transition-all ease-in-out duration-150 hover:bg-yata rounded-lg hover:border-2 hover:border-yata bg-yata-deep'
        onClick={() => {
          dispatch(onLoading());
          !goBack ? router(path) : router(-1);
          clickFunction;
        }}
      >
        <div className='font-medium'>{btnName}</div>
      </button>
    </div>
  );
};

export default ReturnButton;
