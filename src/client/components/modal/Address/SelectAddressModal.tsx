import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppSelector } from "../../../redux/store";

import Tick from "../../shopping/ShoppingCart/Tick";
import AnimatedModalOverlay from "../AnimatedModalOverlay";
import AddAddressModal, { EModalType } from "./AddAddressModal";

import { useAppDispatch } from "../../../redux/store";
import { selectRegionList } from "../../../redux/config/slice";
import {
  IAddressInfo,
  setHamperAddr,
  selectAddressList,
} from "../../../redux/delivery/slice";
import { selectShoppingCartDetail } from "../../../redux/shopping/slice";
import {
  closeChooseAddressModal,
  EWarningType,
  onLoaded,
  openWarningModal,
  selectIsChooseAddressModalOpen,
  selectIsEdited,
} from "../../../redux/control/slice";
import { addrLimit } from "../../../utils/types";
import { selectIsAdmin, selectUserInfo } from "../../../redux/auth/slice";
import checkAddrErr, {
  AddrError,
  initAddrErrMsg,
} from "../../../utils/checkAddrErr";
import InputFields from "./InputFields";

const SelectAddressModal = () => {
  const dispatch = useAppDispatch();
  const chooseAddress = useAppSelector(selectIsChooseAddressModalOpen);
  const userInfo = useAppSelector(selectUserInfo);
  const regionList = useAppSelector(selectRegionList);
  const isEdited = useAppSelector(selectIsEdited);
  const isAdmin = useAppSelector(selectIsAdmin);
  const addressList = useAppSelector(selectAddressList);
  const detail = useAppSelector(selectShoppingCartDetail);
  const updatingAddrId = useAppSelector(
    (state) => state.delivery.updatingAddrId
  );

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

  const [newAddr, setNewAddr] = useState<IAddressInfo>(initAddress);
  const [errMsg, setErrMsg] = useState<AddrError>(initAddrErrMsg);
  const [editAddr, setEditAddr] = useState<IAddressInfo | null>(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [clickedAddr, setClickedAddr] = useState<string>("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [chosenAddress, setChosenAddress] = useState<IAddressInfo | null>(null);
  const [useNewAddr, setUseNewAddr] = useState(false);

  const genRegionText = (regionId: string, districtId: number) => {
    const region = regionList.find((reg) => reg.id == regionId);
    const district = region?.districtList.find((dis) => dis.id === districtId);
    return { region: region?.name.tc, district: district?.name.tc };
  };

  const handleSubmit = async () => {
    if (!useNewAddr) {
      if (chosenAddress) {
        // await dispatch(
        //   changeShippingModeThunk({
        //     ...chosenAddress,
        //     shipment_mode: shippingMode,
        //     pickup_location_code: pickupStore,
        //   })
        // );
        // await dispatch(getShoppingCartListThunk());
        const addr = addressList?.filter(
          (data) => data.id === chosenAddress.id
        )[0];
        dispatch(setHamperAddr(addr!));
        handleRemove();
        dispatch(onLoaded());
      }
    } else {
      if (isAdmin) {
        setErrMsg(initAddrErrMsg);
        const err = checkAddrErr(newAddr );
        if (err) {setErrMsg(err.errors);return};
        dispatch(setHamperAddr(newAddr));
        handleRemove();
        setNewAddr(initAddress);
        dispatch(onLoaded());
      }
    }
  };

  const handleRemove = () => {
    setClickedAddr("");
    setChosenAddress(null);
    dispatch(closeChooseAddressModal());
  };

  useEffect(() => {
    if (addressList && addressList.length > 0) {
      if (updatingAddrId && updatingAddrId.id != "") {
        setClickedAddr(updatingAddrId.id);
        setChosenAddress(
          addressList.find((addr) => addr.id == updatingAddrId.id) ?? null
        );
      }
    }
  }, [updatingAddrId]);

  // console.log("clicked addr:", clickedAddr, chosenAddress);

  return (
    <>
      <AnimatedModalOverlay showModal={chooseAddress!} height={640} width={830}>
        <div className='py-3 h-[10%] border-b-[0.5px] border-yata-brown/[.4] w-full flex justify-center items-center font-bold text-lg mb-4'>
          送貨地址
        </div>
        {isAdmin && (
          <div className='flex justify-center '>
            <p className='w-11/12 pb-2 text-lg font-semibold '>
              請選擇客戶已儲存的送貨地址，或者自行輸入送貨地址。
            </p>
          </div>
        )}

        <div className='flex flex-col items-center w-full h-[72%] bg-white overflow-y-scroll'>
          <div className='flex justify-center flex-col items-start border border-[#E5E5E5] w-11/12 p-2 cursor-pointer rounded-md mb-2 '>
            <div className=''>已儲存的送貨地址</div>
            <div className='max-h-[21rem] overflow-y-scroll w-full'>
              {addressList &&
                addressList.length > 0 &&
                addressList.map((addr) => {
                  const text = genRegionText(addr.region, addr.districtId);
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
                          setClickedAddr(
                            clickedAddr == addr.id ? "" : addr.id!
                          );
                          // toggleChosenAddr(addr);
                          setUseNewAddr(false);
                          setChosenAddress(addr);
                        }}
                        disabled={isEdited}
                      />
                      <div
                        className={`relative border block mx-2 my-1 h-20 rounded-lg transition-all duration-150 peer-checked:border-yata ${
                          clickedAddr == addr.id ? "bg-white" : "bg-grey-input"
                        } ${isEdited ? "text-grey-yellow" : "cursor-pointer"}`}
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
                                setUseNewAddr(false);
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
                        <Tick tick={clickedAddr == addr.id ? true : false} />
                      </div>
                    </label>
                  );
                })}
            </div>
          </div>

          {!isAdmin && (
            <div
              className={
                "flex justify-between items-center border border-[#E5E5E5] w-11/12 p-2 cursor-pointer rounded-md transition-all duration-150" +
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
            >
              <span className={isEdited ? "text-grey-yellow" : ""}>
                新增送貨地址
              </span>
              <Image src='/modal/plus.png' alt='' width={20} height={20} />
            </div>
          )}
          {isAdmin && (
            <div
              className={
                "flex justify-between items-center border border-[#E5E5E5] w-11/12 p-2 rounded-md transition-all duration-150 opacity-100 mb-4 " +
                (useNewAddr ? "border-yata-deep " : "border-[#E5E5E5] ")
              }
              onClick={() => setUseNewAddr(true)}
            >
              <InputFields
                isAdmin={true}
                editedAddr={newAddr}
                setEditedAddr={setNewAddr}
                errMsg={errMsg}
                setErrMsg={setErrMsg}
              />
            </div>
          )}
        </div>

        <div className='flex items-center h-[18%] justify-center w-full space-x-6'>
          <button
            className='bg-[#D2C4B6] text-[#7F7A74] md:w-52 w-36 rounded-md px-3 py-2'
            onClick={handleRemove}
          >
            取消
          </button>
          <button
            onClick={handleSubmit}
            className='flex justify-center px-3 py-2 text-white rounded-md md:w-52 w-36 text-md bg-yata-deep'
          >
            確認
          </button>
        </div>
      </AnimatedModalOverlay>

      <AddAddressModal
        type={EModalType.update}
        addrInfo={editAddr!}
        showModal={openUpdateModal}
        setShowModal={setOpenUpdateModal}
        forHamper={true}
      />
      <AddAddressModal
        type={EModalType.add}
        showModal={openAddModal}
        setShowModal={setOpenAddModal}
        forHamper={true}
      />
    </>
  );
};

export default SelectAddressModal;
