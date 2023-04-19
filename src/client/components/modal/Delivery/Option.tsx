import { useState } from "react";
import {
  closeDeliveryModal,
  onLoaded,
  onLoading,
  selectWindowSize,
} from "../../../redux/control/slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

import SelectedTick from "./SelectedTick";
import { selectPickupStores } from "../../../redux/config/slice";
import {
  IAddressInfo,
  selectChoseAddr,
  selectPickupStore,
} from "../../../redux/delivery/slice";
import {
  EShippingMode,
  IFullShippingData,
  selectAddressList,
  selectShippingMode,
  setPickupStore,
  setShippingMode,
} from "../../../redux/delivery/slice";
import { changeShippingModeThunk } from "../../../redux/delivery/thunk";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDefaultAddr } from "../../../hook/useDefaultAddr";
import { getShoppingCartListThunk } from "../../../redux/shopping/thunk";
import { selectImgUrl } from "../../../redux/config/index";

const Option = () => {
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const location = useLocation();
  const imgUrl = useAppSelector(selectImgUrl);
  const shippingMode = useAppSelector(selectShippingMode);
  const windowType = useAppSelector(selectWindowSize);
  const pickupStores = useAppSelector(selectPickupStores);
  const pickupStore = useAppSelector(selectPickupStore);
  const addressList = useAppSelector(selectAddressList);
  const chosenAddr = useAppSelector(selectChoseAddr);

  const initFullData = useDefaultAddr();
  const [fullData, setFullData] = useState<IFullShippingData>(initFullData!);

  const onLaptop = windowType === "laptop";

  const toggleSubmit = async () => {
    if (onLaptop) {
      dispatch(onLoading());
      dispatch(closeDeliveryModal());
    }

    setTimeout(async () => {
      const result = await dispatch(changeShippingModeThunk(fullData));
      if (result) {
        if (location.pathname == "/shopping-cart") {
          await dispatch(getShoppingCartListThunk());
        }
        if (onLaptop) {
          dispatch(onLoaded());
        } else router(-1);
      }
    }, 300);
  };

  return (
    <div className='flex flex-col items-center justify-center w-full px-4 mt-10'>
      <div className='flex items-center justify-center w-full lg:w-11/12 '>
        <div
          className='relative w-full h-40 mx-2 lg:mx-3'
          onClick={() =>
            setFullData({
              ...fullData,
              shipment_mode: EShippingMode.selfPickup,
              pickup_location_code: pickupStore == "NTP" ? "NTP" : pickupStore,
            })
          }
        >
          {fullData.shipment_mode == "PU" && <SelectedTick />}
          <div
            className={`${
              fullData.shipment_mode == "PU"
                ? "border-yata-deep text-yata-deep"
                : "border-[#6A3B0D] text-yata-brown"
            } border-2 flex flex-col items-center justify-center rounded-xl py-5 transition-all duration-300  cursor-pointer w-full`}
          >
            <div className='relative object-contain aspect-[83/73] h-16 overflow-hidden'>
              <img
                src={imgUrl+`/modal/delivery/pickup-${
                  fullData.shipment_mode == "PU" ? "green" : "brown"
                }.png`}
                alt='pic'
              />
            </div>
            <span className='flex items-center justify-center w-full pt-4 text-base lg:text-lg'>
              店鋪自取
            </span>
          </div>
        </div>
        <div
          className='relative w-full h-40 mx-2 lg:mx-3'
          onClick={() =>
            setFullData({
              ...fullData,
              shipment_mode: EShippingMode.delivery,
            })
          }
        >
          {fullData.shipment_mode == "HD" && <SelectedTick />}
          <div
            className={`${
              fullData.shipment_mode == "HD"
                ? "border-yata-deep text-yata-deep"
                : "border-[#6A3B0D] text-yata-brown"
            } border-2 flex flex-col items-center justify-center rounded-xl py-5   cursor-pointer w-full`}
          >
            <div className='relative object-contain aspect-[96/51] h-16 overflow-hidden'>
              <img
                src={imgUrl+`/modal/delivery/delivery-${
                  fullData.shipment_mode == "HD" ? "green" : "brown"
                }.png`}
                alt='pic'
              />
            </div>
            <span className='flex items-center justify-center w-full pt-4 text-base lg:text-lg'>
              送貨上門
            </span>
          </div>
        </div>
        <div></div>
      </div>

      {/* Render different content by selecting options */}
      <div className='flex flex-col items-start w-11/12 h-32 px-0 py-2 space-y-1 text-sm font-normal lg:py-4 lg:px-3 lg:text-base'>
        {fullData.shipment_mode == "PU" && (
          <div className='w-full h-auto space-y-1'>
            <div className='w-full '>請選擇店鋪</div>
            <div className='flex items-center justify-between w-full lg:px-4'></div>
            <select
              className='w-full py-2 border rounded-md border-grey-i'
              value={fullData.pickup_location_code}
              onChange={(e) => {
                // console.log(e.target.value);
                setFullData({
                  ...fullData,
                  pickup_location_code: e.target.value,
                });
              }}
            >
              {pickupStores.map((store) => (
                <option
                  key={`pickup-store-${store.location_code}`}
                  value={store.location_code}
                >
                  {store.chinese_name}
                </option>
              ))}
            </select>
          </div>
        )}
        {fullData.shipment_mode == "HD" && (
          <div className='w-full h-auto'></div>
        )}
        <div className='text-[#EA5433] lg:px-2 w-full'>
          *產品會根據所選取貨方式及店舖的庫存顯示
        </div>
      </div>

      <div className='w-full mt-4 text-lg lg:w-2/3'>
        {" "}
        <div className='flex items-center justify-center mb-5'>
          <button
            className='flex items-center justify-center w-full h-12 py-2 pl-4 pr-2 mx-6 mb-2 text-left text-white border rounded-lg hover:border-2 hover:border-yata bg-yata-deep'
            onClick={toggleSubmit}
          >
            <div className='font-medium'>確認</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Option;
