import React, { useEffect } from "react";
import Sidebar from "../../../components/faq/Sidebar";
import { selectWindowSize } from "../../../redux/control/slice";
import { useAppSelector } from "../../../redux/store";
import {tcIntro} from '../../../routers/index';
import useWindowSize from "../../../hook/useWindowSize";
import FullLoading from "../../../components/common/FullLoading";
import { Link, useNavigate, Route, Routes, useRoutes } from 'react-router-dom';

export default function Tnc() {
  const windowType = useAppSelector(selectWindowSize);
  const router = useNavigate();
  const onLaptop = windowType === "laptop";
  const onMobile = windowType === "mobile";
  const size = useWindowSize();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (size.width >= 1024) {
        router(`/about/tnc/purchase`);
      }
    }
  }, [size]);

  return (
    <>
      {onMobile && (
        <>
          <div className='flex items-center px-5 rangeMd:pt-4 rangeSm:pt-4 rangeXs:pt-4'>
            <div className='w-5 h-5 mr-2 rounded-md bg-yata' />
            <div className='text-lg font-bold'>{tcIntro.title}</div>
          </div>
          <Sidebar data={tcIntro.list} />

        </>
      )}
      
      {onLaptop && (
        <div className='h-screen'>
          <FullLoading />
        </div>
      )}
    </>
  );
}

Tnc.title = "條款及細則 | YATA eShop​";
