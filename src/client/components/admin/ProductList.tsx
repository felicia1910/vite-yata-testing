import Image from "next/image";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import {
  onExchangeNotConfirmed,
  onItemNoRefund,
  onItemRefund,
  onNoRefund,
  onRefund,
  onRemoveExchange,
  selectIsExchangeChosen,
  selectIsExchangeConfirmed,
  selectIsItemRefund,
  selectIsRefund,
  getItemList,
  getProductList,
  getExchangeList,
} from "../../redux/admin/slice";
import { useAppSelector } from "../../redux/store";
import { useAppDispatch } from "./../../redux/store";
import { Items } from "./../../redux/admin/slice";
import {  selectIsCheckOut, selectIsEdited } from "../../redux/control/slice";

interface Products {
  id: number;
  shipmentNo: string;
  date: string;
  time: string;
  status: string;
  items: Items[];
  total: string;
}
type Props = {
  data: Products[],
};

const ProductList = ({ data }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isEdited = useAppSelector(selectIsEdited);
  const isCheckout = useAppSelector(selectIsCheckOut);
  const refund = useAppSelector(selectIsRefund);
  const exchangeConfirmed = useAppSelector(selectIsExchangeConfirmed);
  const [selectShipmentItem, SetSelectShipmentItem] = useState <Items>();
  const adminRefundPage = router.pathname === "/admin/refund/[id]";
  if (adminRefundPage) {
    dispatch(onRefund());
  } else {

    dispatch(onNoRefund());
    dispatch(onItemNoRefund());
    dispatch(onRemoveExchange());
    dispatch(onExchangeNotConfirmed());
    dispatch(getProductList([]));
    dispatch(getItemList(null));
    dispatch(getExchangeList([]));

  }

  const itemSelected = useAppSelector(selectIsItemRefund);
  const exchange = useAppSelector(selectIsExchangeChosen);
  const handleClick = (el: any, item: Items) => {
    SetSelectShipmentItem(item);
    dispatch(onItemRefund());
    dispatch(getProductList(el));
    dispatch(getItemList(item));
  };

  return (
    <div>
      {data.map((el, i) => {
        return (
          <Fragment key={i}>
            <div className="w-full bg-[#F7FFE8] flex flex-col p-4 gap-y-1 my-8 text-base lg:text-lg">
              <span>
                <b>Shipment number:</b>&nbsp;{el.shipmentNo}
              </span>
              <span>
                <b>Delivery Date:</b>&nbsp;{el.date}
              </span>
              <span>
                <b>Delivery Time:</b>&nbsp;{el.time}
              </span>
              <span>
                <b>Shipment status:</b>&nbsp;{el.status}
              </span>
            </div>
            <div className={`mb-2 flex flex-col ${refund && "border"}`}>
              <div className="relative flex flex-row mx-2 ">
                <div
                  className={`my-2 text-lg lg:w-[14%] ${
                    refund && "lg:w-[16.2%]"
                  }`}
                />
                <div
                  className={`my-2 text-lg lg:w-[31%] underLg:hidden ${
                    refund && "lg:w-[29.9%]"
                  }`}
                >
                  產品信息
                </div>
                <div className="my-2 text-lg lg:w-[12%] underLg:hidden ">
                  價格
                </div>
                <div className="my-2 text-lg lg:w-[13%] underLg:hidden lg:pl-1">
                  數量
                </div>
                <div className="my-2 text-lg lg:pl-2 lg:w-[14%] underLg:hidden">
                  小計
                </div>
                {refund && (
                  <div className="my-2 text-lg lg:pl-4 lg:w-[14%] underLg:hidden">
                    退貨數量
                  </div>
                )}
              </div>

              <div>
                {el.items.length > 0 &&
                  el.items.map((item, i) => (
                    <div
                      key={i}
                      className="lg:flex w-full justify-center items-start"
                    >
                      {/**part 1 */}
                      {refund && (
                        <div
                          onClick={
                            exchange ? () => {} : () => handleClick(el.id, item)
                          }
                          className="lg:flex items-center lg:h-32 hidden px-1 cursor-pointer transition-all ease-in-out"
                        >
                          {selectShipmentItem?.plu == item.plu &&
                          itemSelected ? (
                            <Image
                              src="/common/tick-box.png"
                              alt=""
                              width={24}
                              height={24}
                            />
                          ) : (
                            <Image
                              src="/admin/Rectangle 205.png"
                              alt=""
                              width={22}
                              height={22}
                            />
                          )}
                        </div>
                      )}

                      {/**part 2 */}

                      <div
                        className={`relative flex flex-row transition-all duration-300 ease-in-out items-center min-w-[22rem] h-32 border lg:border-0 lg:border-l ${
                          !exchangeConfirmed ? "lg:border-r" : "lg:border"
                        } mt-1 flex-1 w-9/12"`}
                      >
                        <div className="flex items-center pl-2 lg:w-2/12 lg:h-32 lg:border-t lg:border-b">
                          <button
                            className="relative object-contain w-[6.4rem] lg:w-full lg:max-w-[7rem] border aspect-square"
                            onClick={() => router.push(`/product/${item.plu}`)}
                          >
                            <Image
                              src={item.images_url ?? ""}
                              layout="fill"
                              alt=""
                            />
                          </button>
                        </div>

                        <div className="h-full px-1 py-2 ml-2 lg:m-0 lg:w-5/12 lg:lg:h-32 lg:border-t lg:border-b">
                          <div className="flex flex-col justify-between h-full lg:ml-2">
                            <div>
                              <div
                                className={
                                  "line-clamp-2 max-w-[12rem] pr-1 font-semibold sm:max-w-[18rem] transition-all duration-150 " +
                                  (isEdited || isCheckout
                                    ? "pointer-events-none"
                                    : "cursor-pointer hover:underline hover:underline-offset-2")
                                }
                                onClick={() =>
                                  isEdited || isCheckout
                                    ? {}
                                    : router.push(`/product/${item.plu}`)
                                }
                              >
                                {item.full_name_c}
                              </div>

                              <div className="text-sm font-light ">
                                {item.plu}
                              </div>
                              {/* Price in mobile view */}
                              <div className="flex flex-row items-center bottom-2 lg:hidden">
                                {item.rsp ? (
                                  <>
                                    <div className="text-lg font-semibold text-red-text">
                                      ${item.psp}
                                    </div>
                                    <div className="text-xs line-through text-grey-deep sm:text-sm">
                                      ${item.rsp}
                                    </div>
                                  </>
                                ) : (
                                  <div className="text-lg font-semibold text-red-text">
                                    ${item.psp}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Price in laptop view */}
                        <div className="hidden my-auto lg:block lg:w-2/12 lg:h-32 lg:border-t lg:border-b lg:pt-12">
                          {item.rsp ? (
                            <>
                              <div className="text-lg font-semibold text-red-text">
                                ${item.psp}
                              </div>
                              <div className="text-sm line-through text-grey-deep">
                                ${item.rsp}
                              </div>
                            </>
                          ) : (
                            <div className="text-lg font-semibold text-red-text">
                              ${item.psp}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col items-end my-auto lg:items-start lg:pt-11 underLg:overflow-hidden lg:w-2/12 underLg:absolute underLg:right-1 underLg:bottom-1 lg:h-32 lg:border-t lg:border-b">
                          <div className="relative inline-block mb-1 transition-all ease-in-out">
                            <div
                              className={
                                "flex rounded transition-all ease-in-out w-12 lg:w-8"
                              }
                            >
                              <div
                                className={
                                  "px-2 py-1 w-8 transition-all ease-in-out text-right"
                                }
                              >
                                <div className="font-mono text-lg text-right w-full">
                                  {/**windowSize == "mobile" && */}
                                  {item.qty}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="hidden lg:block lg:pt-12 lg:w-2/12 lg:my-auto aspect-square lg:h-32 lg:border-t lg:border-b ">
                          <div className="text-lg font-semibold text-red-text">
                            ${item.psp}
                          </div>
                        </div>
                      </div>

                      <div className="w-2/12 mt-1 lg:block hidden border-r">
                        {!refund &&
                          (i == 0 ? (
                            <div
                              className={`hidden lg:block lg:my-auto h-32 border-t ${
                                i == el.items.length - 1 && " border-b"
                              }`}
                            >
                              <div className="pl-6 pt-3">
                                產品總額:
                                <div className="text-lg font-semibold text-red-text">
                                  ${el.total}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                              className={`hidden lg:block lg:my-auto h-32 ${
                                i == el.items.length - 1 && " border-b"
                              }`}
                            ></div>
                          ))}

                        {refund && (
                          <div
                            className={`hidden lg:block lg:my-auto h-32  ${
                              i == 0 && "border-t"
                            } ${exchangeConfirmed && "border-b border-t"}`}
                          >
                            <div className="flex h-full justify-center items-center w-full">
                              {selectShipmentItem?.plu == item.plu &&
                              itemSelected ? (
                                <>
                                  <div className="border-2 font-medium px-2.5 rounded-md">
                                    1
                                  </div>
                                  {exchangeConfirmed && (
                                    <div className="ml-2 mt-1">
                                      {" "}
                                      <Image
                                        src="/homepage/heart-default.svg"
                                        alt=""
                                        width={28}
                                        height={28}
                                      />
                                    </div>
                                  )}
                                </>
                              ) : (
                                <Image
                                  src="/admin/Rectangle 202.png"
                                  alt=""
                                  width={28}
                                  height={28}
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default ProductList;
