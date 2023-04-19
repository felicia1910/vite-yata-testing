import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDefaultAddr } from "../../utils/getDefaultAddr";
import { onLoaded, onLoading } from "../control/slice";
import { IAddressInfo } from "../delivery/slice";
import { getCartItemCountThunk } from "../shopping/thunk";
import { RootState } from "../store";


export const getHamperProductDetailThunk = createAsyncThunk(
  "admin/getHamperList",
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;

    try {
      dispatch(onLoading()); 
      const res = await fetch(
        `${process.env.EC_API_URL}/adminportal/getHamperItemList`,
        {
          method: "POST",
        
        }
      )

      const result = await res.json();
      if (res.status == 200) {
        console.log('product detail: ', result.data.getHamperItemList)
        dispatch(onLoaded());
        return result.data;
      }
    } catch (error) {
      console.log('product detail err: ',error);
      dispatch(onLoaded());
      return rejectWithValue({ error: error });
    }
  }
);

export const adminAddItemApi = createAsyncThunk<any, any, { state: RootState }>(
  "admin/addItemToCart",
  async (postData: any, thunkAPI) => {
    console.log("add item result: adminAddItemApi", 1);
    const { dispatch, rejectWithValue, getState } = thunkAPI;
    const state = getState();
    const addrList: IAddressInfo[] = state.delivery.addressList!;

    // const defaultAddr = getDefaultAddr(addrList)

    console.log("add item result: adminAddItemApi", 2);
    try {
      console.log("add item result: adminAddItemApi", postData);
      dispatch(onLoading());
      const res = await fetch(
        `${process.env.EC_API_URL}/cart/addItem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(postData),
        }
      )
      console.log("add item result: ", res);

      const result = await res.json();

      if (res.status == 200) {
        console.log("add item result: ", result);
        await dispatch(getCartItemCountThunk());
        if (result.data.addItem) {
          
          if (result.data.addItem.items.Success) {
            return { success: result.data.addItem.items.Success };
          } else {
            return { success: 0, err: result.data.addItem.items.error };
          }
        }
        return { success: 0, err: [""] };
        
      }
      return { success: 0, err: [""] };
    } catch (error) {
      console.log('product detail err: ', error);
      dispatch(onLoaded());
      return rejectWithValue({ error: error });
    }

  }
)