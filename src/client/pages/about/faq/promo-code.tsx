import React, { useState } from "react";
import FaqLayout from "./../../../components/faq/FaqLayout";
const data = [
  {
    idx: 1,
    title: "1. 一田的現金禮券及優惠券能否在eShop使用？",
    content:
      "目前eShop只接受YATA-Fans手機應用程式裏的電子現金券及購物折扣優惠券。\n所有實體券均不適用於eShop。詳情請查閲現金、優惠券細則。",
  },
  {
    idx: 2,
    title: "2. 如何在eShop使用電子優惠券？",
    content: "當您確認購買產品後，於訂單確認頁面選擇使用優惠碼/優惠券，輸入電子優惠券二維碼下方的號碼，然後按確認。系統將自動爲您計算優惠，並更新實際的付款金額。",
  },
  {
    idx: 3,
    title: "3. 什麼是eShop優惠碼？",
    content: "我們會不定期進行推廣，請留意網站上的推廣信息或電郵，以獲取最新優惠碼。"
  },
  {
    idx: 4,
    title: "4. 如何使用優惠碼？",
    content: "當您確認購買的產品後，於訂單確認頁面選擇使用優惠碼/優惠券，輸入優惠碼/優惠劵號碼​，然後按確認。系統便會自動根據優惠碼的推廣詳情提供優惠，並更新實際的付款金額。"
  },
  {
    idx: 5,
    title: "5. 優惠券及優惠碼能於同一訂單付款時一併使用嗎？",
    content: "每張訂單只能使用一個優惠券或優惠碼。",
  },
  {
    idx: 6,
    title: "6. 優惠券及優惠碼有使用期限嗎？",
    content: "詳情請查閱優惠券及優惠碼細則。​"
  },
  {
    idx: 7,
    title: "7. 優惠券及優惠碼可重覆使用嗎？",
    content: "電子優惠券只能單次使用。您可選擇在一田分店或eShop使用一次。\neShop優惠碼的使用性質及提供的優惠有所不同，詳情請參閱相關的推廣活動條款。"
  }
];

const PromoCodeFaq = () => {
  const [active, setActive] = useState([
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
      ? setActive([false, false, false, false, false, false, false])
      : setActive([true, true, true, true, true, true, true]);
  };
  return (
    <div>
      <FaqLayout
        handleClick={handleClick}
        isSomeActive={isSomeActive}
        data={data}
        turn={active}
        setTurn={setActive}
        title='推廣優惠及優惠碼'
      />
    </div>
  );
};

PromoCodeFaq.title = "常見問題 | YATA eShop​";

export default PromoCodeFaq;
