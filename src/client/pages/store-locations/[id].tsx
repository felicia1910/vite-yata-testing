import React, { useEffect, useState } from "react";
import { Component } from "react";
import { NextPageContext } from "next";
import Link from "next/link";
import FullLoading from "../../components/common/FullLoading";
import { useAppSelector } from "../../redux/store";
import { selectWindowSize } from "../../redux/control/slice";
import { useRouter } from "next/router";
import { storesDetailList } from "../../utils/contents/storeDetailList";
import ReturnButton from "../../components/common/ReturnButton";

// function getstoreDataById(id) {
//   for (let i = 0; i < stores.length; i++) {
//     if (stores[i].id === parseInt(id)) {
//       return stores[i];
//     }
//   }
// }

type Props = {
  id: string;
};

function Store({ id }: Props) {
  const router = useRouter();
  const windowType = useAppSelector(selectWindowSize);
  const storeData = storesDetailList.filter(
    (post) => post.id === parseInt(id)
  )[0];
  const [width, setWidth] = useState<number>(0);

  const onMobile = windowType === "mobile";

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
    }
    if (!onMobile) {
      router.push("/store-locations");
    }
  }, [windowType]);

  return (
    <>
      {storeData && (
        <>
          <div className="flex flex-col justify-center pt-10 lg:flex-row lg:pl-10 lg:justify-start">
            <div className="mx-auto lg:mx-8">
              <div>
                <div className="pt-2.5">
                  {width ? (
                    <iframe
                      scrolling="no"
                      marginHeight={0}
                      marginWidth={0}
                      src={storeData.iframe}
                      width={onMobile ? width * 0.9 : 431}
                      height={onMobile ? width * 0.9 : 489}
                      frameBorder={0}
                      tabIndex={-1}
                    />
                  ) : (
                    <FullLoading />
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="px-4 font-bold pt-7 lg:pl-7 text-yata-deep">
                <h1>{`${storeData.title} (${storeData.content})`}</h1>
              </div>

              <div className="mb-2">
                <div className="px-4 pt-2 mr-10 lg:pl-7 text-yata-deep">
                  <h1>{storeData.storeAddress}</h1>
                </div>
                <div className="px-4 lg:pl-7 text-yata-brown ">
                  <h1>{storeData.address}</h1>
                </div>
              </div>

              <div className="mb-2">
                <div className="px-4 pt-2 mr-10 lg:pl-7 text-yata-deep">
                  <h1>{storeData.storeHours}</h1>
                </div>
                <div className="px-4 lg:pl-7 text-yata-brown ">
                  <a
                    className="underline underline-offset-2"
                    href={storeData.details}
                  // target="_blank"
                  >
                    <h1>{storeData.hours}</h1>
                  </a>
                </div>
              </div>

              <div className="mb-2">
                <div className="px-4 pt-2 mr-10 lg:pl-7 text-yata-deep">
                  <h1>{storeData.customerCare}</h1>
                </div>
                <div className="px-4 lg:pl-7 text-yata-brown ">
                  <a href={`tel:${storeData.phoneNumber}`}>{storeData.phoneNumber}</a>
                </div>
              </div>

              <div className="mb-2">
                <div className="px-4 pt-2 mr-10 lg:pl-7 text-yata-deep">
                  <h1>{storeData.storeEmail}</h1>
                </div>
                <div className="px-4 lg:pl-7 text-yata-brown ">
                  <a href={`mailto:${storeData.email}`}>{storeData.email}</a>
                </div>
              </div>
            </div>

            <div className="mt-16 mb-12 lg:hidden">
              <ReturnButton btnName="返回" path="/store-locations" />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Store;

Store.getInitialProps = async ({ query }: NextPageContext) => {
  const { id } = query;
  return { id };
};
