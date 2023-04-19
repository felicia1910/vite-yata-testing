import { createSlice, Draft, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { appLoginThunk, appLogoutThunk, getUserPointThunk, getAppPointThunk, restoreLoginThunk, adminLoginThunk } from './thunk';
//import jwt from 'jsonwebtoken';
import { stat } from "fs";

export interface IAdb2cUserInfo {
  iss?: string;
  exp?: number;
  nbf?: number;
  aud?: string;
  nationalNumber?: string
  countryCode?: string;
  sub?: string;
  title?: number | any;
  PhoneNumber?: string;
  first_name?: string;
  last_name?: string;
  birthday?: string;
  email?: string;
  lang?: number | any;
  name?: string;
  'signInNames.phoneNumber'?: string;
  tid?: string;
  nonce?: string;
  scp?: string,
  ver?: string;
  auth_time?: number;
  iat?: number;
  tfp?: string;
  // acr?: string;
  isForgotPassword?: boolean;
  at_hash?: string;
  promotionCode?: string
}

export interface IMemberType {
  memberSchemeTypeName: string,
  memberSchemeTypeForAppId: number,
  sequence: number,
  activationDate: Date | string
}

export interface ID365User {
  memberNo?: string;
  birthdayYYYY: number;
  birthdaymm: number;
  mobile: string;
  genderId: number;
  salutation: number;
  memberTypes?: any[] | IMemberType[];
  updateStamp?: Date | null;
  firstName: string;
  lastName: string;
  email: string;
  countryCodeId: number;
  countryCodeIdGenByUserName: string | null;
  countryId?: string | null;
  regionId?: string | null;
  districtId?: number | null;
  streetName?: string | null;
  buildingName?: string | null;
  preferredLanguage?: number;
  firstLoginTime?: string
}
export interface ITotalUserPoint{
  avaliablePoint: number,
  expirePoint: number,
  expiredPoint: number
}
export interface IUserPoints {
  historyType: number,
  name: {
    tc: string,
    en?: string,
  },
  recordDate: string,
  point: number
}

export interface IAdminUser{
  created_at: string|null|Date,
  email: string|null,
  failures_num: string|null,
  first_failure:string|null,
  firstname: string|null,
  is_active: number|null,
  lastname: string|null,
  lock_expires:string|null,
  logdate: string|null|Date,
  lognum: number,
  password: string|null,
  token: string|null,
  token_created_at: string|null|Date,
  updated_at: string|null|Date,
  user_id: number,
  username:string,
}

export interface IAuthState {
  isAuthenticated?: boolean | null;
  isAdminLogin: boolean | null;
  isLoginProcessing?: boolean;
  error?: SerializedError | string | null;
  adb2cUser?: IAdb2cUserInfo | null //| jwt.JwtPayload;
  crmUser: ID365User | null;
  adminUser: IAdminUser | null ;
  adminGrabUser: ID365User | null;
  userId: string | null;
  codeVerifier?: string;
  codeChallenge?: string;
  currentPolicy?: string;
  pointList?: IUserPoints[]|null;
  totalPoint?:  ITotalUserPoint|null
  // deliveryOption?: EShippingMode;
}

export const initialState: IAuthState = {
  isAuthenticated: false,
  isAdminLogin: null,
  isLoginProcessing: false,
  error: null,
  adb2cUser: null,
  crmUser: null,
  adminUser: null,
  adminGrabUser: null,
  userId: null,
  codeVerifier: '',
  codeChallenge: '',
  currentPolicy: '',
  pointList:null,
  totalPoint:null
  // deliveryOption: EShippingMode.default
} as const;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginProcess: (state: Draft<typeof initialState>) => {
      state.isAuthenticated = false;
      state.isLoginProcessing = true;
    },
    loginSuccess: (
      state: Draft<typeof initialState>,
      action: PayloadAction<{ adb2cUser: IAdb2cUserInfo, crmUser: ID365User }>
    ) => {
      state.isAuthenticated = true;
      state.isLoginProcessing = false;
      state.adb2cUser = action.payload.adb2cUser;
      state.crmUser = action.payload.crmUser;
    },
    loginFailure: (
      state: Draft<typeof initialState>,
      action: PayloadAction<string>
    ) => {
      state.isAuthenticated = false;
      state.isLoginProcessing = false;
      state.error = action.payload;
    },
    logout: (state: Draft<typeof initialState>) => {
      state.isAuthenticated = false;
      state.isLoginProcessing = false;
      state.adb2cUser = null;
      state.crmUser = null
      state.userId = null;
      localStorage.removeItem('adb2c_access_token')
    },
    getUserId: (
      state: Draft<typeof initialState>,
      action: PayloadAction<string | null>
    ) => {
      state.userId = action.payload
    },
    saveCodeVerifier: (
      state: Draft<typeof initialState>,
      action: PayloadAction<{ codeVerifier: string, codeChallenge: string }>
    ) => {
      state.codeVerifier = action.payload.codeVerifier;
      state.codeChallenge = action.payload.codeChallenge
    },
    setCurrentPolicy: (
      state: Draft<typeof initialState>,
      action: PayloadAction<string>
    ) => {
      state.currentPolicy = action.payload
      localStorage.setItem('currentPolicy', action.payload)
    },
    loginAsAdmin: (state, { payload }: PayloadAction<boolean>) => {
        state.isAdminLogin = payload
        state.adb2cUser = null;
        localStorage.removeItem('adb2c_access_token')
    },
    loginAdminMemberSuccess: (state, action: PayloadAction<IAdminUser>) => {
      state.adminUser = action.payload
    },
    initAdminUser: (state) => {
      state.adminUser = null
      state.adminGrabUser = null
    },
    initCrmGrabUser: (state) => {
      state.isAuthenticated = false;
      state.adminGrabUser = null
    },
    userGetByAdmin: (
      state: Draft<typeof initialState>,
      action: PayloadAction<{ adminGrabUser: ID365User }>
    ) => {
      state.isAuthenticated = true;
      state.isLoginProcessing = false;
      state.adminGrabUser = action.payload.adminGrabUser;
      state.crmUser = action.payload.adminGrabUser;

    },
    // setDeliveryMethod: (
    //   state: Draft<typeof initialState>,
    //   action: PayloadAction<EShippingMode>
    // ) => {
    //   state.deliveryOption = action.payload
    // }
  },
  extraReducers: builder => {
    builder.addCase(appLoginThunk.pending, (
      state: Draft<typeof initialState>
    ) => {
      state.isAuthenticated = false;
      state.isLoginProcessing = true;
    });

    builder.addCase(getAppPointThunk.fulfilled, (state, action: PayloadAction<IUserPoints[]>) => {
        state.pointList = action.payload
    });
    builder.addCase(getUserPointThunk.fulfilled, (state, action: PayloadAction<ITotalUserPoint>) => {
      state.totalPoint = action.payload
  });
    
    builder.addCase(appLoginThunk.fulfilled, (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState>
    ) => {
      state.isAuthenticated = true;
      state.isLoginProcessing = false;
      state.adb2cUser = action.payload.adb2cUser
    });
    builder.addCase(appLoginThunk.rejected, (state, action) => {
      state.error = action.error
    });
    builder.addCase(adminLoginThunk.fulfilled, (
      state: Draft<typeof initialState>,
      action: PayloadAction<IAdminUser>
      ) => {
      console.log('adminLoginThunkfulfilled',action.payload)
      state.isAdminLogin = true;
      state.adminUser = action.payload;
    });
    builder.addCase(adminLoginThunk.rejected, (state, action) => {
      console.log('adminLoginThunkfulfillrejecteded',)
      state.isAdminLogin = false;
      // state.error = action.error
    });
    builder.addCase(appLogoutThunk.fulfilled, (
      state: Draft<typeof initialState>,
    ) => {
      state.isAuthenticated = false;
      state.isLoginProcessing = false;
      state.adb2cUser = initialState.adb2cUser
    });
    builder.addCase(appLogoutThunk.rejected, (state, action) => {
      state.error = action.error
    });

    builder.addCase(restoreLoginThunk.fulfilled, (
      state: Draft<typeof initialState>,
      action: PayloadAction<IAdb2cUserInfo>
    ) => {
      state.isAuthenticated = true
      state.isLoginProcessing = false
      state.adb2cUser = action.payload
    });
    builder.addCase(restoreLoginThunk.pending, (
      state: Draft<typeof initialState>
    ) => {
      state.isAuthenticated = false;
      state.isLoginProcessing = true;
    });
    builder.addCase(restoreLoginThunk.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isLoginProcessing = false;
      state.error = action.error
      state.adb2cUser = initialState.adb2cUser
      localStorage.removeItem('adb2c_access_token')
    });
  }
});

export const {
  loginProcess,
  loginSuccess,
  loginFailure,
  logout,
  getUserId,
  saveCodeVerifier,
  setCurrentPolicy,
  loginAsAdmin,
  loginAdminMemberSuccess,
  initAdminUser,
  initCrmGrabUser,
  userGetByAdmin
  // setDeliveryMethod
} = authSlice.actions

export default authSlice.reducer

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsLoginProcessing = (state: RootState) => state.auth.isLoginProcessing;
export const selectUserInfo = (state: RootState) => state.auth.crmUser
export const selectAdminGrabUserInfo = (state: RootState) => state.auth.adminGrabUser
export const selectAdminUserInfo = (state: RootState) => state.auth.adminUser
export const selectCodeVerifier = (state: RootState) => state.auth.codeVerifier
export const selectCodeChallenge = (state: RootState) => state.auth.codeChallenge
export const selectUserPoints = (state: RootState) => state.auth.pointList
export const selectTotalPoints = (state: RootState) => state.auth.totalPoint
export const selectIsAdmin = (state: RootState) => state.auth.isAdminLogin;

