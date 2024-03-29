import React, { useState } from "react";
import FaqLayout from "../../../components/faq/FaqLayout";

const data = [
  {
    idx: 1,
    title: "1. 是否所有產品都可以安排送貨服務？",
    content:
      "我們大部分產品均提供送貨服務（一田實體禮券除外），詳情請查看產品之送貨資訊。",
  },
  {
    idx: 2,
    title: "2. 於成功訂購產品後，最快能於何時安排送貨？",
    content:
      "除預售活動外，我們的最快送貨日期如下：\n - 超市產品：最快第二天送貨*\n - 百貨產品：最快三天後送貨*\n - 送禮果籃、禮籃：最快兩天後送貨*\n - 商戶直送產品：七至十四天内送達\n - 餐飲美食、預售產品：請參閲產品頁面詳情\n - 電子禮券：24小時内透過電郵發出\n*每日截單時間為下午3時。最快送貨時間視乎送貨地區，每個時段額滿即止\n",
  },
  // {
  //   idx: 3,
  //   title: "3. 如安排送貨服務，有什麼時段可供選擇？",
  //   content: "目前我們有兩個送貨時段可供選擇 ，分別為下午1時至5時，及晚上6時至10時。"
  // },
  {
    idx: 4,
    title: "3. 送貨服務範圍覆蓋全香港嗎？",
    content:
      "我們的送貨服務適用於香港主要地區，包括香港島、九龍、新界地區，但並不適用於離島、愉景灣、沙頭角禁區、打鼓嶺、文錦渡、米埔、落馬洲。",
  },
  {
    idx: 5,
    title: "4. 如何選擇送貨日期及時段？", //選擇送貨時段 - don’t display in phase 1A
    content:
      "當您將心儀產品加入購物車，並在結帳頁面上選擇送貨地址後，系統會因應產品的備貨時間及配送地區計算出可選擇的送貨日期及時段供您選擇。\n部分產品將分開發貨（如：果籃、美食到會等），您可以在購物車頁面選擇每一輪的收貨日期。\n商戶直送的百貨產品不設自選日期，供應商將直接聯絡顧客安排。",
  },
  {
    idx: 6,
    title: "5. 送貨服務的收費為多少？",
    content:
      "香港島、九龍、新界地區送貨費用為$80；東涌及馬灣送貨費用為$150。\n商戶直送產品、果籃及禮籃的價格已經包含免費獨立發貨，毋須額外收費​。果籃、禮籃之免費送貨服務不適用於馬灣，每個配送至馬灣之果籃及禮籃需收取附加費用港幣200元正。下單前，請先聯繫顧客服務部作安排。\n如送貨地點不設升降機而需要以人力搬運，運輸公司可安排免費上落三層或最多 29 級梯級。如超出有關限額，請先與我們聯絡以作安排。​",
  },
  {
    idx: 7,
    title: "6. 怎麽可以享有免費送貨服務？",
    content:
      "顧客於一田eShop購物淨值滿港幣$800或以上（不計算個別限定貨品*在内​)，即可享免費送貨服務。\n*包括各類禮券、商戶直送產品、餐飲美食、果籃、禮籃或指定產品\n\n顧客也可選擇免費到店自取。\n\n餐飲美食請參照產品頁面的供應商發貨條款。",
  },
  // {
  //   idx: 8,
  //   title: "8. 購買預售產品的送貨費用應怎麽計算？",
  //   content: "預售產品的送貨費用計算方式跟普通產品一樣，但每輪發貨將分開計算運費。\n例如：同一訂單有三件預售產品 \n 1. 產品A $1,000 ，十月發貨 - 已經符合免運條件，該產品將獲免費送貨 \n2. 產品B $300，十二月發貨 - 此部分未達免運條件，將收取一次送貨費用 \n3. 產品C $200，一月發貨 - 此部分也未達免運條件，將收取第二次送貨費用"
  // },
  {
    idx: 9,
    title: "7. 我可以更改已確認訂單的送貨日期及地址嗎？",
    content:
      "訂單一經確認，將無法更改送貨日期及地址。如有任何疑問，請聯絡我們的顧客服務部，我們將盡力協助。",
  },
  {
    idx: 10,
    title: "8. 如果送貨當日無法收貨，可否再次安排改天送貨？",
    content:
      "如因顧客原因而須安排第二次派送，顧客須再次繳付送貨費用，詳情請留意相關送貨條款。",
  },
  {
    idx: 11,
    title: "9. 如果我不方便收貨，可否讓物流將訂單產品放在樓下、門外？",
    content:
      "基於衛生及安全理由，我們不建議訂單產品直接放在住宅大堂或單位門外。",
  },
  {
    idx: 12,
    title: "10. 爲什麽有些產品未能一併安排送貨？",
    content:
      "由於部分產品由供應商直接送貨，若您的訂單內同時包含一田直送及商戶直送的產品，我們將安排分次 （兩次或以上）送貨。預售產品將根據到貨日期安排發貨。不便之處，敬請原諒。",
  },
  {
    idx: 13,
    title: "11. 同時購買一田直送及預售產品的送貨費用應怎麽計算？",
    content:
      "預售產品的送貨費用計算方式跟一田直送一樣，但每輪發貨將分開計算運費。\n例如：同一訂單有一田直送$300及一田購物優惠日預售產品$1,800\n1. 一田直送 $300 - 此部分未達免運條件，將收取一次送貨費用\n2. 購物優惠日預售 $1,800 - 已經符合免運條件，此部分將獲免費送貨",
  },
];

const DeliveryFaq = () => {
  const [active, setActive] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const isSomeActive = active.some((element) => element);
  const handleClick = () => {
    isSomeActive
      ? setActive([
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ])
      : setActive([
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
        ]);
  };
  return (
    <div>
      {" "}
      <FaqLayout
        handleClick={handleClick}
        isSomeActive={isSomeActive}
        data={data}
        turn={active}
        setTurn={setActive}
        title={"送貨上門"}
      />
    </div>
  );
};

DeliveryFaq.title = "常見問題 | YATA eShop​";

export default DeliveryFaq;
