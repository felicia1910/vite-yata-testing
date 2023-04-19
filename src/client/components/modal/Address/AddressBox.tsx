import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Image from "next/image";

import CalendarPopup from "../../shopping/ShoppingCart/CalendarPopup";
import AnimatedModalOverlay from "../AnimatedModalOverlay";
import AddAddressModal, { EModalType } from "./AddAddressModal";

import { EWarningType, openChooseAddressModal, openWarningModal } from "../../../redux/control/slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { selectWindowSize } from "../../../redux/control/slice";
import {
  IAddressInfo,
  selectDeliveryDate,
  selectAddressList,
  removeHamperAddr,
  setUpdatingAddrId,
} from "../../../redux/delivery/slice";
import { selectRegionList } from "../../../redux/config/slice";
import { IHamperCustDetail } from "../../../redux/shopping/slice";

type Props = {
  detail: IHamperCustDetail;
  index: number;
  handleRemove?: () => void;
  hamperDetail: IHamperCustDetail[];
  setHamperDetail?: Dispatch<SetStateAction<IHamperCustDetail[]>>;
  isProcessing: boolean;
};

const AddressBox = ({
  detail,
  index,
  handleRemove,
  hamperDetail,
  setHamperDetail,
  isProcessing,
}: Props) => {
  const dispatch = useAppDispatch();
  const windowType = useAppSelector(selectWindowSize);
  const deliveryDate = useAppSelector(selectDeliveryDate);
  const regionList = useAppSelector(selectRegionList);
  const addrList = useAppSelector(selectAddressList);
  const updatingAddrId = useAppSelector(
    (state) => state.delivery.updatingAddrId
  );

  const [dateVal, setDateVal] = useState(new Date(deliveryDate));
  const [date, setDate] = useState("");
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const [editAddr, setEditAddr] = useState<IAddressInfo | null>(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [expand, setExpand] = useState(-1);

  const onLaptop = windowType === "laptop";
  const onMobile = windowType === "mobile";

  const toggleSelectAddr = () => {
    if (detail.address_id == "") {
      dispatch(removeHamperAddr());
      dispatch(setUpdatingAddrId({ id: "", idx: index }));
    } else {
      dispatch(setUpdatingAddrId({ id: detail.address_id, idx: index }));
    }
    dispatch(openChooseAddressModal());
  };
  const toggleBeforeAddr = () =>{
    dispatch(
      openWarningModal({
        type: EWarningType.payment,
        text: "請先填寫送貨地址",
        back: false,
      })
    );
  }
  const genRegionText = (regionId: string, districtId: number) => {
    const region = regionList.find((reg) => reg.id == regionId);
    const district = region?.districtList.find((dis) => dis.id === districtId);
    return { region: region?.name.tc, district: district?.name.tc };
  };

  const areaText = detail
    ? genRegionText(detail.region!, detail.district_id)
    : { region: "", district: "" };

  const handleGreetingMsg = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    // console.log('handleGreetingMsg,',e.target.innerText.includes/
    const returnChar = /\n/gi
    const a = e.target.value.match(returnChar)
    if (  a&&a!.length > 2  ) return

    setHamperDetail!((currentDetail) => {
      return currentDetail.map((detail, idx) => {
        if (index == idx)
          return {
            ...detail,
            greeting_cart_from:
              type == "from" ? e.target.value : detail.greeting_cart_from,
            greeting_cart_to:
              type == "to" ? e.target.value : detail.greeting_cart_to,
            greeting_cart_message:
              type == "msg" ? e.target.value : detail.greeting_cart_message,
          };
        else return detail;
      });
    });
  };

  const hasAddrDetail = detail && detail?.address_id != "";

  return (
    <>
      <div className='relative overflow-hidden bg-white border border-[#EEEEEE] flex w-full py-3 rounded-lg '>
        <div
          className={
            "absolute inset-0 z-30 transition-all duration-300 ease-in-out bg-grey-i/60 " +
            (isProcessing ? "visible opacity-100 " : "invisible opacity-0 ")
          }
        />
        <div className='w-full space-y-1 cursor-pointer lg:w-9/12'>
          <div className='flex flex-col px-1 lg:px-3'>
            <div className='flex items-center justify-between'>
              <div className='space-x-2'>
                <span className='text-sm text-left'>送貨地址</span>
                <button
                  className={
                    "lg:hidden text-sm underline underline-offset-4 transition-all ease-in-out duration-300 " +
                    (hamperDetail.length == 1
                      ? "text-[#DDD] cursor-default "
                      : "text-[#999] ")
                  }
                  disabled={hamperDetail.length == 1}
                  onClick={handleRemove}
                >
                  刪除
                </button>
              </div>
              <div className='pr-1 lg:hidden'>
                <button
                  className='relative flex items-center text-sm min-w-fit text-yata-deep'
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpand(expand == index ? -1 : index);
                  }}
                >
                  {expand == index
                    ? // <Image
                      //   src='/faq/minus.png'
                      //   width={28}
                      //   height={6}
                      //   alt='minus.png'
                      // />
                      "收起"
                    : // <Image
                      //   src='/faq/plus.png'
                      //   width={28}
                      //   height={28}
                      //   alt='plus.png'
                      // />
                      "填寫賀卡資料"}
                </button>
              </div>
            </div>
            {onLaptop && (
              <div
                className='flex items-center justify-start w-full space-x-2 text-sm '
                onClick={toggleSelectAddr}
              >
                {/* Address Detail */}
                <div
                  className={
                    "min-h-[3.5rem] items-center px-2 py-1 rounded w-full flex focus:outline-none border transition-all ease-in-out duration-300 " +
                    (hasAddrDetail
                      ? "cursor-pointer border-yata "
                      : "bg-[#EEEEEE] border-[#EEEEEE] text-[#EA5433] ")
                  }
                >
                  {hasAddrDetail ? (
                    <>
                      <div className='flex flex-col items-start w-11/12 text-sm leading-4 '>
                        <span>{detail.name}</span>
                        <span>{detail.phone}</span>
                        <span
                          className={
                            "break-all " +
                            (expand == index
                              ? "line-clamp-2 "
                              : "line-clamp-1 ")
                          }
                        >{`${detail.address1} ${areaText.district} ${areaText.region}`}</span>
                      </div>
                      {/* <button
                        className={
                          "relative object-contain m-w-[1rem] w-5 h-5 transition-all duration-150 opacity-100"
                        }
                        onClick={toggleUpdateAddrModal}
                      >
                        <Image src='/cart/4.png' layout='fill' alt='edit.png' />
                      </button> */}
                    </>
                  ) : (
                    "請新增送貨地址"
                  )}
                </div>

                {/* Delivery Date  */}
                {/* <div
                  className={
                    "h-14 px-2 rounded w-[40%] flex justify-between items-center relative border transition-all ease-in-out duration-300 " +
                    (detail
                      ? "cursor-pointer border-yata "
                      : "text-[#EA5433] border-[#EEEEEE] bg-[#EEEEEE] ")
                  }
                  onClick={() => {
                    if (detail) {
                      setOpenCalendar(!openCalendar);
                    }
                  }}
                >
                  {detail ? (
                    <button>{date != "" ? date : "請選擇送貨日期"}</button>
                  ) : (
                    <div>請選擇送貨日期</div>
                  )}
                  <Image
                    src='/cart/6.png'
                    className='mr-2 rotate-180'
                    width={12}
                    height={7}
                    alt=''
                  />
                </div> */}

                {/* Delivery Time */}
                {/* <div
                  className={
                    "h-14 px-2 rounded w-[28%] flex items-center justify-between border transition-all ease-in-out duration-300 " +
                    (detail
                      ? "cursor-pointer border-yata "
                      : "text-[#EA5433] border-[#EEEEEE] bg-[#EEEEEE] ")
                  }
                >
                  <div>請選擇送貨時段</div>
                  <Image
                    onClick={() => {}}
                    src='/cart/6.png'
                    className='mr-2 rotate-180'
                    width={12}
                    height={7}
                    alt=''
                  />
                </div> */}
              </div>
            )}

            {onMobile && (
              <div className='flex flex-col items-start justify-start w-full mt-1 text-sm'>
                <div
                  onClick={toggleSelectAddr}
                  className={
                    "rounded h-14 px-2 py-1 w-full flex items-center border focus:outline-none transition-all ease-in-out duration-300 " +
                    (hasAddrDetail
                      ? "cursor-pointer border-yata "
                      : "text-[#EA5433] border-[#EEEEEE] bg-[#EEEEEE] ")
                  }
                >
                  {hasAddrDetail ? (
                    <>
                      <div className='flex flex-col items-start w-11/12 text-sm leading-4 '>
                        <span>{detail.name}</span>
                        <span>{detail.phone}</span>
                        <span className='break-all'>{`${detail.address1} ${areaText.district} ${areaText.region}`}</span>
                      </div>
                      {/* <button
                        className={
                          "relative object-contain m-w-[1rem] w-5 h-5 transition-all duration-150 opacity-100"
                        }
                        onClick={toggleUpdateAddrModal}
                      >
                        <Image
                          src='/cart/4.png'
                          width={30}
                          height={28}
                          alt='edit.png'
                        />
                      </button> */}
                    </>
                  ) : (
                    "請新增送貨地址"
                  )}
                </div>

                {/* <span className='mt-1 text-sm text-left'>送貨時間</span>
                <div
                  className='flex items-start justify-center w-full space-x-2'
                  onClick={toggleSelectAddr}
                >
                  <div
                    onClick={() => {
                      if (hasAddrDetail) {
                        setOpenCalendar(!openCalendar);
                      }
                    }}
                    className={
                      "border rounded h-12 px-1 w-full flex justify-between items-center transition-all ease-in-out duration-300 " +
                      (hasAddrDetail
                        ? "cursor-pointer border-yata "
                        : "text-[#EA5433] border-[#EEEEEE] bg-[#EEEEEE] ")
                    }
                  >
                    <div>請選擇送貨時間</div>
                    <Image
                      onClick={() => {}}
                      src='/cart/6.png'
                      className='mr-2 rotate-180'
                      width={12}
                      height={7}
                      alt=''
                    />
                  </div>
                  <div
                    onClick={() => {}}
                    className={
                      "border rounded h-12 px-2 w-1/2 lg:w-40 flex items-center justify-between transition-all ease-in-out duration-300 " +
                      (detail
                        ? "cursor-pointer border-yata "
                        : "text-[#EA5433] border-[#EEEEEE] bg-[#EEEEEE] ")
                    }
                  >
                    <div>請選擇送貨時段</div>
                    <Image
                      onClick={() => {}}
                      src='/cart/6.png'
                      className='mr-2 rotate-180'
                      width={12}
                      height={7}
                      alt=''
                    />
                  </div>
                </div> */}
              </div>
            )}
          </div>

          <div
            className={`overflow-hidden transition-all ease-in-out duration-300 ${
              expand == index ? "h-60" : "h-0"
            }`}
            onClick={detail?.address_id == "" ? toggleBeforeAddr : () => {}}
          >
            <div
              className={
                "flex flex-col w-full px-1 text-sm lg:px-3 " +
                (hasAddrDetail ? "" : "cursor-pointer")
              }
            >
              <label>賀卡上款 </label>
              <input
                type='text'
                disabled={detail?.address_id == ""}
                value={detail.greeting_cart_to}
                placeholder='請輸入上款'
                maxLength={50}
                className={
                  "h-9 px-2 border rounded w-full flex items-center focus:outline-none break-all break-words transition-all ease-in-out duration-300 " +
                  (hasAddrDetail
                    ? "border-yata "
                    : "cursor-pointer text-[#EA5433] placeholder-[#EA5433] border-[#EEEEEE] bg-[#EEEEEE] ")
                }
                onChange={(e) => handleGreetingMsg(e, "to")}
              />
            </div>
            <div
              className={
                "flex flex-col w-full px-1 text-sm lg:px-3 " +
                (hasAddrDetail ? "cursor-default" : "cursor-pointer")
              }
            >
              <label>賀卡內容 </label>
              <textarea
                disabled={detail?.address_id == ""}
                rows={3}
                wrap="hard"
                
                value={detail.greeting_cart_message}
                placeholder='請輸入賀語 (50字以內，最多3行)'
                maxLength={50}
                className={
                  "p-2 rounded border w-full flex resize-none whitespace-pre-wrap break-all break-words focus:outline-none transition-all ease-in-out duration-300 " +
                  (hasAddrDetail
                    ? "border-yata "
                    : "cursor-pointer text-[#EA5433] placeholder-[#EA5433] border-[#EEEEEE] bg-[#EEEEEE] ")
                }
                onChange={(e) => handleGreetingMsg(e, "msg")}
              />
            </div>
            <div
              className={
                "flex flex-col w-full px-1  text-sm lg:px-3 " +
                (hasAddrDetail ? "cursor-default" : "cursor-pointer")
              }
            >
              <label>賀卡下款 </label>
              <input
                disabled={detail?.address_id == ""}
                type='text'
                value={detail.greeting_cart_from}
                placeholder='請輸入下款'
                maxLength={50}
                className={
                  "h-9 px-2 rounded border w-full flex items-center focus:outline-none break-all break-words transition-all ease-in-out duration-300 " +
                  (hasAddrDetail
                    ? "border-yata "
                    : "cursor-pointer text-[#EA5433] placeholder-[#EA5433] border-[#EEEEEE] bg-[#EEEEEE] ")
                }
                onChange={(e) => handleGreetingMsg(e, "from")}
              />
            </div>
          </div>
        </div>

        <div className='hidden pr-3 lg:block lg:w-3/12'>
          <div className='flex justify-end h-[10%] '>
            <button
              className={
                "transition-all ease-in-out duration-300 " +
                (hamperDetail.length == 1
                  ? "text-[#DDD] cursor-default "
                  : "text-[#999] ")
              }
              disabled={hamperDetail.length == 1}
              onClick={handleRemove}
            >
              刪除
            </button>
          </div>
          <div className='flex items-center justify-end h-[80%] '>
            <button
              className='relative flex items-center text-sm min-w-fit text-yata-deep '
              onClick={() => setExpand(expand == index ? -1 : index)}
            >
              {
                expand == index
                  ? "收起"
                  : // <Image
                    //   src='/faq/minus.png'
                    //   width={28}
                    //   height={6}
                    //   alt='minus.png'
                    // />
                    "填寫賀卡資料"
                // <Image
                //   src='/faq/plus.png'
                //   width={28}
                //   height={28}
                //   alt='plus.png'
                // />
              }
            </button>
          </div>

          {/* <div className='flex items-center justify-between border border-[#EEEEEE] py-1.5 px-3 w-16 space-x-3 rounded-md'>
              <div>1</div>
              <div className='flex flex-col items-center space-y-1'>
                <Image
                  onClick={() => {}}
                  src='/cart/7.png'
                  className='rotate-180 cursor-pointer '
                  width={12}
                  height={6}
                  alt=''
                />
                <div></div>

                <Image
                  onClick={() => {}}
                  src='/cart/6.png'
                  className='rotate-180 cursor-pointer'
                  width={12}
                  height={6}
                  alt=''
                />
              </div>
            </div>
            <div className='text-[#999999]'>刪除</div> */}
        </div>
      </div>

      <AnimatedModalOverlay
        showModal={openCalendar}
        width={"24rem"}
        height={"auto"}
      >
        <CalendarPopup
          val={dateVal}
          setVal={setDateVal}
          show={openCalendar}
          setShow={setOpenCalendar}
          setDate={setDate}
        />
      </AnimatedModalOverlay>

      <AddAddressModal
        type={EModalType.update}
        addrInfo={editAddr!}
        showModal={openUpdateModal}
        setShowModal={setOpenUpdateModal}
        forHamper={true}
      />
      {/* <div
        className={
          "fixed inset-0 w-full h-full rounded-2xl items-center justify-center " +
          (openCalendar ? "flex bg-black bg-opacity-25" : "hidden")
        }
      > */}
      {/* </div> */}
    </>
  );
};

export default AddressBox;
