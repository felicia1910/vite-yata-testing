import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import formattedNum from "../../../utils/contents/formattedNum";

import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  onLoaded,
  onLoading,
  openFillAddressModal,
  selectIsCheckOut,
  selectIsEdited,
  selectWindowSize,
} from "../../../redux/control/slice";
import {
  timeSlot,
  selectDeliveryDate,
  setDeliveryDate,
  selectShipmentDateTime,
  setChosenDateTime,
} from "../../../redux/delivery/slice";
import {
  addItemWishList,
  ICartItemQty,
  IShoppingCartGroup,
  IUpdateCartInfo,
  removeItemWishList,
  selectCartQuoteType,
  setCartGroupId,
  setCartQuoteType,
  setCartTabIndex,
  setHamperDescription,
} from "../../../redux/shopping/slice";
import {
  IShoppingCartItem,
  selectShoppingCartDetail,
} from "../../../redux/shopping/slice";
import {
  getHamperDetailThunk,
  removeHamperThunk,
  removeWishList,
  updateWishList,
} from "../../../redux/shopping/thunk";
import { transferWeekday } from "../../../utils/transferWeekday";
import { IShipmentDateTime } from "../../../redux/delivery/slice";
import AddressAndMsgDetail from "../../modal/Address/AddressAndMsgDetail";

type Props = {
  grpIdx: number;
  shipmentGrp: IShoppingCartGroup;
  shippingMode: string;
  quoteUUID: string;
  deliveryFeeLogic: string;
  deliveryAmount: string;
  totalDiscountAmount: string;
  diffAmount: string;
  quoteType: number;
  updateCart: IUpdateCartInfo;
  setUpdateCart: Dispatch<SetStateAction<IUpdateCartInfo>>;
  setWishlist:Dispatch<SetStateAction<boolean>>;
  wishlist:boolean;
};

type ItemListWithID = ICartItemQty & {
  quote_item_id: number;
};

const ShipmentGroupItems = ({
  grpIdx,
  shipmentGrp,
  shippingMode,
  quoteUUID,
  deliveryAmount,
  totalDiscountAmount,
  diffAmount,
  quoteType,
  updateCart,
  setUpdateCart,
  setWishlist,
  wishlist,
}: Props) => {
  const {
    shipment_group_code,
    description_c,
    item_total_qty,
    item_lines,
    need_shipment_date,
  } = shipmentGrp;
  const calDlvyFeeAmt = parseFloat(deliveryAmount);
  const initItemQty = {
    quote_uuid: quoteUUID,
    shipment_group_code: shipment_group_code,
    shipment_mode: shippingMode,
    item_lines: [],
  };
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isEdited = useAppSelector(selectIsEdited);
  const isCheckout = useAppSelector(selectIsCheckOut);
  const windowSize = useAppSelector(selectWindowSize);
  const shipmentDateTime = useAppSelector(selectShipmentDateTime);
  const detail = useAppSelector(selectShoppingCartDetail);
  const groupIdList = useAppSelector((state) => state.shopping.cartGroupId);
  const tabIdx = useAppSelector((state) => state.shopping.cartTabIdx);
  const cartQuoteType = useAppSelector(selectCartQuoteType);

  const [timeList, setTimeList] = useState<IShipmentDateTime[]>([]);
  const [dateIdx, setDateIdx] = useState(-1);
  const [likes, setLikes] = useState<IShoppingCartItem[]>([]);
  const [diffAmounts, setDiffAmounts] = useState({
    diff: 0,
    per: 0,
  });

  const onHamperCheckout = cartQuoteType == 2 && isCheckout;
  const atShoppingCartPage = router.pathname === "/shopping-cart";

  // console.log("itemQty in shopping cart: ", item_lines);
  // console.log("date val: ", deliveryDate);
  // console.log("item qty: ", itemQty);
  // console.log("shipment date time: ", shipmentDateTime);
  // console.log("detail: ", detail![tabIdx]);
  // console.log("likes", likes);

  const checkCount = (qty: number, count: number) => {
    if ((qty > 0 && count > 0) || (qty > 1 && count < 0)) {
      return qty + count;
    } else return qty;
  };

  useEffect(() => {
    dispatch(setDeliveryDate(new Date().toISOString().split("T")[0]));
    const itemList = item_lines?.filter((item, idx, self) => {
      return idx == self.findIndex((i) => i.plu === item.plu);
    });
    setLikes(itemList);
  }, [item_lines]);
  

  useEffect(() => {
    if (
      detail &&
      shipmentDateTime.length > 0 &&
      shipmentDateTime.length == detail[tabIdx].shipment_group!.length
    ) {
      const filteredList = shipmentDateTime.filter((info) => {
        // console.log("date time info: ", info);
        if (info.length > 0) {
          return info[0].quote_shipment_group_id == shipmentGrp.id;
        }
      })[0];

      // console.log("filtered list: ", filteredList);
      setTimeList(filteredList ?? []);
    }
  }, [shipmentDateTime]);

  useEffect(() => {
    const diff = calDlvyFeeAmt - parseFloat(diffAmount);
    const percent =
      parseFloat(diffAmount) / calDlvyFeeAmt > 1
        ? 1
        : parseFloat(diffAmount) / calDlvyFeeAmt;

    setDiffAmounts({ diff: parseFloat(diff.toFixed(2)), per: percent });
  }, [shipmentGrp, isEdited]);

  const toggleQtyChange = (quoteItemId: number, add: number) => {
    // if (code === updateCart.shipment_group_code) {
    const newCartDisplay = {
      ...updateCart,
      item_lines: updateCart.item_lines.map((item) => {
        if (item.quote_item_id === quoteItemId) {
          return { ...item, qty: checkCount(item.qty, add) };
        } else {
          return item;
        }
      }),
    };
    setUpdateCart(newCartDisplay);
  };

  const inputQtyChange = (quoteItemId: number, add: number) => {
    // if (code === updateCart.shipment_group_code) {
    const newCartDisplay = {
      ...updateCart,
      item_lines: updateCart.item_lines.map((item) => {
        if (item.quote_item_id === quoteItemId) {
          return { ...item, qty: add };
        } else {
          return item;
        }
      }),
    };
    setUpdateCart(newCartDisplay);
  };

  const toggleDelete = (code: string, sku: string, quoteItemId: number) => {
    // if (code === updateCart.shipment_group_code) {
    const newCartDisplay = {
      ...updateCart,
      item_lines: updateCart.item_lines.filter(
        (item) => !(item.quote_item_id == quoteItemId)
      ),
    };
    // console.log("after delete:", newCartDisplay);
    setUpdateCart(newCartDisplay);
  };

  const handleHamperRemove = async (item: IShoppingCartItem) => {
    dispatch(onLoading());
    await setTimeout(async () => {
      if (item_lines.length == 1) {
        dispatch(setCartTabIndex(tabIdx > 0 ? tabIdx - 1 : 0));
        dispatch(
          setCartQuoteType(
            tabIdx > 0
              ? detail![tabIdx - 1].quote_type
              : detail!.length > 1
              ? detail![1].quote_type
              : -1
          )
        );
      }
      const result = await dispatch(
        removeHamperThunk({
          quote_id: item.quote_id,
          product_id: item.product_id,
        })
      );
      if (result.payload) dispatch(onLoaded());
    }, 200);
  };

  const genGrpIcon = (code: string) => {
    switch (code) {
      case "HD-1":
        return "/cart/9.png";
      case "HD-2":
        return "/cart/1.png";
      case "HD-7":
      case "HD-8":
        return "/cart/hamper.png";
      default:
        return "";
    }
  };
  const genGrpBgColor = (code: string, id: number) => {
    if (id == 0) {
      return "#EEEEEE";
    }
    switch (code) {
      case "HD-1":
        return "#EDFCD8";
      case "HD-7":
      case "HD-8":
        return "#DBEA99";
      case "HD-2":
        return "#FFFAC2";
      case "PU-1":
        return "#FFE9AB";
      case "PU-2":
        return "#F4CCD8";
      default:
        return "";
    }
  };
  const genGrpItemQty = (item: IShoppingCartItem) => {
    // if (code === updateCart.shipment_group_code) {
    if (atShoppingCartPage) {
      const updatedItem = updateCart.item_lines.find(
        (itm) => itm.quote_item_id === item.quote_item_id
      );
      if (updatedItem && updatedItem.qty) return updatedItem.qty;
      else 1;
    } else {
      return item.qty;
    }
    // }
  };
  const getDateString = (time: IShipmentDateTime) => {
    return `${time.delivery_date} (${transferWeekday(
      time.delivery_week_day
    )}) ${time.delivery_slot}`;
  };

  const toggleDateSelecting = (idx: number) => {
    const newList = groupIdList.map((ls, i) => {
      if (i == 0) {
        return ls.map((grp) => {
          if (grp.id == timeList[idx].quote_shipment_group_id)
            return {
              ...grp,
              hasDate: true,
            };
          else return grp;
        });
      } else return ls;
    });
    setDateIdx(idx);
    dispatch(setChosenDateTime(timeList[idx]));
    dispatch(setCartGroupId(newList));
  };

  const openHamperModal = async (item: IShoppingCartItem) => {
    const result = await dispatch(
      getHamperDetailThunk({
        quote_id: item.quote_id,
        product_id: item.product_id,
      })
    );
    if (result.payload) {
      dispatch(
        setHamperDescription({
          full_name_c: item.full_name_c,
          plu: item.plu,
          amount: item.rsp,
          images: item.images,
        })
      );
      dispatch(openFillAddressModal());
    }
  };
  const getAppointedLike = useCallback(
    (item: IShoppingCartItem) => {
      if (likes.length > 0) {
        return likes.filter((like) => like.plu == item.plu)[0];
      }
    },
    [item_lines, likes]
  );

  // const calAmount = () => {
  //   if (shipment_group_code == "HD-1") {
  //     const diff = parseFloat(deliveryAmount) - parseFloat(diffAmount);
  //     const diffPer = diff / parseFloat(deliveryAmount);
  //     return { diff, diffPer };
  //   }
  // };


  const toggleItemWishlistChange = (quoteItemId: number ) => {
    // if (code === updateCart.shipment_group_code) {
    const newCartDisplay = {
      ...updateCart,
      item_lines: updateCart.item_lines.map((item) => {
        if (item.quote_item_id === quoteItemId) {
          return { ...item, wish_list:item.wish_list==0?1:0 };
        } else {
          return item;
        }
      }),
    };
    setUpdateCart(newCartDisplay);
    setWishlist(!wishlist)
  };

  const likeChangeHandler = async (item: IShoppingCartItem) => {
    toggleItemWishlistChange(item.quote_item_id)
    if (item.wish_list == 0) {
      setLikes(
        likes.map((like) => {
          if (like.plu == item.plu) {
            return { ...like, wish_list: 1 };
          } else return like;
        })
      );
    setTimeout(async () => {
      dispatch(
        addItemWishList({ idx: tabIdx, grpIdx: grpIdx, plu: item.plu })
        );
        await dispatch(updateWishList(item.plu));
      }, 500);
    } else {
      setLikes(
        likes.map((like) => {
          if (like.plu == item.plu) {
            return { ...like, wish_list: 0 };
          } else return like;
        })
        );
      setTimeout(async () => {
        dispatch(
          removeItemWishList({ idx: tabIdx, grpIdx: grpIdx, plu: item.plu })
        );

        await dispatch(removeWishList(item.plu));
      }, 500);
      // console.log("likes: ", likes);
    }
  };

  const renderPricing = useCallback(
    (item: IShoppingCartItem) => {
      const amtDiff = +item.rsp - +item.psp;
      if (amtDiff != 0) {
        return (
          <>
            <div className='text-lg font-semibold text-red-text'>
              ${item.psp}
            </div>
            <div className='text-xs line-through text-grey-deep sm:text-sm'>
              ${item.rsp}
            </div>
          </>
        );
      } else
        return (
          <div className='text-lg font-semibold text-red-text'>${item.rsp}</div>
        );
    },
    [item_lines]
  );

  return (
    <>
      <div className='mb-2'>
        <div
          className={
            "flex justify-between px-1 py-2 lg:flex-nowrap lg:items-center lg:flex-row " +
            (need_shipment_date == 1 ? "flex-col flex-wrap " : " items-center ")
          }
          style={{
            backgroundColor: genGrpBgColor(shipment_group_code, shipmentGrp.id),
          }}
        >
          <div
            className={
              need_shipment_date == 1 ? "underLg:w-full" : "underLg:w-[60%]"
            }
          >
            <div className='flex flex-row py-1 mx-1 '>
              <div className='relative object-contain w-6 h-6'>
                {genGrpIcon(shipment_group_code) && (
                  <Image src={genGrpIcon(shipment_group_code)} layout='fill' />
                )}
              </div>
              <div
                className={
                  "mx-1 font-semibold text-yata-brown " +
                  (shipmentGrp.id == 0 ? "text-red-text" : "")
                }
              >
                {shipmentGrp.id == 0 && "*以下產品"}
                {description_c} (共 {item_total_qty} 件產品)
              </div>
            </div>

            {/* Amount message */}
            {deliveryAmount != "" && calDlvyFeeAmt > 0 && (
              <>
                {parseFloat(diffAmount) > calDlvyFeeAmt ? (
                  <div className='mx-1 lg:py-1'>
                    <span className='text-sm underLg:text-xs'>您已買滿</span>
                    <span className='text-sm font-semibold underLg:text-xs text-yata'>
                      $
                      {formattedNum(
                        parseFloat(totalDiscountAmount),
                        calDlvyFeeAmt,
                        true
                      )}
                    </span>
                    <span className='text-sm underLg:text-xs'>
                      *，可享免費送貨
                    </span>
                    <span className='mx-1 text-sm underLg:hidden text-red-text'>
                      (*不包括商戶直送及現金券等)
                    </span>
                  </div>
                ) : (
                  <div className='mx-1 lg:py-1'>
                    <span className='text-sm underLg:text-xs'>再購物</span>
                    <span className='text-sm font-semibold underLg:text-xs text-yata'>
                      ${diffAmounts.diff}
                    </span>
                    <span className='text-sm underLg:text-xs'>
                      *，可享免費送貨
                    </span>
                    <span className='mx-1 text-sm underLg:hidden text-red-text'>
                      (*不包括商戶直送及現金券等)
                    </span>
                  </div>
                )}
                <div className='mx-1 text-sm underLg:text-xs lg:hidden text-red-text'>
                  (*不包括商戶直送及現金券等)
                </div>

                <div className='flex my-1 ml-1 max-w-[24rem]'>
                  <div className='w-11/12 bg-white border rounded-full '>
                    <div
                      className='py-2 border rounded-full bg-yata'
                      style={{
                        width: `${diffAmounts.per * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </>
            )}
            {shipment_group_code == "HD-2" && (
              <div className='mx-1 text-sm underLg:text-xs'>
                {cartQuoteType != 1 ? (
                  "產品預計送貨時間為5-10日, 由商戶直送"
                ) : (
                  <>
                    <p>
                      產品將由供應商負責送貨，供應商將於預售活動後聯絡顧客安排，
                    </p>{" "}
                    <p>一切以供應商最後安排為準</p>
                  </>
                )}
              </div>
            )}
          </div>

          {/* In YATA shipping group and when checkout */}
          {need_shipment_date == 1 && isCheckout && (
            <div
              className={
                " flex flex-col justify-center px-2 py-2 mx-2 my-2 bg-white rounded-md " +
                (need_shipment_date == 1
                  ? "underLg:max-w-[24rem] "
                  : "underLg:w-[40%] ")
              }
            >
              <div className='underLg:text-xs'>
                {shipment_group_code.includes("PU")
                  ? "取貨日期"
                  : "送貨日期 (一田直送)"}
              </div>
              <div className='my-2 lg:flex lg:flex-row'>
                <div className='lg:relative underLg:text-xs'>
                  {/* Shipment Date Time List */}
                  <select
                    // defaultValue={dateIdx}
                    value={dateIdx}
                    className='flex items-center justify-start h-8 pl-1 text-sm border rounded min-w-fit  lg:min-w-[5rem] focus:outline-none underLg:w-full underLg:my-1 underLg:text-xs select1 pr-7 border-yata '
                    onChange={(e) => {
                      const idx = parseInt(e.target.value);
                      toggleDateSelecting(idx);
                    }}
                  >
                    <option value={-1} disabled>
                      請選擇日子
                    </option>
                    {timeList.length > 0 &&
                      timeList.map((time, idx) => (
                        <option
                          value={idx}
                          label={getDateString(time)}
                          key={`date-list-${idx}`}
                        >
                          {getDateString(time)}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          )}
          {shipment_group_code == "HD-2" && (
            <div className='mx-1 text-sm underLg:text-xs'>
              <div>*商戶將直接聯絡您以安排送貨</div>
            </div>
          )}
        </div>

        <div
          className='relative flex flex-row mx-2 '
          style={{ opacity: shipmentGrp.id == 0 ? 0.7 : 1 }}
        >
          <div className='my-2 text-lg lg:w-2/12' />
          <div className='my-2 text-lg lg:w-4/12 underLg:hidden lg:pl-3'>
            產品信息
          </div>
          <div className='my-2 text-lg lg:w-2/12 underLg:hidden'>價格</div>
          <div className='my-2 text-lg lg:w-1/12 underLg:hidden'>數量</div>
          <div className='my-2 text-lg lg:pl-2 lg:w-2/12 underLg:hidden'>
            小計
          </div>
          <div className='my-2 text-lg text-center lg:w-1/12 underLg:hidden'>
            操作
          </div>
        </div>

        <div>
          {item_lines?.length > 0 &&
            item_lines.map((item) => (
              <div
                key={`${shipment_group_code}-item=${item.quote_item_id}`}
                className={`flex flex-col transition-all duration-300 ease-in-out min-w-[22rem]  ${
                  genGrpItemQty(item)
                    ? `${
                        onHamperCheckout ? "h-auto " : "h-36 "
                      } border mx-2 mt-1 ` +
                      (shipmentGrp.id == 0 ? "bg-grey-input " : "")
                    : "h-0 border-0 m-0"
                }`}
                style={{ opacity: shipmentGrp.id == 0 ? 0.7 : 1 }}
              >
                <div
                  className={`relative flex flex-row transition-all duration-300 ease-in-out w-full h-full ${
                    onHamperCheckout ? "items-start py-2 " : "items-center "
                  }`}
                >
                  {genGrpItemQty(item) ? (
                    <>
                      <div className='flex items-center pl-2 lg:w-2/12'>
                        <button
                          className='relative object-contain w-[6.4rem] lg:w-full lg:max-w-[7rem] border aspect-square '
                          disabled={isEdited || isCheckout}
                          onClick={() =>
                            router.push(
                              `/product/${item.plu}?quote_type=${quoteType}`
                            )
                          }
                        >
                          {item.images[0] && item.images[0].images_url && (
                            <>
                              {shipmentGrp.id == 0 && (
                                <div className='absolute inset-0 z-50 bg-grey-input/70' />
                              )}
                              <Image
                                src={item.images[0]?.images_url ?? ""}
                                layout='fill'
                              />
                            </>
                          )}
                        </button>
                      </div>

                      <div className='h-full px-1 py-2 ml-2 lg:m-0 lg:w-4/12'>
                        <div className='flex flex-col justify-between h-full lg:ml-2'>
                          <div>
                            <div
                              className={
                                "line-clamp-2 max-w-[12rem] pr-1 font-semibold sm:max-w-[18rem] transition-all duration-150 leading-5 " +
                                (isEdited || isCheckout
                                  ? "pointer-events-none"
                                  : "cursor-pointer hover:underline hover:underline-offset-2")
                              }
                              onClick={() =>
                                isEdited || isCheckout
                                  ? {}
                                  : router.push(
                                      `/product/${item.plu}?quote_type=${quoteType}`
                                    )
                              }
                            >
                              {item.full_name_c}
                            </div>
                            {(item.size_code != "" ||
                              item.color_code != "") && (
                              <div>
                                {item.color_c} / {item.size_code}
                              </div>
                            )}
                            <div className='text-sm font-light '>
                              {item.plu}
                            </div>

                            {/* Hamper address in laptop view */}
                            {onHamperCheckout && (
                              <div className='hidden pr-2 lg:block w-[120%] '>
                                <AddressAndMsgDetail
                                  detail={shipmentGrp as any}
                                />
                              </div>
                            )}

                            {/* Hamper modal button */}
                            {cartQuoteType == 2 && !isCheckout && (
                              <button
                                className='flex justify-center p-1 my-1 text-xs bg-white border rounded-md lg:text-sm border-yata-deep text-yata-deep lg:w-44'
                                onClick={() => openHamperModal(item)}
                              >
                                更改數量及填寫送貨詳情
                              </button>
                            )}

                            {/* Price in mobile view */}
                            <div className='flex flex-row items-center bottom-2 lg:hidden'>
                              {renderPricing(item)}
                            </div>
                          </div>
                          {item.promotions.map((promo, idx) => {
                            if (promo.promotion_c_description != "") {
                              return (
                                <div
                                  key={"cart-item-promo-" + idx}
                                  className='text-sm underLg:max-w-[7rem] font-semibold truncate max text-red-text'
                                >
                                  {promo.promotion_c_description}
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>

                      {/* Price in laptop view */}
                      <div
                        className={`hidden lg:w-2/12 ${
                          onHamperCheckout
                            ? "h-20 lg:flex flex-col justify-center "
                            : "my-auto lg:block "
                        }`}
                      >
                        {renderPricing(item)}
                      </div>

                      {/* Item quantity */}
                      <div
                        className={
                          "flex flex-col items-end lg:items-start underLg:overflow-hidden lg:w-1/12 underLg:absolute underLg:right-1 underLg:bottom-0 " +
                          (onHamperCheckout
                            ? "lg:h-20 lg:justify-center "
                            : "my-auto ")
                        }
                      >
                        <div className='relative inline-block mb-1 transition-all ease-in-out'>
                          <div
                            className={
                              "flex rounded transition-all ease-in-out duration-200 w-12 " +
                              (isEdited ? "border lg:w-[3.5rem] " : "lg:w-8 ")
                            }
                          >
                            <div className='w-8 py-1 pr-1 text-left underLg:pl-1 '>
                              <div className='w-full font-mono text-lg text-right'>
                                {windowSize == "mobile" && isEdited ? (
                                  <input
                                    className='w-8 focus-visible:outline-none '
                                    onChange={(e) => {
                                      if (!e.target.value) {
                                        return;
                                      }
                                      inputQtyChange(
                                        item.quote_item_id,
                                        parseInt(e.target.value)
                                      );
                                    }}
                                    defaultValue={genGrpItemQty(item)}
                                    type='number'
                                  />
                                ) : (
                                  genGrpItemQty(item)
                                )}
                              </div>
                            </div>

                            {isEdited && windowSize == "laptop" && (
                              <div
                                className={`transition-all ease-in-out ${
                                  isEdited ? "pl-1 " : "px-0"
                                }`}
                              >
                                <button
                                  className='absolute w-3 aspect-[11/6] bottom-2'
                                  onClick={() => {
                                    toggleQtyChange(item.quote_item_id, -1);
                                  }}
                                >
                                  <Image src='/cart/7.png' layout='fill' />
                                </button>
                                <button
                                  className='absolute w-3 aspect-[11/6] top-2'
                                  onClick={() => {
                                    toggleQtyChange(item.quote_item_id, 1);
                                  }}
                                >
                                  <Image src='/cart/6.png' layout='fill' />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className='flex items-center justify-end px-1 space-x-1 lg:hidden'>
                          <span className='text-sm lg:hidden '>小計</span>
                          <span className='text-xl font-bold text-red-text '>
                            $
                            {parseFloat(item.discount_amount) != 0
                              ? item.row_total_with_discount
                              : item.row_total}
                          </span>
                        </div>
                      </div>

                      {/* Row total */}
                      <div
                        className={
                          "hidden lg:pl-2 lg:w-2/12 " +
                          (onHamperCheckout
                            ? "h-20 lg:flex flex-col justify-center "
                            : "lg:my-auto lg:block ")
                        }
                      >
                        <div className='text-lg font-semibold text-red-text'>
                          $
                          {parseFloat(item.discount_amount) != 0
                            ? item.row_total_with_discount
                            : item.row_total}
                        </div>
                      </div>

                      {!isEdited && likes.length > 0 && (
                        <div
                          className={
                            "absolute flex flex-col items-center space-y-2 top-2 lg:w-1/12 lg:relative right-2 lg:right-0 lg:top-0 " +
                            (cartQuoteType == 3 ? "h-20 lg:justify-center" : "")
                          }
                        >
                          <button
                            className='relative object-contain w-6 h-6'
                            onClick={async () =>
                              await likeChangeHandler(getAppointedLike(item)!)
                            }
                          >
                            <Image
                              src={
                                getAppointedLike(item) &&
                                getAppointedLike(item)?.wish_list
                                  ? "/homepage/heart-selected.svg"
                                  : "/cart/heart-default.svg"
                              }
                              layout='fill'
                            />
                          </button>

                          {/* Show hamper detail button */}
                          {cartQuoteType == 2 && !isCheckout && (
                            <button
                              className='relative object-cover w-5 h-6'
                              onClick={async () =>
                                await handleHamperRemove(item)
                              }
                            >
                              <Image src='/cart/10.png' layout='fill' />
                            </button>
                          )}
                        </div>
                      )}
                      {isEdited && (
                        <button
                          className='absolute items-center justify-center top-2 lg:flex lg:w-1/12 lg:relative right-2 lg:right-0 lg:top-0'
                          onClick={() => {
                            toggleDelete(
                              shipment_group_code,
                              item.sku,
                              item.quote_item_id
                            );
                          }}
                        >
                          <div className='relative object-cover w-5 h-6'>
                            <Image src='/cart/10.png' layout='fill' />
                          </div>
                        </button>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                {onHamperCheckout && (
                  <div className='px-2 pb-4 lg:hidden '>
                    <AddressAndMsgDetail detail={shipmentGrp as any} />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ShipmentGroupItems;
