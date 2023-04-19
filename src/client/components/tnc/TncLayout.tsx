import React from "react";
import { selectWindowSize } from "../../redux/control/slice";
import { useAppSelector } from "../../redux/store";
import Sidebar from "../faq/Sidebar";
import ReturnButton from "../common/ReturnButton";
import {tcIntro} from "../../routers/index";
import HeadTitle from "../common/HeadTitle";

interface LayoutProps {
  children: React.ReactNode;
  isRequired: boolean;
  title: string;
}

const TncLayout = ({ children, isRequired, title }: LayoutProps) => {
  const windowType = useAppSelector(selectWindowSize);

  const onMobile = windowType === "mobile";
  const onLaptop = windowType === "laptop";

  return (
    <div className='flex flex-col justify-center mb-8 text-lg lg:items-center lg:w-full'>
      <div className='items-start justify-center mb-8 lg:flex lg:w-full'>
        {onLaptop && (
          <div className='flex flex-col w-3/12 px-8 mt-2'>
            <HeadTitle title={title} path={"/about/tnc"} head={"條款及細則"} />
            <Sidebar data={tcIntro.list} />
          </div>
        )}

        {onMobile && (
          <HeadTitle title={title} path={"/about/tnc"} head={"條款及細則"} />
        )}
        <div className='lg:w-7/12 bg-[#FCFCFA] pt-2 pb-8 mt-4 lg:mt-16 mx-2 rounded-lg lg:m-0 lg:px-2'>
          <div className='w-full p-2 mt-2 ml-2 text-lg font-bold'>{title}</div>
          {children}
        </div>
      </div>
      {isRequired && onMobile && (
        <ReturnButton btnName='返回' path='/about/tnc' />
      )}
    </div>
  );
};

export default TncLayout;
