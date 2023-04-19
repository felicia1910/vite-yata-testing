import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import React, { useState } from "react";
import TickSvg from "../../public/common/tick";
import { selectRegionList } from "../../redux/config/slice";
import { onLoading, selectWindowSize } from "../../redux/control/slice";
import { IAddressInfo } from "../../redux/delivery/slice";
import {
  changeShippingModeThunk,
  deleteDeliveryAddressThunk,
  updateDeliveryInfoThunk,
} from "../../redux/delivery/thunk";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import AddAddressModal, { EModalType } from "../modal/Address/AddAddressModal";

type Props = {
  addressList: IAddressInfo[];
};

const MyAddress = ({ addressList }: Props) => {
  const dispatch = useAppDispatch();
  const windowType = useAppSelector(selectWindowSize);
  const regionList = useAppSelector(selectRegionList);
  const shipping = useAppSelector((state) => state.delivery.shippingInfo);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [editAddr, setEditAddr] = useState<IAddressInfo | null>(null);

  const onMobile = windowType === "mobile";
  const onLaptop = windowType === "laptop";

  const genRegionText = (regionId: string, districtId: number) => {
    const region = regionList.find((reg) => reg.id == regionId);
    const district = region?.districtList.find((dis) => dis.id === districtId);
    return { region: region?.name.tc, district: district?.name.tc };
  };

  const toggleAddrDelete = async (id: string) => {
    dispatch(onLoading());
    await dispatch(deleteDeliveryAddressThunk(id));
  };

  const toggleDefaultAddr = async (addr: IAddressInfo) => {
    dispatch(onLoading());
    setTimeout(async () => {
      await dispatch(
        changeShippingModeThunk({
          ...addr,
          shipment_mode: shipping.shipment_mode,
          pickup_location_code: shipping.pickup_location_code,
        })
      );
      await dispatch(
        updateDeliveryInfoThunk({
          ...addr,
          defaultAddress: !addr.defaultAddress,
        })
      );
    }, 800);
  };

  return (
    <>
      {onLaptop && (
        <div className='flex flex-col items-center justify-center w-full'>
          <table className='w-full '>
            <thead>
              <tr className='text-lg text-white bg-yata'>
                <th className='py-3 text-base font-medium rounded-tl-xl'>
                  收貨人
                </th>
                <th className='py-3 text-base font-medium '>手提電話號碼</th>
                <th className='py-3 text-base font-medium '>區域</th>
                <th className='py-3 text-base font-medium '>地區</th>
                <th className='py-3 text-base font-medium '>詳細地址</th>
                <th className='py-3 text-base font-medium '>操作</th>
                <th className='py-3 text-base font-medium rounded-tr-xl'>
                  選為預設送貨地址
                </th>
              </tr>
            </thead>
            <tbody>
              {addressList.length > 0 &&
                addressList.map((addr) => {
                  const text = genRegionText(addr.region, addr.districtId);
                  return (
                    <tr
                      key={addr.id}
                      className='h-20 text-base font-normal leading-5'
                    >
                      <td className='px-3 py-4 text-left border border-grey'>
                        {addr.name}
                      </td>
                      <td className='px-3 py-4 text-left border border-grey'>
                        {addr.phone}
                      </td>
                      <td className='px-3 py-4 text-left border border-grey'>
                        {text.region}
                      </td>
                      <td className='px-3 py-4 text-left border border-grey'>
                        {text.district}
                      </td>
                      <td className='px-3 py-4 text-left border border-grey'>
                        {`${addr.address1} ${
                          addr.address2 ? addr.address2 : ""
                        }`}
                      </td>
                      <td
                        align='center'
                        className='object-center w-16 px-3 py-4 mx-auto border border-grey'
                      >
                        <div className='flex items-center space-x-2'>
                          <button
                            className='relative object-contain w-5 h-5'
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditAddr(addr);
                              setTimeout(() => {
                                setOpenUpdateModal(true);
                              }, 200);
                            }}
                          >
                            <Image
                              src='/myAccount/myAddress/edit.svg'
                              alt='edit.svg'
                              layout='fill'
                            />
                          </button>
                          <button
                            className='relative object-contain w-5 h-5'
                            onClick={async () => {
                              await toggleAddrDelete(addr.id!);
                            }}
                          >
                            <Image
                              src='/myAccount/myAddress/bin.svg'
                              alt='bin.svg'
                              layout='fill'
                            />
                          </button>
                        </div>
                      </td>
                      <td
                        align='center'
                        className='object-center px-3 py-3 mx-auto border border-grey'
                      >
                        <div
                          className='border-[1px] mr-1 rounded w-5 h-5 p-[0.15rem] cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out'
                          style={
                            addr.defaultAddress == true
                              ? {
                                  borderColor: "#A6CE39",
                                  backgroundColor: "#A6CE39",
                                }
                              : {
                                  borderColor: "#6A3B0D",
                                  backgroundColor: "#FFF",
                                }
                          }
                          onClick={async () => {
                            await toggleDefaultAddr(addr);
                          }}
                        >
                          <TickSvg fill='#FFF' />
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          {/* <AddAddressModal
            type={EModalType.update}
            addrInfo={editAddr!}
            showModal={openUpdateModal}
            setShowModal={setOpenUpdateModal}
          /> */}

          {addressList.length == 0 && (
            <div className='flex items-center justify-center w-full rounded-bl-xl rounded-br-xl h-20 border-[1px] text-base font-normal leading-5'>
              請在下方新增送貨地址
            </div>
          )}
        </div>
      )}
      {onMobile && (
        <>
          {addressList.length > 0 &&
            addressList.map((addr) => {
              const text = genRegionText(addr.region, addr.districtId);
              return (
                <div
                  key={addr.id}
                  className='relative w-full px-4 py-4 overflow-hidden bg-white border-2 rounded-lg border-grey text-yata-brown font-regular'
                >
                  <div className='flex items-start w-full mb-1 space-x-4'>
                    <span>{addr.name}</span>
                    <span>{addr.phone}</span>
                  </div>

                  {addr.defaultAddress && (
                    <div className='absolute top-0 right-0 flex items-center justify-center w-10 h-6 rounded-bl-lg bg-yata'>
                      <div className='w-[16px] h-[12px] relative'>
                        <Image
                          src='/common/tick-white.png'
                          layout='fill'
                          objectFit='contain'
                          alt='tick 1.svg'
                        />
                      </div>
                    </div>
                  )}
                  <div className='flex items-start justify-between mb-1 text-base'>
                    <div className='pr-2 text-base'>
                      <span>{`${text.region} ${text.district} `}</span>
                      <div>{addr.address1}</div>
                      <span>{addr.address2}</span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <button
                        className='relative object-contain w-5 h-5'
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditAddr(addr);
                          setTimeout(() => {
                            setOpenUpdateModal(true);
                          }, 200);
                        }}
                      >
                        <Image
                          src='/myAccount/myAddress/edit.svg'
                          alt='edit.svg'
                          layout='fill'
                        />
                      </button>
                      <button
                        className='relative object-contain w-5 h-5'
                        onClick={async () => {
                          await toggleAddrDelete(addr.id!);
                        }}
                      >
                        <Image
                          src='/myAccount/myAddress/bin.svg'
                          alt='bin.svg'
                          layout='fill'
                        />
                      </button>
                    </div>
                    {/* <AddAddressModal
                      type={EModalType.update}
                      addrInfo={addr}
                      showModal={openUpdateModal}
                      setShowModal={setOpenUpdateModal}
                    /> */}
                  </div>
                </div>
              );
            })}
          {addressList.length == 0 && (
            <div className='flex items-center justify-center w-full rounded-xl h-20 border-[1px] text-base font-normal leading-5'>
              請點擊下方新增送貨地址
            </div>
          )}
        </>
      )}

      <AddAddressModal
        type={EModalType.update}
        addrInfo={editAddr!}
        showModal={openUpdateModal}
        setShowModal={setOpenUpdateModal}
      />
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const regionList = useAppSelector(selectRegionList)

//   return {
//     props: { regionList: JSON.stringify(regionList) }
//   }

// }

export default MyAddress;
