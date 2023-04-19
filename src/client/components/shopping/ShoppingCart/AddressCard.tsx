import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import Tick from "./Tick";
import {
  EWarningType,
  onLoaded,
  onLoading,
  openDeliveryModal,
  openWarningModal,
  selectIsCheckOut,
  selectIsEdited,
  selectWindowSize,
} from "../../../redux/control/slice";
import AddAddressModal, {
  EModalType,
} from "../../modal/Address/AddAddressModal";
import Image from "next/image";
import {
  selectAddressList,
  saveChosenAddr,
  IAddressInfo,
  selectShippingMode,
  selectChoseAddr,
} from "../../../redux/delivery/slice";
import Loading from "../../common/Loading";
import {
  selectRegionList,
  selectPickupStores,
} from "../../../redux/config/slice";
import { useRouter } from "next/router";
import WarningModal from "../../modal/WarningModal";
import {
  selectPickupStore,
  IFullShippingData,
} from "../../../redux/delivery/slice";
import { useDefaultAddr } from "../../../hook/useDefaultAddr";
import { changeShippingModeThunk } from "../../../redux/delivery/thunk";
import { getShoppingCartListThunk } from "../../../redux/shopping/thunk";
import { addrLimit } from "../../../utils/types";

type Props = {
  clickedAddrId: string;
  setClickedAddrId: (id: string) => void;
};

const AddressCard = ({ clickedAddrId, setClickedAddrId }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const addressList = useAppSelector(selectAddressList);
  const regionList = useAppSelector(selectRegionList);
  const isEdited = useAppSelector(selectIsEdited);
  const isCheckout = useAppSelector(selectIsCheckOut);
  const windowType = useAppSelector(selectWindowSize);
  const shippingMode = useAppSelector(selectShippingMode);
  const pickupStores = useAppSelector(selectPickupStores);
  const pickupStore = useAppSelector(selectPickupStore);
  const addrInfo = useAppSelector(selectChoseAddr);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editAddr, setEditAddr] = useState<IAddressInfo | null>(null);
  const initFullData = useDefaultAddr();
  const [fullData, setFullData] = useState<IFullShippingData>(initFullData);

  const genRegionText = (regionId: string, districtId: number) => {
    const region = regionList.find((reg) => reg.id == regionId);
    const district = region?.districtList.find((dis) => dis.id === districtId);
    return { region: region?.name.tc, district: district?.name.tc };
  };

  // console.log("addrInfo", addrInfo);
  // console.log("clickedAddrId", clickedAddrId);
  // console.log("pickup store: ", pickupStores);
  // console.log("full data of addr: ", fullData);
  // console.log("init data of addr: ", initFullData);

  useEffect(() => {
    setFullData({
      ...fullData,
      pickup_location_code: pickupStore,
    });
  }, [pickupStore]);

  const toggleChosenAddr = async (clickedAddrId: IAddressInfo) => {
    if (clickedAddrId) {
      dispatch(onLoading());
      await dispatch(
        changeShippingModeThunk({
          ...clickedAddrId,
          shipment_mode: shippingMode,
          pickup_location_code: pickupStore,
        })
      );
      await dispatch(getShoppingCartListThunk());
      dispatch(onLoaded());
    }
  };

  useEffect(() => {
    if (router.pathname == "/shopping-cart") {
      const addr = addressList?.filter((data) => data.id === clickedAddrId)[0];
      // console.log("click addr in useEffect: ", addr);
      dispatch(saveChosenAddr(addr!));
    }
  }, [clickedAddrId]);

  const toggleChangeStore = async (e: any) => {
    e.stopPropagation();
    const info = {
      ...fullData,
      shipment_mode: shippingMode,
      pickup_location_code: e.target.value,
    };
    setFullData(info);
    const result = await dispatch(changeShippingModeThunk(info));
    if (result) {
      const newRes = await dispatch(getShoppingCartListThunk());
      if (newRes) {
        dispatch(onLoaded());
      }
    }
  };

  return (
    <>
      {/* <Loading isLoading={addressList == null} /> */}
      <div className='relative pb-2 bg-white rounded-md'>
        <div className='bg-grey-i rounded-tl-md rounded-tr-md'>
          <div className='py-2 ml-3 text-lg font-bold'>取貨方式</div>
        </div>
        {!isCheckout ? (
          <>
            <div className='relative flex flex-row py-2 mx-2 my-2 rounded-md bg-bar-green'>
              <div className='ml-3 text-lg font-semibold text-yata-deep'>
                {shippingMode == "HD" && "送貨上門"}
                {shippingMode == "PU" && "店舖自取"}
              </div>
              <button
                className={
                  "absolute pt-1 text-sm underline right-2 underline-offset-1 transition-all ease-in-out duration-200 " +
                  (isEdited ? " pointer-events-none text-grey-i" : "text-yata")
                }
                onClick={(e) => {
                  e.preventDefault();
                  windowType === "laptop"
                    ? dispatch(openDeliveryModal())
                    : router.push("/delivery-method");
                }}
              >
                更改取貨方式
              </button>
            </div>

            <div className='mx-2 my-2 border rounded-md'>
              {shippingMode == "HD" && (
                <>
                  <div className='mt-3 ml-2'>請選擇送貨地址</div>

                  <div
                    className={
                      "max-h-[16rem] overflow-y-scroll " +
                      (addressList && addressList.length > 3
                        ? ""
                        : "scrollbar-hide")
                    }
                  >
                    {addressList &&
                      addressList.length > 0 &&
                      addressList.map((addr) => {
                        const text = genRegionText(
                          addr.region,
                          addr.districtId
                        );
                        return (
                          <label key={"shopping-cart-" + addr.id}>
                            <input
                              type='radio'
                              name='options'
                              value={addr.id}
                              id={addr.id}
                              className='hidden peer'
                              onClick={(e) => {
                                e.preventDefault();
                                setClickedAddrId(addr.id!);
                                toggleChosenAddr(addr);
                              }}
                              disabled={isEdited}
                            />
                            <div
                              className={`relative border block mx-2 my-1 h-20 rounded-lg transition-all duration-150 peer-checked:border-yata ${
                                clickedAddrId == addr.id
                                  ? "bg-white"
                                  : "bg-grey-input"
                              } ${
                                isEdited ? "text-grey-yellow" : "cursor-pointer"
                              }`}
                            >
                              <div className='px-2 py-2'>
                                <div className='text-sm'>{addr.name}</div>
                                <div className='text-sm'>{addr.phone}</div>
                                <div className='flex flex-row justify-between w-full'>
                                  <div className='w-11/12 text-sm truncate'>{`${addr.address1} ${text.district} ${text.region}`}</div>
                                  <button
                                    className={
                                      "relative object-contain w-1/12 h-5 max-w-[1.25rem] transition-all duration-150 " +
                                      (isEdited ? "opacity-0" : "opacity-100")
                                    }
                                    onClick={async (e) => {
                                      e.stopPropagation();
                                      setEditAddr(addr);
                                      setTimeout(() => {
                                        setOpenUpdateModal(true);
                                      }, 200);
                                    }}
                                    disabled={isEdited}
                                  >
                                    <Image
                                      src='/cart/4.png'
                                      // layout='responsive'
                                      alt='edit.png'
                                      width={30}
                                      height={28}
                                    />
                                  </button>
                                </div>
                              </div>
                              <Tick
                                tick={clickedAddrId == addr.id ? true : false}
                              />
                            </div>
                          </label>
                        );
                      })}
                  </div>
                  <AddAddressModal
                    type={EModalType.update}
                    addrInfo={editAddr!}
                    showModal={openUpdateModal}
                    setShowModal={setOpenUpdateModal}
                  />

                  <div className='flex flex-row items-center justify-between p-2'>
                    <div className={isEdited ? "text-grey-yellow" : ""}>
                      新增送貨地址
                    </div>
                    <button
                      className={
                        "relative object-contain w-5 h-5 transition-all duration-150 " +
                        (isEdited ? "opacity-0" : "opacity-100")
                      }
                      onClick={() => {
                        addressList!.length < addrLimit
                          ? setOpenAddModal(true)
                          : dispatch(
                              openWarningModal({
                                type: EWarningType.address,
                                text: "",
                              })
                            );
                      }}
                      disabled={isEdited}
                    >
                      <Image
                        src='/modal/plus.png'
                        alt='plus.png'
                        layout='fill'
                      />
                    </button>
                  </div>
                </>
              )}
              {shippingMode == "PU" && (
                <div className='w-full h-auto space-y-1'>
                  <div className='w-full pt-1 pl-2 '>請選擇店鋪</div>
                  <div className='flex items-center justify-between w-full lg:px-4'></div>
                  <select
                    className='w-full py-2 border rounded-md border-grey-i'
                    value={fullData.pickup_location_code}
                    onChange={async (e) => {
                      await toggleChangeStore(e);
                    }}
                  >
                    {pickupStores &&
                      pickupStores.length > 0 &&
                      pickupStores.map((store) => (
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
            </div>
          </>
        ) : (
          <div className='mx-2 my-2 '>
            <div className='mt-3 ml-2'>
              已選擇的{shippingMode == "HD" ? "送貨地址" : "店舖"}
            </div>
            <label className='box-border block mx-2 my-1 bg-white rounded-lg border-[1px] border-yata'>
              {shippingMode == "HD" && addrInfo && (
                <div className='relative px-2 py-3'>
                  <div className='text-sm'>{addrInfo.name}</div>
                  <div className='text-sm'>{addrInfo.phone}</div>
                  <div className='flex flex-row justify-between'>
                    <div className='text-sm'>{`${addrInfo.address1} ${
                      genRegionText(addrInfo.region, addrInfo.districtId)
                        .district
                    } ${
                      genRegionText(addrInfo.region, addrInfo.districtId).region
                    }`}</div>
                  </div>
                </div>
              )}
              {shippingMode == "PU" && (
                <div className='relative px-2 py-3'>
                  {pickupStores &&
                    pickupStores.length > 0 &&
                    pickupStores.filter(
                      (store) => store.location_code == pickupStore
                    )[0].chinese_name}
                </div>
              )}
            </label>
          </div>
        )}
      </div>

      <AddAddressModal
        type={EModalType.add}
        showModal={openAddModal}
        setShowModal={setOpenAddModal}
      />
    </>
  );
};
export default AddressCard;
