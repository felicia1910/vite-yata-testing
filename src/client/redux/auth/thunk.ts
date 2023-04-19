import { createAsyncThunk, isRejected, isRejectedWithValue } from "@reduxjs/toolkit";
//import jwt from 'jsonwebtoken';

import { policyNames, scope } from "../../utils/authConfig";
import { IAuthState, IAdb2cUserInfo, ID365User, loginSuccess, loginProcess, loginFailure, loginAdminMemberSuccess, userGetByAdmin, IAdminUser } from './slice';
import { checkUserStatusApi } from '../register/thunk';
import { RootState } from '../store';
import { getUserDeliveryInfoThunk } from '../delivery/thunk';
import { getCartItemCountThunk } from "../shopping/thunk";
import { onLoaded, onLoading } from "../control/slice";
import { IAdminState } from "../admin/slice";



export const appLoginThunk = createAsyncThunk<IAuthState, IAdb2cUserInfo>(
  'auth/login',
  async (req, thunkAPI) => {
    try {
      // console.log(`Mobile: ${req["signInNames.phoneNumber"]}`)
      return req as any
    } catch (error) {
      return thunkAPI.rejectWithValue({ error })
    }
  }
);

export const appLogoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      // console.log('Logout now')
    } catch (error) {
      return thunkAPI.rejectWithValue({ error })
    }
  }
)

export const restoreLoginThunk = createAsyncThunk(
  'auth/refreshLogin',
  async (_, thunkAPI) => {
    try {
      const refreshToken = localStorage.getItem('adb2c_refresh_token')
      if (!refreshToken) {
        // console.log(`no refresh token`)
        return thunkAPI.rejectWithValue({ error: 'No refresh token' })
      }

      // console.logloglog(`refresh access token`)
      const headers = new Headers()
      headers.append("Content-Type", "application/x-www-form-urlencoded");
      const urlencoded = new URLSearchParams();
      urlencoded.append('client_id', process.env.AUTH_CLIENT_ID!)
      urlencoded.append('grant_type', 'refresh_token');
      // urlencoded.append('scope', `${process.env.AUTH_CLIENT_ID!} offline_access`);
      urlencoded.append('scope', `${scope} openid offline_access`);
      urlencoded.append('refresh_token', refreshToken);
      urlencoded.append('redirect_uri', `${process.env.NEXTAUTH_URL!}`);

      const res = await fetch(
        `https://${process.env.AUTH_TENANT_NAME}.b2clogin.com/${process.env.AUTH_TENANT_NAME}.onmicrosoft.com/${policyNames.signUpSignIn}/oauth2/v2.0/token`,
        {
          method: 'POST',
          headers: headers,
          body: urlencoded
        }
      )
      const result = await res.json()
      // console.log(`invalid refresh token c`, window.location.href)

      if (res.status !== 200) {
        return thunkAPI.rejectWithValue({ error: 'Invalid refresh token' })
      } else {
        localStorage.setItem('adb2c_login_result', JSON.stringify(result))
        localStorage.setItem('adb2c_id_token', result.id_token)
        localStorage.setItem('adb2c_access_token', result.access_token)
        localStorage.setItem('adb2c_refresh_token', result.refresh_token)

        const user: IAdb2cUserInfo = {iss:''} as IAdb2cUserInfo;//decode(result.id_token) as IAdb2cUserInfo
        return user as IAdb2cUserInfo
      }
    } catch (error) {
      console.log(`invalid refresh token`)
      return thunkAPI.rejectWithValue({ error: error });
    }

  }
)

export const getUserProfileThunk = createAsyncThunk(
  'auth/getUserProfile',
  async (_, thunkAPI) => {
    const { dispatch, getState } = thunkAPI
    const accessToken = localStorage.getItem('adb2c_access_token')
    const state = getState() as RootState
    try {
      // dispatch(loginProcess())
      if (accessToken) {
        const res = await fetch(`${process.env.APP_API_URL}/UserProfile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
        })
        const result = await res.json()
       // console.log('User profile: ', result)
        if (res.status == 200 && result.isSuccess == true) {
          // const { mobile, countryCodeId } = result.data
          // const userIdRes = await checkUserStatusApi(mobile, countryCodeId)

          // console.log('User ID: ', userIdRes)
          // if (userIdRes?.error == undefined) {
          // dispatch(getUserId(userIdRes!.userId))
          dispatch(loginSuccess({
            adb2cUser: {iss:''} as IAdb2cUserInfo,//jwt.decode(accessToken) as IAdb2cUserInfo,
            crmUser: result.data
          }))
          await dispatch(getUserDeliveryInfoThunk())
          await dispatch(getCartItemCountThunk())
          // }
          return
        } else {
          dispatch(loginFailure(result.errorMsg))
          return
        }
      } else {
        dispatch(loginFailure('帳戶過期，需重新登入'))
        return
      }
    } catch (error) {
      dispatch(loginFailure('帳戶問題，需重新登入'))
      return
    }
  }
)

export const getUserForAdminThunk = createAsyncThunk<any, {countryCode: string, mobile: string}, {state: RootState}>(
  'auth/getUserForAdmin',
  async (info, thunkAPI) => {
    const { dispatch } = thunkAPI
    try {
      const res = await fetch(`${process.env.APP_API_URL_ADMIN}/UserProfile?${new URLSearchParams([...Object.entries(info)])}`, {
        method: 'GET',
      })
      const result = await res.json()
      console.log('admin get user result: ', result)
      if (res.status == 200 && result.isSuccess) {
        dispatch(loginAdminMemberSuccess(result.data))
        dispatch(userGetByAdmin({adminGrabUser:result.data}))
      }
      return result
    } catch (error) {
      return { error: error }
    }
  }
)

export const getAppPointThunk = createAsyncThunk(
  'auth/pointHistory',
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI
    const accessToken = localStorage.getItem('adb2c_access_token')
    dispatch(onLoading())
    try {
      if (accessToken) {
        const res = await fetch(`${process.env.APP_API_URL}/UserPoint/GetPointHistory`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        const result = await res.json();

        if (res.status == 200 && result.isSuccess) {
          const pointInfo = result.data.recordList
          const sortedPoint = pointInfo.sort((x:any, y:any) => {
            return new Date(y).getTime() - new Date(x).getTime()
          })
          dispatch(onLoaded())
          return sortedPoint
          
        } else {
          dispatch(loginFailure('帳戶過期，需重新登入'))
          return
        }
      }
    } catch (error) {
      dispatch(onLoaded())
      return thunkAPI.rejectWithValue({ error })
    }
  }
)

export const getUserPointThunk = createAsyncThunk(
  'auth/userPoint',
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI
    const accessToken = localStorage.getItem('adb2c_access_token')
    dispatch(onLoading())
    try {
      if (accessToken) {
        const res = await fetch(`${process.env.APP_API_URL}/UserPoint/GetPoint`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        const result = await res.json();

        if (result.isSuccess) {
          dispatch(onLoaded())
          return result.userPointData;
        } else {
          dispatch(loginFailure('帳戶過期，需重新登入'))
          return
        }
      }
    } catch (error) {
      dispatch(onLoaded())
      return thunkAPI.rejectWithValue({ error })
    }
  }
)

export const getOrderHistoryThunk = createAsyncThunk<any, undefined, {state: RootState}>(
  'auth/getOrderHistory',
  async (_, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI
    const { crmUser, adminGrabUser, isAdminLogin } = getState().auth

    dispatch(onLoading())
    try {
      const res = await fetch(
        `${process.env.EC_API_URL}/salesorder/getOrderList`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            MemberNo: isAdminLogin
              ? adminGrabUser?.memberNo
              : crmUser?.memberNo,
          }),
        }
      );
      const result = await res.json();

      if (res.status === 200) {
        console.log("get order history result: ", result);
        dispatch(onLoaded())
        return result.data.getOrderList.items
      } else {
        dispatch(onLoaded())
        return []
      }
    } catch (error) {
      dispatch(onLoaded())
      return rejectWithValue(error)
    }
  }
)

export const getOrderDetailThunk = createAsyncThunk<any, string, {state: RootState}>(
  'auth/getOrderHistory',
  async (orderNo, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI
    const { crmUser, adminGrabUser, isAdminLogin } = getState().auth

    dispatch(onLoading())
    try {
      const res = await fetch(
        `${process.env.EC_API_URL}/salesOrder/getOrderDetail`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            MemberNo: isAdminLogin
              ? adminGrabUser?.memberNo
              : crmUser?.memberNo,
            order_no: orderNo
          }),
        }
      );
      const result = await res.json();

      if (res.status === 200) {
        console.log("get order detail result: ", result);
        dispatch(onLoaded)
        return result.data.getCart.items
      } else {
        dispatch(onLoaded)
        return []
      }
    } catch (error) {
      dispatch(onLoaded)
      return rejectWithValue(error)
    }
  }
)

interface adminLoginInput {username:string,password:string}

export const adminLoginThunk = createAsyncThunk<IAdminUser, adminLoginInput>(
  'auth/AdminLogin',
  
  async (adminUser,thunkAPI)=>{
    
  // const testAcc = {username:"sammi.mak",password:"9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"}
  try {
    const res = await fetch(
      `${process.env.EC_API_URL}/adminPortal/getLogin`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminUser),
        redirect: "follow",
      }
    );
    
    const result = await res.json();
    if (res.status == 200) {
      const adminInfo = result.data.getLogin.items[0];  
      // console.log('adminLoginThunk: ', result.data )
      return adminInfo;
    }else{
      return thunkAPI.rejectWithValue(result)
    }
  } catch (error) {
    console.log('get banner err: ',error);
    return thunkAPI.rejectWithValue("error")

  }
}
)



