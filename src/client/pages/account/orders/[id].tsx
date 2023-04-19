import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import AccountLayout from "../../../components/account/AccountLayout";
import OrderItem from "../../../components/account/OrderItem";

import { useAppSelector, useAppDispatch } from "../../../redux/store";
import {
  selectAdminGrabUserInfo,
  selectAdminUserInfo,
  selectIsAdmin,
  selectIsAuthenticated,
} from "../../../redux/auth/slice";
import { selectPickupStores } from "../../../redux/config/slice";
import { onLoaded, selectWindowSize } from "../../../redux/control/slice";
import {
  IShoppingCartGroup,
  IOrderGroup,
  IHamperCustDetail,
} from "../../../redux/shopping/slice"; //new
import { getOrderDetailThunk } from "../../../redux/auth/thunk";
import {
  IShoppingCartDetail,
  IOrderDetail,
} from "../../../redux/shopping/slice";
import Image from "next/image";
import { Fragment } from "react";
import TotalBill from "../../../components/shopping/ShoppingCart/TotalBill";
import PaymentModal from "../../../components/admin/PaymentModal";
import Loading from "../../../components/common/Loading";

type IFullOrderDetail = IShoppingCartDetail & IOrderDetail;

const OrderDetail = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAdmin = useAppSelector(selectIsAdmin);
  const adminUser = useAppSelector(selectAdminUserInfo);
  const adminGrabUser = useAppSelector(selectAdminGrabUserInfo);
  const pickupStores = useAppSelector(selectPickupStores);
  const windowType = useAppSelector(selectWindowSize);
  const onLaptop = windowType === "laptop";

  const [order, setOrder] = useState<IFullOrderDetail[] | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("redirectUrl", router.asPath);
      router.push("/login");
    }
    (async () => {
      const { id } = router.query;
      const result = await dispatch(getOrderDetailThunk(id as string));
      if (result.payload) setOrder(result.payload);
      else setOrder([]);
    })();
    dispatch(onLoaded());
  }, [isAuthenticated, router]);

  const handleReturn = () => {
    router.push("/account/orders");
  };

  const toggleAdminPaymentModal = () => {
    if (isAdmin && adminGrabUser) setShowModal(true);
  };

  const genStoreName = useCallback((code: string) => {
    const matchedStore = pickupStores.find(
      (store) => store.location_code == code
    );

    return matchedStore ? matchedStore.chinese_name : "";
  }, []);

  const genHamperDetail = (item: IFullOrderDetail & IHamperCustDetail) => {
    const hamperDetail = [
      {
        title: "送貨地址",
        content: `${item.district_name_c} ${item.address1}` ?? "",
      },
      { title: "收件人", content: item.name ?? "" },
      { title: "電話號碼", content: item.phone ?? "" },
      { title: "賀卡上款", content: item.greeting_cart_to ?? "" },
      { title: "賀卡內容", content: item.greeting_cart_message ?? "" },
      { title: "賀卡下款", content: item.greeting_cart_from ?? "" },
    ];

    return (
      <>
        {hamperDetail.map((detail, idx) => (
          <div key={`hamper-detail-${idx}`} className='flex '>
            <span className='mr-2 font-semibold min-w-[5rem] '>{`${detail.title} : `}</span>
            <span className='break-words break-all '>{detail.content}</span>
          </div>
        ))}
      </>
    );
  };

  const hamperType = order && order.length > 0 && order[0].order_type == 2;

  return (
    <>
      <Loading isLoading={!order} />
      <div className={"lg:min-h-[60vh]"}>
        {isAuthenticated && (
          <AccountLayout title='訂單記錄' isRequired={true} isBack={true}>
            {order &&
              order.map((item, idx) => {
                const grp = item.shipment_group as (IShoppingCartGroup &
                  IOrderGroup)[];
                return (
                  <Fragment key={`order-detail-${idx}`}>
                    <div className='flex justify-between w-full px-2 py-3 lg:items-center lg:px-0'>
                      <div className='flex justify-center space-x-3 font-semibold lg:items-center'>
                        <button
                          className='relative w-5 h-5'
                          onClick={handleReturn}
                        >
                          <Image
                            src='/myAccount/orderhistory/return.png'
                            alt='back-icon'
                            layout='fill'
                          />
                        </button>
                        <span className='text-base lg:text-lg'>
                          訂單編號：{item.order_no}
                        </span>
                      </div>

                      <div className='flex flex-col items-center justify-center space-y-2 lg:space-y-0 lg:space-x-3 lg:flex-row'>
                        {isAdmin && adminGrabUser && (
                          // Button to open payment modal for admin
                          <button
                            className='flex items-center justify-center px-2 py-1 space-x-1 font-bold border border-dashed rounded-md cursor-pointer w-28 border-yata'
                            onClick={toggleAdminPaymentModal}
                          >
                            <span className='text-xs text-yata lg:text-sm '>
                              付款
                            </span>
                          </button>
                        )}
                        {!isAdmin && (
                          <>
                            {/* Button to contact us */}
                            <button
                              className='flex items-center justify-center px-2 py-1 space-x-1 font-bold border border-dashed rounded-md cursor-pointer border-yata'
                              onClick={() => {
                                router.push({
                                  pathname: "/contact-us",
                                  query: { orderNo: router.query.id },
                                });
                              }}
                            >
                              <div className='relative w-4 h-4'>
                                <Image
                                  src='/myAccount/orderhistory/inquiry.png'
                                  alt='enquiry'
                                  layout='fill'
                                />
                              </div>
                              <span className='text-xs text-yata lg:text-sm min-w-fit'>
                                查詢訂單
                              </span>
                            </button>

                            {/* Button to download invoice */}
                            {/* TODO: wait for API ready */}
                            {/* <button
                          className='flex items-center justify-center px-2 py-1 space-x-1 font-bold border border-dashed rounded-md cursor-pointer border-yata-brown'
                          onClick={() => {
                            router.push({
                              pathname: "/contact-us",
                              query: { orderNo: router.query.id },
                            });
                          }}
                        >
                          <div className='relative w-4 h-4'>
                            <Image
                              src='/myAccount/orderhistory/view.png'
                              alt='enquiry'
                              layout='fill'
                            />
                          </div>
                          <span className='text-xs lg:text-sm min-w-fit'>
                            查看發票
                          </span>
                        </button> */}
                          </>
                        )}
                      </div>
                    </div>
                    <hr />

                    {/* Basic info of the order */}
                    <div className='w-full px-2 py-3 text-base lg:px-0'>
                      <div className='flex flex-col lg:flex-wrap lg:flex-row '>
                        <div className='mr-8 my-0.5 lg:my-1 flex'>
                          <span className='w-32 font-medium lg:w-auto lg:mr-1'>
                            訂單狀態：{" "}
                          </span>
                          <span className='break-words break-all text-yata-deep '>
                            {item.order_status}
                          </span>
                        </div>
                        <div className='mr-8 my-0.5 lg:my-1 flex'>
                          <span className='w-32 font-medium lg:w-auto lg:mr-1'>
                            訂單日期及時間：{" "}
                          </span>
                          <span className='break-words break-all '>
                            {item.order_date}
                          </span>
                        </div>
                        <div className='mr-8 my-0.5 lg:my-1 flex'>
                          <span className='w-32 font-medium lg:w-auto lg:mr-1'>
                            取貨方式：{" "}
                          </span>
                          <span className='break-words break-all '>
                            {item.shipment_mode_name_c}
                          </span>
                        </div>
                      </div>

                      {!hamperType && (
                        <div className='flex flex-col lg:flex-wrap lg:flex-row '>
                          <div className='mr-6 my-0.5 lg:my-1 flex lg:min-w-[11rem]'>
                            <span className='w-32 font-medium lg:w-auto lg:mr-1'>
                              收件人：{" "}
                            </span>
                            <span className='break-words break-all '>
                              {item.name}
                            </span>
                          </div>
                          {item.shipment_mode == "PU" && (
                            <div className='mr-6 my-0.5 lg:my-1 flex'>
                              <span className='w-32 font-medium lg:w-auto lg:mr-1'>
                                自取店舖：{" "}
                              </span>
                              <span className='break-words break-all '>
                                {genStoreName(item.pickup_location_code)}
                              </span>
                            </div>
                          )}
                          {item.shipment_mode == "HD" && (
                            <div className='mr-6 my-0.5 lg:my-1 flex'>
                              <span className='w-32 min-w-[6rem] font-medium lg:min-w-0 lg:w-auto lg:mr-1'>
                                送貨地址：{" "}
                              </span>
                              <span className='break-words break-all '>
                                {item.address}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className='flex flex-col lg:flex-wrap lg:flex-row '>
                        {!hamperType && (
                          <div className='mr-6 my-0.5 lg:my-1 lg:min-w-[11rem] flex'>
                            <span className='w-32 font-medium lg:w-auto lg:mr-1'>
                              電話號碼：{" "}
                            </span>
                            <span className='break-words break-all '>
                              {item.phone}
                            </span>
                          </div>
                        )}
                        <div className='mr-6 my-0.5 lg:my-1 flex'>
                          <span className='w-32 font-medium lg:w-auto lg:mr-1'>
                            電郵地址：{" "}
                          </span>
                          <span className='break-words break-all '>
                            {item.email}
                          </span>
                        </div>
                      </div>
                    </div>

                    {grp &&
                      grp.map((el, i: number) => {
                        return (
                          <Fragment key={`order-shpt-grp-${i}`}>
                            <div className='w-full p-2 text-base rounded lg:px-4 lg:py-5 bg-yata-brown-light '>
                              <div className='flex '>
                                <span className='min-w-[5rem] mr-2 font-semibold '>
                                  運單編號：{" "}
                                </span>
                                <span>{el.shipment_no}</span>
                              </div>
                              <div className='flex '>
                                <span className='min-w-[5rem] mr-2 font-semibold '>
                                  {item.shipment_mode == "HD" ? "送貨" : "取貨"}
                                  日期：{" "}
                                </span>
                                <span>{`${el.shipment_date}`}</span>
                              </div>
                              <div className='flex '>
                                <span className='min-w-[5rem] mr-2 font-semibold '>
                                  運單狀態：{" "}
                                </span>
                                <span>{el.shipment_status_c}</span>
                              </div>
                              {item.order_type == 2 &&
                                genHamperDetail(el as any)}
                            </div>

                            <OrderItem
                              data={el.item_lines}
                              total={el.total_group_amount_with_discount}
                            />
                          </Fragment>
                        );
                      })}
                    <div className='justify-end w-full lg:flex'>
                      <div className='w-full lg:w-96'>
                        <TotalBill detail={item} />
                      </div>
                    </div>
                    {/* <div className='flex font-bold'>
                  <span className='p-2 text-sm lg:py-4 lg:text-lg'>
                    註：上述產品總額未包含運費，或與已付訂單總額有所差異。
                  </span>
                </div> */}
                  </Fragment>
                );
              })}
            <PaymentModal isShowing={showModal} setIsShowing={setShowModal} />
          </AccountLayout>
        )}
      </div>
    </>
  );
};

export default OrderDetail;

// {
//   /* <div className="mx-3 lg:border border-grey rounded-2xl">
//             <OrderItem data={data1} total="$3,743.00" />
//           </div>
//           <div className="mx-3 mt-6 lg:border border-grey rounded-2xl">
//             <OrderItem data={orders[1]} total="$278.00" />
//           </div> */
// }
