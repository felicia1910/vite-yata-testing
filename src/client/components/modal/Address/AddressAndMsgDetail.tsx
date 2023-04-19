import Image from "next/image";
import React from "react";
import { selectRegionList } from "../../../redux/config/slice";
import { selectWindowSize } from "../../../redux/control/slice";
import { IAddressInfo } from "../../../redux/delivery/slice";
import { IHamperCustDetail } from "../../../redux/shopping/slice";
import { useAppSelector } from "../../../redux/store";

type Props = {
  detail: IAddressInfo & IHamperCustDetail;
};

const AddressAndMsgDetail = ({ detail }: Props) => {
  const windowType = useAppSelector(selectWindowSize);
  const regionList = useAppSelector(selectRegionList);

  const onLaptop = windowType === "laptop";
  const onMobile = windowType === "mobile";

  const genRegionText = (regionId: string, districtId: number) => {
    const region = regionList.find((reg) => reg.id == regionId);
    const district = region?.districtList.find((dis) => dis.id === districtId);
    return { region: region?.name.tc, district: district?.name.tc };
  };

  const areaText = detail
    ? genRegionText(detail.region, detail.district_id)
    : { region: "", district: "" };

  return (
    <div className='w-full space-y-1 '>
      {detail && (
        <>
          <div className='flex flex-col '>
            <div className='flex items-center justify-between'>
              <div className='space-x-2'>
                <span className='text-sm text-left'>送貨地址</span>
              </div>
            </div>
            {onLaptop && (
              <div className='flex items-center justify-start w-full space-x-2 text-sm '>
                {/* Address Detail */}
                <div className='flex items-center w-full h-auto p-1 px-2 border rounded focus:outline-none border-yata/60 text-yata-brown/70 bg-grey-input '>
                  <>
                    <div className='flex flex-col items-start w-11/12 text-sm leading-4 '>
                      <span>{detail.name}</span>
                      <span>{detail.phone}</span>
                      <span className='break-all'>{`${detail.address1} ${areaText.district} ${areaText.region}`}</span>
                    </div>
                  </>
                </div>
              </div>
            )}

            {onMobile && (
              <div className='flex flex-col items-start justify-start w-full mt-1 text-sm'>
                <div className='flex items-center w-full h-auto p-2 border rounded border-yata/60 text-yata-brown/70 bg-grey-input '>
                  <>
                    <div className='flex flex-col items-start w-11/12 overflow-x-scroll text-sm leading-4 scrollbar-hide '>
                      <span>{detail.name}</span>
                      <span>{detail.phone}</span>
                      <span className='break-all'>{`${detail.address1} ${areaText.district} ${areaText.region}`}</span>
                    </div>
                  </>
                </div>
              </div>
            )}
          </div>

          <div className='h-auto space-y-1 overflow-hidden '>
            <div className='flex flex-col w-full text-sm '>
              <label>賀卡上款 </label>
              <div className='flex items-center break-words w-full p-1 px-2 border rounded min-h-[1.75rem] focus:outline-none border-yata/60 text-yata-brown/70 bg-grey-input '>
                {detail.greeting_cart_to}
              </div>
            </div>
            <div className='flex flex-col w-full text-sm '>
              <label>賀卡內容 </label>
              <div className='flex items-center whitespace-pre-wrap break-words w-full p-1 px-2 border rounded h-auto min-h-[1.75rem] focus:outline-none border-yata/60 text-yata-brown/70 bg-grey-input '>
                {detail.greeting_cart_message}
              </div>
            </div>
            <div className='flex flex-col w-full text-sm '>
              <label>賀卡下款 </label>
              <div className='flex items-center w-full break-words p-1 px-2 border rounded min-h-[1.75rem] focus:outline-none border-yata/60 text-yata-brown/70 bg-grey-input '>
                {detail.greeting_cart_from}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddressAndMsgDetail;
