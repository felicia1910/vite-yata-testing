import { useAppSelector } from "../redux/store";
import {
  selectAddressList,
  selectShippingMode,
  IFullShippingData,
  EShippingMode,
  selectPickupStore,
} from "../redux/delivery/slice";
export const useDefaultAddr = () => {
  const addressList = useAppSelector(selectAddressList);
  const shippingMode = useAppSelector(selectShippingMode);
  const pickupStore = useAppSelector(selectPickupStore);

  const defaultAddr =
    addressList &&
    addressList.length > 0 &&
    addressList.find((addr) => addr.defaultAddress == true);

  const initFullData: IFullShippingData = {
    shipment_mode:
      shippingMode == "HD" ? shippingMode : EShippingMode.selfPickup,
    pickup_location_code: pickupStore,
    id: defaultAddr ? defaultAddr.id : "",
    name: defaultAddr ? defaultAddr.name : "",
    phone: defaultAddr ? defaultAddr.phone : "",
    email: defaultAddr ? defaultAddr.email : "",
    region: defaultAddr ? defaultAddr.region : "",
    districtId: defaultAddr ? defaultAddr.districtId : 0,
    address1: defaultAddr ? defaultAddr.address1 : "",
  };

  return initFullData;
};
