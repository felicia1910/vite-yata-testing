import React from "react";
import ChevronRightSvg from "../../public/common/arrow/chevron-right";
import { selectWindowSize } from "../../redux/control/slice";
import { useAppSelector } from "../../redux/store";
import { Link, useNavigate, Route, Routes, useRoutes } from 'react-router-dom';

type Props = {
  head: string;
  title: string;
  path: string;
};
const HeadTitle = ({ title, path, head }: Props) => {
  const router = useNavigate();
  const windowSize = useAppSelector(selectWindowSize);

  return (
    <div className='flex items-center px-5 space-x-1 lg:px-0 lg:mt-5 lg:min-w-fit lg:whitespace-nowrap'>
      <div className='flex items-center'>
        <div className='w-5 h-5 mr-2 rounded-md bg-yata' />
        <span
          className='font-bold min-w-fit cursor-pointer'
          onClick={() => (router(path))}
        >
          {head}
        </span>
      </div>
      <ChevronRightSvg width={15} height={15} fill={"#A6CE39"} />
      <span className='ml-2 font-bold text-yata min-w-fit'>{title}</span>
    </div>
  );
};

export default HeadTitle;
