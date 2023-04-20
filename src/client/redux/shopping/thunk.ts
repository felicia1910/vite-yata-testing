import { createAsyncThunk } from "@reduxjs/toolkit";
import { number } from "prop-types";
import { onLoaded, onLoading } from "../control/slice";
import { ICartGroup, IHamperCustDetail, IShoppingCartItem, setCartGroupId, setCartTabIndex, setHamperDetail, setCurrentHamperId, setCartQuoteType } from "../shopping/slice";
import { RootState } from "../store";
import { IChangeShippingModeData, IPaymentResponseData } from '../../utils/types';
import {
  getCartItemQty,
  ICartItemQty,
  IFilterList,
  IUpdateCartInfo,
  setCurrentOrder,
  IProductCard,
  ICategoryCarousel,
IShoppingCartDetail,
} from "./slice";

// const memberNo = "M9000730"

export const getPaymentMethodApi = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_EC_API_URL}/payment/paymentType`, {
      method: "POST",
    });
    const result = await res.json();

    if (res.status == 200) {
      const data = {
        count: result.data.paymentType.total_count,
        items: result.data.paymentType.items,
      };
      return data;
    }
  } catch (error) {
    return error;
  }
};

export const getProductDetailThunk = createAsyncThunk<any, {plu: string, categoryId: string | undefined, quote_type: number | undefined}, { state: RootState }>(
  "shopping/productDetail",
  async (data, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;
    const memberNo = getState().auth.crmUser?.memberNo ?? ''
    const pickupStore = "NTP"
    try {
      dispatch(onLoading());
      let postData: any = {
        ...data,
        MemberNo: memberNo,
        pickup_location_code: pickupStore
      }
      postData = Object.fromEntries(Object.entries(postData).filter(([_, v]) => v != undefined))
      const res = await fetch(
        `${import.meta.env.VITE_EC_API_URL}/product/productDetail`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        }
      )
      // console.log('product detail: ', postData)

      const result = await res.json();
      if (res.status == 200) {
        // console.log('product detail: ', result.data.productDetail.items[0])
        dispatch(onLoaded());
        return result.data.productDetail.items[0];
      }
    } catch (error) {
      console.log('product detail err: ',error);
      dispatch(onLoaded());
      return rejectWithValue({ error: error });
    }
  }
);

export const getShoppingCartListThunk = createAsyncThunk<any, undefined, {state: RootState}>(
  "shopping/cartItemList",
  async (_, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI;
    const state = getState();
    const memberNo = state.auth.crmUser!.memberNo ?? "";
    const { cartTabIdx, cartQuoteType } = state.shopping
    try {
      // dispatch(onLoading());
      const groupIdList: ICartGroup[][] = []
      // const res = await fetch(`https://yataapi.azurefd.net/eshop/api/cart/getCart`, {
      const res = await fetch(`${import.meta.env.VITE_EC_API_URL}/cart/getCart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ MemberNo: "M9032308" }),
        body: JSON.stringify({ MemberNo: memberNo }),
        redirect: "follow",
      });
      const result = await res.json();
      console.log('shopping cart res: ', res)
      if (res.status == 200) {
        console.log("shopping cart result.data: ", result.data);
        if (result.data) {
          let detail = result.data.getCart.items as IShoppingCartDetail[]

          if (detail.length == 0) return detail;
          console.log("shopping cart list: ", detail);
          detail = detail.slice().sort((a, b) => a.quote_type - b.quote_type)
          return detail;
        } else {
          return result;
        }
      }
    } catch (error) {
      console.log("get shopping cart list error: ", error);
      dispatch(onLoaded());
      return rejectWithValue(error);
    }
  }
);

export const PRODUCT_LIST_PAGE_SIZE = 20;

export const searchItemApi = async (searchName: string, page: number, puStore: string) => {
  const postData = {
    search_name: searchName,
    current_page: page,
    pickup_location_code: puStore,
    limit: ["0", PRODUCT_LIST_PAGE_SIZE]
  }
  // console.log('search data to post: ',postData)
  try {
    const res = await fetch(`${import.meta.env.VITE_EC_API_URL}/product/productSearch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
      redirect: "follow",
    });
    const result = await res.json();
    // console.log('search result',result);
    // console.log("ryan test api");
    if (res.status == 200) {
      // const { total_count, current_page_count, total_page, current_page , items} = result.data.productSearch
      return result.data.productSearch;
    }
    throw new Error();
  } catch (error) {
    console.log('search data to post: ',error);
    throw error;
  }
};

export const getProductListApi = createAsyncThunk<
  any,
  IFilterList,
  { state: RootState }
>("shopping/productSearch", async (list, thunkAPI) => {
  const { dispatch, getState } = thunkAPI;
  const searchQuery = {
    category_id: list.categories,
    sub_category_id: list.subCategories,
    brand_name: list.brands,
    source_from: list.countries,
    limit: [0, PRODUCT_LIST_PAGE_SIZE],
    sort_by: list.sort ?? "",
    current_page: list.currentPage,
    pickup_location_code: "NTP"
  };
  try {
    // console.log("product search param: ", searchQuery);

    const res = await fetch(`${import.meta.env.VITE_EC_API_URL}/product/productSearch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(searchQuery),
    });
    // // console.log('product search res: ', res)

    if (res.status == 200) {
      const result = await res.json();
      // console.log('product search result: ', result)
      return {
        total_count: result.data.productSearch.total_count,
        current_page: result.data.productSearch.current_page,
        total_page: result.data.productSearch.total_page,
        current_page_count: result.data.productSearch.current_page_count,
        items: result.data.productSearch.items as IProductCard[],
      };
    } else {
      // console.log("product search not success: ");
      return { error: "Error" };
    }
  } catch (error) {
    console.log("product search not success: ", error);
    return { error: error };
  }
});

export const getCarouselApi = createAsyncThunk<
  any,
  number,
  { state: RootState }
>("shopping/getCarousel", async (_, thunkAPI) => {
  const memberNo = thunkAPI.getState().auth.crmUser?.memberNo ?? "";
  try {
    const res = await fetch(`${import.meta.env.VITE_EC_API_URL}/category/getCarousell`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ MemberNo: memberNo }),
    });
    // console.log('carousel res: ', res)

    if (res.status == 200) {
      const result = await res.json();
      // console.log("carousel result: ", result);
      return { items: result.data.getCarousell.items as ICategoryCarousel[] };
    } else {
      // console.log("carousel not success: ");
      return { error: "Error" };
    }
  } catch (error) {
    console.log("carousel not success: ", error);
    return { error: error };
  }
});






