import { IAddressInfo } from "../redux/delivery/slice";

export type AddrError = {
  [key: string]: string,
  name: string;
  phone: string;
  region: string,
  districtId: string,
  address1: string,
}

export const initAddrErrMsg: AddrError = {
  name: '',
  phone: '',
  region: '',
  districtId: '',
  address1: ''
}

const useCheckAddrErr = (
  data: IAddressInfo,
) => {
  const msg = ['請輸入名字', '請輸入手提電話號碼', '請選擇區域', '請選擇地區', '請輸入詳細地址']
  let errors = initAddrErrMsg
  let haveErr = false

  Object.keys(initAddrErrMsg).map((key, idx) => {
    if (typeof data[key] == 'string') {
      if (data[key]?.toString().length == 0) {
        errors = { ...errors, [key]: msg[idx] }
        haveErr = true
      }
    } else if (typeof data[key] == 'number') {
      if (data[key] == 0) {
        errors = { ...errors, [key]: msg[idx] }
        haveErr = true
      }
    }
    if (key == 'region' && data[key] == '請選擇區域') {
      errors = { ...errors, [key]: msg[idx] }
      haveErr = true
    }
    if (key == 'districtId' && data[key]<=0) {
      errors = { ...errors, [key]: msg[idx] }
      haveErr = true
    }
  })
  if (data.region == "af85f8d6-e022-44a0-844b-f111a60729b2") {
    if (data.districtId != 3 && data.districtId != 6) {
      errors = { ...errors, districtId: '離島送貨只限東涌及馬灣，請重新輸入​' }
      haveErr = true
    }
  }

  if (!(data.phone.match("^[23456789]{1}[0-9]{7}$"))) {
    errors = { ...errors, phone: '手提電話號碼格式不正確' }
    haveErr = true
  }

  return {haveErr,errors}
}

export default useCheckAddrErr