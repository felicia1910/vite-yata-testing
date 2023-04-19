import React, { useState } from "react";
import FaqLayout from "./../../../components/faq/FaqLayout";

const data = [
  {
    idx: 1,
    title: "1. 什麽產品可以到店自取?",
    pic: "/faq/ques1.png",
    content:
      "大部分超市、百貨產品、一田現金禮券均可以到店自取。\n顯示為「商戶直送」的產品則不能到店自取，詳情請查看個別產品之取貨詳情。\n請注意：所有禮籃、果籃、部分餐飲美食只能安排送貨，不能自取。如須選購，請選擇「送貨上門」模式瀏覽網站。",
  },
  {
    idx: 2,
    title: "2. 哪些分店提供自取服務？",
    content:
      "目前我們7間分店（沙田店、大埔店、荃灣店、北角店、觀塘店、元朗店、屯門店）提供自取服務。\n\n我們在未來會分階段將「店鋪自取」服務開拓至全部分店，為顧客提供更方便的購物體驗。",
  },
  // {
  //   idx: 3,
  //   title: "3. 百貨產品可否在超市自取？",
  //   content: "爲了提供更方便的購物體驗予顧客，eShop所有百貨精選產品均可以於全線一田店舖自取。 "
  // },
  {
    idx: 4,
    title: "3. 到店自取會否有任何收費？",
    content: "為慶祝全新eShop登場，目前到店自取並沒有額外收費。",
  },
  {
    idx: 5,
    title: "4. 於成功訂購產品後，最快能於何時安排取貨？",
    content:
      "除預售活動外，我們的最快取貨日期如下：\n - 超市產品：最快第二天下午一時取貨*\n - 百貨產品：最快三天後取貨*\n - 餐飲美食、預售產品、一田現金禮券：請參閲產品頁面詳情\n*視乎分店配額，每個時段額滿即止\n",
  },
  {
    idx: 6,
    title: "5. 到店取貨會否設有時段？",
    content:
      "從您選擇的取貨日下午一點起，您可以在所選分店的營業時間內取貨。產品將會爲您保留三天（取貨日為第一日）。",
  },
  {
    idx: 7,
    title: "6. 到店後可如何取貨？",
    content:
      "成功付款後，您會收到一封訂單確認電郵。在訂單準備好後（一般會在取貨/送貨前一天），您將收到取貨提示電郵，裏面將包含一個取貨二維碼 (QR code)。顧客必須提供取貨二維碼到分店顧客服務部或指定專櫃取貨。",
  },
  {
    idx: 8,
    title:
      "7. 如果我的自取訂單裏有超市和百貨產品，是否須要待齊貨才能一併取貨？ ",
    content:
      "由於百貨產品轉運需時，如您希望盡快取到超市產品，可選擇分開取貨。否則您亦可以因應需要，選擇同一取貨日期。",
  },
  {
    idx: 9,
    title: "8. 我可以更改已確認訂單的取貨日期及分店嗎？",
    content:
      "訂單一經確認，將無法更改取貨日期及分店。如有任何疑問，請聯絡我們的顧客服務部，我們將盡力協助。",
  },
  {
    idx: 10,
    title: "9. 如果我未能在限期前到店取貨會怎樣？",
    content:
      "如您於限期內未領取產品，一田將自行處理有關產品，恕不作退款或另行通知。如須重新安排產品，我們將收取$50手續費，方可再次安排領取產品，詳情請聯絡顧客服務部安排。",
  },
];

const SelfPickupFaq = () => {
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
        ])
      : setActive([true, true, true, true, true, true, true, true, true, true]);
  };
  return (
    <div>
      <FaqLayout
        handleClick={handleClick}
        isSomeActive={isSomeActive}
        data={data}
        turn={active}
        setTurn={setActive}
        title='店舖自取'
      />
    </div>
  );
};

SelfPickupFaq.title = "常見問題 | YATA eShop​";

export default SelfPickupFaq;
