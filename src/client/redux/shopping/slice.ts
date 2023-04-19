import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { DetailedHTMLProps } from "react";
import { EShippingMode } from "../delivery/slice";
import { RootState } from "../store";
import { checkCartToConfirmationThunk, getProductDetailThunk, getShoppingCartListThunk, getUngroupedShoppingCartListThunk } from './thunk';
import { ICategoryList } from "../config/slice";
import { current } from '@reduxjs/toolkit'

export interface IFilterList {
  countries: string[];
  brands: string[];
  categories: number[];
  subCategories: number[];
  sort?: string;
  currentPage?: number;
}

export interface IFilterCatList {
  name: string;
  id: number;
}

export interface ICartItemQty {
  sku: string;
  plu: string;
  qty: number;
  categoryId?: number;
}

export interface IProductDetail {
  plu: string;
  color_code: string;
  size_code: string;
  color_description_e: string;
  color_description_c: string;
  size_description_e: string;
  size_description_c: string;
  brand_code: string;
  brand_name_e: string;
  brand_name_c: string;
  short_name_c: string;
  short_name_e: string;
  full_name_c: string;
  full_name_e: string;
  short_description_c: string;
  short_description_e: string;
  full_description_c: string;
  full_description_e: string;
  special_remarks_c: string;
  special_remarks_e: string;
  rsp: string;
  psp?: string;
  save_amt: string;
  percent_off: string;
  psp_presale?: string;
  save_amt_presale: string;
  percent_off_presale: string;
  source_from_c: string;
  source_from_e: string;
  display_temperature: string;
  size: string;
  color_c: string;
  color_e: string;
  return_policy_code: string;
  return_policy_description_e: string;
  return_policy_description_c: string;
  delivery_tag: string;
  delivery_tag_description_e: string;
  delivery_tag_description_c: string;
  shipping_mode: string;
  shipping_mode_description_e: string;
  shipping_mode_description_c: string;
  other_shipping_rules: string;
  other_shipping_rules_description_e: string;
  other_shipping_rules_description_c: string;
  company_code: string;
  division_code: string;
  category_code: string;
  department_code: string;
  sub_category_code: string;
  sku: string;
  item_type: string;
  item_creation_date: string;
  inventory_type_code: string;
  inventory_type_description_e: string;
  inventory_type_description_c: string;
  maximum_sale_qty_per_order: number;
  vendor_code: string;
  product_group: string;
  product_group_name: string;
  product_group_description_e: string;
  product_group_description_c: string;
  pos_coupon_code: string;
  pos_coupon: string;
  carousell_category_id: number;
  carousell_position: number;
  pos_coupon_type_name: string;
  configurable: number;
  color_count: number;
  size_count: number;
  promotions: {}[];
  promotions_presale: any | string | [];
  wish_list: number;
  product_status: number;
  images: {
    images_url: string;
  }[];
  inventory_status: number;
  department_name:  string
  category_name:  string
  subcategory_name:  string
  created_at: string | null | Date;
  modified_at: string | null | Date;
  categoryId?:  number
  urlPath?:  string
  options?: IProductColorSize;
}

export interface IProductColorSize {
  colors?: {
    plu?: string;
    color_code: string;
    color_description_e: string;
    color_description_c: string;
    size?: IProductSize[];
    sku?: string;
    rsp?: string;
    psp?: string;
    save_amt?: string;
    percent_off?: string;
    promotions?: any[]
    maximum_sale_qty_per_order?: number;
    product_status?: number;
    inventory_status?: number;
  }[];
  size?: {
    plu: string;
    size_code: string;
    size_description_e: string;
    size_description_c: string;
    sku: string;
    rsp: string;
    psp: string;
    save_amt: string;
    percent_off: string;
    promotions: any[]
    maximum_sale_qty_per_order: number;
    product_status: number;
    inventory_status: number;
  }[];
}
export interface IProductSize {
  plu: string;
  size_code: string;
  size_description_e: string;
  size_description_c: string;
  sku: string;
  rsp: string;
  psp: string;
  save_amt: string;
  percent_off: string;
  promotions: any[]
  maximum_sale_qty_per_order: number;
  product_status: number;
  inventory_status: number;
}

export interface IShoppingCartDetail {
  id: number;
  quote_uuid?: string;
  member_no: string;
  quote_type: number;
  orig_order_id: number;
  member_type: string;
  name: string;
  phone: string;
  email: string;
  district_id: string;
  district_name_c?: string;
  address1: string;
  address2: string;
  address_id?: string;
  shipment_mode: string;
  pickup_location_code: string;
  shipment_mode_name_c?: string;
  shipment_fee: number;
  packaging_fee: number;
  quote_total?: string;
  discount_total: string;
  quote_total_with_discount: string;
  grand_total: string;
  item_total_qty?: number;
  is_active?: number;
  called_pos_api: number;
  reserved_delivery_quota_id: number;
  created_at: Date | string;
  updated_at: Date | string;
  converted_at?: Date | string | null;
  shipment_group: IShoppingCartGroup[] | (IShoppingCartGroup & IOrderGroup)[];
  item_lines: IShoppingCartItem[];
}

export interface IOrderDetail {
  order_no: string;
  order_type: number;
  order_date: string;
  shipment_date: string;
  address: string;
  order_total: string;
  order_total_with_discount: string;
  order_state: number,
  order_status: string;
  completed_at: null | Date | string;
  email_sent: number,
  get_payment_status: number,
  mer_ref: string;
  payment_grand_total: string;
  payment_failed_count: number;
  uploaded_transaction_to_crm: number;
  reserved_delivery_quota_id: number;
  call_erp_book_sales: number;
  call_erp_book_sales_at: null | Date | string;
}

export interface IShoppingCartGroup {
  id: number;
  quote_id: number;
  shipment_mode: string;
  shipment_group_code: string;
  description_c?: string;
  description_e?: string;
  item_total_qty: number;
  cal_delivery_fee_logic?: string;
  cal_delivery_fee_amount?: string;
  total_group_amount_with_discount: string;
  total_group_amount_with_discount_for_cal_del_fee?: string;
  need_shipment_date?: number,
  shipment_group_rule_id?: number,
  earliest_date?: number,
  latest_date?: number,
  item_lines: IShoppingCartItem[];
}

export interface IOrderGroup {
  sales_order_id: number;
  shipment_no: null | string;
  shipment_date: string;
  shipment_slot: string;
  shipment_status_c: string;
  name: string;
  phone: string;
  address: string;
  greeting_cart_to: string;
  greeting_cart_from: string;
}

export interface IShoppingCartItem {
  quote_item_id: number;
  quote_id: number;
  product_id: number;
  sales_order_item_id?: number;
  sales_order_id?: number;
  plu: string;
  sku: string;
  color_code: string;
  size_code: string;
  brand_code: string;
  brand_name_e: string;
  brand_name_c: string;
  short_name_c: string;
  short_name_e: string;
  full_name_c: string;
  full_name_e: string;
  short_description_c: string;
  short_description_e: string;
  full_description_c: string;
  full_description_e: string;
  special_remarks_c: string;
  special_remarks_e: string;
  source_from_c: string;
  source_from_e: string;
  display_temperature: string;
  size: string;
  color_c: string;
  color_e: string;
  return_policy_code: string;
  delivery_tag: string;
  shipping_mode: string;
  other_shipping_rules: string;
  company_code: string;
  division_code: string;
  category_code: string;
  department_code: string;
  sub_category_code: string;
  images: {
    images_url: string;
  }[];
  item_type: string;
  item_creation_date: Date | string;
  inventory_type_code: string;
  maximum_sale_qty_per_order: number;
  vendor_code: string;
  product_group: string;
  pos_coupon_code: string;
  pos_coupon: string;
  rsp: string;
  psp: string;
  qty: number;
  discount_amount: string;
  row_total: string;
  row_total_with_discount: string;
  promotions: {
    promotion_code: string;
    promotion_c_description: string;
    promotion_e_description: string;
  }[];
  wish_list: number;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface IUpdateCartInfo {
  quote_uuid: string;
  shipment_group_code?: string;
  shipment_mode: string;
  item_lines: IShoppingCartItem[] //Array<ICartItemQty & { quote_item_id?: number }> ;
}

export interface ICurrentOrder {
  order_no: string;
  grand_total: string;
  success: number;
}

export interface IProductCard {
  plu: string;
  sku: string;
  configurable: number;
  full_name_c: string;
  full_name_e: string;
  wish_list: number;
  rsp: string;
  psp: string;
  product_status: number;
  inventory_status: number;
  images: { images_url: string }[];
  promotions: {[key: string]: string}[]
}

export interface ICategoryCarousel {
  id: number;
  category_id: number;
  name_c: string;
  name_e: string | null;
  url_key: string;
  url_path: string;
  position: number;
  header_color: string;
  button_color: string;
  background_color: string;
  enable: {
    type: string;
    data: number[];
  };
  children: ICategoryList[];
  product_list: IProductCard[];
}

export interface ICartGroup {id: number, needDate: number, hasDate: boolean}

export interface IHamperCustDetail {
  [key: string]: string | boolean | number | undefined | null;
  quote_shipment_group_id: number;
  name: string;
  phone: string;
  address_id: string;
  district_id: number;
  region: string;
  address1: string;
  address2: string;
  greeting_cart_to: string;
  greeting_cart_from: string;
  greeting_cart_message: string;
  // id?: string;
  // email?: string | null;
  // defaultAddress?: boolean;
  // country?: string | null;
}

export interface IHamperDescription {
  full_name_c: string;
  plu: string;
  amount: string;
  images: {
    images_url: string;
  }[];
}

export interface IShoppingState {
  filterList: IFilterList;
  productDetail: IProductDetail | null;
  shoppingCartDetail: IShoppingCartDetail[] | null;
  ungroupedShoppingCartDetail: IShoppingCartDetail[] | null;
  cartGroupId: ICartGroup[][];
  cartTabIdx: number;
  cartQuoteType: number;
  cartItemQty: number;
  modifiedCartItems: IUpdateCartInfo | null;
  likedCartItem: IProductCard | null;
  error: string | any;
  currentOrder: ICurrentOrder | null;
  filterCatList: IFilterCatList[]
  hamperDetail: IHamperCustDetail[]
  hamperDescription: IHamperDescription | null
  currentHamperId: {
    quote_id: number;
    product_id: number;
  };
}

export const initHamperDetail: IHamperCustDetail = {
  quote_shipment_group_id: 0,
  name: "",
  phone: "",
  address_id: "",
  district_id: 0,
  region: "",
  address1: "",
  address2: "",
  greeting_cart_to: "",
  greeting_cart_from: "",
  greeting_cart_message: "",
}

export const initialState: IShoppingState = {
  filterList: {
    countries: [],
    brands: [],
    categories: [],
    subCategories: [],
  },
  productDetail: null,
  shoppingCartDetail: null,
  ungroupedShoppingCartDetail: null,
  cartGroupId: [],
  cartItemQty: 0,
  cartTabIdx: 0,
  cartQuoteType: -1,
  modifiedCartItems: null,
  likedCartItem: null,
  error: null,
  currentOrder: null,
  filterCatList: [],
  hamperDetail: [],
  hamperDescription: null,
  currentHamperId: {
    quote_id: 0,
    product_id: 0,
  },
};

export const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    setFilteringSubCategories: (
      state: Draft<typeof initialState>,
      action: PayloadAction<{ name: string; id: number }>
    ) => {
      if (state.filterList.subCategories.includes(action.payload.id)) {
        state.filterList.subCategories = state.filterList.subCategories.filter(
          (category) => category !== action.payload.id
        );
        state.filterCatList = state.filterCatList.filter(
          (category) => category.id !== action.payload.id
        );
      } else {
        state.filterList.subCategories = [
          ...state.filterList.subCategories,
          action.payload.id,
        ];
        state.filterCatList = [
          ...state.filterCatList,
          {
            name: action.payload.name,
            id: action.payload.id,
          },
        ];
      }
    },
    setFilteringCategoriesId: (state, action: PayloadAction<number>) => {
      // if (action.payload.reset) {
      state.filterList.categories = [action.payload];
      // } else if (!action.payload.reset) {
      //   if (state.filterList.categories.includes(action.payload.id)) {
      //     state.filterList.categories = state.filterList.categories.filter(
      //       (category) => category !== action.payload.id
      //     );
      //   } else {
      //     state.filterList.categories = [
      //       ...state.filterList.categories,
      //       action.payload.id
      //     ];
      //   }
      // }
    },
    setFilteringCountries: (
      state: Draft<typeof initialState>,
      action: PayloadAction<string>
    ) => {
      if (state.filterList.countries.includes(action.payload)) {
        state.filterList.countries = state.filterList.countries.filter(
          (country) => country !== action.payload
        );
      } else {
        state.filterList.countries = [
          ...state.filterList.countries,
          action.payload,
        ];
      }
    },
    setFilteringBrands: (
      state: Draft<typeof initialState>,
      action: PayloadAction<string>
    ) => {
      if (state.filterList.brands.includes(action.payload)) {
        state.filterList.brands = state.filterList.brands.filter(
          (brand) => brand !== action.payload
        );
      } else {
        state.filterList.brands = [...state.filterList.brands, action.payload];
      }
    },
    resetFilterList: (state: Draft<typeof initialState>) => {
      // const origin = state.filterList.subCategories.filter(
      //   (id) => !state.filterCatList.find((cat) => cat.id == id)
      // );
      state.filterList = {
        brands: [],
        countries: [],
        subCategories: [],
        categories: state.filterList.categories,
      };
      state.filterCatList = [];
    },
    initShoppingCartList: (state) => {
      state.shoppingCartDetail = [];
    },
    getCartItemQty: (state, action: PayloadAction<number>) => {
      state.cartItemQty = action.payload;
    },
    setCartTabIndex: (state, action: PayloadAction<number>) => {
      state.cartTabIdx = action.payload;
    },
    setCartQuoteType: (state, action: PayloadAction<number>) => {
      state.cartQuoteType = action.payload;
    },
    setModifiedCartItem: (state, action: PayloadAction<IUpdateCartInfo>) => {
      state.modifiedCartItems = action.payload;
    },
    setLikedCartItem: (state, action: PayloadAction<IProductCard>) => {
      state.likedCartItem = action.payload;
    },
    initModifiedCartItem: (state) => {
      state.modifiedCartItems = null;
    },
    setCurrentOrder: (state, action: PayloadAction<ICurrentOrder>) => {
      state.currentOrder = action.payload;
    },
    initProductDetail: (state) => {
      state.productDetail = null
    },
    setCartGroupId: (state, action: PayloadAction<ICartGroup[][]>) => {
      state.cartGroupId = action.payload
    },
    setHamperDetail: (state, action: PayloadAction<IHamperCustDetail[]>) => {
      state.hamperDetail = action.payload
    }, 
    setCurrentHamperId: (state, action: PayloadAction<{
      quote_id: number;
      product_id: number;
    }>) => {
      state.currentHamperId = action.payload
    },
    setHamperDescription: (state, action: PayloadAction<IHamperDescription>) => {
      state.hamperDescription = action.payload
    },
    addItemWishList: (state, { payload }: PayloadAction<{ idx: number, grpIdx: number, plu: string }>) => {
      state.shoppingCartDetail![payload.idx].item_lines = state
      .shoppingCartDetail![payload.idx]
      .item_lines.map(item => {
        if (item.plu == payload.plu) return { ...item, wish_list: 1 }
        else return item
      })
    },
    removeItemWishList: (state, { payload }: PayloadAction<{ idx: number, grpIdx: number, plu: string }>) => {
      state.shoppingCartDetail![payload.idx].item_lines = state
        .shoppingCartDetail![payload.idx]
        // .shipment_group[payload.grpIdx]
        .item_lines.map(item => {
          if (item.plu == payload.plu) return { ...item, wish_list: 0 }
          else return item
        })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductDetailThunk.fulfilled, (state, action) => {
      state.productDetail = action.payload!;
    });
    builder.addCase(getProductDetailThunk.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    });
    builder.addCase(getShoppingCartListThunk.fulfilled, (state, action) => {
      state.shoppingCartDetail = action.payload!;
    });
    builder.addCase(getShoppingCartListThunk.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    });
    
    builder.addCase(getUngroupedShoppingCartListThunk.fulfilled, (state, action) => {
      state.ungroupedShoppingCartDetail = action.payload!;
    });
    builder.addCase(getUngroupedShoppingCartListThunk.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    });
    builder.addCase(checkCartToConfirmationThunk.pending, (state) => {
        state.shoppingCartDetail = state.shoppingCartDetail
    });
    builder.addCase(checkCartToConfirmationThunk.fulfilled, (state, action) => {
      if (!action.payload.error) {
        state.shoppingCartDetail = action.payload
      }
    });
    builder.addCase(checkCartToConfirmationThunk.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    });
  },
});

export const {
  setFilteringSubCategories,
  setFilteringCategoriesId,
  setFilteringBrands,
  setFilteringCountries,
  resetFilterList,
  initShoppingCartList,
  getCartItemQty,
  setLikedCartItem,
  setModifiedCartItem,
  initModifiedCartItem,
  setCurrentOrder,
  initProductDetail,
  setCartTabIndex,
  setCartQuoteType,
  setCartGroupId,
  setHamperDetail,
  setCurrentHamperId,
  setHamperDescription,
  addItemWishList,
  removeItemWishList
} = shoppingSlice.actions;

export default shoppingSlice.reducer;

export const selectFilterList = (state: RootState) => state.shopping.filterList;
export const selectLikedCartItem = (state: RootState) => state.shopping.likedCartItem;
export const selectProductDetail = (state: RootState) =>
  state.shopping.productDetail;
export const selectShoppingCartDetail = (state: RootState) =>
  state.shopping.shoppingCartDetail;
export const selectFilterCatList = (state: RootState) =>
  state.shopping.filterCatList;
export const selectCartQuoteType = (state: RootState) =>
  state.shopping.cartQuoteType;
  export const selectCartTabIdx = (state: RootState) =>
  state.shopping.cartTabIdx;