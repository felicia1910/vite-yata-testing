import React from "react";

const DeliveryAndSelfPick = () => {
  return (
    <div className='relative flex flex-col px-4 mt-2 mb-16 lg:mb-28 rangeLg:px-8 rangeXl:px-24 2xl:px-48 rangeMd:pt-4 rangeSm:pt-4 rangeXs:pt-4'>
      <div className='flex space-x-2 lg:space-x-2 lg:px-0 lg:mt-5'>
        <div className='min-w-[1.25rem] min-h-[1.25rem] max-h-[28px] max-w-[28px] mr-1 flex items-center '>
          <span className='w-5 h-5 min-w-[1.25rem] rounded-md bg-yata' />
        </div>
        <div className='flex flex-wrap items-center space-x-1 text-lg font-semibold leading-none lg:text-xl lg:font-bold lg:text-yata-deep'>
          送貨及運費  
        </div>
      </div>

      <div className='mb-14'>
        <div className='w-full mt-8 mb-2 text-lg font-bold'>送貨上門</div>

        <div className='font-bold underline text-yata-deep underline-offset-4 '>
          送貨範圍
        </div>
        <ul className='mb-2 ml-5 leading-relaxed text-justify list-disc list-outside'>
          <li>
            送貨服務只適用於香港主要地區，包括香港島、九龍、新界，但不包括離島、愉景灣、沙頭角禁區、打鼓嶺、文錦渡、米埔、落馬洲。
          </li>
          <li>顧客所提供之送貨地區如屬非送貨範圍內，該訂單將當作無效。</li>
        </ul>

        <div className='mt-6 font-bold underline text-yata-deep underline-offset-4 '>
          送貨時段
        </div>
        <ul className='mb-2 ml-5 leading-relaxed text-justify list-disc list-outside'>
          <li>
            目前我們有兩個送貨時段可供選擇，分別為下午1時至5時，及晚上6時至10時。
          </li>
        </ul>
        <div className='mt-6 font-bold underline text-yata-deep underline-offset-4 '>
          最快送貨日期及每日截單時間
        </div>
        <span>除預售活動外，我們的最快送貨日期如下：</span>
        <ul className='mb-2 ml-5 leading-relaxed text-justify list-disc list-outside'>
          <li>超市產品：最快第二天送貨*</li>
          <li>百貨產品：最快三天後送貨*</li>
          <li>送禮果籃、禮籃：最快第二天送貨*</li>
          <li>節日果籃、禮籃：請參照相關訂購詳情</li>
          <li>商戶直送產品：七至十四天内送達</li>
          <li className='mt-3 list-none'>
            *每日截單時間為下午3時。最快送貨時間視乎送貨地區，每個時段額滿即止
          </li>
        </ul>

        <div className='mt-6 font-bold underline text-yata-deep underline-offset-4 '>
          運費
        </div>
        <ul className='mb-2 ml-5 leading-relaxed text-justify list-disc list-outside'>
          <li>
            香港島、九龍、新界地區送貨費用為$80；東涌及馬灣送貨費用為$150。
          </li>
          <li>商戶直送產品、果籃、禮籃的價格已經包括免費獨立發貨服務​​。</li>
          <li>果籃、禮籃之免費送貨服務不適用於馬灣，每個配送至馬灣之果籃及禮籃需收取附加費用港幣200元正，請聯繫顧客服務部作安排。</li>
        </ul>

        <div className='mt-6 font-bold underline text-yata-deep underline-offset-4'>
          免運費之最低消費
        </div>
        <ul className='mb-2 ml-5 leading-relaxed text-justify list-disc list-outside'>
          <li>
            顧客於一田eShop購物淨值滿港幣$800或以上（個別限定產品*不計算在内)，即可享免費送貨服務。
          </li>
          <li>
            預訂產品的送貨費用計算方式跟普通產品一樣，但每輪送貨將逐次計算​送貨費用。
          </li>
          <li>餐飲美食請參照產品頁面的供應商發貨條款。</li>
          <li className='mt-3 list-none'>
            *限定產品包括只限自取產品、各類禮券、商戶直送產品、餐飲美食、果籃、禮籃或指定產品
          </li>
        </ul>

        <div className='mt-6 font-bold underline text-yata-deep underline-offset-4'>
          受惡劣天氣影響之特別安排
        </div>
        <ul className='mb-2 ml-5 leading-relaxed text-justify list-disc list-outside'>
          <li>
            如遇上八號烈風或暴風信號、紅色或黑色暴雨警告時，或我們判斷為進行送貨並不安全的天氣情況下，送貨服務將會延期。我們將會聯絡閣下更改送貨日期。
          </li>
        </ul>

        <div className='mt-6 font-bold underline text-yata-deep underline-offset-4'>
          其他事項
        </div>
        <ul className='mb-2 ml-5 leading-relaxed text-justify list-disc list-outside'>
          <li>訂單一經確認，將不設更改送貨日期及地址。</li>
          <li>所有訂單將不設合併送貨。</li>
        </ul>

        <div className='w-full mt-8 mb-2 text-lg font-bold'>店鋪自取</div>
        {/* <div className="mt-8 mb-3 font-semibold">店鋪自取 </div> */}
        <div className='font-bold underline text-yata-deep underline-offset-4'>
          自取時段
        </div>
        <ul className='mb-2 ml-5 leading-relaxed text-justify list-disc list-outside'>
          <li>
            店鋪自取不設特定取貨時段。從您選擇的取貨日下午一時起，您可以在所選分店的營業時間內，到臨顧客服務部取貨。產品將會爲您保留三天（取貨日為第一天）。
          </li>
        </ul>

        <div className='mt-6 font-bold underline text-yata-deep underline-offset-4 '>
          最快取貨日期及每日截單時間
        </div>
        <span>除預售活動外，我們的最快取貨日期如下：</span>
        <ul className='mb-2 ml-5 leading-relaxed text-justify list-disc list-outside'>
          <li>超市產品：最快第二天下午一時取貨*</li>
          <li>百貨產品：最快三天後取貨*</li>
          <li>餐飲美食、預售產品、一田現金禮券：請參閲產品頁面詳情</li>

          <li className='mt-3 list-none'>
            *每日截單時間為下午3時。視乎分店配額，每個時段額滿即止。
          </li>
        </ul>

        <div className='mt-6 font-bold underline text-yata-deep underline-offset-4'>
          費用
        </div>
        <ul className='mb-2 ml-5 leading-relaxed text-justify list-disc list-outside'>
          <li>店鋪自取目前是免費的，也不設最低消費。</li>
        </ul>

        <div className='mt-6 font-bold underline text-yata-deep underline-offset-4'>
          受惡劣天氣影響之特別安排
        </div>
        <ul className='mb-2 ml-5 leading-relaxed text-justify list-disc list-outside'>
          <li>
            如遇上八號烈風或暴風信號、紅色或黑色暴雨警告時或特殊狀況下，貨物到店日期或會延誤。我們將會聯絡閣下更改取貨日期。
          </li>
        </ul>

        <div className='mt-6 font-bold underline text-yata-deep underline-offset-4'>
          其他事項
        </div>
        <ul className='mb-2 ml-5 leading-relaxed text-justify list-disc list-outside'>
          <li>訂單一經確認，將不設更改取貨日期及店鋪。</li>
        </ul>
      </div>
    </div>
  );
};

DeliveryAndSelfPick.title = "送貨及運費 | YATA eShop​";

export default DeliveryAndSelfPick;
