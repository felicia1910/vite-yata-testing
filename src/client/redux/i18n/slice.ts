import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { defaultLang, supportedLangs } from "../../utils/i18nConfig";

export interface Props {
  lang: string
  supportedLangs: object
  translations: object

}

const initialState: Props = {
  lang: defaultLang,
  supportedLangs: { ...supportedLangs },
  translations: {
    zh: {
      placeholders: "搜尋產品名稱或品牌",
      btn: "搜尋"
    },
    en: {
      placeholders: "Search by product name or category",
      btn: "Search"
    }

  },
};

export const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setLang: (state: Draft<typeof initialState>,
      action: PayloadAction<Props>) => {
      state.lang = action.payload.lang;
      // console.log(action.payload)

    },
  },
});

export const { setLang } = i18nSlice.actions;
export const selectTranslations = (state: any) =>
  state.i18n.translations[state.i18n.lang];
export default i18nSlice.reducer;
