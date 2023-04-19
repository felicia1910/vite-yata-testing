import { useRouter } from "next/router";
import React, { useEffect, useRef, useState, useCallback } from "react";
import AccountLayout from "../../../components/account/AccountLayout";
import { selectIsAuthenticated } from "../../../redux/auth/slice";
import {
  onLoaded,
  onLoading,
  openWarningModal,
  selectIsLoading,
  selectWindowSize,
} from "../../../redux/control/slice";
import { useAppSelector } from "../../../redux/store";
import { useAppDispatch } from "../../../redux/store";
import { selectUserInfo } from "../../../redux/auth/slice"; //new
import { getOrderHistoryThunk } from "../../../redux/auth/thunk";
import {
  IOrderHistory,
  IPaymentMethod,
  IPaymentReqBody,
} from "../../../utils/types";
import { Fragment } from "react";
import {
  initPaymentForm,
  genPaymentSign,
  renderFormInputs,
} from "../../../components/shopping/ShoppingCart";
import {
  getPaymentMethodApi,
  tryRepaymentApi,
} from "../../../redux/shopping/thunk";
import PaymentMethodModal from "../../../components/modal/PaymentMethodModal";
import { EWarningType } from "../../../redux/control/slice";
import WarningModal from "../../../components/modal/WarningModal";
import Loading from "../../../components/common/Loading";

const Order = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const checkMember = useAppSelector(selectUserInfo);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const windowType = useAppSelector(selectWindowSize);
  const isLoading = useAppSelector(selectIsLoading);
  const onLaptop = windowType === "laptop";
  const onMobile = windowType === "mobile";

  const [openPaymentModal, setOpenPaymentModal] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [orders, setOrders] = useState<IOrderHistory[] | null>(null);
  const [card, setCard] = useState<number | null>(null);
  const [formInputs, setFormInputs] = useState<JSX.Element[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<IPaymentMethod[]>([]);
  const [orderAmt, setOrderAmt] = useState<{ total: string; no: string }>({
    total: "",
    no: "",
  });
  const [paymentForm, setPaymentForm] =
    useState<IPaymentReqBody>(initPaymentForm);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("redirectUrl", router.asPath);
      router.push("/login");
    }

    (async () => {
      const result = await dispatch(getOrderHistoryThunk());
      // console.log("get order history result: ", result.payload);
      if (result.type == "auth/getOrderHistory/rejected") {
        return;
      }

      setOrders(result.payload);
    })();
  }, [isAuthenticated, router]); //

  const handleClick = (order_no: any) => {
    console.log("id", order_no);
    router.push(`/account/orders/${order_no}`);
  };

  const toggleRepayment = async (grand_total: string, mer_ref: string) => {
    if (openPaymentModal) setOpenPaymentModal(false);
    dispatch(onLoading());
    const result = await tryRepaymentApi(mer_ref);
    if (result) {
      if (result.success == true) {
        const amount = parseInt(grand_total);
        let newForm: IPaymentReqBody = {
          ...paymentForm,
          amt: amount,
          merRef: mer_ref,
          desc: mer_ref,
          sign: genPaymentSign(paymentForm, amount, mer_ref),
        };
        console.log("new form: ", newForm);
        setPaymentForm(newForm);
        renderFormInputs(newForm, setPaymentForm, setFormInputs);

        setTimeout(() => {
          // console.log("in time out");
          if (newForm.amt != 0 && newForm.merRef != "") {
            console.log("go to set submit");
            setIsSubmit(true);
          } else {
            // console.log("err", newForm);
          }
        }, 700);
      } else {
        dispatch(onLoaded());
        dispatch(
          openWarningModal({
            type: EWarningType.payment,
            text: result.err ?? "",
          })
        );
      }
    }
  };

  const togglePaymentMethod = async (grand_total: string, mer_ref: string) => {
    const { items } = (await getPaymentMethodApi()) as any;
    setPaymentMethod(items);
    setOrderAmt({
      total: grand_total,
      no: mer_ref,
    });
    setTimeout(async () => {
      if (items.length > 1) {
        setOpenPaymentModal(true);
      } else {
        await toggleRepayment(grand_total, mer_ref);
      }
    }, 200);
  };

  useEffect(() => {
    if (isSubmit && paymentForm.merRef != "") {
      const btn = document!.getElementById("payBtn");
      // console.log("btn", btn);
      btn?.click();
    }
  }, [isSubmit]);

  return (
    <>
      {/* isAuthenticated &&  */}
      {isAuthenticated && (
        <>
          <Loading isLoading={!orders} />
          <AccountLayout title='訂單記錄' isRequired={true}>
            <>
              <div className='text-lg font-bold px-2 py-3 border-b-2 border-[#B49D86] w-full'>
                訂單記錄
              </div>
              <table className='w-full mt-5 space-y-3'>
                <tr className='text-sm font-normal text-left text-white lg:text-lg bg-yata'>
                  <th className='px-1 py-3 text-base font-medium rounded-tl-lg lg:px-2 '>
                    訂單日期
                  </th>
                  {/* <th className="py-2 lg:px-1 txl:px-3">送貨 / 取貨日期</th> */}
                  <th className='px-1 py-3 text-base font-medium lg:px-2'>
                    訂單編號
                  </th>
                  <th className='px-1 py-3 text-base font-medium lg:px-2'>
                    訂單總額($)
                  </th>
                  <th className='px-1 py-3 text-base font-medium lg:px-2'>
                    訂單狀態
                  </th>
                  <th className='px-1 py-3 text-base font-medium rounded-tr-lg lg:px-2 '>
                    詳情
                  </th>
                </tr>
                {orders &&
                  orders.length > 0 &&
                  orders.map((order, i) => {
                    return (
                      <Fragment key={order.order_no}>
                        <tr
                          key={i}
                          className='text-sm font-normal lg:text-base'
                        >
                          <td className='p-1 py-2 text-left border lg:px-2 lg:py-3 border-gray'>
                            {" "}
                            {order.order_date}
                          </td>
                          {/* <td className="px-2 py-3 text-left border border-gray">
                          {order.shipping}
                        </td> */}
                          <td className='p-1 text-left border lg:px-2 lg:py-3 border-gray'>
                            {order.order_no}
                          </td>
                          <td className='p-1 text-left border lg:px-2 lg:py-3 border-gray'>
                            ${order.grand_total}
                          </td>
                          <td className='p-1 text-left border lg:px-2 lg:py-3 border-gray'>
                            {order.order_status}
                          </td>
                          <td className='p-1 text-left border lg:px-2 lg:py-3 border-gray'>
                            <button
                              className='px-1 py-1 text-xs font-bold border rounded-md cursor-pointer lg:px-2 border-yata text-yata-deep lg:w-20 txl:w-full txl:text-sm'
                              onClick={() => handleClick(order.order_no)}
                            >
                              查看訂單
                            </button>
                            {(order.order_state == 7 ||
                              order.order_state == 2) && (
                              <button
                                className='px-1 py-1 text-xs font-bold border rounded-md cursor-pointer lg:px-2 border-yata text-yata-deep lg:w-20 txl:w-full txl:text-sm'
                                onClick={async () => {
                                  togglePaymentMethod(
                                    order.payment_grand_total,
                                    order.mer_ref
                                  );
                                }}
                              >
                                重新付款
                              </button>
                            )}
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })}
              </table>
            </>
            <PaymentMethodModal
              openPaymentModal={openPaymentModal}
              setOpenPaymentModal={setOpenPaymentModal}
              paymentMethod={paymentMethod}
              card={card}
              setCard={setCard}
              paymentForm={paymentForm}
              setPaymentForm={setPaymentForm}
              onClick={async () =>
                await toggleRepayment(orderAmt.total, orderAmt.no)
              }
            />
          </AccountLayout>
          {/* {onLaptop && (
          )} */}
          {/* {onMobile && <Orders />} */}

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
        </>
      )}
      <WarningModal />
    </>
  );
};

export default Order;
