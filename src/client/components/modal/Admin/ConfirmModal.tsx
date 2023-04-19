import Image from "next/image";
import { useRouter } from "next/router";
import {
  closeConfirmModal,
  onExchangeConfirmed,
  selectIsConfirmModalOpen,
} from "../../../redux/admin/slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import AnimatedModalOverlay from "../AnimatedModalOverlay";
import {
  getExchangeList,
  Items,
  selectItemList,
  selectProductList,
} from "./../../../redux/admin/slice";
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
];

const ConfirmModal = () => {
  const dispatch = useAppDispatch();
  const confirmModal = useAppSelector(selectIsConfirmModalOpen);
  const windowType = useAppSelector((state) => state.control.windowSize);
  const router = useRouter();
  const product = useAppSelector(selectProductList);
  const item = useAppSelector(selectItemList);
  const height = 400;

  const handleClickforPrice = (productId: any, item: Items) => {
    const newState = [...data].filter((ele) => {
      if (ele.id == productId) {
        ele.items.length = 0;
        return ele;
      }
      ele.items = [];
      ele.items.push(item);
      return ele;
    });

    console.log(newState);
    dispatch(closeConfirmModal());
    dispatch(onExchangeConfirmed());
    if (confirmModal?.back) {
      router.back();
    }

    dispatch(getExchangeList(newState));
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  };

  return (
    <AnimatedModalOverlay
      showModal={confirmModal!.type != "close"}
      height={height}
      width={windowType == "mobile" ? "96%" : "40%"}
    >
      <div className="relative flex flex-col items-center justify-center h-full mt-4">
        <div className="relative object-contain w-32 h-32 pt-4">
          <Image src={`/common/icon-warning.svg`} layout="fill" alt="" />
        </div>
        <div className="flex flex-col items-center justify-center py-5 text-lg font-medium h-32 underXs:text-sm">
          <>
            <span className="px-4 text-center text-lg lg:text-2xl lg:px-12">
              {confirmModal!.text}
            </span>
          </>
        </div>

        <div className="flex items-center justify-center w-full mb-5">
          {confirmModal!.type == "price" && (
            <button
              onClick={() => {
                handleClickforPrice(product, item!);
              }}
              className="flex items-center justify-center w-full h-12 max-w-sm px-4 py-3 mx-6 mb-2 text-left border rounded-lg bg-[#D0C4B8]"
            >
              <div className="text-[#757575] text-lg lg:text-xl">返回</div>
            </button>
          )}
          {confirmModal!.type == "total" && (
            <button
              onClick={() => {
                dispatch(closeConfirmModal());
                if (confirmModal?.back) {
                  router.back();
                }
              }}
              className="flex items-center justify-center w-full h-12 max-w-sm px-4 py-3 mx-6 mb-2 text-left border rounded-lg bg-[#D0C4B8]"
            >
              <div className="text-[#757575] text-lg lg:text-xl">返回</div>
            </button>
          )}

          {(confirmModal!.type == "refund" || confirmModal!.type == "edit") && (
            <div className="flex justify-center items-center lg:w-[65%] w-[90%]">
              <button
                onClick={() => {
                  dispatch(closeConfirmModal());
                  if (confirmModal?.back) {
                    router.back();
                  }
                }}
                className="flex items-center justify-center w-full lg:text-xl h-14 max-w-sm px-2 py-3 mx-3 lg:mx-4 mb-2 text-left border rounded-lg bg-[#D0C4B8]"
              >
                否
              </button>
              <button
                onClick={() => {
                  if (confirmModal?.push) {
                    dispatch(closeConfirmModal());
                    router.push(`${confirmModal.push}`);
                  }
                }}
                className="flex items-center justify-center w-full h-14 lg:text-xl max-w-sm px-2 py-3 mx-3 lg:mx-4 mb-2 text-left border rounded-lg text-white bg-[#82A90E]"
              >
                是
              </button>
            </div>
          )}
        </div>
      </div>
    </AnimatedModalOverlay>
  );
};

export default ConfirmModal;
