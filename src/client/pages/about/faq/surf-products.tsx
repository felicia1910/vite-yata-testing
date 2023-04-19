import React, { useState } from "react";
import FaqLayout from "../../../components/faq/FaqLayout";

const data = [
  {
    idx: 1,
    title: "1. 爲甚麽當我選定/更改配送模式後，看到的產品會不一樣？",
    content:
      "由於各種產品適用的配送模式不同，所以網站會根據您選擇的配送模式或自取分店，顯示該模式下可供選購的產品。\n 例如：所有禮籃、果籃只適用於送貨，如果您選擇了店舖自取，就無法瀏覽該類產品，必須切換至「送貨上門」才能進行選購。",
  },
  {
    idx: 2,
    title: "2. 如何把產品加到「喜愛清單」？",
    content:
      "當您進入產品頁面後，點選「加入我的最愛」，便可保存您的心儀產品。「喜愛清單」設於「我的帳戶」內，您可隨時查看及購買產品。",
    pic: "/faq/pic.png",
  },
  {
    idx: 3,
    title: "3. 如何搜索產品？",
    content:
      "您可於一田eShop頁面頂部的搜尋欄位輸入產品的關鍵字詞（如嬰兒床），然後點選旁邊的「搜尋」找尋您想瀏覽的產品。      ",
    pic: "/faq/pic2.png",
  },
  {
    idx: 4,
    title: "4. 如果我想訂購的產品沒有存貨，我可怎樣做？",
    content:
      "如您的心儀產品暫時缺貨，您可於先將產品加入「喜愛清單」，稍後再購買。\n此外，由於我們各店之庫存量不一，您亦可更改配送模式（如改為送貨/改到其他店舖取貨），查看其他地點的產品供應情況。",
  },
];

const SurfProductsFaq = () => {
  const [active, setActive] = useState([false, false, false, false]);
  const isSomeActive = active.some((element) => element);
  const handleClick = () => {
    isSomeActive
      ? setActive([false, false, false, false])
      : setActive([true, true, true, true]);
  };
  return (
    <div>
      <FaqLayout
        handleClick={handleClick}
        isSomeActive={isSomeActive}
        data={data}
        turn={active}
        setTurn={setActive}
        title='瀏覽商品'
      />
    </div>
  );
};

SurfProductsFaq.title = "常見問題 | YATA eShop​";

export default SurfProductsFaq;
