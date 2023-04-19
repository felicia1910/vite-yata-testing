import React, {
  useCallback,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import crypto from "crypto";
import { useRouter } from "next/router";

import AddressCard from "./AddressCard";
import ItemDisplayBox from "./ItemDisplayBox";
import TotalBill from "./TotalBill";
import HamperAddressModal from "../../modal/Address/HamperAddressModal";
import { IPaymentReqBody, IPaymentMethod } from "../../../utils/types";

import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { Fragment } from "react";
import PaymentMethodModal from "../../modal/PaymentMethodModal";
import {
  EWarningType,
  onCartCheckOut,
  onLoaded,
  onLoading,
  openFillAddressModal,
  openWarningModal,
  selectIsCheckOut,
  selectIsEdited,
  selectWindowSize,
} from "../../../redux/control/slice";
import {
  selectDeliveryDate,
  selectShippingMode,
  selectPickupStore,
  initShipmentDateTime,
} from "../../../redux/delivery/slice";
import {
  getPaymentMethodApi,
  createSalesOrderThunk,
  checkCartToConfirmationThunk,
} from "../../../redux/shopping/thunk";
import { selectAddressList } from "../../../redux/delivery/slice";
import {
  selectShoppingCartDetail,
  IShoppingCartDetail,
  selectCartQuoteType,
  IOrderDetail,
} from "../../../redux/shopping/slice";
import { selectUserInfo } from "../../../redux/auth/slice";
import WarningModal from "../../modal/WarningModal";
import {
  onRemoveCalendar,
  onShowCalendar,
  selectIsCalendarVisible,
} from "../../../redux/admin/slice";
import AdminAddress from "../../admin/AdminAddress";
import CartTab from "./CartTab";
import UnshippingItemModal from "../../modal/UnshippingItemModal";
import { IShoppingCartGroup } from "../../../redux/shopping/slice";
import EmailInput from "./EmailInput";

export const renderFormInputs = (
  paymentForm: IPaymentReqBody,
  setPaymentForm: Dispatch<SetStateAction<IPaymentReqBody>>,
  setFormInputs: Dispatch<SetStateAction<JSX.Element[]>>
) => {
  // const sign = genPaymentSign(paymentForm);
  const inputArr = [];
  for (let key in paymentForm) {
    const inputRow = (
      <input
        key={key}
        name={key}
        id={key}
        value={paymentForm[key]}
        onChange={(e) => {
          setPaymentForm({ ...paymentForm, [key]: e.target.value });
        }}
      />
    );
    inputArr.push(inputRow);
  }
  setFormInputs(inputArr);
  return inputArr;
};

export const initPaymentForm = {
  campaign: "",
  amt: 0,
  curr: "HKD",
  desc: "",
  lang: "tc",
  merCode: process.env.PAYMENT_API_MERCODE as string,
  merRef: "",
  notifyUrl: `${process.env.NEXTAUTH_URL}/shopping-cart/payment-notice`,
  returnUrl: `${process.env.NEXTAUTH_URL}/api/payment`,
  timeout: 20,
  signType: "SHA-256",
  ver: "1",
  sign: "",
};

export const genPaymentSign = (
  data: IPaymentReqBody,
  amt: number = data.amt,
  merRef: string = data.merRef
) => {
  const signStr = `amt=${amt}&campaign=${data.campaign}&curr=${data.curr}&desc=${merRef}&lang=${data.lang}&merCode=${data.merCode}&merRef=${merRef}&notifyUrl=${data.notifyUrl}&returnUrl=${data.returnUrl}&timeout=${data.timeout}&ver=${data.ver}&${process.env.PAYMENT_API_TOKEN}`;
  const sha256 = crypto.createHash("sha256").update(signStr).digest("hex");
  return sha256;
};

export default function ShoppingCart() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isCheckout = useAppSelector(selectIsCheckOut);
  const isEdited = useAppSelector(selectIsEdited);
  const windowSize = useAppSelector(selectWindowSize);
  const addressList = useAppSelector(selectAddressList);
  const detail = useAppSelector(selectShoppingCartDetail);
  const shippingMode = useAppSelector(selectShippingMode);
  const pickupStore = useAppSelector(selectPickupStore);
  const user = useAppSelector(selectUserInfo);
  // const shipmentDate = useAppSelector((state) => state.delivery.shipmentDate);
  // const deliveryDate = useAppSelector(selectDeliveryDate);
  const groupIdList = useAppSelector((state) => state.shopping.cartGroupId);
  const tabIdx = useAppSelector((state) => state.shopping.cartTabIdx);
  const chosenDateTime = useAppSelector(
    (state) => state.delivery.choseDateTime
  );
  const adminEditPage = router.pathname === "/admin/edit/[id]";
  const adminPickUpPage = router.pathname === "/admin/pickup/[id]";
  const cartQuoteType = useAppSelector(selectCartQuoteType);

  const [openPaymentModal, setOpenPaymentModal] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<IPaymentMethod[]>([]);
  const [errShow, setErrShow] = useState({ promoCode: false, email: false });
  const [email, setEmail] = useState({ isEdited: false, addr: "" });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [unshippingItems, setUnshippingItems] = useState<IShoppingCartGroup>();
  const [card, setCard] = useState<number | null>(null);
  const [formInputs, setFormInputs] = useState<JSX.Element[]>([]);
  // const [defaultAddrId, setDefaultAddrId] = useState<string>("");
  const [clickedAddr, setClickedAddr] = useState<string>("");
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [paymentForm, setPaymentForm] =
    useState<IPaymentReqBody>(initPaymentForm);

  const onMobile = windowSize == "mobile";
  const atPaymentPage = router.pathname === "/shopping-cart/confirmation";

  const checkInstanceOf = (object: any): object is IShoppingCartDetail => {
    return true;
  };

  useEffect(() => {
    if (router.pathname == "/shopping-cart/confirmation") {
      if (addressList && addressList.length > 0) {
        addressList.map((addr) => {
          if (
            detail &&
            detail.length > 0 &&
            detail[tabIdx].address_id == addr.id
          ) {
            setClickedAddr(addr.id!);
          }
          // if (addr.defaultAddress) setDefaultAddrId(addr.id!);
        });
      }
    }
  }, [addressList, detail]);

  useEffect(() => {
    if (shippingMode == "PU") setClickedAddr("");
  }, [shippingMode]);

  useEffect(() => {
    if (user) setEmail({ ...email, addr: user.email });
  }, [user]);

  // useEffect(() => {
  //   if (detail && detail.length > 0) {
  //     setPaymentForm({
  //       ...paymentForm,
  //       amt: parseFloat(parseFloat(detail[tabIdx].grand_total).toFixed(2)) * 100,
  //     });
  //   }
  // }, [detail]);

  useEffect(() => {
    renderFormInputs(paymentForm, setPaymentForm, setFormInputs);
  }, [paymentForm]);

  const updateAddrId = useCallback(
    (id: string): void => {
      setClickedAddr(id);
    },
    [setClickedAddr]
  );

  useEffect(() => {
    if (isSubmit && paymentForm.merRef != "") {
      const btn = document!.getElementById("payBtn");
      // console.log("btn", btn);
      btn?.click();
    }
  }, [isSubmit]);

  useEffect(() => {
    if (typeof window != "undefined") {
      window.scrollTo(0, 0);
    }
  }, [router]);

  const toggleSubmit = async () => {
    let allHasDate = true;
    groupIdList[0].map((grp) => {
      if (!grp.hasDate) {
        allHasDate = false;
      }
    });
    if (!allHasDate) {
      dispatch(
        openWarningModal({
          type: EWarningType.payment,
          text: "請選擇送貨 / 自取日期",
        })
      );
      return;
    }
    if (email.addr == "") {
      dispatch(
        openWarningModal({
          type: EWarningType.payment,
          text: "請填寫電郵地址",
        })
      );
      return;
    }
    if (detail && detail.length > 0) {
      if (paymentMethod.length > 1 && card == null) return;
      dispatch(onLoading());
      setOpenPaymentModal(false);
      const result = await dispatch(
        createSalesOrderThunk({
          email: email.addr,
          quote_uuid: detail[tabIdx].quote_uuid!,
          shipment_info: chosenDateTime,
        })
      );
      if (result.payload && result.payload.Success == 1) {
        const { order_no, grand_total } = result.payload;
        const amount = parseInt(grand_total);
        let newForm: IPaymentReqBody = {
          ...paymentForm,
          amt: amount,
          merRef: order_no,
          desc: order_no,
          sign: genPaymentSign(paymentForm, amount, order_no),
        };
        setPaymentForm(newForm);
        renderFormInputs(newForm, setPaymentForm, setFormInputs);

        setTimeout(() => {
          if (newForm.amt != 0 && newForm.merRef != "") {
            setIsSubmit(true);
          } else {
          }
        }, 700);
      } else {
        setOpenPaymentModal(false);
        setTimeout(() => {
          dispatch(onLoaded());
          dispatch(
            openWarningModal({
              type: EWarningType.payment,
              text: result.payload.error[0].message,
              back: true,
            })
          );
        }, 200);
      }
    }
  };

  const handlePaymentBtn = async () => {
    let allHasDate = true;
    groupIdList[0].map((grp) => {
      if (!grp.hasDate) {
        allHasDate = false;
      }
    });

    const { items } = (await getPaymentMethodApi()) as any;
    setPaymentMethod(items);
    setTimeout(async () => {
      if (!allHasDate) {
        dispatch(
          openWarningModal({
            type: EWarningType.payment,
            text: "請選擇送貨 / 自取日期",
          })
        );
        return;
      }
      if(email.isEdited==true) {
        dispatch(
          openWarningModal({
            type: EWarningType.payment,
            text: "請先確認訂單電郵地址",
          })
        );
        return
      }
      if (email.addr == "") {
        dispatch(
          openWarningModal({
            type: EWarningType.payment,
            text: "請填寫電郵地址",
          })
        );
        return;
      }
      if (items.length > 1) {
        setOpenPaymentModal(true);
      } else {
        await toggleSubmit();
      }
    }, 200);
  };

  const inputEmailInfo = useCallback(
    (email: { isEdited: boolean; addr: string }) => setEmail(email),
    [email]
  );

  const toggleNextProcess = async () => {
    const hasUnshippingItems = detail![tabIdx].shipment_group.find(
      (item) => item.id == 0
    );

    // To do guard logic to hamper type and non-hamper type
    if (cartQuoteType != 2) {
      if (
        shippingMode == "HD" &&
        (detail![tabIdx].address_id == "" || clickedAddr == "")
      ) {
        // dispatch(openLackAmountModal());
        dispatch(
          openWarningModal({
            type: EWarningType.payment,
            text: "請選擇送貨地址",
          })
        );
        return;
      } else if (shippingMode == "PU" && pickupStore == "") {
        // dispatch(openLackAmountModal());
        dispatch(
          openWarningModal({
            type: EWarningType.payment,
            text: "請選擇自取店舖",
          })
        );
        return;
      }
    }
    if (hasUnshippingItems) {
      setUnshippingItems(hasUnshippingItems);
      setShowModal(true);
      return;
    }

    dispatch(onLoading());
    setTimeout(async () => {
      const { payload } = await dispatch(
        checkCartToConfirmationThunk(detail![tabIdx].quote_uuid!)
      );
      if (payload.error) {
        dispatch(onLoaded());
        dispatch(
          openWarningModal({
            type: EWarningType.payment,
            text: payload.error,
          })
        );
        return;
      } else {
        // dispatch(setShoppingCartList(payload));
      }
      // dispatch(setCartTabIndex(0));
      router.push("/shopping-cart/confirmation");
      dispatch(initShipmentDateTime());
      dispatch(onCartCheckOut(true));
    }, 300);
  };

  // console.log("shopping cart detail: ", detail);
  // console.log("shopping group id list: ", groupIdList);
  // console.log("payment form: ", paymentForm);
  // console.log("current order: ", currentOrder);
  const showCalendar = useAppSelector(selectIsCalendarVisible);
  const { id } = router.query;
  const nextProcess = () => {
    dispatch(onShowCalendar());
    router.push(`/admin/pickup/${id}`);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const moveToNextPage = () => {
    router.push(`/admin/orders/${id}`);
    dispatch(onRemoveCalendar());
  };

  return (
    <>
      {detail && detail.length > 0 && checkInstanceOf(detail[tabIdx]) && (
        <div className='lg:mx-[9%] underLg:mx-[2%] lg:pb-28 lg:bg-transparent rounded-lg'>
          {/* {!adminEditPage && !adminPickUpPage && ( */}
          <>
            {detail.length > 1 && <CartTab />}
            <div className='h-12 py-4 mx-3 underLg:hidden'>
              {!isCheckout && (
                <div>加入購物車不代表成功購買貨品，庫存以結賬時為準</div>
              )}
            </div>
          </>
          {/* )} */}

          <div className='lg:flex lg:flex-row '>
            <div className='relative mb-4 bg-white rounded-xl lg:w-2/3 lg:mx-3'>
              <ItemDisplayBox detail={detail[tabIdx]} />
            </div>

            <div className=' lg:mx-3 lg:w-[30%] space-y-4'>
              {/* Show address box if not at hamper type */}
              {cartQuoteType != 2 && (
                <AddressCard
                  clickedAddrId={clickedAddr!}
                  setClickedAddrId={updateAddrId}
                />
              )}

              {/* Promo code container */}
              {(atPaymentPage && isCheckout) ||
                (adminPickUpPage && showCalendar && (
                  <div className='relative bg-white rounded-md'>
                    <div className='bg-grey-i rounded-tl-md rounded-tr-md'>
                      <h1 className='py-2 ml-3 text-lg font-bold'>
                        使用優惠碼/優惠券
                      </h1>
                    </div>

                    <div className='px-3 py-3'>
                      <div className='flex justify-between space-x-1'>
                        <input
                          placeholder='請輸入優惠碼/優惠券'
                          className='w-2/3 text-yata-brown border-[2px] py-2 px-4 lg:bg-grey-input rounded-md border-grey-input focus:bg-white focus:border-yata'
                          id='code'
                          type='text'
                        />
                        <button
                          onClick={() => {
                            setErrShow({ ...errShow, promoCode: true });
                          }}
                          className='flex justify-center w-1/3 py-2 text-lg text-white rounded bg-yata'
                        >
                          確認
                        </button>
                      </div>

                      {errShow.promoCode && (
                        <div className='mt-1 text-sm text-red-600'>
                          抱歉！此訂單不符合優惠使用條件
                        </div>
                      )}
                    </div>
                  </div>
                ))}

              {/* Remark container */}
              {/** {atPaymentPage && isCheckout && (
                <div className='relative bg-white rounded-md '>
                  <div className='bg-grey-i rounded-tl-md rounded-tr-md'>
                    <h1 className='py-2 ml-3 text-lg font-bold'>備註</h1>
                  </div>

                  <div className='flex justify-between px-3 py-3 space-x-1'>
                    <textarea
                      placeholder='請輸入備註'
                      className='w-full text-yata-brown border-[2px] py-2 px-4 lg:bg-grey-input rounded-md border-grey-input focus:bg-white focus:border-yata'
                    />
                  </div>
                </div>
              )} */}

              <TotalBill
                detail={detail[tabIdx] as IShoppingCartDetail & IOrderDetail}
              />

              {/* Email */}
              {atPaymentPage && isCheckout && (
                <EmailInput
                  email={email}
                  errShow={errShow}
                  setEmail={inputEmailInfo}
                  setErrShow={setErrShow}
                />
              )}

              {/* Payment button */}
              <>
                {!isCheckout && !isEdited && (
                  <>
                    {!adminEditPage && !adminPickUpPage && (
                      <button
                        className='flex justify-center py-2 mx-auto mt-8 mb-4 text-lg text-white rounded-full bg-yata-deep w-[48%] lg:w-44'
                        onClick={toggleNextProcess}
                      >
                        結帳
                      </button>
                    )}
                  </>
                )}
                {adminPickUpPage && showCalendar && (
                  <div className='flex items-center justify-center w-full mt-8 mb-4 space-x-4 lg:flex-col'>
                    <button
                      className='flex justify-center items-center py-2 text-lg text-white rounded-full bg-yata-deep w-[48%] lg:w-44'
                      onClick={moveToNextPage}
                    >
                      確認結帳
                    </button>
                  </div>
                )}

                {atPaymentPage && isCheckout && !isEdited && (
                  <div className='flex items-center justify-center w-full mt-8 mb-4 space-x-4 lg:flex-col'>
                    {onMobile && (
                      <button
                        className='flex items-center justify-center bg-grey-input py-2 text-lg border-2 rounded-full border-yata-deep text-yata-deep w-[48%] lg:w-44'
                        onClick={() => {
                          router.back();
                          setTimeout(() => {
                            dispatch(onCartCheckOut(false));
                          }, 100);
                        }}
                      >
                        返回購物車
                      </button>
                    )}
                    <button
                      className='flex justify-center items-center py-2 text-lg text-white rounded-full bg-yata-deep w-[48%] lg:w-44'
                      onClick={handlePaymentBtn}
                    >
                      確認結帳
                    </button>
                  </div>
                )}
              </>

              {/**  {!isCheckout && (
                <>
                  <div className='flex items-center justify-center w-full my-8'>
                    <div
                      className='p-1 text-center border rounded-sm cursor-pointer border-yata-brown w-28'
                      onClick={() => dispatch(openLackAmountModal())}
                    >
                      少於 HK$800
                    </div>
                  </div>
                  <LackAmountModal />
                </>
              )} */}
            </div>
          </div>

          {/* Payment modal */}
          <PaymentMethodModal
            openPaymentModal={openPaymentModal}
            setOpenPaymentModal={setOpenPaymentModal}
            paymentMethod={paymentMethod}
            card={card}
            setCard={setCard}
            paymentForm={paymentForm}
            setPaymentForm={setPaymentForm}
            onClick={async () => await toggleSubmit()}
          />
          <HamperAddressModal />
          <WarningModal />
          <UnshippingItemModal
            showModal={showModal}
            setShowModal={setShowModal}
            unshippingItems={unshippingItems}
            quoteId={detail![tabIdx].quote_uuid}
          />

          <button id='payBtn' className='hidden' form='payForm' type='submit' />
          {/* Form uses to call payment gateway */}
          <form
            className='hidden'
            id='payForm'
            name='payForm'
            method='post'
            action={process.env.PAYMENT_API_URL as string}
          >
            {formInputs.map((input, idx) => (
              <Fragment key={idx}>{input}</Fragment>
            ))}
          </form>
        </div>
      )}
    </>
  );
}
