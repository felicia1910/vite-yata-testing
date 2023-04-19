import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Option from "../components/modal/Delivery/Option";
import { selectWindowSize } from "../redux/control/slice";
import { useAppSelector } from "../redux/store";

const DeliveryMethod = () => {
  const router = useRouter();
  const windowType = useAppSelector(selectWindowSize);
  const onMobile = windowType === "mobile";

  useEffect(() => {
    if (windowType === "laptop") {
      router.push("/");
    }
  }, [windowType, router]);

  return (
    <>
      {onMobile && (
        <div className='flex flex-col items-center w-full h-[70vh]'>
          <div className='px-4 flex items-center justify-between w-full bg-white border-b-[0.5px] h-[56px] border-yata-brown/[.4]'>
            <div className='w-1/6' onClick={() => router.back()}>
              <Image
                src='/common/arrow/arrow-left.png'
                alt=''
                width={15}
                height={15}
              />
            </div>
            <div className='flex justify-center w-4/6 text-lg font-medium'>
              請選擇您的送貨方式
            </div>
            <div className='w-1/6' />
          </div>
          <Option />
        </div>
      )}
    </>
  );
};

export default DeliveryMethod;
