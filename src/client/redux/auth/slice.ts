import { createSlice, Draft, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { RootState } from "../store";

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
  },
  extraReducers: builder => {
  }
});

export const {

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

