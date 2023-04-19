import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum WindowSize {
  default = 'default',
  laptop = 'laptop',
  tablet = 'tablet',
  mobile = 'mobile'
}

export enum EWarningType {
  close = "close",
  address = "address",
  payment = "payment",
  product = "product",
  adminOrder = "adminOrder"
}

export interface IWarningMsg {
  type: EWarningType,
  text: string
  back?: boolean
  path?:string
  header?:string
}

export interface IControlState {
  isLoading?: boolean;
  isCardLoading?: boolean;
  isLoginModalOpen?: boolean;
  isWishListModalOpen?: boolean;
  isDeliveryModalOpen?: boolean;
  isECouponModalOpen?: boolean;
  isFillAddressModalOpen?: boolean;
  isLackAmountModalOpen?: boolean;
  isKeepShoppingModalOpen?: boolean;
  isChooseAddressModalOpen?: boolean;
  isWarningModalOpen?: IWarningMsg;
  isCommonModalOpen?: boolean;
  isDrawerOpen?: boolean;
  windowSize?: WindowSize
  isEdited?: boolean;
  isCheckOut?: boolean;
  isNewAddressAdded?: boolean;
  isKeepFilter?: boolean
}

export const initialState: IControlState = {
  isLoading: false,
  isCardLoading: false,
  isLoginModalOpen: false,
  isWishListModalOpen: false,
  isDeliveryModalOpen: false,
  isECouponModalOpen: false,
  isLackAmountModalOpen: false,
  isKeepShoppingModalOpen:false,
  isFillAddressModalOpen:false,
  isChooseAddressModalOpen:false,
  isWarningModalOpen: {
    type: EWarningType.close,
    text: ""
  },
  isCommonModalOpen: false,
  isDrawerOpen: false,
  windowSize: WindowSize.default,
  isEdited: false,
  isCheckOut: false,
  isNewAddressAdded: false,
  isKeepFilter: false
}

export const controlSlice = createSlice({
  name: 'control',
  initialState,
  reducers: {
    onLoading: (state: Draft<typeof initialState>) => {
      state.isLoading = true
    },
    onLoaded: (state: Draft<typeof initialState>) => {
      state.isLoading = false
    },
    onCardLoading: (state: Draft<typeof initialState>) => {
      state.isCardLoading = true
    },
    onCardLoaded: (state: Draft<typeof initialState>) => {
      state.isCardLoading = false
    },
    openLoginModal: (state: Draft<typeof initialState>) => {
      state.isLoginModalOpen = true
    },
    closeLoginModal: (
      state: Draft<typeof initialState>
    ) => {
      state.isLoginModalOpen = false
    },
    openWishListModal: (state: Draft<typeof initialState>) => {
      state.isWishListModalOpen = true
    },
    closeWishListModal: (
      state: Draft<typeof initialState>
    ) => {
      state.isWishListModalOpen = false
    },
    openDeliveryModal: (state: Draft<typeof initialState>) => {
      state.isDeliveryModalOpen = true
    },
    closeDeliveryModal: (
      state: Draft<typeof initialState>
    ) => {
      state.isDeliveryModalOpen = false
    },
    openECouponModal: (state: Draft<typeof initialState>) => {
      state.isECouponModalOpen = true
    },
    closeECouponModal: (
      state: Draft<typeof initialState>
    ) => {
      state.isECouponModalOpen = false
    },
    openWarningModal: (state: Draft<typeof initialState>, action: PayloadAction<IWarningMsg>) => {
      state.isWarningModalOpen = action.payload
    },
    closeWarningModal: (
      state: Draft<typeof initialState>
    ) => {
      state.isWarningModalOpen = {
        type: EWarningType.close,
        text: ""
      }
    },
    openShoppingModal: (state: Draft<typeof initialState>) => {
      state.isKeepShoppingModalOpen = true
    },
    closeShoppingModal: (
      state: Draft<typeof initialState>
    ) => {
      state.isKeepShoppingModalOpen = false
    },
    openLackAmountModal: (state: Draft<typeof initialState>) => {
      state.isLackAmountModalOpen = true
    },
    closeLackAmountModal: (
      state: Draft<typeof initialState>
    ) => {
      state.isLackAmountModalOpen = false
    },
    openCommonModal: (state: Draft<typeof initialState>) => {
      state.isCommonModalOpen = true
    },
    closeCommonModal: (
      state: Draft<typeof initialState>
    ) => {
      state.isCommonModalOpen = false
    },
    openFillAddressModal: (state: Draft<typeof initialState>) => {
      state.isFillAddressModalOpen = true
    },
    closeFillAddressModal: (
      state: Draft<typeof initialState>
    ) => {
      state.isFillAddressModalOpen = false
    },
    openChooseAddressModal: (state: Draft<typeof initialState>) => {
      state.isChooseAddressModalOpen = true
    },
    closeChooseAddressModal: (
      state: Draft<typeof initialState>
    ) => {
      state.isChooseAddressModalOpen = false
    },
    openDrawer: (state: Draft<typeof initialState>) => {
      state.isDrawerOpen = true
    },
    closeDrawer: (
      state: Draft<typeof initialState>
    ) => {
      state.isDrawerOpen = false
    },
    onLaptopSize: (state: Draft<typeof initialState>) => {
      state.windowSize = WindowSize.laptop
    },
    onMobileSize: (state: Draft<typeof initialState>) => {
      state.windowSize = WindowSize.mobile
    },
    onCartEdit: (
      state: Draft<typeof initialState>,
      action: PayloadAction<boolean>
    ) => {
      state.isEdited = action.payload
    },
    onCartCheckOut: (
      state: Draft<typeof initialState>,
      action: PayloadAction<boolean>
    ) => {
      state.isCheckOut = action.payload
    },
    onNewAddressAdd: (state: Draft<typeof initialState>) => {
      state.isNewAddressAdded = true
    },
    onNewAddressClose: (state: Draft<typeof initialState>) => {
      state.isNewAddressAdded = false
    },
    setKeepFilter: (state, action: PayloadAction<boolean>) => {
      state.isKeepFilter = action.payload
    }
  }
})

export const {
  onLoading,
  onLoaded,
  onCardLoading,
  onCardLoaded,
  openLoginModal,
  closeLoginModal,
  openWishListModal,
  closeWishListModal,
  openDeliveryModal,
  closeDeliveryModal,
  openECouponModal,
  closeECouponModal,
  openLackAmountModal,
  closeLackAmountModal,
  openShoppingModal,
  closeShoppingModal,
  openFillAddressModal,
  closeFillAddressModal,
  openChooseAddressModal,
  closeChooseAddressModal,
  openCommonModal,
  closeCommonModal,
  openWarningModal,
  closeWarningModal,
  openDrawer,
  closeDrawer,
  onLaptopSize,
  onMobileSize,
  onCartEdit,
  onCartCheckOut,
  onNewAddressAdd,
  onNewAddressClose,
  setKeepFilter
} = controlSlice.actions

export default controlSlice.reducer

export const selectIsLoading = (state: RootState) => state.control.isLoading
export const selectIsCardLoading = (state: RootState) => state.control.isCardLoading
export const selectIsLoginModalOpen = (state: RootState) => state.control.isLoginModalOpen
export const selectIsWishListModalOpen = (state: RootState) => state.control.isWishListModalOpen
export const selectIsDeliveryModalOpen = (state: RootState) => state.control.isDeliveryModalOpen
export const selectIsECouponModalOpen = (state: RootState) => state.control.isECouponModalOpen
export const selectIsLackAmountModalOpen = (state: RootState) => state.control.isLackAmountModalOpen
export const selectIsKeepShoppingModalOpen = (state: RootState) => state.control.isKeepShoppingModalOpen
export const selectIsFillAddressModalOpen = (state: RootState) => state.control.isFillAddressModalOpen
export const selectIsChooseAddressModalOpen = (state: RootState) => state.control.isChooseAddressModalOpen
export const selectIsWarningModalOpen = (state: RootState) => state.control.isWarningModalOpen
export const selectIsNewAddressAdded = (state: RootState) => state.control.isNewAddressAdded
export const selectIsCommonModalOpen = (state: RootState) => state.control.isCommonModalOpen
export const selectWindowSize = (state: RootState) => state.control.windowSize
export const selectIsEdited = (state: RootState) => state.control.isEdited
export const selectIsCheckOut = (state: RootState) => state.control.isCheckOut

