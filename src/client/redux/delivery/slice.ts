import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getUserDeliveryInfoThunk, getShipmentDateTimeThunk } from './thunk';

export const timeSlot = ["13:00 - 17:00", "18:00 - 22:00"];

export enum EShippingMode {
  default = "default",
  delivery = "HD",
  selfPickup = "PU",
}

export interface IAddressInfo {
  [key: string]: string | boolean | number | undefined | null;
  id?: string;
  name: string;
  phone: string;
  email: string | null;
  defaultAddress?: boolean;
  country?: string | null;
  region: string;
  districtId: number;
  address1: string;
  address2?: string | null;
}

export interface IShippingInfo {
  shipment_mode: EShippingMode;
  pickup_location_code: string;
}

export type IFullShippingData = IAddressInfo & IShippingInfo;

export interface IShipmentDateTime {
  dqd_id: number;
  delivery_date: string;
  delivery_slot: string;
  delivery_week_day: number;
  quote_shipment_group_id: number;
}

export interface IUpdatingAddrId {
  id: string,
  idx: number,
}

export interface IDeliveryState {
  deliveryDate: string;
  deliveryTime: string;
  addressList: IAddressInfo[] | null;
  chosenAddr: IAddressInfo | null;
  hamperAddr: IAddressInfo | null;
  updatingAddrId: IUpdatingAddrId | null;
  shippingInfo: IShippingInfo;
  shipmentDate: string[];
  shipmentDateTime: IShipmentDateTime[][];
  choseDateTime: IShipmentDateTime[]
}

export const initialState: IDeliveryState = {
  deliveryDate: (new Date()).toISOString().split('T')[0],
  deliveryTime: timeSlot[0],
  addressList: null,
  chosenAddr: null,
  hamperAddr: null,
  updatingAddrId: null,
  shippingInfo: {
    shipment_mode: EShippingMode.delivery,
    pickup_location_code: "NTP",
  },
  shipmentDate: [],
  shipmentDateTime: [],
  choseDateTime: []
};

export const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    setDeliveryDate: (
      state: Draft<typeof initialState>,
      action: PayloadAction<string>
    ) => {
      state.deliveryDate = action.payload;
    },
    setDeliveryTime: (
      state: Draft<typeof initialState>,
      action: PayloadAction<string>
    ) => {
      state.deliveryTime = action.payload;
    },
    addNewAddress: (
      state: Draft<typeof initialState>,
      action: PayloadAction<IAddressInfo>
    ) => {
      state.addressList!.push(action.payload);
    },
    saveChosenAddr: (state, action: PayloadAction<IAddressInfo>) => {
      state.chosenAddr = action.payload;
    },
    setHamperAddr: (state, action: PayloadAction<IAddressInfo>) => {
      state.hamperAddr = action.payload;
    },
    removeHamperAddr: (state) => {
      state.hamperAddr = null;
    },
    setUpdatingAddrId: (state, action: PayloadAction<IUpdatingAddrId | null>) => {
      state.updatingAddrId = action.payload
    },
    setShippingMode: (state, action: PayloadAction<EShippingMode>) => {
      state.shippingInfo.shipment_mode = action.payload;
    },
    setPickupStore: (state, action: PayloadAction<string>) => {
      state.shippingInfo.pickup_location_code = action.payload;
    },
    setShipmentDate: (state, action: PayloadAction<string[]>) => {
      state.shipmentDate = action.payload;
    },
    initShipmentDateTime: (state) => {
      state.shipmentDateTime = [];
      state.choseDateTime = [];
    },
    setChosenDateTime: (state, action: PayloadAction<IShipmentDateTime>) => {
      const hasRecord = state.choseDateTime.find(item => item.quote_shipment_group_id == action.payload.quote_shipment_group_id)
      if (hasRecord) {
        state.choseDateTime = state.choseDateTime.map(item => {
          if (item.quote_shipment_group_id == action.payload.quote_shipment_group_id) {
            return action.payload
          } else return item
        })
      } else {
        state.choseDateTime.push(action.payload)
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUserDeliveryInfoThunk.fulfilled,
      (state, action: PayloadAction<IAddressInfo[]>) => {
        state.addressList = action.payload;
      }
    );
    builder.addCase(
      getShipmentDateTimeThunk.fulfilled,
      (state, action: PayloadAction<IShipmentDateTime[]>) => {
        state.shipmentDateTime = [...state.shipmentDateTime, action.payload]
      }
    );
  },
});

export const {
  addNewAddress,
  setDeliveryDate,
  setDeliveryTime,
  saveChosenAddr,
  setHamperAddr,
  removeHamperAddr,
  setShippingMode,
  setPickupStore,
  setShipmentDate,
  setUpdatingAddrId,
  initShipmentDateTime,
  setChosenDateTime
} = deliverySlice.actions;

export default deliverySlice.reducer;

export const selectAddressList = (state: RootState) =>
  state.delivery.addressList;
export const selectShippingMode = (state: RootState) =>
  state.delivery.shippingInfo.shipment_mode;
export const selectPickupStore = (state: RootState) =>
  state.delivery.shippingInfo.pickup_location_code;
export const selectDeliveryDate = (state: RootState) =>
  state.delivery.deliveryDate;
export const selectShipmentDateTime = (state: RootState) =>
  state.delivery.shipmentDateTime;
export const selectChoseAddr = (state: RootState) =>
  state.delivery.chosenAddr;
export const selectChoseHamperAddr = (state: RootState) =>
  state.delivery.hamperAddr;