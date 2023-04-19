import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import AnimatedModalOverlay from "../AnimatedModalOverlay";
import HamperHeader from "./HamperHeader";
import SelectAddressModal from "./SelectAddressModal";
import AddressBox from "./AddressBox";
import ButtonLoading from "../../common/ButtonLoading";

import { useAppSelector, useAppDispatch } from "../../../redux/store";
import {
  closeFillAddressModal,
  selectIsEdited,
  selectIsFillAddressModalOpen,
} from "../../../redux/control/slice";
import { IAddressInfo, setUpdatingAddrId } from "../../../redux/delivery/slice";
import {
  removeHamperAddr,
  selectChoseHamperAddr,
} from "../../../redux/delivery/slice";
import {
  IHamperCustDetail,
  initHamperDetail,
  selectShoppingCartDetail,
} from "../../../redux/shopping/slice";
import { updateHamperDetailThunk } from "../../../redux/shopping/thunk";

const HamperAddressModal = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const chosenAddress = useAppSelector(selectChoseHamperAddr);
  const updatingAddrId = useAppSelector(
    (state) => state.delivery.updatingAddrId
  );
  const fillAddress = useAppSelector(selectIsFillAddressModalOpen);
  const isEdited = useAppSelector(selectIsEdited);
  const hamperCustDetail = useAppSelector(
    (state) => state.shopping.hamperDetail
  );

  const [hamperDetail, setHamperDetail] =
    useState<IHamperCustDetail[]>(hamperCustDetail);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // console.log("chosenAddress", chosenAddress);
    if (chosenAddress) {
      const { name, phone, id, districtId, region, address1, address2 } =
        chosenAddress;
      const newHamperArr = hamperDetail.map((detail, idx) => {
        if (updatingAddrId && idx == updatingAddrId.idx) {
          const newDetail: IHamperCustDetail = {
            ...detail,
            name: name,
            phone: phone,
            address_id: id!,
            district_id: districtId,
            region: region,
            address1: address1,
            address2: address2 ?? "",
          };
          return newDetail;
        } else return detail;
      });
      // console.log("new hamper array: ", newHamperArr);
      setHamperDetail(newHamperArr);
      dispatch(removeHamperAddr());
      dispatch(setUpdatingAddrId(null));
    }
  }, [chosenAddress, updatingAddrId]);

  useEffect(() => {
    if (hamperCustDetail.length > 0) {
      setHamperDetail(hamperCustDetail);
    }
  }, [hamperCustDetail]);

  const handleClick = async () => {
    setIsProcessing(true);
    const result = await dispatch(updateHamperDetailThunk(hamperDetail));
    if (result.payload) {
      setTimeout(() => {
        dispatch(closeFillAddressModal());
        setIsProcessing(false);
      }, 200);
    }
  };
  const handleClose = () => {
    dispatch(removeHamperAddr());
    dispatch(closeFillAddressModal());
    setHamperDetail([]);
  };
  const handleRemove = (idx: number) => {
    if (hamperDetail.length > 1) {
      setHamperDetail(hamperDetail.filter((_, i) => i != idx));
    }
  };
  // const empty = (arr: (IAddressInfo | null)[]) => (arr.length = 0);
  // const check = selectAddr.length === 0 && handleClose;

  // console.log("select addr: ", selectAddr);
  // console.log("hamper detail: ", hamperDetail);
  // console.log("chosen addr: ", chosenAddress);

  return (
    <>
      <AnimatedModalOverlay showModal={fillAddress!} height={640} width={830}>
        <div className='flex flex-col items-center justify-between w-full h-full '>
          <label className='py-3 border-b-[0.5px] border-yata-brown/[.4] h-[10%] w-full flex justify-center items-center font-bold text-lg'>
            果籃 - 送貨地址
          </label>
          <div className=' mt-3 w-11/12 h-[72%] overflow-y-scroll relative bg-[#F6F6F6] rounded-md lg:p-2 py-2 px-1 space-y-2'>
            <div className='flex flex-col items-center justify-center w-full '>
              <HamperHeader count={hamperDetail.length} />
              {hamperDetail.length > 0 &&
                hamperDetail.map((detail, idx) => {
                  return (
                    <AddressBox
                      key={`hamper-addr-${idx}`}
                      detail={detail}
                      index={idx}
                      handleRemove={() => {
                        handleRemove(idx);
                      }}
                      hamperDetail={hamperDetail}
                      setHamperDetail={setHamperDetail}
                      isProcessing={isProcessing}
                    />
                  );
                })}
            </div>
          </div>
          <div className='w-11/12 h-[12%] flex items-center'>
            <button
              onClick={() => {
                // dispatch(removeHamperAddr());
                setHamperDetail((prevAddr) => [...prevAddr, initHamperDetail]);
              }}
              disabled={isProcessing}
              className='flex justify-between relative items-center border-2 border-[#E5E5E5] w-7/12 lg:w-3/12 p-2 rounded-md my-4 transition-all duration-300'
            >
              <span className={isEdited ? "text-yata-brown" : ""}>
                新增果籃
              </span>
              <Image src='/modal/plus.png' alt='' width={20} height={20} />
              <div
                className={
                  "absolute inset-0 z-30 transition-all duration-300 ease-in-out bg-grey-i/60 " +
                  (isProcessing
                    ? "visible opacity-100 "
                    : "invisible opacity-0 ")
                }
              />
            </button>
          </div>

          <div className='w-11/12 h-[12%] '>
            <div className='flex justify-center w-full h-12 space-x-6'>
              <button
                disabled={isProcessing}
                className={
                  "md:w-52 w-36 rounded-md px-3 py-2 transition-all duration-300 " +
                  (isProcessing
                    ? "bg-grey-i text-grey cursor-default"
                    : "bg-[#D2C4B6] text-[#7F7A74] ")
                }
                onClick={handleClose}
              >
                取消
              </button>
              <button
                onClick={handleClick}
                disabled={isProcessing}
                className='flex items-center justify-center px-3 py-2 text-white transition-all duration-300 rounded-md md:w-52 w-36 text-md bg-yata-deep '
              >
                {isProcessing ? <ButtonLoading /> : "確定"}
              </button>
            </div>
          </div>
        </div>
      </AnimatedModalOverlay>

      <SelectAddressModal />
    </>
  );
};

export default HamperAddressModal;
