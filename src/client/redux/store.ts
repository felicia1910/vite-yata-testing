import { Action, AnyAction, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
//import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { useSelector } from 'react-redux';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';

import authReducer from './auth/slice'
import controlReducer from './control/slice'
import i18nReducer from './i18n/slice';
import shoppingReducer from './shopping/slice';
import deliveryReducer from './delivery/slice';
import configReducer from './config/slice';
import IconfigReducer from './config/index';
import adminReducer from './admin/slice';

const combinedReducer = combineReducers({
  auth: authReducer,
  Iconfig: IconfigReducer,
  config: configReducer,
  control: controlReducer,
  i18n: i18nReducer,
  shopping: shoppingReducer,
  delivery: deliveryReducer,
  admin: adminReducer,
})

const rootReducer = (
  state: ReturnType<typeof combinedReducer> | undefined,
  action: AnyAction) => {

  return combinedReducer(state, action);
  // if (action.type === HYDRATE) {
  //   const nextState = {
  //     ...state, // use previous state
  //     ...action.payload, // apply delta from hydration
  //   };
  //   return nextState;
  // } else {
  //   return combinedReducer(state, action);
  // }
};

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export const store = configureStore({
  reducer: rootReducer
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

//export const wrapper = createWrapper<AppStore>(makeStore);

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

