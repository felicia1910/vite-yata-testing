import React, { useState } from "react";
import FaqLayout from "./../../../components/faq/FaqLayout";

const data = [
  {
    idx: 1,
    title: "1. 收貨前能否取消訂單？",
    content:
      "訂單一經確認，將無法更改或取消。店鋪自取亦不設現場更換尺寸、顏色、口味或款式。",
  },
  {
    idx: 2,
    title: "2. 收貨後能否退貨、換貨？",
    content:
      "除指定基於衛生或安全理由「不能退換」的產品外，其他產品請參閲一般退換條款。",
  },
  {
    idx: 3,
    title: "3. 如何申請退款、更換？",
    content:
      "請於「聯絡我們」表格聯絡我們的顧客服務部。如因品質情況提出申請，敬請提供產品相片。申請一經批核，我們將安排到店退貨或換貨。",
  },
];

const ReturnExchangeFaq = () => {
  const [active, setActive] = useState([false, false, false]);
  const isSomeActive = active.some((element) => element);
  const handleClick = () => {
    isSomeActive
      ? setActive([false, false, false])
      : setActive([true, true, true]);
  };
  return (
    <div>
      <FaqLayout
        handleClick={handleClick}
        isSomeActive={isSomeActive}
        data={data}
        turn={active}
        setTurn={setActive}
        title='產品退換'
      />
    </div>
  );
};

ReturnExchangeFaq.title = "常見問題 | YATA eShop​";

export default ReturnExchangeFaq;
