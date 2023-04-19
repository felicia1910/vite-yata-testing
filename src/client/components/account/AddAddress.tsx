import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Input from "./Input";
import { selectUserInfo } from "../../redux/auth/slice";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import {
  EWarningType,
  onLoaded,
  onLoading,
  openWarningModal,
  selectWindowSize,
} from "../../redux/control/slice";
import { IDistrictData, selectRegionList } from "../../redux/config/slice";
import { IAddressInfo, selectAddressList } from "../../redux/delivery/slice";
import TickBox from "../common/TickBox";
import {
  saveNewDeliveryAddressApi,
  getUserDeliveryInfoThunk,
} from "../../redux/delivery/thunk";
import checkAddrErr from "../../utils/checkAddrErr";
import { initAddrErrMsg, AddrError } from "../../utils/checkAddrErr";
import { changeShippingModeThunk } from "../../redux/delivery/thunk";
import ReturnButton from "../common/ReturnButton";
import { addrLimit } from "../../utils/types";

const AddAddress = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  const addressList = useAppSelector(selectAddressList);
  const windowSize = useAppSelector(selectWindowSize);
  const regionList = useAppSelector(selectRegionList);
  const shipping = useAppSelector((state) => state.delivery.shippingInfo);
  const initAddress: IAddressInfo = {
    name: ``,
    phone: "",
    email: "",
    defaultAddress: false,
    country: "89622dd1-0c51-42e5-8e99-e586d25f87e1",
    region: "請選擇區域",
    districtId: 0,
    address1: "",
    address2: "",
  };
  const [districtList, setDistrictList] = useState<IDistrictData[] | null>(
    null
  );
  const [newAddress, setNewAddress] = useState<IAddressInfo>(initAddress);
  const [errMsg, setErrMsg] = useState<AddrError>(initAddrErrMsg);

  useEffect(() => {
    if (userInfo) {
      const { firstName, lastName, mobile, email } = userInfo!;
      setNewAddress({
        ...newAddress,
        name: `${firstName} ${lastName}`,
        phone: mobile,
        email: email!,
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (newAddress.region != undefined && newAddress.region != "") {
      const getDistrictList = regionList.filter(
        (region) => region.id == newAddress.region
      )[0];
      setDistrictList(getDistrictList?.districtList ?? null);
    }
  }, [newAddress.region]);

  const submitNewAddress = async () => {
    if (addressList!.length < addrLimit) {
      await setErrMsg(initAddrErrMsg);
      const haveErr = checkAddrErr(newAddress );

      if (haveErr) {setErrMsg(haveErr.errors);return};

      dispatch(onLoading());
      if (newAddress.defaultAddress) {
        await dispatch(
          changeShippingModeThunk({
            ...newAddress,
            shipment_mode: shipping.shipment_mode,
            pickup_location_code: shipping.pickup_location_code,
          })
        );
      }

      const result = await saveNewDeliveryAddressApi(newAddress);
      if (result?.error) {
        dispatch(onLoaded());
      } else {
        dispatch(getUserDeliveryInfoThunk());
        setNewAddress(initAddress);
        router.push("/account/delivery-address");
      }
    } else {
      dispatch(openWarningModal({ type: EWarningType.address, text: "" }));
    }
  };
  // console.log("newAddress", newAddress);
  // console.log("warningModal", warningModal);
  // console.log("regionList", regionList);

  return (
    <div className='w-full mt-5 text-base'>
      <span className='px-4 text-lg font-bold text-yata-brown '>
        新增送貨地址
      </span>
      <div className='w-full bg-white rounded-md lg:mt-3 lg:border lg:border-grey'>
        <Input
          width='lg:w-8/12 w-full'
          isRequired={true}
          value={newAddress.name}
          star
          title='收貨人'
          onChange={(e) => {
            setNewAddress({ ...newAddress, name: e.target.value });
            setErrMsg({ ...errMsg, name: "" });
          }}
        />
        <div
          className={
            "text-[#FF0000] text-sm px-6 transition-all duration-150 ease-in-out " +
            (errMsg.name != "" ? "h-4 my-1" : "h-0 my-0")
          }
        >
          {errMsg.name != "" && errMsg.name}
        </div>

        <Input
          width='lg:w-8/12 w-full'
          isRequired={true}
          placeholder='請輸入手提電話號碼'
          star
          title={windowSize === "laptop" ? "手提電話號碼" : "手機號碼"}
          value={newAddress?.phone}
          onChange={(e) => {
            setNewAddress({ ...newAddress, phone: e.target.value });
            setErrMsg({ ...errMsg, phone: "" });
          }}
        />
        <div
          className={
            "text-[#FF0000] text-sm px-6 transition-all duration-150 ease-in-out " +
            (errMsg.phone != "" ? "h-4 my-1" : "h-0 my-0")
          }
        >
          {errMsg.phone != "" && errMsg.phone}
        </div>

        <div className='flex items-center w-full px-4 pt-5 lg:items-start lg:flex-col lg:w-8/12'>
          <label className='w-2/6 lg:w-auto'>
            <span className='text-[#FF0000]'>*</span>
            <span>區域</span>
          </label>
          <select
            defaultValue={"請選擇區域"}
            value={
              newAddress.region != "請選擇區域"
                ? newAddress.region
                : "請選擇區域"
            }
            className='w-full px-3 py-2 border-2 rounded-lg border-grey lg:mt-2'
            onChange={(e) => {
              setNewAddress({
                ...newAddress,
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
        </div>
        <div
          className={
            "text-[#FF0000] text-sm px-6 transition-all duration-150 ease-in-out " +
            (errMsg.region != "" ? "h-4 my-1" : "h-0 my-0")
          }
        >
          {errMsg.region != "" && errMsg.region}
        </div>

        <div className='flex items-center w-full px-4 pt-5 lg:items-start lg:flex-col lg:w-8/12'>
          <label className='w-2/6 lg:w-auto'>
            <span className='text-[#FF0000]'>*</span>
            <span>地區</span>
          </label>
          <select
            defaultValue={0}
            value={newAddress.districtId}
            disabled={
              districtList != null && districtList.length > 0 ? false : true
            }
            className='w-full px-3 py-2 border-2 rounded-lg border-grey lg:mt-2]'
            onChange={(e) => {
              const id = parseInt(e.target.value);
              // console.log(newAddress.region);
              setNewAddress({
                ...newAddress,
                districtId: parseInt(e.target.value),
              });
              setErrMsg({
                ...errMsg,
                districtId:
                  newAddress.region == "af85f8d6-e022-44a0-844b-f111a60729b2" &&
                  id != 3 &&
                  id != 6
                    ? "離島送貨只限東涌及馬灣，請重新輸入​"
                    : "",
              });
            }}
          >
            <option disabled value={0}>
              請選擇地區
            </option>
            {districtList &&
              districtList.map((district, idx) => (
                <option value={district.id} key={`district-list-${idx}`}>
                  {district.name.tc}
                </option>
              ))}
          </select>
        </div>
        <div
          className={
            "text-[#FF0000] text-sm px-6 transition-all duration-150 ease-in-out " +
            (errMsg.districtId != "" ? "h-4 my-1" : "h-0 my-0")
          }
        >
          {errMsg.districtId != "" && errMsg.districtId}
        </div>

        <Input
          isRequired={true}
          placeholder='請輸入詳細地址'
          star
          title='詳細地址'
          maxLength={60}
          value={`${newAddress.address1}`}
          onChange={(e) => {
            setNewAddress({ ...newAddress, address1: e.target.value });
            setErrMsg({ ...errMsg, address1: "" });
          }}
        />
        <div
          className={
            "text-[#FF0000] text-sm px-6 transition-all duration-150 ease-in-out " +
            (errMsg.address1 != "" ? "h-4 my-1" : "h-0 my-0")
          }
        >
          {errMsg.address1 != "" && errMsg.address1}
        </div>
        <div className='flex items-center w-full px-6 mt-1 space-x-2 text-sm'>
          送貨服務只適用於香港，包括香港島、九龍、新界，但不包括離島、愉景灣、沙頭角禁區、打鼓嶺、文錦渡、米埔、落馬洲。如顧客所提供之送貨地區屬並非送貨範圍內，該訂單將當作無效。
        </div>

        <div className='flex items-center w-full px-6 my-4 space-x-2 '>
          <TickBox
            isChecked={newAddress.defaultAddress!}
            label={"選為預設送貨地址"}
            onClick={() => {
              setNewAddress({
                ...newAddress,
                defaultAddress: !newAddress.defaultAddress,
              });
            }}
          />
        </div>

        <div className='my-8'>
          <div className='flex items-center justify-center my-2'>
            <button
              className='flex items-center justify-center w-full h-12 py-2 pl-4 pr-2 mx-6 mb-2 text-left text-white border rounded-lg lg:w-1/2 hover:border-2 hover:border-yata bg-yata-deep'
              onClick={submitNewAddress}
            >
              <div className='font-medium'>新增送貨地址</div>
            </button>
          </div>
          {windowSize == "mobile" && (
            <ReturnButton btnName='返回' goBack={true} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
