import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { onLoaded, onLoading } from "../../../redux/control/slice";
import {
  IAddressInfo,
  selectChoseAddr,
  selectPickupStore,
  selectShippingMode,
} from "../../../redux/delivery/slice";
import { useAppSelector } from "../../../redux/store";
import AnimatedModalOverlay from "../AnimatedModalOverlay";
import { useAppDispatch } from "../../../redux/store";
import { selectUserInfo } from "../../../redux/auth/slice";
import { AddrError, initAddrErrMsg } from "../../../utils/checkAddrErr";
import checkAddrErr from "../../../utils/checkAddrErr";
import {
  changeShippingModeThunk,
  saveNewDeliveryAddressApi,
  updateDeliveryInfoThunk,
  getUserDeliveryInfoThunk,
} from "../../../redux/delivery/thunk";
import { getShoppingCartListThunk } from "../../../redux/shopping/thunk";
import ButtonLoading from "../../common/ButtonLoading";
import InputFields from "./InputFields";

export enum EModalType {
  update = "update",
  add = "add",
}

type Props = {
  type: EModalType;
  addrInfo?: IAddressInfo;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  forHamper?: boolean;
};

const AddAddressModal = ({
  type,
  addrInfo,
  showModal,
  setShowModal,
  forHamper,
}: Props) => {
  const userInfo = useAppSelector(selectUserInfo);
  const { firstName, lastName, mobile, email, countryCodeId } = userInfo!;

  const initAddress: IAddressInfo = {
    name: `${firstName} ${lastName}`,
    phone: mobile,
    email: email,
    defaultAddress: false,
    country: "89622dd1-0c51-42e5-8e99-e586d25f87e1",
    region: "請選擇區域",
    districtId: 0,
    address1: "",
    address2: "",
  };
  const dispatch = useAppDispatch();
  const shipping = useAppSelector((state) => state.delivery.shippingInfo);
  const chosenAddr = useAppSelector(selectChoseAddr);
  const shippingMode = useAppSelector(selectShippingMode);
  const pickupStore = useAppSelector(selectPickupStore);
  // const adAddress = useAppSelector(selectIsAddAddressModalOpen);
  // const countryCode = useAppSelector(state => state.config.countryList.filter((city: any) => city.name.en == 'Hong Kong')[0].regionList)
  const [editedAddr, setEditedAddr] = useState<IAddressInfo>(initAddress);
  // const [saveAddr, setSaveAddr] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<AddrError>(initAddrErrMsg);
  const [isProcessing, setIsProcessing] = useState(false);

  // console.log("editedAddr", editedAddr);

  const submitEditedAddr = async (e: any) => {
    setErrMsg(initAddrErrMsg);
    e.preventDefault();

    const err = checkAddrErr(editedAddr);
    // console.log(err)
    if (err) {setErrMsg(err.errors);return};


    dispatch(onLoading());
    setIsProcessing(true);

    if (editedAddr.defaultAddress) {
      await dispatch(
        changeShippingModeThunk({
          ...editedAddr,
          shipment_mode: shipping.shipment_mode,
          pickup_location_code: shipping.pickup_location_code,
        })
      );
    }
    if (type == "update") {
      setTimeout(async () => {
        if (!forHamper && chosenAddr && chosenAddr.id == editedAddr.id) {
          await dispatch(
            changeShippingModeThunk({
              ...editedAddr,
              shipment_mode: shippingMode,
              pickup_location_code: pickupStore,
            })
          );
          await dispatch(getShoppingCartListThunk());
        }
        const res = await dispatch(updateDeliveryInfoThunk(editedAddr));

        if (res) {
          setShowModal(false);
          dispatch(onLoaded());
          setErrMsg(initAddrErrMsg);
          setAddr(true);
          setIsProcessing(false);
        }
      }, 1500);
    } else {
      setShowModal(false);
      setTimeout(async () => {
        // if (saveAddr) {
        const res = await saveNewDeliveryAddressApi(editedAddr);
        //dispatch(addNewAddress(editedAddr));
        await dispatch(getUserDeliveryInfoThunk());
        if (res) {
          // if ()
          setAddr(true);
          setErrMsg(initAddrErrMsg);

          setIsProcessing(false);
          dispatch(onLoaded());
        }
        // } else {
        //   await dispatch(addNewAddress(editedAddr));
        // }
        // setAddr(true);
        // setErrMsg(initAddrErrMsg);
        // dispatch(onLoaded());
      }, 1500);
    }
  };

  const setAddr = (isAdd: boolean) => {
    let list = initAddress;
    if (addrInfo && !isAdd) {
      Object.keys(addrInfo).map((key) => {
        list = { ...list, [key]: addrInfo[key] };
      });
      setEditedAddr(list);
    }
    if (isAdd) {
      setEditedAddr(initAddress);
    }
  };

  useEffect(() => {
    setAddr(addrInfo == undefined);
  }, [userInfo, addrInfo]);

  return (
    <AnimatedModalOverlay
      showModal={showModal}
      height={forHamper ? 640 : "auto"}
      width={forHamper ? 830 : 780}
    >
      <div className='flex flex-col items-center justify-center w-full h-full bg-white'>
        <div
          className={
            "flex items-center justify-center w-full text-xl font-semibold border-b-[0.5px] border-yata-brown/[.4] " +
            (forHamper ? "h-[10%] " : "py-5")
          }
        >
          {type == "add" && "新增送貨地址"}
          {type == "update" && "更新送貨地址"}
        </div>

        <InputFields
          forHamper={forHamper}
          editedAddr={editedAddr}
          setEditedAddr={setEditedAddr}
          errMsg={errMsg}
          setErrMsg={setErrMsg}
        />

        {/* Buttons */}
        <div
          className={
            "flex items-center justify-center w-11/12 space-x-3 text-lg lg:space-x-6 " +
            (forHamper ? "h-[18%] " : "mt-4 mb-8 ")
          }
        >
          <button
            className={
              "md:w-52 w-36 rounded-md px-3 py-2 transition-all ease-in-out duration-150 " +
              (isProcessing
                ? "bg-grey-i text-grey cursor-default"
                : "bg-[#D2C4B6] text-[#7F7A74] ")
            }
            disabled={isProcessing}
            onClick={() => {
              setShowModal(false);
              setAddr(type == "add");
              setErrMsg(initAddrErrMsg);
            }}
          >
            取消
          </button>
          <button
            type='submit'
            disabled={isProcessing}
            onClick={submitEditedAddr}
            className='flex justify-center px-3 py-2 text-white rounded-md md:w-52 w-36 text-md bg-yata-deep'
          >
            {isProcessing ? <ButtonLoading /> : "確認"}
          </button>
        </div>
      </div>
    </AnimatedModalOverlay>
  );
};

export default AddAddressModal;
