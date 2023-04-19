import React, { useState } from "react";
import FaqLayout from "./../../../components/faq/FaqLayout";

const data = [
  {
    idx: 1,
    title: "1. 如果我並沒有註冊成為YATA-Fans會員，可以購物嗎？",
    content:
      "您必須註冊成為YATA-Fans會員方可進行購物。請立即行動，享受更多會員優惠！",
  },
  {
    idx: 2,
    title: "2. 新會員如何註冊？",
    content:
      "您可在頁面頂部按登入/註冊。填寫基本的個人資料後，您將會收到一封由系統發出的手提電話驗證短訊。完成驗證流程後，您便正式成為YATA-Fans​會員。"
  },
  {
    idx: 3,
    title: "3. 如何登入YATA-Fans會員？",
    content:
      "您只須輸入已登記的手提電話號碼及密碼，便能登入一田eShop購物。",
  },
  {
    idx: 4,
    title: "4. 如我忘記了密碼應怎麼辦？",
    content:
      "如您忘記了帳戶密碼，可於登入位置點選「忘記密碼」。您將會收到一封由系統發出的重設密碼短訊，只須按照指示重設密碼便可。",
  },
  {
    idx: 5,
    title:
      "5. 我曾在2022年7月前在一田eShop購物，現在卻無法以電郵登入，應怎麽辦？",
    content:
      "由於我們的YATA-Fans​會員系統於2022年7月進行升級，您須重新註冊成為YATA-Fans會員才能登入，不便之處，敬請原諒。"
  },
  {
    idx: 6,
    title: "6. 如何更新我的個人或聯絡資料？",
    content: "您可於YATA-Fans手機應用程式隨時更新個人資料。",
  },
  {
    idx: 7,
    title: "7. 如何更改密碼？",
    content: "您可於YATA-Fans手機應用程式隨時更新帳戶密碼。",
  },
  {
    idx: 8,
    title: "8. 成功註冊後，我可否更改我的登記電話及電郵？",
    content:
      "一個手提電話號碼只能註冊成為YATA-Fans會員一次。為確保會員權益，註冊成為YATA-Fans會員後，除手提電話號碼外，您可以更改電郵地址等所有個人資料。"
  },
  {
    idx: 9,
    title: "9. 成爲YATA-Fans會員有什麽優惠？",
    content:
      "成為YATA-Fans會員除了能於一田eShop購物外，您亦可享有不同的優惠，例如高達1%的購物回贈、每週三的三倍積分獎賞、生日獎賞等等。",
  },
];

const RegistrationFaq = () => {
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
        title='會員登記'
      />
    </div>
  );
};

RegistrationFaq.title = "常見問題 | YATA eShop​";

export default RegistrationFaq;
