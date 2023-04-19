import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { selectIsAuthenticated } from "../../../redux/auth/slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import AddAddress from "../../../components/account/AddAddress";
import AccountLayout from "../../../components/account/AccountLayout";
import MyAddress from "../../../components/account/MyAddress";
import {
  EWarningType,
  openWarningModal,
  selectIsLoading,
  selectWindowSize,
} from "../../../redux/control/slice";
import { selectAddressList } from "../../../redux/delivery/slice";
import Loading from "../../../components/common/Loading";
import WarningModal from "../../../components/modal/WarningModal";
import ReturnButton from "../../../components/common/ReturnButton";
import { addrLimit } from "../../../utils/types";

const DeliveryAddress = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);
  const addressList = useAppSelector(selectAddressList);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("redirectUrl", router.asPath);
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const windowType = useAppSelector(selectWindowSize);

  const onMobile = windowType === "mobile";
  const onLaptop = windowType === "laptop";

  return (
    <>
      <Loading isLoading={addressList == null || isLoading!} />
      <AccountLayout isRequired={false} title='送貨地址'>
        <div className='h-auto mb-20'>
          <div className='px-5 pt-5 font-bold'>
            送貨地址 （最多可保存20個送貨地址）
          </div>
          {addressList && (
            <>
              <div className='my-6'>
                {onLaptop && <MyAddress addressList={addressList} />}
              </div>
              {onMobile && (
                <div className='h-auto mb-16 space-y-2'>
                  <MyAddress addressList={addressList} />
                </div>
              )}
            </>
          )}
          {onLaptop ? (
            <AddAddress />
          ) : (
            <>
              <div className='flex items-center justify-center mb-4'>
                <button
                  className='flex items-center justify-center w-full h-12 py-2 pl-4 pr-2 mx-6 text-left text-white border rounded-lg lg:w-1/2 hover:border-2 hover:border-yata bg-yata-deep'
                  onClick={() => {
                    addressList!.length < addrLimit
                      ? router.push("/account/delivery-address/new ")
                      : dispatch(
                          openWarningModal({
                            type: EWarningType.address,
                            text: "",
                          })
                        );
                  }}
                >
                  <div className='font-medium'>新增送貨地址</div>
                </button>
              </div>
              <ReturnButton btnName='返回' goBack={true} />
            </>
          )}
        </div>
        <WarningModal />
      </AccountLayout>
    </>
  );
};

export default DeliveryAddress;
