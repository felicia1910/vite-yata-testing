import React from "react";

export default function EShopInfo() {
  return (
    <div className='relative px-4 mt-2 mb-16 rangeLg:px-8 rangeXl:px-24 2xl:px-48 rangeMd:pt-4 rangeSm:pt-4 rangeXs:pt-4'>
      <div className='flex space-x-2 lg:space-x-2 lg:px-0 lg:mt-5'>
        <div className='min-w-[1.25rem] min-h-[1.25rem] max-h-[28px] max-w-[28px] mr-1 flex items-center '>
          <span className='w-5 h-5 min-w-[1.25rem] rounded-md bg-yata' />
        </div>
        <div className='flex flex-wrap items-center space-x-1 text-lg font-semibold leading-none lg:text-xl lg:font-bold lg:text-yata-deep'>
          eShop 簡介
        </div>
      </div>
      <div className='my-10'>
        <h1 className='mb-2 text-lg font-semibold underline text-yata-deep underline-offset-1'>
          一田網上商店YATA eShop，給您簡單方便的網購服務！
        </h1>

        <p className='text-base leading-relaxed text-justify'>
          我們為您網羅多元化產品種類，提供價格合理的選擇，滿足您的不同需要。您可自由選擇送貨上門或店舖自取，透過簡易網上付款，輕鬆快捷選購生活所需。
        </p>
      </div>

      <div className='my-10'>
        <h1 className='mb-2 text-lg font-semibold underline text-yata-deep underline-offset-1'>
          產品應有盡有
        </h1>
        <p className='text-base leading-relaxed text-justify'>
          YATA
          eShop將有數千款來自世界各地的優質精選產品，讓您隨時隨地選購心儀貨品。從超市食品、家居雜貨，到潮流彩妝、生活百貨、母嬰用品等應有盡有。在美食專區，除了各種優惠禮券，您更可以訂購節日或派對到會美食。
          我們更設送禮專區，提供各款精選及節慶果籃禮籃。
        </p>
      </div>

      <div className='my-10'>
        <h1 className='mb-2 text-lg font-semibold underline text-yata-deep underline-offset-1'>
          網上優先訂購
        </h1>
        <p className='text-base leading-relaxed text-justify'>
          每年的一田購物優惠日、嬰兒用品展等大型優惠活動，eShop均會率先開售多款精選筍貨，您可預先搶購心儀產品，並享有網上及每日限定精選優惠，多款減價廚具及電器更低至1折。​
        </p>
      </div>

      <div className='my-10'>
        <h1 className='mb-2 text-lg font-semibold underline text-yata-deep underline-offset-1'>
          設有店舖自取
        </h1>

        <p className='text-base leading-relaxed text-justify'>
          我們致力爲您提供無縫的線上及線下體驗，除了購物滿指定金額可享免費送貨服務，更設有店舖自取服務。透過eShop網站，您更可在一田超市及KONBINI自取百貨產品！我們將分階段將店舖自取服務拓展至全部分店，為顧客提供更方便的購物體驗。
        </p>
      </div>

      <div className='my-10'>
        <h1 className='mb-2 text-lg font-semibold underline text-yata-deep underline-offset-1'>
          送禮果籃及禮籃
        </h1>
        <p className='text-base leading-relaxed text-justify'>
          eShop設有送禮專區，為您提供各款節日果籃、送禮果籃、BB禮籃、結婚過大禮禮籃等多款選擇。​
          <br />
          我們的果籃用上最當造的時果，經多重品質檢定，以確保送出的每顆果物碩大多汁，有如新鮮摘下。新鮮果籃只會於送禮當日早上包裝，絕不過夜，以確保水果質素。
          <br />
          每個果籃及禮籃均享免費送貨服務，讓您盡享快捷方便。​
          <br />
          同時您亦可自訂祝福語，隨果籃及禮籃，為　貴客或親朋好友送上獨一無二的祝福。​
        </p>
      </div>
    </div>
  );
}

EShopInfo.title = "eShop 簡介 | YATA eShop​";
