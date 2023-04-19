import Image from "next/image";
import React from "react";
import {
  onSelectExchange,
  selectIsExchangeChosen,
  selectIsExchangeConfirmed,
  selectIsItemRefund,
} from "../../redux/admin/slice";
import { useAppSelector } from "../../redux/store";
import { useAppDispatch } from "./../../redux/store";
import {
  getProductList,
  Items,
  selectItemList,
  selectProductList,
} from "./../../redux/admin/slice";

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

const ExchangeBox = () => {
  const exchange = useAppSelector(selectIsExchangeChosen);
  const itemSelected = useAppSelector(selectIsItemRefund);
  const exchangeConfirmed = useAppSelector(selectIsExchangeConfirmed);
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProductList);
  const item = useAppSelector(selectItemList);
  ///console.log(product, "product")
  /// console.log(item, "item")

  const handleClick = (el: any, item: Items) => {
    if (itemSelected) {
      console.log(data);     
      const newState = [...data].map((ele, i) => {
        if (ele.id == el) {
          //   console.log(ele.items)
          let newList = ele.items?.filter((i) => {
            return i.plu !== item.plu;
          });
          ele.items = newList;
          return ele;
        }
        return ele;
      });
      dispatch(onSelectExchange());
      dispatch(getProductList(newState));
      
    }
  };
  return (
    <div className="w-full block lg:text-lg text-base space-y-2">
      <div>退貨金額：$350</div>
      <div className="flex justify-start w-full items-start gap-3">
        <span>需要換貨：</span>
        {exchange ? (
          <>
            {exchangeConfirmed ? (
              <span>是</span>
            ) : (
              <>
                <button className="flex justify-center w-[20%] items-center bg-[#FAFFEB] border-yata-deep border rounded-lg py-1 px-4 gap-3">
                  <span>是</span>
                  <Image
                    src="/admin/Ellipse 4.png"
                    alt=""
                    width={14}
                    height={12}
                  />
                </button>
                <button className="flex justify-center w-[20%] items-center border rounded-lg py-1 px-4 gap-3">
                  <span>否</span>
                  <Image
                    src="/admin/Ellipse 6.png"
                    alt=""
                    width={14}
                    height={12}
                  />
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <button
              onClick={() => handleClick(product, item!)}
              className="flex justify-center w-[20%] items-center border rounded-lg py-1 px-4 gap-3"
            >
              <span>是</span>
              <Image src="/admin/Ellipse 6.png" alt="" width={14} height={12} />
            </button>
            <button className="flex justify-center w-[20%] items-center bg-[#FAFFEB] border-yata-deep border rounded-lg py-1 px-4 gap-3">
              <span>否</span>
              <Image src="/admin/Ellipse 4.png" alt="" width={14} height={12} />
            </button>
          </>
        )}
      </div>
      {!exchange && (
        <div className="flex justify-start w-full items-center pt-4">
          <button className="flex justify-center w-[65%] items-center bg-yata-deep text-white font-bold border rounded-lg p-3">
            確認
          </button>
        </div>
      )}
    </div>
  );
};

export default ExchangeBox;
