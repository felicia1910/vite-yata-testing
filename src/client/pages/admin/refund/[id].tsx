import Image from "next/image";
import { useRouter } from "next/router";
import ExchangeBox from "../../../components/admin/ExchangeBox";
import Layout from "../../../components/admin/Layout";
import ProductList from "../../../components/admin/ProductList";
import ConfirmModal from "../../../components/modal/Admin/ConfirmModal";
import TotalBill from "../../../components/shopping/ShoppingCart/TotalBill";
import {
  getExchangeList,
  getItemList,
  getProductList,
  selectExchangeList,
  EConfirmType,
  onExchangeNotConfirmed,
  onItemNoRefund,
  onNoRefund,
  onRefund,
  onRemoveExchange,
  openConfirmModal,
  selectIsExchangeChosen,
  selectIsExchangeConfirmed,
} from "../../../redux/admin/slice";
import { selectWindowSize } from "../../../redux/control/slice";
import { IShoppingCartDetail } from "../../../redux/shopping/slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import ExchangeList from "./../../../components/admin/ExchangeList";
import ExchangeTotal from "./../../../components/admin/ExchangeTotal";

const data = [
  {
    id: 1,
    shipmentNo: "YATAEC120000001-S1",
    date: "3/9/2022",
    time: "13:00-17:00",
    status: "準備中",
    total: "203.20",
    items: [
      {
        full_name_c:
          "[買6包送HUGGIES輕潤柔膚嬰兒濕紙巾30片乙件] 好奇天然透氣紙尿片初生1碼",
        plu: "10454532",
        psp: "49.90",
        qty: 1,
        images_url:
          "https://yata-eshop-cdn.azureedge.net/product/10454532/10454532_130.jpg",
      },
      {
        full_name_c: "CLEVAMAMA抗菌竹纖維嬰兒沐浴毛巾(白/黃)",
        plu: "10424664",
        psp: "153.30",
        qty: 1,
        images_url:
          "https://yata-eshop-cdn.azureedge.net/product/10424664/10424664.CLEVAMAMA  3534.jpg",
      },
    ],
  },
  {
    id: 2,
    shipmentNo: "YATAEC120000001-S1",
    date: "9/9/2022",
    time: "13:00-21:00",
    status: "準備中",
    total: "395",
    items: [
      {
        full_name_c: "10 mois Quick Dry Pillow 透氣快乾嬰兒枕 粉藍熊",
        plu: "10449250",
        psp: "395.00",
        qty: 1,
        images_url:
          "https://yata-eshop-cdn.azureedge.net/product/10449250/10449250.20151011.jpg",
      },
    ],
  },
];
const data2 = [
  {
    id: 1,
    shipmentNo: "YATAEC120000001-S1",
    date: "3/9/2022",
    time: "13:00-17:00",
    status: "準備中",
    total: "203.20",
    items: [
      {
        full_name_c:
          "[買6包送HUGGIES輕潤柔膚嬰兒濕紙巾30片乙件] 好奇天然透氣紙尿片初生1碼",
        plu: "10454532",
        psp: "49.90",
        qty: 1,
        images_url:
          "https://yata-eshop-cdn.azureedge.net/product/10454532/10454532_130.jpg",
      },
      {
        full_name_c: "CLEVAMAMA抗菌竹纖維嬰兒沐浴毛巾(白/黃)",
        plu: "10424664",
        psp: "153.30",
        qty: 1,
        images_url:
          "https://yata-eshop-cdn.azureedge.net/product/10424664/10424664.CLEVAMAMA  3534.jpg",
      },
    ],
  },
];
const Refund = () => {
  const router = useRouter();
  const windowType = useAppSelector(selectWindowSize);
  const onLaptop = windowType === "laptop";
  const exchange = useAppSelector(selectIsExchangeChosen);

  const detail: IShoppingCartDetail = {
    address1: "",
    address2: "",
    address_id: "",
    called_pos_api: 1,
    converted_at: "",
    created_at: "2022-09-29T04:42:16.000Z",
    discount_total: "0.00",
    district_id: "0",
    email: "w3@gmail.com",
    grand_total: "598.20",
    id: 1879,
    is_active: 1,
    item_total_qty: 8,
    member_no: "M9000947",
    member_type: "000",
    name: "11 11",
    orig_order_id: 0,
    packaging_fee: 2.0,
    phone: "64124649",
    pickup_location_code: "NTP",
    quote_total: "598.20",
    quote_total_with_discount: "598.20",
    quote_type: 0,
    quote_uuid: "16ca7413-3fb1-11ed-9d4e-f44a930459b3",
    reserved_delivery_quota_id: 0,
    shipment_fee: 0.0,
    shipment_group: [],
    shipment_mode: "HD",
    updated_at: "2022-10-05 11:46:46",
    item_lines: [],
  };

  const handleReturn = () => {
    router.push("/admin/orders");
  };
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const exchangeConfirmed = useAppSelector(selectIsExchangeConfirmed);
  const exchangedData = useAppSelector(selectExchangeList);
  const adminRefundPage = router.pathname === "/admin/refund/[id]";
  if (adminRefundPage) {
    dispatch(onRefund());
  } else {
    dispatch(onNoRefund());
    dispatch(onItemNoRefund());
    dispatch(onRemoveExchange());
    dispatch(onExchangeNotConfirmed());
    dispatch(getProductList([]));
    dispatch(getItemList(null));
    dispatch(getExchangeList([]));
  }

  const check = exchangeConfirmed ? (
    <ProductList data={exchangedData!} />
  ) : (
    <ProductList data={data2} />
  );
  return (
    <Layout isRequired={true} color={true} isBack={true}>
      <div className="flex items-center">
        <div
          onClick={() => {
            dispatch(
              openConfirmModal({
                type: EConfirmType.edit,
                text: "是否確認更改此訂單？",
                push: `/admin/edit/${id}`,
              })
            );
          }}
          className="underline underline-offset-4 px-8 cursor-pointer"
        >
          更改訂單
        </div>
        <div className="underline text-yata underline-offset-4 px-8">
          退款及換貨
        </div>
      </div>
      <div className="flex items-center justify-between space-x-3 font-bold bg-[#FCFCFB] rounded-lg shadow p-4 my-4">
        <div className="flex items-center justify-start space-x-3 font-bold">
          {onLaptop && (
            <button className="relative w-5 h-5" onClick={handleReturn}>
              <Image
                src="/myAccount/orderhistory/return.png"
                alt="back-icon"
                layout="fill"
              />
            </button>
          )}
          <span className="text-sm lg:text-lg">訂單編號 : {id}</span>
          <span className="text-sm lg:text-lg">訂單總額 : ${253.0}</span>
        </div>
        {adminRefundPage && (
          <div className="flex items-center justify-center space-x-3 font-reguar">
            <button
              className="flex items-center justify-center px-2 py-1 space-x-1 text-base font-bold border border-dashed rounded-md cursor-pointer border-yata"
              onClick={() => {
                router.push({
                  pathname: "/contact-us",
                  query: { orderNo: router.query.id },
                });
              }}
            >
              <div className="relative w-4 h-4">
                <Image
                  src="/myAccount/orderhistory/inquiry.png"
                  alt="enquiry"
                  layout="fill"
                />
              </div>
              <span className="text-xs text-yata lg:text-base min-w-fit">
                查詢訂單
              </span>
            </button>
          </div>
        )}
      </div>
      <div className="flex items-start w-full justify-start lg:space-x-12 gap-x-4 flex-wrap lg:flex-nowrap px-2">
        <span>
          訂單狀態：<b className="text-yata">已完成 </b>
        </span>
        <span>訂單日期：2022-09-14 00:33:40</span>
      </div>

      {adminRefundPage ? check : <ProductList data={data} />}
      <div className="flex w-full justify-between items-center">
        <div />
        <div className="flex flex-col w-full lg:w-5/12">
          <div className=" w-full mt-4">
            <TotalBill  detail={detail as any} />
          </div>
          <div className=" w-full lg:w-full ml-20 items-center mt-4">
            <ExchangeBox />
          </div>
        </div>
      </div>
      {exchange && (
        <div className="lg:w-[95%] mt-9">
          <ExchangeList />
          <div className="flex w-full justify-between items-center">
            <div />
            <div className=" w-[40%] mt-9">
              <ExchangeTotal />
            </div>
          </div>
        </div>
      )}
      <ConfirmModal />
    </Layout>
  );
};

export default Refund;
