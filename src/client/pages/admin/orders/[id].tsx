import { useRouter } from "next/router";
import { selectIsAuthenticated } from "../../../redux/auth/slice";
import { selectWindowSize } from "../../../redux/control/slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import Image from "next/image";
import Layout from "../../../components/admin/Layout";
import { IShoppingCartDetail } from "../../../redux/shopping/slice";
import TotalBill from "../../../components/shopping/ShoppingCart/TotalBill";
import ConfirmModal from "../../../components/modal/Admin/ConfirmModal";
import ProductList from "../../../components/admin/ProductList";
import { EConfirmType, openConfirmModal } from "../../../redux/admin/slice";

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

const OrderDetail = () => {
  const router = useRouter();
  const windowType = useAppSelector(selectWindowSize);
  const onLaptop = windowType === "laptop";

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
  return (
    <Layout isRequired={true} color={true} isBack={true}>
      <div className='flex items-center'>
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
          className='px-8 underline cursor-pointer underline-offset-4'
        >
          更改訂單
        </div>
        <div
          onClick={() => {
            dispatch(
              openConfirmModal({
                type: EConfirmType.refund,
                text: "確認退貨及換貨？",
                push: `/admin/refund/${id}`,
              })
            );
          }}
          className='px-8 underline cursor-pointer underline-offset-4'
        >
          退款及換貨
        </div>
      </div>
      <div className='flex items-center justify-start space-x-3 font-bold bg-[#FCFCFB] rounded-lg shadow p-4 my-4'>
        {onLaptop && (
          <button className='relative w-5 h-5' onClick={handleReturn}>
            <Image
              src='/myAccount/orderhistory/return.png'
              alt='back-icon'
              layout='fill'
            />
          </button>
        )}
        <span className='text-sm lg:text-lg'>訂單編號 : {id}</span>
        <span className='text-sm lg:text-lg'>訂單總額 : ${253.0}</span>
      </div>
      <div className='flex flex-wrap items-start justify-start w-full px-2 lg:space-x-12 gap-x-4 lg:flex-nowrap'>
        <span>
          訂單狀態：<b className='text-yata'>處理中</b>
        </span>
        <span>訂單日期：2022-09-14 00:33:40</span>
        <span>取貨方式：HD</span>
        <span>自取店舖：NTP</span>
      </div>
      <div className='px-2 mt-1'>顧客地址：土瓜灣</div>

      <ProductList data={data} />
      <div className='float-right w-full mt-4 lg:w-5/12 right-2'>
        <TotalBill detail={detail as any} />
      </div>
      <ConfirmModal />
    </Layout>
  );
};

export default OrderDetail;
