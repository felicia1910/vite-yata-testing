import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getHamperProductDetailThunk } from './thunk';

export interface Items {
    full_name_c: string;
    plu: string;
    psp: string;
    qty: number;
    rsp?: number;
    images_url: string;
  }
 export interface Products {
    id:number,
    shipmentNo: string;
    date: string;
    time: string;
    status: string;
    items: Items[];
    total: string;
  }
  export enum EConfirmType {
    close = "close",
    refund = "refund",
    edit ="edit",
    warningTotal = "total",
    warningPrice = "price"
  }

  export interface IConfirmMsg {
    type: EConfirmType,
    text: string
    back?: boolean
    push?:string
  }  

export interface IAdminState {
  productList?: Products[],
  exchangeList?: Products[],
  itemList?: Items|null,
  isConfirmModalOpen?: IConfirmMsg;
  isRefundChosen?: boolean;
  isRefundItemChosen?: boolean;
  isExchangeChosen?: boolean;
  isExchangeConfirmed?: boolean;
  isCalendarVisible?: boolean;
  eventList:{
    hamper:{productList:[]}
  }|null
}

export const initialState: IAdminState = {
  productList: [],
  exchangeList:[],
  itemList: null,
  isConfirmModalOpen: {
    type: EConfirmType.close,
    text: ""
  },
  isRefundChosen:false,
  isRefundItemChosen:false,
  isExchangeChosen:false,
  isExchangeConfirmed:false,
  isCalendarVisible:false,
  eventList:null,
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    getItemList: (
      state: Draft<typeof initialState>,
      action: PayloadAction<Items|null>
    ) => {
      state.itemList = (action.payload)
    },
    getProductList: (
      state: Draft<typeof initialState>,
      action: PayloadAction<Products[]>
    ) => {
      state.productList = (action.payload)
    },
    getExchangeList: (
      state: Draft<typeof initialState>,
      action: PayloadAction<Products[]>
    ) => {
      state.exchangeList = (action.payload)
      //console.log(action.payload)
      
    },
    openConfirmModal: (state: Draft<typeof initialState>, action: PayloadAction<IConfirmMsg>) => {
      state.isConfirmModalOpen = action.payload
    },
    closeConfirmModal: (
      state: Draft<typeof initialState>
    ) => {
      state.isConfirmModalOpen = {
        type: EConfirmType.close,
        text: ""
      }
    },
    onSelectExchange: (state: Draft<typeof initialState>) => {
      state.isExchangeChosen = true
    },
    onRemoveExchange: (
      state: Draft<typeof initialState>
    ) => {
      state.isExchangeChosen = false
    },
    onShowCalendar: (state: Draft<typeof initialState>) => {
      state.isCalendarVisible = true
    },
    onRemoveCalendar: (
      state: Draft<typeof initialState>
    ) => {
      state.isCalendarVisible = false
    },

    onExchangeConfirmed: (state: Draft<typeof initialState>) => {
      state.isExchangeConfirmed = true
    },
    onExchangeNotConfirmed: (
      state: Draft<typeof initialState>
    ) => {
      state.isExchangeConfirmed = false
    },
    onRefund: (state: Draft<typeof initialState>) => {
      state.isRefundChosen = true
    },
    onNoRefund: (
      state: Draft<typeof initialState>
    ) => {
      state.isRefundChosen = false
    },
    onItemRefund: (state: Draft<typeof initialState>) => {
      state.isRefundItemChosen = true
    },
    onItemNoRefund: (
      state: Draft<typeof initialState>
    ) => {
      state.isRefundItemChosen = false
    },
  },extraReducers:(builder)=>{
    builder.addCase(getHamperProductDetailThunk.fulfilled,
      (state,action :PayloadAction<any>)=>{
        state.eventList = {hamper:{productList: action.payload.getHamperItemList.item}}
      })
  }
})

  export const {
  getItemList,
  getProductList,
  getExchangeList,
  openConfirmModal,
  closeConfirmModal,
  onSelectExchange,
  onRemoveExchange,
  onExchangeConfirmed,
  onExchangeNotConfirmed,
  onRefund,
  onNoRefund,
  onItemNoRefund,
  onItemRefund,
  onShowCalendar,
  onRemoveCalendar,


  } = adminSlice.actions
  
  export default adminSlice.reducer

  export const selectItemList = (state: RootState) => state.admin.itemList
  export const selectProductList = (state: RootState) => state.admin.productList
  export const selectExchangeList = (state: RootState) => state.admin.exchangeList
  export const selectIsConfirmModalOpen = (state: RootState) => state.admin.isConfirmModalOpen
  export const selectIsRefund = (state: RootState) => state.admin.isRefundChosen
  export const selectIsExchangeConfirmed = (state: RootState) => state.admin.isExchangeConfirmed
  export const selectIsExchangeChosen = (state: RootState) => state.admin.isExchangeChosen
  export const selectIsItemRefund = (state: RootState) => state.admin.isRefundItemChosen
  export const selectIsCalendarVisible = (state: RootState) => state.admin.isCalendarVisible





