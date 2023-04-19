import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCategoryListThunk, getPickupStoresThunk } from './thunk';

export interface ILang {
  [key: string]: string | null;
  tc: string | null;
  en: string | null
}

export interface IMarketData {
  id: number;
  name: ILang;
  code?: string;
  address: ILang;
  phone: string | null
  url: string | null
}
export interface IContactMessage {
  statusCode: number;
  result: string;
  message: string;
}
export interface IDistrictData {
  id: number;
  name: ILang;
}

export interface IRegionData {
  id: string;
  name: ILang;
  marketList: IMarketData[];
  districtList: IDistrictData[]
}

export interface ICountryData {
  id: string;
  name: ILang;
  regionList: IRegionData[];
  code: any | null;
}

export interface ICategoryList {
  id: number;
  uid?: string;
  level: number;
  name: string;
  path?: string;
  url_key: string;
  url_path: string;
  position: number;
  store_id: string
  product_count?: number;
  children_count?: string | number;
  children?: ICategoryList[]
}

export interface ICatFilter {
  id: number,
  parent_id: number,
  name: string,
  url_key: string,
  url_path: string,
  position: number,
  level: number,
  children_count: number,
  store_id: string,
  product_count: number,
  children: ICategoryList[],
  brand_name: { brand_name: string }[]
  source_from: { source_from: string }[]
}

export interface IBannerImages {
  images_url: string;
  url_path: string
}

export interface IBannerList {
  [key: string]: IBannerImages[] | undefined;
  topSlider: IBannerImages[];
  middleBanner: IBannerImages[];
  narrowBanner: IBannerImages[];
  bottomBanner: IBannerImages[];
  otherBanner?: IBannerImages[]
}

export interface ICategoryPath {
  category: { path: string, name: string, id: number},
  dept: { path: string | undefined, name: string | undefined, id: number | undefined },
  segment: { path: string | undefined, name: string | undefined, id: number | undefined },
  type: { path: string | undefined, name: string | undefined, id: number | undefined },
}

export interface IPickupStore {
  location_code: string;
  english_name: string;
  chinese_name: string;
}

export interface IPointHistoryType {
  id: number;
  name: {
    tc: string;
      en: string
  },
  imageUrl: null | string
}
export interface IConfigState {
  categoryList: ICategoryList[];
  categoryPath: ICategoryPath | null;
  regionList: IRegionData[];
  countryList: ICountryData[];
  contactMessage: IContactMessage | null;
  banners: IBannerList
  pickupStoreList: IPickupStore[]
  pointHistoryList: IPointHistoryType[]
}

export const initBannerList: IBannerList = {
  topSlider: [],
  middleBanner: [],
  narrowBanner: [],
  bottomBanner: [],
  otherBanner: []
}


export const initialState: IConfigState = {
  categoryList: [],
  categoryPath: null,
  regionList: [],
  countryList: [],
  contactMessage: null,
  banners: initBannerList,
  pickupStoreList: [],
  pointHistoryList: []
}

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {

    getRegionMarketList: (
      state: Draft<typeof initialState>,
      action: PayloadAction<IRegionData[]>
    ) => {
      state.regionList = action.payload
    },
    getCountryList: (
      state: Draft<typeof initialState>,
      action: PayloadAction<ICountryData[]>
    ) => {
      state.countryList = action.payload
    },
    getPointHistoryList: (state, action: PayloadAction<IPointHistoryType[]>) => {
      state.pointHistoryList = action.payload
    },
    getContactData: (
      state: Draft<typeof initialState>,
      action: PayloadAction<IContactMessage>
    ) => {
      state.contactMessage = action.payload
    },
    setCategoryPath: (state, action: PayloadAction<ICategoryPath>) => {
      state.categoryPath = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getCategoryListThunk.fulfilled, (
      state: Draft<typeof initialState>,
      action: PayloadAction<ICategoryList[]>
    ) => {
      state.categoryList = action.payload
    });
    builder.addCase(getPickupStoresThunk.fulfilled, (
      state: Draft<typeof initialState>,
      action: PayloadAction<IPickupStore[]>
    ) => {
      state.pickupStoreList = action.payload
    })
  }
})

export const {
  getRegionMarketList,
  getCountryList,
  getPointHistoryList,
  getContactData,
  setCategoryPath,
} = configSlice.actions

export default configSlice.reducer

export const selectCategoryList = (state: RootState) => state.config.categoryList
export const selectRegionList = (state: RootState) => state.config.regionList
export const selectPointHistoryList = (state: RootState) => state.config.pointHistoryList
export const selectPickupStores = (state: RootState) => state.config.pickupStoreList