import React, { useState } from "react";
import FaqLayout from "./../../../components/faq/FaqLayout";
const data = [
  {
    idx: 1,
    title: "1. 如何訂購產品？",
    content:
      "您可透過網站的產品分類或於搜索欄位選取您的心儀產品，並把產品加入到購物車購買。",
  },
  {
    idx: 2,
    title: "2. 我想把心儀產品加入購物車，該如何做？",
    content:
      // "您只須瀏覽「我的清單」，並點選「加入購物車」，便能將心儀產品直接放進購物車。"
      "您只須瀏覽「喜愛清單」，並點選「加入購物車」，便能將心儀產品直接放進購物車。",
  },
  {
    idx: 3,
    title: "3. 當產品加入購物車後，我能否修改取貨方式？",
    content:
      "您可以於付款前隨時更改您的取貨方式。但由於各店之庫存有異，以及部分產品不適用於送貨或到店自取，轉換取貨方式，購物車裏的產品有機會庫存不足，或取貨方式不適用。"
  },
  {
    idx: 4,
    title: "4. 產品於加入購物車後應如何完成購物？",
    content:
      "您可於購物車內查看您的心儀產品，點選「結帳」，並填寫相關資料（若選擇送貨服務，須提供送貨地址​）。當您完成上述步驟後，便會進入付款程序。成功付款後，您便會收到一封由系統發出的訂單確認電郵，整個購物過程便會完成。"
  },
  // {
  //   idx: 5,
  //   title: "5. 當頁面彈出信息，說扣除特殊產品後，一田直送部分未滿$800並須收取送貨費用，我可以怎麽辦？",
  //   content: "如扣除不適用於計算送貨費用的產品後，一田直送部分未能符合免運條件，您可選擇：\n1. 繼續結賬並繳付送貨費用 \n2. 先為已免運費的產品（如商戶直送、餐飲服務等）結賬，其餘產品保留在購物車 \n\n您可以選擇將保留部分改爲「分店自取」，或繼續在「送貨上門」模式繼續購物"
  // },
  {
    idx: 6,
    title: "5. 如果我想將部分產品留待下次再買，可以怎麽辦？",
    content: "您可以將產品加入「喜愛清單」，以便往後查閲  ，然後將產品從購物車刪除。"
  },
  {
    idx: 7,
    title: "6. 購物車內仍未下單的產品於登出後還會保留嗎？",
    content:
      "購物車內的產品會繼續保留，您可以隨時登入繼續購買，但庫存將以下單時間作實。",
  },
  {
    idx: 8,
    title: "7. 如何查閱我的訂單狀態和過往購物紀錄？",
    content:
      "您可以隨時於「我的帳戶」的「訂單紀錄」內查看訂單狀態及過往購物紀錄。",
  },
  {
    idx: 9,
    title: "8. 我可以把個別訂單送往不同的收貨地址嗎？",
    content: "每張訂單都可以設定一個送貨地址。為方便送禮需要，果籃及禮籃更支援一張訂單配送至多個送貨地址。"
  },
];
const PurchaseFaq = () => {
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
        ])
      : setActive([true, true, true, true, true, true, true, true, true]);
  };
  return (
    <div>
      <FaqLayout
        handleClick={handleClick}
        isSomeActive={isSomeActive}
        data={data}
        turn={active}
        setTurn={setActive}
        title='訂購'
      />
    </div>
  );
};

PurchaseFaq.title = "常見問題 | YATA eShop​";

export default PurchaseFaq;
