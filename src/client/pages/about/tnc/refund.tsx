import React from "react";
import TncLayout from "../../../components/tnc/TncLayout";

const RefundTnc = () => {
  return (
    <TncLayout isRequired title="一般退換條款">
      <div className="flex flex-col items-start w-full mb-12">
        <ul className="px-4 mx-6 mt-1 text-base font-normal leading-relaxed list-disc lg:mx-0 lg:px-0 lg:ml-9">
          <li>
            訂單一經確認，將不設取消或更改訂單內容，所收款項亦將不獲退還。
          </li>
          <li>
            顧客收貨後，請即時檢查貨品，如有錯漏損壞或品質問題，請保留完整包裝之貨品及拍下包裝及貨品相片，並於收貨當天以「聯絡我們」表格聯絡一田顧客服務部，以便安排退換貨品。
          </li>
          <li>申請一經批核，我們將安排到店退貨或換貨。</li>
          <li>如有任何爭議，一田保留最終決定權。</li>
        </ul>
      </div>
    </TncLayout>
  );
};

RefundTnc.title = "條款及細則 | YATA eShop​";

export default RefundTnc;
