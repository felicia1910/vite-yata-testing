import { createAsyncThunk } from "@reduxjs/toolkit";
import { onLoaded, onLoading } from "../control/slice";
import { getContactData, getCountryList, getRegionMarketList, getPointHistoryList } from "./slice";


type ContactFields = {
  MemberId: string | undefined,
  EmailAddress: any,
  CaseCategory: string | boolean,
  RelatedSectionScore?: string,
  CaseTopic: string | undefined,
  CaseDescription: string,
  OrderNumber?: string,
  PrimaryImage?: string | ArrayBuffer | null,
};

export const getCategoryListThunk = createAsyncThunk(
  'config/getCategoryList',
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI

    dispatch(onLoading())
    try {
      const res = await fetch(`${import.meta.env.VITE_EC_API_URL}/category/list`, {
        method: 'POST',
      })
      const result = await res.json();
      console.log('get category by  : ', res)
      
      if (res.status == 200) {
        console.log('get category by  : ', result.data.categories.items)
        const list = result.data.categories.items
        return list
      }
    } catch (error) {
      dispatch(onLoaded())
      return thunkAPI.rejectWithValue({ error })
    }
  }
)

export const getCategoryById = createAsyncThunk(
  'config/getCategoryById',
  async (catId: number, thunkAPI) => {
    const { dispatch } = thunkAPI

    // dispatch(onLoading())
    try {
      const postData = { "category_id": catId } 
      const res = await fetch(`${import.meta.env.VITE_EC_API_URL}/category/getCategoryById`, {
        method: 'POST',
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(postData),
      })
      // console.log('get category by id res: ', res)
      const result = await res.json();
      
      if (res.status == 200) {
        const list = result.data.categories.items
        // console.log('get category by id results: ', list)
        return list
      }
    } catch (error) {
      // dispatch(onLoaded())
      return thunkAPI.rejectWithValue({ error })
    }
  }
)

export const getPickupStoresThunk = createAsyncThunk(
  'config/getPickupStores',
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI

    dispatch(onLoading())
    try {
      const res = await fetch(`${import.meta.env.VITE_EC_API_URL}/cart/getPUStoreInfo`, {
        method: 'POST',
      })
      const result = await res.json();

      if (res.status == 200) {
        const list = result.data.getPUStoreInfo.items
        return list
      }
    } catch (error) {
      dispatch(onLoaded())
      return thunkAPI.rejectWithValue({ error })
    }
  }
)

export const getConfigDataThunk = createAsyncThunk(
  'config/getUserCouponType',
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI
    try {
      // console.log('fetch config data:', )
      dispatch(onLoading())
      const storedData = localStorage.getItem('configData')
      const marketList: any = [];

      const getData = async () => {
        if (!storedData) {
          const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/ConfigData`)
          const result = await res.json()

          if (res.status == 200 && result.isSuccess == true) {
            localStorage.setItem('configData', JSON.stringify(result.data))
            // console.log('config data:', result.data)
            return result.data
          }
        } else {
          return JSON.parse(storedData)
        }
      }

      const result = await getData()
      const hkRegion = result.countryList.filter((city: any) => city.name.en == 'Hong Kong')[0].regionList
      if (hkRegion) {
        hkRegion.map((region: any) => {
          marketList.push({
            id: region.id,
            name: region.name,
            marketList: region.marketList,
            districtList: region.districtList
          })
        })
        dispatch(getRegionMarketList(marketList))
      }
      dispatch(getPointHistoryList(result.pointHistoryTypeList))
      dispatch(getCountryList(result.countryList))
      dispatch(onLoaded())
      
    } catch (error) {
      dispatch(onLoaded())
      return thunkAPI.rejectWithValue({ error })
    }
  }
)

export const contactDataThunk = createAsyncThunk(
  "config/contactUs",
  async (data: ContactFields, thunkAPI) => {
    const { dispatch } = thunkAPI
    // console.log(JSON.stringify(data))

    try {
      const res = await fetch(import.meta.env.VITE_CS_API_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(data),
      });

      if (res.status != 200) {
        // console.log('post contact not 200: ', res)
        return dispatch(getContactData({ statusCode: 400, result: "failure", message: "something went wrong" }))
      }

      const result = await res.json();
      if (result) {
        dispatch(getContactData(result))
      }
      return result;
    } catch (error) {
      return { error: error };
    }
  }
);

export const getBannerImageApi = async (path: string) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_EC_API_URL}/imageslider/getImageSlider?`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path_name: path }),
        redirect: "follow",
        
      }
    );
    const result = await res.json();
    if (res.status == 200) {
      const images = result.data.getImageSlider.items;
      // console.log('get banner detail: ', result.data.productDetail.items[0])
      return images;
    }
  } catch (error) {
    console.log('get banner err: ',error);
  }
};

