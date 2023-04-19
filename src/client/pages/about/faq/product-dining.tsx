import React, { useState } from "react";
import FaqLayout from "./../../../components/faq/FaqLayout";

const data = [
  {
    idx: 1,
    title: "1. 餐飲美食有哪些配送模式？",
    content:
      "大部分餐飲美食只能安排送貨，實際情況請參閱食品介紹頁面的送貨或取貨詳情。",
  },
  {
    idx: 2,
    title: "2. 爲什麽我看到餐飲美食的網站廣告，卻無法找到相關選項？",
    content:
      "由於網頁只會顯示您所選擇的取貨方式下可供選購的產品，例如當您選擇了店舖自取，就無法看到只供送貨上門的餐飲美食。請嘗試透過更改取貨方式​以瀏覽更多餐飲美食選擇。",
  },
  {
    idx: 3,
    title: "3. 如何訂購餐飲美食？",
    content:
      "餐飲美食的訂購流程跟一般產品一樣，可與超市、百貨產品一起下單，並於購物車設定不同的送貨日期。請留意，如與其他產品一起下單，只能送往同一地址。",
  },
  {
    idx: 4,
    title: "4. 餐飲美食的送貨費用怎麽計算？",
    content:
      "餐飲美食的免運條件視乎個別供應商，詳情請參閱食品介紹頁面的送貨或取貨條件。",
  },
  {
    idx: 5,
    title: "5. 訂購後最快能安排幾天送貨？",
    content:
      "餐飲美食均爲供應商直接安排送貨，一般能於三至四天內安排送貨。實際情況請參閱食品介紹頁面的送貨或取貨詳情。",
  },
];

const ProductDiningFaq = () => {
  const [active, setActive] = useState([false, false, false, false, false]);
  const isSomeActive = active.some((element) => element);
  const handleClick = () => {
    isSomeActive
      ? setActive([false, false, false, false, false])
      : setActive([true, true, true, true, true]);
  };
  return (
    <div>
      <FaqLayout
        handleClick={handleClick}
        isSomeActive={isSomeActive}
        data={data}
        turn={active}
        setTurn={setActive}
        title='餐飲美食'
      />
    </div>
  );
};

ProductDiningFaq.title = "常見問題 | YATA eShop​";

export default ProductDiningFaq;
