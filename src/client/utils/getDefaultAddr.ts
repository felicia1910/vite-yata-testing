import { IAddressInfo } from '../redux/delivery/slice';

export const getDefaultAddr = (addrList: IAddressInfo[]) => {
  if (addrList.length > 0) {
    return addrList.filter(
    (addr) => addr.defaultAddress == true
    )[0];
  } else {
    return null
  }
}