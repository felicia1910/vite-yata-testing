import { createAsyncThunk } from "@reduxjs/toolkit";
import { number } from "prop-types";
import { onLoaded, onLoading } from "../control/slice";
import { setShippingMode, IAddressInfo, IShipmentDateTime } from "../delivery/slice";
import { ICartGroup, IHamperCustDetail, IShoppingCartItem, setCartGroupId, setCartTabIndex, setHamperDetail, setCurrentHamperId, setCartQuoteType } from "../shopping/slice";
import { RootState } from "../store";
import { IChangeShippingModeData, IPaymentResponseData } from '../../utils/types';
import { getDefaultAddr } from '../../utils/getDefaultAddr';
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
    const pickupStore = getState().delivery.shippingInfo.pickup_location_code
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
        // await dispatch(getUngroupedShoppingCartListThunk())
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

export const getUngroupedShoppingCartListThunk = createAsyncThunk(
  "shopping/ungroupedCartItemList",
  async (_, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI;
    const state = getState() as any;
    try {
      // dispatch(onLoading());
      const memberNo = state.auth.crmUser.memberNo ?? "";
      const res = await fetch(`${import.meta.env.VITE_EC_API_URL}/cart/getCart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ MemberNo: "M9000730", by_shipment_group: '0' }),
        body: JSON.stringify({ MemberNo: memberNo, by_shipment_group: '0' }),
        redirect: "follow",
      });
      // console.log('shopping cart res: ', res)
      const result = await res.json();
      if (res.status == 200) {
        if (result.data) {
          let detail = result.data.getCart.items as IShoppingCartDetail[]
          detail = detail.slice().sort((a, b) => a.quote_type - b.quote_type)
          if (detail.length == 1) {
            dispatch(setCartQuoteType(detail[0].quote_type))
          }
          return detail;
        } else {
          return result;
        }
      }
    } catch (error) {
      console.log("get ungrouped shopping cart list error: ", error);
      dispatch(onLoaded());
      return rejectWithValue(error);
    }
  }
);

export const getCartItemCountThunk = createAsyncThunk(
  "shopping/cartItemCount",
  async (_, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI;
    const state = getState() as any;
    try {
      // dispatch(onLoading())
      const memberNo = state.auth.crmUser.memberNo ?? "";
      const res = await fetch(
        `${import.meta.env.VITE_EC_API_URL}/cart/getCartItemCount`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ MemberNo: memberNo }),
        }
      );

      const result = await res.json();
      if (res.status == 200) {
        if (result.data) {
          // console.log(
          //   "cart item count result: ",
          //   result.data.getCartItemCount.items
          // );
          // dispatch(onLoaded())
          dispatch(
            setShippingMode(result.data.getCartItemCount.items.shipment_mode)
          );
          dispatch(
            getCartItemQty(result.data.getCartItemCount.items.item_total_qty)
          );
          return result.data.getCartItemCount.items.item_total_qty;
        } else {
          return result;
        }
      }
    } catch (error) {
      console.log("get cart item count error: ", error);
      // dispatch(onLoaded())
      return rejectWithValue(error);
    }
  }
);

export const addItemToCartThunk = createAsyncThunk<any, ICartItemQty, { state: RootState }>(
  "shopping/addItemToCart",
  async (item: ICartItemQty, thunkAPI) => {
    // console.log('add item param: ', item)
    const { dispatch, getState, rejectWithValue } = thunkAPI;
    const state = getState();

    const {memberNo, email, mobile, firstName, lastName} = state.auth.crmUser! ;
    const shippingMode = state.delivery.shippingInfo.shipment_mode ?? "";
    const pickupStore = state.delivery.shippingInfo.pickup_location_code ?? "";
    const addrList: IAddressInfo[] = state.delivery.addressList!;

    const defaultAddr = getDefaultAddr(addrList)

    let postData: IChangeShippingModeData = {
      ...item,
      MemberNo: memberNo as string,
      shipment_mode: shippingMode ?? "",
      pickup_location_code: pickupStore ?? "",
      name: `${firstName} ${lastName}`,
      phone: mobile,
      email: email
    };

    if (defaultAddr != null) {
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
    // console.log('post data: ', postData)

    try {
      const res = await fetch(`${import.meta.env.VITE_EC_API_URL}/cart/addItem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(postData),
      });
      // console.log('add item res: ', res)
      const result = await res.json();
      if (res.status == 200) {
        // console.log("add item result: ", result);
        await dispatch(getCartItemCountThunk());
        if (result.data.addItem) {
          if (result.data.addItem.items.Success) {
            return {success: result.data.addItem.items.Success};
          } else {
            return {success: 0, err: result.data.addItem.items.error};
          }
        }
        return {success: 0, err: [""]};
      }
      return {success: 0, err: [""]};
    } catch (error) {
      console.log("add item error: ", error);
      return rejectWithValue(error);
    }
  }
);

export const emptyCartThunk = createAsyncThunk<any, string, { state: RootState }>(
  "shopping/emptyCart",
  async (quoteId, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI;
    const state = getState();
    const memberNo = state.auth.crmUser!.memberNo ?? "";
    const { shoppingCartDetail, cartTabIdx } =state.shopping
  
    try {
      const postData = {
        quote_uuid: quoteId,
        MemberNo: memberNo,
      };
      const res = await fetch(`${import.meta.env.VITE_EC_API_URL}/cart/emptyCart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      // console.log('empty card res: ', res)
      const result = await res.json();
      if (res.status == 200) {
        console.log("empty card result: ", result);
        setTimeout(async () => {
          dispatch(setCartTabIndex(cartTabIdx > 0 ? cartTabIdx - 1 : 0));
          dispatch(setCartQuoteType(
            cartTabIdx > 0
            ? shoppingCartDetail![cartTabIdx - 1].quote_type
            : shoppingCartDetail!.length > 1
              ? shoppingCartDetail![1].quote_type
              : -1
            ))
          // if (result.data && result.data.addItem.items.Success) {
          if (result.data) {
            await dispatch(getCartItemCountThunk());
            await dispatch(getShoppingCartListThunk());
            return result.data.addItem.items.Success;
          } else {
            return 0;
          }
        }, 200)
      }
    } catch (error) {
      console.log("empty card error: ", error);
      return rejectWithValue(error);
    }
  }
);

export const modifyCartThunk = createAsyncThunk(
  "shopping/modifyCart",
  async (newCart: IUpdateCartInfo, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI;
    const state = getState() as any;
    try {
      const memberNo = state.auth.crmUser.memberNo ?? "";
      const postData = {
        ...newCart,
        MemberNo: memberNo,
      };
      // console.log('modify cart data: ', postData)

      const res = await fetch(`${import.meta.env.VITE_EC_API_URL}/cart/modifyCart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      // console.log('modify card res: ', res)
      const result = await res.json();
      if (res.status == 200) {
        // console.log("modify card result: ", result);
        if (result.data && result.data.addItem.items.Success) {
          return result.data.addItem.items.Success;
        } else {
          return 0;
        }
      }
    } catch (error) {
      console.log("empty card error: ", error);
      return rejectWithValue(error);
    }
  }
);

export const removeUnshippingItemThunk = createAsyncThunk<any, string, {state: RootState}>(
  "shopping/removeUnshippingItem",
  async (quoteId: string, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI;
    const state = getState();

    try {
      const memberNo = state.auth.crmUser!.memberNo ?? ""
      const postData = {
        quote_uuid: quoteId,
        MemberNo: memberNo,
      };
      const res = await fetch(`${import.meta.env.VITE_EC_API_URL}/cart/removeNotIncludeItems`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      const result = await res.json();
      if (res.status == 200) {
        // console.log("remove not including item result: ", result);
        if (result.data && result.data.removeNotIncludeItems.items.Success) {
          await dispatch(getCartItemCountThunk());
          await dispatch(getShoppingCartListThunk());
          return result.data.removeNotIncludeItems.items.Success;
        } else {
          return 0;
        }
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const createSalesOrderThunk = createAsyncThunk<any, {email: string, quote_uuid: string, shipment_info: IShipmentDateTime[]}, {state: RootState}>(
  "shopping/createSalesOrder",
  async (data , thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI;
    const state = getState();
    try {
      const memberNo = state.auth.crmUser!.memberNo ?? "";
      const dlvyDate = state.delivery.deliveryDate

      // console.log("create order data: ", data);

      const res = await fetch(
        `${import.meta.env.VITE_EC_API_URL}/cart/createSalesOrder`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      // console.log("create order res: ", res);
      const result = await res.json();
      if (res.status == 200) {
        // console.log("create order result: ", result);
        if (
          result.data &&
          result.data.createSalesOrder.items.Success
        ) {
          await dispatch(getCartItemCountThunk());
          return result.data.createSalesOrder.items;
        } else {
          return result.data.createSalesOrder.items;
        }
      }
    } catch (error) {
      console.log("create order error: ", error);
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
  const { delivery } = getState();
  const searchQuery = {
    category_id: list.categories,
    sub_category_id: list.subCategories,
    brand_name: list.brands,
    source_from: list.countries,
    limit: [0, PRODUCT_LIST_PAGE_SIZE],
    sort_by: list.sort ?? "",
    current_page: list.currentPage,
    pickup_location_code: delivery.shippingInfo.pickup_location_code
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

export const getWishList = createAsyncThunk(
  "shopping/getWishList",
  async (_, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    const state = getState() as any;
    const memberNo = state.auth.crmUser.memberNo ?? "";
    const postData = {
      MemberNo: memberNo,
      limit: [0, 50],
    };
    // console.log("get wish list", postData);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_EC_API_URL}/wishlist/getWishListbyMemberNo`,
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
        console.log("get wish list: ", result.data.getWishListbyMemberNo.items);
        return result.data.getWishListbyMemberNo.items;
      }
      throw new Error();
    } catch (error) {
      console.log("get wish list err: ",error);
      throw error;
    }
  }
);

export const updateWishList = createAsyncThunk(
  "shopping/updateWishList",
  async (plu: string, thunkAPI) => {
    // async (item: IProductCard, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI;
    const state = getState() as any;
    const memberNo = state.auth.crmUser.memberNo ?? "";
    // console.log(memberNo);

    const postData = {
      MemberNo: memberNo,
      plu: plu,
    };
    // console.log(postData);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_EC_API_URL}/wishlist/addItemToWishList`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
          // redirect: "follow",
        }
      );
      const result = await res.json();
      if (res.status == 200) {
        return result.data.addItemToWishList.items;
      }
      throw new Error();
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
);

export const removeWishList = createAsyncThunk(
  "shopping/removeWishList",
  async (plu: string, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI;
    const state = getState() as any;
    const memberNo = state.auth.crmUser.memberNo ?? "";
    const postData = {
      MemberNo: memberNo,
      plu: plu,
    };
    // console.log("remove", postData);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_EC_API_URL}/wishlist/removeItemFromWishList`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        }
      );
      const result = await res.json();
      if (res.status == 200) {
        return result.data.removeItemFromWishList.items;
      }
      throw new Error();
    } catch (error) {
      console.log('remove wish list error: ', error);
      throw error;
    }
  }
);


export const sendPaymentDataApi = async (data: IPaymentResponseData) => {
  try {
    // console.log('post data of payment status api: ',data)
    const res = await fetch(
      `${import.meta.env.VITE_EC_API_URL}/payment/getPaymentStatusFromFrontEnd`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    if (res.status == 200) {
        // console.log('result of payment status api: ',result)
        const {Success, error} = result.data.getPaymentStatusFromFrontEnd.items
        if (Success == 1) {
          return {success: true}
        } else {
          return {success: false, err: error}
        }
    }
  } catch (error) {
    return {success: false, err: error}
  }
}

export const tryRepaymentApi = async (merRef: string) => {
  try {
    console.log("data of repayment api: ", merRef)
    const res = await fetch(
      `${import.meta.env.VITE_EC_API_URL}/payment/tryPayment`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mer_ref: merRef
        }),
      }
    );
    const result = await res.json();
    if (res.status == 200) {
        console.log('result of repayment api: ',result)
        const { Success, error } = result.data.tryPayment.items
        if (Success == 1) {
          return {success: true}
        } else {
          return {success: false, err: error[0].message}
        }
    }
  } catch (error) {
    console.log('error of repayment api: ',error)
    return {success: false, err: error}
  }
}

export const getHamperDetailThunk = createAsyncThunk<any, {quote_id: number, product_id: number}, {state: RootState}>(
  'shopping/hamperDetail',
  async (data, thunkAPI) => {
    const { dispatch, getState } = thunkAPI
    const memberNo = getState().auth.crmUser!.memberNo ?? "";

    try {
      const res = await fetch(
        `${import.meta.env.VITE_EC_API_URL}/cart/getHamperCustDetail`,
        {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            MemberNo: memberNo,
            ...data
          })
        }
      )
      const result = await res.json();
      if ((await res).status == 200) {
        dispatch(setCurrentHamperId(data))
        const detail = result.data.getHamperCustDetail.items
        // console.log('hamper detail: ', detail)
        dispatch(setHamperDetail(detail))
        return detail as IHamperCustDetail
      }
    } catch (error) {
    return { error: error };
    }
  }
)

export const updateHamperDetailThunk = createAsyncThunk<any, IHamperCustDetail[], { state: RootState }>(
  'shopping/updateHamperDetail',
  async (hamperDetail, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    const currentHamperId = getState().shopping.currentHamperId
    const memberNo = getState().auth.crmUser!.memberNo ?? "";

    try {
      const postData = {
        MemberNo: memberNo,
        ...currentHamperId,
        items: hamperDetail
      }
      // const allHasAddr = hamperDetail.every(detail => detail.address_id != '');
      // console.log('allHasAddr', allHasAddr)
      // console.log('post data of updating hamper detail: ', postData)
      const res = await fetch(`${import.meta.env.VITE_EC_API_URL}/cart/addOrModifyHamerCustDetail`, {
        method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData)
      })
      const result = await res.json();
      if (res.status == 200) {
        const newCartResult = await dispatch(getShoppingCartListThunk())
        if (newCartResult.payload) {
          return result.data.addOrModifyHamerCustDetail
        }
      }
    } catch (error) {
      return {error: error}
    }
  }
)

export const removeHamperThunk = createAsyncThunk<any, {quote_id: number, product_id: number}, {state: RootState}>(
  'shopping/removeHamper',
  async (data, thunkAPI) => {
    const { dispatch, getState } = thunkAPI
    const memberNo = getState().auth.crmUser!.memberNo ?? "";

    try {
      const res = await fetch(
        `${import.meta.env.VITE_EC_API_URL}/cart/removeItem`,
        {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            MemberNo: memberNo,
            ...data
          })
        }
      )
      const result = await res.json();
      if ((await res).status == 200) {
        const newCartResult = await dispatch(getShoppingCartListThunk())
        if (newCartResult.payload) {
          return result
        }
      }
    } catch (error) {
      return { error: error };
    }
  }
)

export const checkCartToConfirmationThunk = createAsyncThunk<any, string, { state: RootState}>(
  'shopping/checkCartToConfirmation',
  async (quoteId, thunkAPI) => {
    const { dispatch, getState } = thunkAPI
    const memberNo = getState().auth.crmUser!.memberNo ?? "";
    const { shoppingCartDetail, cartTabIdx } = getState().shopping
    const groupIdList: ICartGroup[][] = []

    try {
      const res = await fetch(
        `${import.meta.env.VITE_EC_API_URL}/cart/getCartforConfirmation`,
        {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            MemberNo: memberNo,
            quote_uuid: quoteId
          })
        }
      )
      const result = await res.json();
      if (res.status == 200) {
        const newCart: IShoppingCartDetail = result.data.getCartforConfirmation.items[0]
        // console.log('get confirmed cart result: ', newCart)
        groupIdList.push([])
        newCart.shipment_group!.map(item => groupIdList[0].push({
          id: item.id,
          needDate: item.need_shipment_date!,
          hasDate: item.need_shipment_date ? false : true
        }))
        dispatch(setCartGroupId(groupIdList))
        
        const newCartArr = shoppingCartDetail?.map(cart => {
          if (cart.quote_uuid == quoteId) return newCart
          else return cart
        })
        return newCartArr
      }
      return result.data.getCartforConfirmation
    } catch (error) {
      return { error: error };
    }

  }
)