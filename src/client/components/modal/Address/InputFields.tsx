import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import TickSvg from "../../../public/common/tick";
import { IDistrictData } from "../../../redux/config/slice";
import { IAddressInfo } from "../../../redux/delivery/slice";
import { useAppSelector } from "../../../redux/store";
import { AddrError } from "../../../utils/checkAddrErr";

type Props = {
  editedAddr: IAddressInfo;
  setEditedAddr: Dispatch<SetStateAction<IAddressInfo>>;
  errMsg: AddrError;
  setErrMsg: Dispatch<SetStateAction<AddrError>>;
  forHamper?: boolean;
  isAdmin?: boolean;
};

const InputFields = ({
  editedAddr,
  setEditedAddr,
  errMsg,
  setErrMsg,
  forHamper,
  isAdmin,
}: Props) => {
  const regionList = useAppSelector((state) => state.config.regionList);
  const [districtList, setDistrictList] = useState<IDistrictData[] | null>(
    null
  );

  useEffect(() => {
    if (editedAddr.region != undefined || editedAddr.region != "請選擇區域") {
      const getDistrictList = regionList.filter(
        (region) => region.id == editedAddr.region
      )[0];
      setDistrictList(getDistrictList?.districtList ?? null);
    }
  }, [editedAddr.region]);

  return (
    <div
      className={
        "flex flex-col items-center justify-center w-full pt-4" +
        (forHamper ? "h-[72%] " : "h-auto")
      }
    >
      {/** Name */}
      <section className='flex items-start justify-start w-11/12 py-3 mt-2 space-x-2 text-base lg:w-full lg:px-8 lg:space-x-5'>
        {/* <div className="flex flex-col items-start w-4/12 lg:w-2/12">
                <label className="text-sm lg:text-base">稱謂</label>
                <select defaultValue={'請選擇'} className="border border-[#EEEEEE] w-full p-1.5 rounded-md mt-1 focus:outline-none cursor-pointer">
                  <option disabled>請選擇</option>
                  <option>先生</option>
                  <option>小姐</option>
                  <option>太太</option>
                </select>
              </div> */}
        <div className='flex flex-col items-start w-8/12 lg:w-5/12'>
          <label className='text-sm lg:text-base'>收貨人</label>
          <input
            required
            className='border border-[#EEEEEE] w-full p-1.5 rounded-md mt-1 focus:outline-none text-base '
            value={editedAddr.name}
            onChange={(e) => {
              setEditedAddr({ ...editedAddr, name: e.target.value });
              setErrMsg({ ...errMsg, name: "" });
            }}
          />
          <span
            className={
              "text-[#FF0000] text-sm transition-all duration-150 ease-in-out " +
              (errMsg.name != "" ? "h-4 my-1" : "h-0 my-0")
            }
          >
            {errMsg.name != "" && errMsg.name}
          </span>
        </div>
        {/* <div className="flex flex-col items-start w-6/12">
                <label className="text-sm lg:text-base">姓氏</label>
                <input
                  className="border border-[#EEEEEE] w-full p-1.5 rounded-md mt-1 focus:outline-none"
                  value={editedAddr.lastName}
                  onChange={(e) =>
                    setEditedAddr({ ...editedAddr, lastName: e.target.value })
                  }
                />
              </div> */}
      </section>

      {/* Contact */}
      <section className='flex flex-col items-start justify-start w-11/12 py-3 lg:w-full lg:px-8'>
        <label className='text-sm lg:text-base'>手提電話號碼</label>
        <div className='flex items-start justify-start w-full space-x-2 text-base lg:space-x-5 '>
          {/* <span className='border border-[#EEEEEE] w-3/12 p-1.5 rounded-md mt-1 focus:outline-none'>
                <option>+852</option>
                <option>+853</option>
                <option>+86</option>
              </span> */}
          <input
            required
            className='border border-[#EEEEEE] w-8/12 lg:w-5/12 p-1.5 rounded-md mt-1 focus:outline-none'
            type='text'
            value={editedAddr!.phone}
            onChange={(e) => {
              setEditedAddr({ ...editedAddr, phone: e.target.value });
              setErrMsg({ ...errMsg, phone: "" });
            }}
          />
        </div>
        {/* <div
              className={
                "flex w-full space-x-2 lg:space-x-5 transition-all duration-150 ease-in-out" +
                (errMsg.phone != "" ? "h-4 my-1" : "h-0 my-0")
              }
            >
              <span className='w-3/12' />
              <span className='text-[#FF0000] text-sm w-9/12 transition-all duration-150 ease-in-out '>
                {errMsg.phone != "" && errMsg.phone}
              </span>
            </div> */}
        <span
          className={
            "text-[#FF0000] text-sm transition-all animate-fadeIn animate-fadeOut duration-150 ease-in-out " +
            (errMsg.phone != "" ? "h-4 my-1" : "h-0 my-0")
          }
        >
          {errMsg.phone != "" && errMsg.phone}
        </span>
      </section>

      {/* Area */}
      <section className='flex items-start justify-start w-11/12 py-3 space-x-1 lg:w-full lg:px-8 lg:space-x-5'>
        {/* Region */}
        <div className='flex flex-col items-start w-6/12'>
          <label className='text-sm lg:text-base'>區域</label>
          <select
            defaultValue={"請選擇區域"}
            value={
              editedAddr.region != "請選擇區域"
                ? editedAddr.region
                : "請選擇區域"
            }
            className='border border-[#EEEEEE] text-base w-full p-1.5 rounded-md mt-1 focus:outline-none cursor-pointer'
            onChange={(e) => {
              setEditedAddr({
                ...editedAddr,
                region: e.target.value,
                districtId: 0,
              });
              setErrMsg({ ...errMsg, region: "", districtId: "" });
            }}
          >
            <option value={"請選擇區域"} disabled>
              請選擇區域
            </option>
            {regionList.map((region, idx) => (
              <option value={region.id} key={`region-list-${idx}`}>
                {region.name.tc}
              </option>
            ))}
          </select>
          <span
            className={
              "text-[#FF0000] text-sm transition-all animate-fadeIn animate-fadeOut duration-150 ease-in-out " +
              (errMsg.region != "" ? "h-4 my-1" : "h-0 my-0")
            }
          >
            {errMsg.region != "" && errMsg.region}
          </span>
        </div>

        {/* District */}
        <div className='flex flex-col items-start w-6/12'>
          <label className='text-sm lg:text-base'>地區</label>
          <select
            defaultValue={0}
            value={editedAddr.districtId}
            disabled={
              districtList != null && districtList.length > 0 ? false : true
            }
            className='border border-[#EEEEEE] text-base w-full p-1.5 rounded-md mt-1 focus:outline-none cursor-pointer transition-all ease-in-out duration-200'
            onChange={(e) => {
              const id = parseInt(e.target.value);
              setEditedAddr({
                ...editedAddr,
                districtId: id,
              });
              setErrMsg({
                ...errMsg,
                districtId:
                  editedAddr.region == "af85f8d6-e022-44a0-844b-f111a60729b2" &&
                  id != 3 &&
                  id != 6
                    ? "離島送貨只限東涌及馬灣，請重新輸入​"
                    : "",
              });
            }}
          >
            <option value={0} disabled>
              請選擇地區
            </option>
            {districtList &&
              districtList.map((district, idx) => (
                <option value={district.id} key={`district-list-${idx}`}>
                  {district.name.tc}
                </option>
              ))}
          </select>
          <span
            className={
              "text-[#FF0000] text-sm transition-all duration-150 ease-in-out " +
              (errMsg.districtId != "" ? "h-4 my-1" : "h-0 my-0")
            }
          >
            {errMsg.districtId != "" && errMsg.districtId}
          </span>
        </div>
      </section>

      {/* Address detail */}
      <section className='w-11/12 py-3 lg:w-full lg:px-8 lg:space-x-5'>
        <div className='flex flex-col items-start w-full'>
          <label className='text-sm lg:text-base'>詳細地址</label>
          <input
            required
            className='border border-[#EEEEEE] w-full p-1.5 rounded-md mt-1 focus:outline-none placeholder:text-yata-brown text-base'
            placeholder='請輸入詳細地址'
            value={editedAddr?.address1}
            maxLength={60}
            onChange={(e) => {
              setEditedAddr({ ...editedAddr, address1: e.target.value });
              setErrMsg({ ...errMsg, address1: "" });
            }}
          />
          <span
            className={
              "text-[#FF0000] text-sm transition-all duration-150 ease-in-out " +
              (errMsg.address1 != "" ? "h-4 my-1" : "h-0 my-0")
            }
          >
            {errMsg.address1 != "" && errMsg.address1}
          </span>
        </div>
      </section>
      {/* Tick box */}
      <section className='flex items-start justify-start w-full px-4 py-5 lg:px-8 lg:space-x-5'>
        {/* Default address */}
        {!isAdmin && (
          <div className='flex flex-row items-center w-1/2 lg:w-3/12'>
            <div
              className='border-[1px] mr-1 rounded w-5 h-5 p-[0.15rem] cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out text-base '
              style={
                editedAddr.defaultAddress == true
                  ? { borderColor: "#A6CE39", backgroundColor: "#A6CE39" }
                  : { borderColor: "#6A3B0D", backgroundColor: "#FFF" }
              }
              onClick={() => {
                setEditedAddr({
                  ...editedAddr,
                  defaultAddress: !editedAddr.defaultAddress,
                });
              }}
            >
              <TickSvg fill='#FFF' />
            </div>
            <label className='ml-2 '>選為預設地址</label>
          </div>
        )}

        {/* Save address */}
        {/* {!addrInfo && (
              <div className='flex flex-row items-center w-1/2 lg:w-3/12'>
                <div
                  className='border-[1px] mr-2 rounded w-5 h-5 p-[0.15rem] cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out'
                  style={
                    saveAddr == true
                      ? { borderColor: "#A6CE39", backgroundColor: "#A6CE39" }
                      : { borderColor: "#6A3B0D", backgroundColor: "#FFF" }
                  }
                  onClick={() => {
                    setSaveAddr(!saveAddr);
                  }}
                >
                  <TickSvg fill='#FFF' />
                </div>
                <label className='ml-2 text-lg'>保存到地址簿</label>
              </div>
            )} */}
      </section>
    </div>
  );
};

export default InputFields;
