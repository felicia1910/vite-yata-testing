import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCategoryListThunk, getPickupStoresThunk } from './thunk';

export interface IConfigState {
    imgUrl: string;
}

export const initialState: IConfigState = {
    imgUrl: '/public/img'
}

export const IconfigSlice = createSlice({
    name: 'Iconfig',
    initialState,
    reducers: {

        getRegionMarketList: (
            state: Draft<typeof initialState>,
            action: PayloadAction<string>
        ) => {
            state.imgUrl = action.payload
        }
    }
})

export const {
    getRegionMarketList,
} = IconfigSlice.actions

export default IconfigSlice.reducer

export const selectImgUrl = (state: RootState) => state.Iconfig.imgUrl;