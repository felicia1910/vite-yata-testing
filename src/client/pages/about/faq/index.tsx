import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Sidebar from "../../../components/faq/Sidebar";
import {faqRoute} from "../../../routers";
import { selectWindowSize } from "../../../redux/control/slice";
import { useAppSelector } from "../../../redux/store";
//import Faq from './browse';
import FullLoading from "../../../components/common/FullLoading";

const FAQ = () => {
  const router = useRouter();
  const windowType = useAppSelector(selectWindowSize);
  const onLaptop = windowType === "laptop";
  const onMobile = windowType === "mobile";

  useEffect(() => {
    if (onLaptop) {
      router.push("/about/faq/surf-products");
    }
  }, [onLaptop]);

  return (
    <>
      {onMobile && (
        <>
          <div className='flex items-center px-5 rangeMd:pt-4 rangeSm:pt-4 rangeXs:pt-4'>
            <div className='w-5 h-5 mr-2 rounded-md bg-yata' />
            <div className='text-lg font-bold'>{faqRoute.title}</div>
          </div>
          <Sidebar data={faqRoute.list} />
        </>
      )}
      {onLaptop && (
        <div className='h-screen'>
          <FullLoading />
        </div>
      )}
    </>
  );
};

FAQ.title = "常見問題 | YATA eShop​";

export default FAQ;
