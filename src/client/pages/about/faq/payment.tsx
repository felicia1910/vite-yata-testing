import React, { useState } from "react";
import FaqLayout from "./../../../components/faq/FaqLayout";
const data = [
  {
    idx: 1,
    title: "1. 有哪些付款方式可供選擇？",
    content:
      "目前一田eShop支援以下付款方式：\n信用卡： VISA、Mastercard、美國運通及銀聯 \n電子錢包：支付寶、微信支付、BoC Pay、PayMe",
  },
  {
    idx: 2,
    title: "2. 為甚麼我們要為每張送貨訂單收取$2包裝費？",
    content:
      "為確保產品在儲存及運送途中的質素，在產品分揀過程中，我們會使用膠袋和膠紙為您的訂單進行包裝。​",
  },
];

const PaymentFaq = () => {
  const [active, setActive] = useState([false]);
  const isSomeActive = active.some((element) => element);
  const handleClick = () => {
    isSomeActive ? setActive([false]) : setActive([true]);
  };
  return (
    <div>
      <FaqLayout
        handleClick={handleClick}
        isSomeActive={isSomeActive}
        data={data}
        turn={active}
        setTurn={setActive}
        title='結賬及付款'
      />
    </div>
  );
};

PaymentFaq.title = "常見問題 | YATA eShop​";

export default PaymentFaq;
