import React from "react";
import TncLayout from "../../../components/tnc/TncLayout";

const SelfPickupTnc = () => {
  return (
    <TncLayout isRequired title="一般分店自取條款">
      <div className="flex flex-col items-start w-full px-4 mb-6">
        <span className="mt-2 font-bold underline text-yata-deep underline-offset-2 text-base">取貨地點</span>
        <ul className="mx-6 mt-1 text-base font-normal leading-relaxed list-disc lg:mx-0 lg:ml-9">
          <li>顧客需在付款前選取自取店鋪，完成訂購後，將不設更改取貨地點</li>
          <li>
            不同貨品之適用取貨地點或有不同，請留意個別貨品之取貨詳情及相關條款
          </li>
        </ul>
        <span className='mt-6 font-bold underline text-yata-deep underline-offset-2 text-base'>
          取貨日期及時間{" "}
        </span>
        <ul className='mx-6 mt-1 text-base font-normal leading-relaxed list-disc lg:mx-0 lg:ml-9'>
          <li>每間分店每日均設取貨限額，額滿即止</li>
          <li>
            從顧客所選定的取貨日下午一點起，店鋪將爲顧客保留貨品3天（由取貨日起計）。如顧客於限期內未能領取貨品，一田將自行處理有關貨品，恕不作退款或另行通知。
          </li>
          <li>
            如需重新安排貨品，顧客需繳付$50手續費，方可再次安排領取貨品。詳情請聯絡顧客服務部安排
          </li>
        </ul>

        <span className='mt-6 font-bold underline text-yata-deep underline-offset-2 text-base'>
          取貨方法
        </span>
        <ul className='mx-6 mt-1 text-base font-normal leading-relaxed list-disc lg:mx-0 lg:ml-9'>
          {/* <li>請出示訂單確認電郵之二維碼 (QR Code)</li> */}
          <li>在訂單準備好後，您將收到取貨提示電郵，電郵內包含一個取貨二維碼 (QR code)。取貨時您必須提供取貨二維碼 (QR Code) 到分店顧客服務部或指定專櫃取貨。</li>
          <li>分店員工或會要求核對取貨人之身份及有關資料​</li>
          <li>訂單貨品不設現場更換尺寸、顏色、口味或款式</li>
          <li>顧客於取貨時，請即時檢查貨品，如發現品質情況，一田可安排退換貨品。如於取貨後才發現品質情況，則不作換貨或退款</li>
           </ul>
      </div>
    </TncLayout>
  );
};

SelfPickupTnc.title = "條款及細則 | YATA eShop​";

export default SelfPickupTnc;
