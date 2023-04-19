import React from "react";
import TncLayout from "../../../components/tnc/TncLayout";

const DeliveryTnc = () => {
  return (
    // <TncLayout isRequired title="一田百貨BB秋日用品展預訂 - 送貨及運費">
    <TncLayout isRequired title='一般送貨條款'>
      <div className='flex flex-col items-start w-full px-4 mb-6 text-base font-normal'>
        {/* <span className='mt-3 font-bold underline text-yata-deep underline-offset-2'>
          送貨服務
        </span>
        <ul className='mx-6 mt-1 text-base font-normal leading-relaxed list-disc lg:ml-9 lg:mx-0'>
          <li>訂單一經確認，將不設更改送貨日期及地址</li>
          <li>所有訂單將不設合併送貨</li>
        </ul> */}

        <span className='mt-3 font-bold underline text-yata-deep underline-offset-2'>
          送貨範圍
        </span>
        <ul className='mx-6 mt-1 text-base font-normal leading-relaxed list-disc lg:ml-9 lg:mx-0'>
          <li>
            送貨服務適用於香港主要地區，包括香港島、九龍、新界地區，但並不適用於離島、愉景灣、沙頭角禁區、打鼓嶺、文錦渡、米埔、落馬洲。
          </li>
          <li>顧客所提供之送貨地區如屬非送貨範圍內，該訂單將當作無效。</li>
        </ul>

        <span className='mt-6 font-bold underline text-yata-deep underline-offset-2'>
          送貨日期及時間
        </span>
        <ul className='mx-6 mt-1 text-base font-normal leading-relaxed list-disc lg:ml-9 lg:mx-0'>
          <li>
            每日截單時間為下午3時。最快送貨時間則視乎送貨地區，每個時段額滿即止。
          </li>
          <li>
            不同類型貨品之取貨及送貨安排或有不同，請留意個別貨品之取貨及送貨詳情及相關條款。
          </li>
        </ul>

        <span className='mt-6 font-bold underline text-yata-deep underline-offset-2'>
          免費送貨服務
        </span>
        <ul className='mx-6 mt-1 text-base font-normal leading-relaxed list-disc lg:ml-9 lg:mx-0'>
          <li>
            顧客於一田eShop購物淨值滿港幣$800或以上
            (個別限定貨品*不計算在内)，即可享免費送貨服務 。
          </li>
          {/* <li>顧客於一田eShop購物淨值滿港幣$800或以上，即可享免費送貨服務。</li> */}
          <li>
            預訂產品的送貨費用計算方式跟普通產品一樣，但每輪送貨將分次計算送貨費用。
          </li>
          <li>餐飲美食請參照貨品頁的供應商發貨條款。</li>
          <li className='mt-3 list-none'>
            *限定產品包括只限自取產品、各類禮券、商戶直送貨品、餐飲美食、果籃、禮籃或指定貨品
          </li>
        </ul>

        <span className='mt-6 font-bold underline text-yata-deep underline-offset-2'>
          受惡劣天氣影響之特別安排
        </span>
        <ul className='mx-6 mt-1 text-base font-normal leading-relaxed list-disc lg:ml-9 lg:mx-0'>
          <li>
            如遇上八號烈風或暴風信號、紅色或黑色暴雨警告生效時或我們判斷為進行送貨並不安全的天氣情況下，送貨服務將會延期。我們將會聯絡閣下更改送貨日期。
          </li>
        </ul>

        <span className='mt-6 font-bold underline text-yata-deep underline-offset-2'>
          其他事項
        </span>
        <ul className='mx-6 mt-1 text-base font-normal leading-relaxed list-disc lg:ml-9 lg:mx-0'>
          <li>訂單一經確認，將不設更改送貨日期及地址。</li>
          <li>所有訂單將不設合併送貨。</li>
        </ul>

        <span className='mt-6 font-bold underline text-yata-deep underline-offset-2'>
          送貨物流安排
        </span>
        <ul className='mx-6 mt-1 text-base font-normal leading-relaxed list-disc lg:ml-9 lg:mx-0'>
          <li>實際送貨日期或會因應天氣或交通情況而有所改動或延遲</li>
          <li>
            如遇上八號烈風或暴風信號、紅色或黑色暴雨警告生效時或我們判斷為進行送貨並不安全的天氣情況下，送貨服務將會延期。我們將會聯絡閣下更改送貨日期。
          </li>
          <li>
            每張訂單可享一次送貨服務，如因以下情況導致派送延誤或需重新安排送貨，而造成任何直接或間接的損失，一田恕不負責。
          </li>
        </ul>

        <ul className='px-4 mx-6 mt-1 text-base font-normal leading-relaxed list-decimal lg:ml-9 lg:mx-0'>
          <li>貨品出倉後，顧客要求更改派送地址或日期；</li>
          <li>在確認之送貨日期及時段內，收件人不在送貨地址；</li>
          <li>顧客提供之送貨地址不正確或有誤；</li>
          <li>提供的送貨地址並無有關收件人；</li>
          <li>顧客提供收件人之聯絡電話不正確或無效</li>
        </ul>

        <ul className='mx-6 mt-1 text-base font-normal leading-relaxed list-disc lg:ml-9 lg:mx-0'>
          <li>
            顧客須於7日內聯絡我們，並另付送貨費用*以重新安排派送。
            (*香港島、九龍及新界之送貨費用為$80; 東涌及馬灣之送貨費用為$150)
          </li>
        </ul>
      </div>
    </TncLayout>
  );
};

DeliveryTnc.title = "條款及細則 | YATA eShop​";

export default DeliveryTnc;
