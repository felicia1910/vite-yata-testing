export type ClassesProps = {
  classes: string
}

export enum WindowScreen {
  laptop = 'laptop',
  mobile = 'mobile'
}

export type WindowProps = {
  window: WindowScreen
}

export type QueryProps = {
  category: { path: string | string[] | undefined, name: string | undefined, id: number | undefined };
  dept: { path: string | string[] | undefined, name: string | undefined, id: number | undefined };
  segment: { path: string | string[] | undefined, name: string | undefined, id: number | undefined };
  type: { path: string | string[] | undefined, name: string | undefined, id: number | undefined };
}


export type TExpand = {
  [key: string]: boolean;
  product: boolean;
  brand: boolean;
  origin: boolean
}

export interface IPaymentReqBody {
  [key: string]: string | number | undefined;
  campaign: string;
  amt: number;
  curr: string;
  desc: string;
  lang: string;
  merCode: string;
  merRef: string;
  notifyUrl: string;
  returnUrl: string;
  timeout: number;
  sign?: string;
  signType: string;
  ver: string;
}

export interface IPaymentMethod {
  id: number;
  payment_type_id: number;
  payment_type_description_c: string;
  payment_type_description_e: string;
  payment_campaign_code: string;
  payment_terms_c: string;
  payment_terms_e: string;
}

export interface IChangeShippingModeData {
  MemberNo: string
  shipment_mode: string
  pickup_location_code: string
  name: string
  phone: string
  email: string | null
  districtId?: number
  address1?: string
  address2?: string | null
}

export interface IOrderHistory {
  id: number;
  order_no: string;
  order_date: string;
  shipment_date: string;
  member_no: string;
  orig_quote_id: number;
  member_type: string;
  name: string;
  phone: string;
  email: string;
  district_id: number;
  district_name_c: string;
  address: string;
  address1: string;
  address2: string;
  shipment_mode: string;
  shipment_mode_name_c: string;
  pickup_location_code: string;
  shipment_fee: string;
  order_total: string;
  discount_total: string;
  order_total_with_discount: string;
  grand_total: string;
  order_state: number;
  order_status: string;
  email_sent: number;
  get_payment_status: number;
  mer_ref: string;
  payment_grand_total: string;
  created_at: Date |string;
  updated_at: Date | string;
}

export interface IPaymentResponseData {
  amt: string;
  authId: string;
  chRef: string;
  chResCode: string;
  curr: string;
  eci: string;
  merCode: string;
  merData: string;
  merRef: string;
  panHash: string;
  panHashType: string;
  payRef: string;
  payType: string;
  resMsg: string;
  state: string;
  txType: string;
}

export const addrLimit = 20