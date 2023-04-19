import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDefaultAddr } from "../../utils/getDefaultAddr";
import { IChangeShippingModeData } from "../../utils/types";
import { loginFailure } from "../auth/slice";
import { onLoaded, onLoading } from "../control/slice";
import { RootState } from "../store";
import {
  IAddressInfo,
  IFullShippingData,
  setPickupStore,
  setShippingMode,
  setShipmentDate,
setDeliveryDate,
} from "./slice";

export const getUserDeliveryInfoThunk = createAsyncThunk(
  "delivery/getUserDeliveryInfo",
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const accessToken = localStorage.getItem("adb2c_access_token");

    dispatch(onLoading());
    try {
      if (accessToken) {
        const res = await fetch(
          `${process.env.APP_API_URL_DLVY}/Delivery/GetDeliveryInfos`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const result = await res.json();

        if (res.status == 200 && result.isSuccess == true) {
          const deliveryInfo = result.deliveryInfo;
          const sortedAddr = deliveryInfo
            .reverse()
            .sort((x: IAddressInfo, y: IAddressInfo) => {
              return Number(y.defaultAddress) - Number(x.defaultAddress);
            });
          // console.log('delivery info: ', sortedAddr)
          dispatch(onLoaded());
          return sortedAddr;
        } else {
          dispatch(loginFailure("帳戶過期，需重新登入"));
          return;
        }
      }
    } catch (error) {
      dispatch(onLoaded());
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const saveNewDeliveryAddressApi = async (newAddr: IAddressInfo) => {
  const accessToken = localStorage.getItem("adb2c_access_token");
  try {
    const res = await fetch(
      `${process.env.APP_API_URL_DLVY}/Delivery/AddDeliveryInfo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newAddr),
      }
    );
    // console.log('post addr: ', res)
    if (res.status == 200) {
      return { success: true };
    } else {
      return { success: false, error: res.status };
    }
  } catch (error) {
    return { success: false, error: error };
  }
};

export const deleteDeliveryAddressThunk = createAsyncThunk(
  "delivery/deleteDeliveryAddress",
  async (addrId: string, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const accessToken = localStorage.getItem("adb2c_access_token");

    try {
      if (accessToken) {
        const res = await fetch(
          `${process.env.APP_API_URL_DLVY}/Delivery/DeleteDeliveryInfo`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ id: addrId }),
          }
        );
        const result = await res.json();
        if (res.status == 200 && result.isSuccess == true) {
          await dispatch(getUserDeliveryInfoThunk());
          return result.isSuccess;
        } else {
          return false;
        }
      } else {
        dispatch(loginFailure("帳戶過期，需重新登入"));
        return;
      }
    } catch (error) {
      // dispatch(onLoaded())
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const updateDeliveryInfoThunk = createAsyncThunk(
  "delivery/getUserDeliveryInfo",
  async (updatedAddr: IAddressInfo, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const accessToken = localStorage.getItem("adb2c_access_token");

    // console.log('post data of update addr: ', updatedAddr)
    try {
      if (accessToken) {
        const res = await fetch(
          `${process.env.APP_API_URL_DLVY}/Delivery/UpdateDeliveryInfo`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(updatedAddr),
          }
        );
        const result = await res.json();

        if (res.status == 200 && result.isSuccess == true) {
          dispatch(getUserDeliveryInfoThunk());
          return result.isSuccess;
        } else {
          return false;
        }
      } else {
        dispatch(loginFailure("帳戶過期，需重新登入"));
        return;
      }
    } catch (error) {
      dispatch(onLoaded());
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const changeShippingModeThunk = createAsyncThunk<
  any,
  IFullShippingData,
  { state: RootState }
>("delivery/changeShippingMode", async (shippingData, thunkAPI) => {
  const { dispatch, getState, rejectWithValue } = thunkAPI;
  const { auth, delivery } = getState();
  const { memberNo, email, mobile, firstName, lastName } = auth.crmUser!;
  const addrList: IAddressInfo[] = delivery.addressList!;
  const defaultAddr = getDefaultAddr(addrList)

  let postData: IChangeShippingModeData = {
    ...shippingData,
    MemberNo: memberNo as string,
    name: shippingData.name !== "" ? shippingData.name : `${firstName} ${lastName}`,
    phone: shippingData.phone !== "" ? shippingData.phone : mobile,
    email: shippingData.email !== "" ? shippingData.email : email
  };
  if (defaultAddr != null && shippingData.districtId == 0) {
    postData = {
      ...postData,
      name:  defaultAddr.name,
      phone:  defaultAddr.phone,
      email:  defaultAddr.email,
      districtId:  defaultAddr.districtId,
      address1:  defaultAddr.address1,
      address2: "",
    }
  }
  // console.log('changeCartShipmentMode post data: ', postData)
  
  try {
    dispatch(setShippingMode(shippingData.shipment_mode));
    if (shippingData.shipment_mode == "PU") {
      dispatch(setPickupStore(shippingData.pickup_location_code));
      localStorage.setItem(
        "pickup_location_code",
        shippingData.pickup_location_code
        );
      }
    // console.log('shipping data in change shipping mode thunk: ', shippingData)
    // console.log("change shipping mode post data:", postData);
    const res = await fetch(
      `${process.env.EC_API_URL}/cart/changeCartShipmentMode`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      }
    );
    // console.log('change shipping mode res:', res)

    const result = await res.json();
    if (res.status == 200) {
      return result.data.changeCartShipmentMode.items;
    } else {
      return rejectWithValue({ error: result });
    }
  } catch (error) {
    return rejectWithValue({ error: error });
  }
});

export const getShipmentDate = createAsyncThunk(
  "delivery/getShipmentDate",
  async (_, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    const state = getState() as any;
    const shippingMode = state.delivery.shippingInfo.shipment_mode;
    const pickupStore = state.delivery.shippingInfo.pickup_location_code;

    // console.log("get wish list", postData);
    try {
      const postData = {
        shipment_mode: shippingMode,
        pickup_location_code: pickupStore,
      };
      const res = await fetch(
        `${process.env.EC_API_URL}/cart/getShipmentDate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
          redirect: "follow",
        }
      );
      const result = await res.json();
      // console.log(result);
      if (res.status == 200) {
        dispatch(setShipmentDate(result.data.getShipmentDate.items));
        // dispatch(setDeliveryDate(result.data.getShipmentDate.items[0]))
        return result.data.getShipmentDate.items;
      }
    } catch (error) {
      console.log('get shipment date error: ',error);
      throw error;
    }
  }
);

export const getShipmentDateTimeThunk = createAsyncThunk<any, number, {state: RootState}>(
  "delivery/getShipmentDateTime",
  async (id: number, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    const state = getState();
    const shippingMode = state.delivery.shippingInfo.shipment_mode;
    const pickupStore = state.delivery.shippingInfo.pickup_location_code;
    const cartType = state.shopping.cartQuoteType

    try {
      // console.log("getShipmentDateTime data: ", cartType,shippingMode );
      const data_shipment_mode = cartType != 2 ? shippingMode : 'HD';
      
      const postData = {
        shipment_mode: data_shipment_mode,
        pickup_location_code: data_shipment_mode != 'HD' ? pickupStore : '' ,
        quote_shipment_group_id: id
      };
      console.log("getShipmentDateTime data: ", postData);
      const res = await fetch(
        `${process.env.EC_API_URL}/cart/getShipmentDate2`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
          redirect: "follow",
        }
      );
      // console.log('getShipmentDateTime response: ', res);

      const result = await res.json();
      // console.log('getShipmentDateTime result: ', result);
      if (res.status == 200) {
        // dispatch(setShipmentDate(result.data.getShipmentDate.items));
        // dispatch(setDeliveryDate(result.data.getShipmentDate.items[0]))
        return result.data.getShipmentDate.items;
      }
    } catch (error) {
      console.log('get shipment date error: ',error);
      throw error;
    }
  }
);
