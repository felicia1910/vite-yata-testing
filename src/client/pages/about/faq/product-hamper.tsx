import React, { useState } from "react";
import FaqLayout from "./../../../components/faq/FaqLayout";

const data = [
  {
    idx: 1,
    title: "1. 送禮果籃及禮籃有哪些配送模式？",
    content:
      "送禮果籃及禮籃只適用於送貨服務，並不適用於店舖自取。",
  },
  {
    idx: 2,
    title: "2. 如何訂購送禮果籃及禮籃？",
    content:
      "送禮果籃及禮籃的訂購流程跟一般產品一樣，但所選的產品將會放入獨立的購物車，需與其他超市、百貨產品分開訂購及付款。\n當您選擇心儀產品後並進入購物車頁面，選取「禮籃及果籃購物車」，按「更改數量及填寫送貨資料」後，將有小窗口讓您填寫收禮人資料及賀語。填好資料後按「結帳」，您可以為每個果籃及禮籃分別選擇送貨日期。",
  },
  {
    idx: 3,
    title: "3. 送禮果籃及禮籃的送貨費用怎麽計算？",
    content:
      "所有送禮果籃及禮籃的訂單均可享免費送貨服務（馬灣除外），不需額外支付額外送貨費用。每個配送至馬灣之果籃及禮籃需收取附加費用港幣200元正。下單前，請先聯繫顧客服務部作安排。",
  },
  {
    idx: 4,
    title: "4. 我可否一次過下單訂購數個果籃及禮籃，但設定不同送貨日期及送到不同地址？",
    content: "您可於同一訂單內購買數個禮籃，並分別設定不同的收禮人、送貨地址、日期、祝福語。您只需在加入購物車時於欄位輸入相應資料即可。"
  },
  {
    idx: 5,
    title: "5. 送禮果籃及禮籃內的產品可否更改？",
    content: "若您希望自訂送禮果籃及禮籃內的產品，請在禮籃頁面下載並填寫表格查詢，我們將有專人為您跟進有關訂購事宜。"
  },
  {
    idx: 6,
    title: "6. 送禮果籃及禮籃是否接受以公司名義作大量訂購？",
    content:
      "如您訂購的果籃及禮籃數目大於eShop庫存，請在果籃及禮籃頁面下載並填寫表格查詢，我們將有專人為您跟進有關訂購事宜。",
  },
];

const ProductHamperFaq = () => {
  const [active, setActive] = useState([
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
      ? setActive([false, false, false, false, false, false])
      : setActive([true, true, true, true, true, true]);
  };
  return (
    <div>
      <FaqLayout
        handleClick={handleClick}
        isSomeActive={isSomeActive}
        data={data}
        turn={active}
        setTurn={setActive}
        title='送禮果籃、禮籃'
      />
    </div>
  );
};

ProductHamperFaq.title = "常見問題 | YATA eShop​";

export default ProductHamperFaq;
