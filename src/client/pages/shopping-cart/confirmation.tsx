import React, { useEffect, useLayoutEffect } from "react";
import ShoppingCart from "../../components/shopping/ShoppingCart";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import {
  EWarningType,
  openWarningModal,
  selectIsCheckOut,
} from "../../redux/control/slice";
import FullLoading from "../../components/common/FullLoading";
import { getShipmentDateTimeThunk } from "../../redux/delivery/thunk";
import { selectShipmentDateTime } from "../../redux/delivery/slice";

const Confirmation = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isCheckout = useAppSelector(selectIsCheckOut);
  const groupIdList = useAppSelector((state) => state.shopping.cartGroupId);
  const tabIdx = useAppSelector((state) => state.shopping.cartTabIdx);
  const shipmentDateTime = useAppSelector(selectShipmentDateTime);

  useLayoutEffect(() => {
    (async () => {
      if (groupIdList && groupIdList.length > 0) {
        groupIdList[0].map(
          async (grp) => await dispatch(getShipmentDateTimeThunk(grp.id))
        );
      }
      // await dispatch(getShipmentDate());
    })();
    if (router.isReady) {
      if (!isCheckout) {
        router.push("/shopping-cart");
      }
    }
  }, [router, groupIdList]);

  useEffect(() => {
    if (shipmentDateTime.length > 0) {
      const noValidDate = shipmentDateTime.every((info) => info.length == 0);
      const hasVendorDlvy = groupIdList[0].find((grp) => grp.needDate == 0);
      // console.log("noValidDate", noValidDate);
      // console.log("hasVendorDlvy", hasVendorDlvy);
      if (noValidDate && !hasVendorDlvy) {
        dispatch(
          openWarningModal({
            type: EWarningType.payment,
            text: "您所選的送貨地址暫時未有送貨時段提供",
            back: true,
          })
        );
      }
    }
  }, [shipmentDateTime]);

  return (
    <>
      {isCheckout ? (
        <div className='bg-grey underLg:py-4'>
          <ShoppingCart />
        </div>
      ) : (
        <div className='h-screen'>
          <FullLoading />
        </div>
      )}
    </>
  );
};

export default Confirmation;
