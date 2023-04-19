import React from "react";
import { useAppSelector } from "../../redux/store";
import { selectWindowSize } from "../../redux/control/slice";
import Sidebar from "./Sidebar";
import ReturnButton from "../common/ReturnButton";
import Image from "next/image";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
  isRequired: boolean;
  isBack?: boolean;
  color?: boolean;
}

const Layout = ({
  children,
  isRequired,
  isBack = false,
  color = false,
}: LayoutProps) => {
  const windowType = useAppSelector(selectWindowSize);

  const onMobile = windowType === "mobile";
  const onLaptop = windowType === "laptop";

  return (
    <div className='flex flex-col mb-8 text-lg lg:items-start justify-start lg:w-full'>
      <div className='flex items-start justify-start lg:w-[80%] px-5 space-x-1 lg:px-0 lg:mt-5 lg:whitespace-nowrap lg:ml-[11%] text-base'>
        <div className='flex items-center justify-start'>
          <Image
            src='/common/arrow/arrow-left.png'
            alt=''
            width={16}
            height={16}
          />
          <span
            className='font-bold min-w-fit lg:ml-8 ml-3'
            //onClick={() => (windowSize == "mobile" ? router.push(path) : {})}
          >
            {`{Adminusername}`}
          </span>
        </div>
        <Link href='/admin/login-member' passHref>
          <span className='pl-8 lg:pl-[8%] font-bold text-yata underline min-w-fit underline-offset-4 cursor-pointer'>
            {/* 登出此帳戶 */}
          </span>
        </Link>
      </div>
      <div className='items-start justify-center mb-8 lg:flex lg:w-full '>
        {onLaptop && (
          <div className='flex flex-col w-3/12 px-8 mt-2'>
            {onLaptop && <Sidebar />}
          </div>
        )}
        <div
          className={`${
            color && "bg-[#FFF]"
          } lg:w-7/12 py-3 lg:mt-6 mx-2 rounded-lg lg:m-0 lg:px-2 bg-[#FCFCFB]`}
        >
          {children}
        </div>
      </div>
      {isRequired && onMobile && (
        <ReturnButton btnName='返回' goBack={isBack} />
      )}
    </div>
  );
};

export default Layout;
