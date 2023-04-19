import React from "react";
import TncLayout from "../../../components/tnc/TncLayout";

const list1 = [
  {
    id: 1,
    content:
      "以下是 一田有限公司 (以下統稱「我們」或「本公司」)根據《個人資料(私隱)條例》(第486章)之規定所訂之私隱政策聲明。 我們將確保我們之職員依將執行有關政策，嚴格保密你的個人資料。",
  },
  {
    id: 2,
    content:
      "本公司保障客戶及本網站用戶所提供之一切資料。 除用戶使用會員登記、貨品查詢、“轉寄給朋友”服務時，我們可能需要收集個人資料及記錄用戶電腦的網路位址外，我們不會於用戶瀏覽我們之網站時收集任何足以識辨個人身份之資料。當用戶瀏覽我們之網站時，我們僅將其瀏覽記錄為一次按動次數，並不收集任何個人資料。而此等資料將用於編備有關我們網站使用情況之一般統計資料。	",
  },
  {
    id: 3,
    content:
      "倘若用戶使用本公司所提供服務／推廣或申請享用／參與此等服務／推廣時，向我們提供用戶的個人資料，即表示用戶同意本私隱政策以及本政策所述的對你個人資料的收集、使用、獲取、轉移、儲存及處理。用戶將會透過網站之《個人資料收集聲明》而獲悉有關之目的及用途，包括資料之傳送及披露程度；存取及更正所收集個人資料之權利。",
  },
];
const list2 = [
  {
    id: 1,
    content:
      "我們在網站上使用cookies以提高網站的性能和增強閣下的在線體驗。 我們使用Session cookies令閣下可瀏覽及使用網站上的基本功能，例如保留登入資料並減少在互聯網上資料傳遞的需要。我們使用Google Analytics識別重訪用戶以使我們能夠更好地了解用戶如何瀏覽我們的網站及瀏覽網站所花的時間和頻率，從而改善我們的網站。閣下瀏覽我們的網站時，我們使用 Font size cookies來提供適當的字符外觀。我們在使用cookies時，將不會向閣下收集任何個人資料。",
  },
  {
    id: 2,
    content:
      "任何個人資料的收集將按本公司的《個人資料收集聲明》的條款所進行。個人資料將會安全穩妥儲存於我們的系統內，而本公司將採取所有切實可行的步驟，以確保個人資料的保存時間不超過將其保存以貫徹該資料被使用於或會被使用於的目的(包括任何直接有關的目的)所需的時間。只有經培訓及獲授權的職員才可獲准查閱該等個人資料，除《個人資料收集聲明》所載之人士除外，我們不會向任何本公司以外的人士發佈該等個人資料，用戶有權根據載於《個人資料收集聲明》的程序，要求存取及更正其個人資料。",
  },
  {
    id: 3,
    content:
      "本公司可不時根據用戶之個人資料向他們寄出宣傳產品及服務之直接市場推廣訊息。在直接市場推廣過程中，我們將提供適當之「拒絕服務選擇」。",
  },
  {
    id: 4,
    content:
      " 本公司將竭盡所能，確保用戶之私隱獲得妥善保障。本網站使用128位元安全通訊端層保密技術 (SSL) 處理你的個人資料。然而，鑑於互聯網之性質，我們不能擔保可以做到「完全保障」。",
  },
  {
    id: 5,
    content:
      " 本公司會起用第三者內容供應商及服務供應商，並提供接駁其他網站之連結。此等第三者可於用戶使用其服務時收集有關用戶之個人資料。此等第三者將依其私隱政策行事，而我們的《私隱政策聲明》及《個人資料收集聲明》並不涵蓋該等第三者。",
  },
  {
    id: 6,
    content:
      "用戶如對我們之私隱政策及慣例有任何疑問，請電郵 marketing@yata.hk 往一田有限公司，或投寄到香港沙田鄉事會路138號新城市中央廣場第一座九樓901-910室，市務部（資料保障主任）收。",
  },
  {
    id: 7,
    content: "此乃中文譯本，如有任何爭議，一切以英文為準。",
  },
];

const list3 = [
  {
    id: 1,
    content: "我們所收集之資料將用作以下用途：",
  },
  {
    id: 2,
    content: "監控本網站之運作及協助本網站之未來發展；",
  },
  {
    id: 3,
    content: "匯編有關我們之用戶之整體統計資料以作關於網站使用的分析；",
  },
  {
    id: 4,
    content: "監為有意註冊本網站上所提供的服務的用戶設立戶口及維護其戶口；",
  },
  {
    id: 5,
    content: " 識別和核實使用本網站所提供服務的用戶的身份；",
  },
  {
    id: 6,
    content: "就有關或因使用本網站上所提供的服務發生的事項與用戶溝通；",
  },
  {
    id: 7,
    content:
      "我們有意使用閣下的姓名、聯繫資料和任何與可能感興趣的商品和服務有關的資料，提供閣下可能有興趣的資訊，包括有針對性的橫幅廣告、新服務和產品和其他優惠並進行直接促銷，包括產品、服務、諮詢、意見和與以下各項有關的促銷標的，包括香港和世界各地的百貨及超市業務有關之產品及服務。如無閣下的同意，我們則不能如上使用或向該些機構提供上述資料。閣下可在向我們網站提供資料時表示同意，或以書面向我們的市務部表示同意，不另收費。",
  },
];

const PrivacyTnc = () => {
  return (
    <TncLayout isRequired title='私隱政策聲明'>
      <div className='flex flex-col items-start w-full px-4 mb-6 text-base font-normal'>
        <ul className='mx-6 mt-1 leading-relaxed list-disc lg:mx-0 lg:ml-9'>
          {list1.map((el, i) => {
            return <li key={i}>{el.content}</li>;
          })}
        </ul>

        <span className='mt-6 mb-2 font-bold underline text-yata-deep underline-offset-2'>
          {" "}
          使用COOKIES檔案{" "}
        </span>
        <ul className='mx-6 mt-1 leading-relaxed text-justify list-disc lg:mx-0 lg:ml-9'>
          {list2.map((el, i) => {
            return <li key={i}>{el.content}</li>;
          })}
        </ul>
        <span className='mt-6 font-bold underline text-yata-deep underline-offset-2'>
          {" "}
          個人資料收集聲明{" "}
        </span>
        <ul className='mx-6 mt-1 leading-relaxed text-justify list-disc lg:mx-0 lg:ml-9'>
          <li>
            本聲明乃遵照《個人資料(私隱)條例》(第486章)的要求而發出，通知閣下收集資料的目的、閣下同意我們如何使用這些資料和及閣下的權利。本聲明會不時更改，故請定期查閱。閣下登記使用我們之服務及每次登入我們網站，即表示同意接受當時生效之個人資料收集聲明。
          </li>
        </ul>
        <span className='mt-6 font-bold underline text-yata-deep underline-offset-2'>
          資料之收集{" "}
        </span>
        <ul className='mx-6 mt-1 leading-relaxed text-justify list-disc lg:mx-0 lg:ml-9'>
          <li>
            在登記成為用戶及使用我們網站之時，用戶會被要求向我們提供個人識別資料，包括姓名、電郵地址、送貨/帳單地址、電話號碼、手提電話號碼、公司名稱等。我們有必要收集用戶之資料，以便向用戶提供本網站之各項服務及活動。倘若用戶未能提供所需資料，我們將不能向用戶提供我們網站上可供享用之服務及活動。
          </li>
        </ul>
        <span className='mt-6 font-bold underline text-yata-deep underline-offset-2'>
          資料之目的及用途{" "}
        </span>
        <ul className='mx-6 mt-1 leading-relaxed text-justify list-disc lg:mx-0 lg:ml-9'>
          {list3.map((el, i) => {
            return <li key={i}>{el.content}</li>;
          })}
        </ul>

        <span className='mt-6 font-bold underline text-yata-deep underline-offset-2'>
          電腦數據收集
        </span>
        <ul className='mx-6 mt-1 leading-relaxed text-justify list-disc lg:mx-0 lg:ml-9'>
          <li>
            當你瀏覽一田eShop網站時,
            本公司的伺服器會自動記錄你的瀏覽器所傳送的資料。 資料包括
            你的電腦IP地址、瀏覽器類別、瀏覽我們網站前所瀏覽的網頁、在一田eGift網站內瀏覽的頁面、於上述頁面的使用時間、於我們網站搜尋的產品及資料、存取時間及日期,
            以及其他統計數據。收集所得的資料會用作分析和評估,
            從而幫助改善本網站及我們提供的服務和產品。這些資料不會與其他個人資料一同使用。
          </li>
        </ul>
        <span className='mt-6 font-bold underline text-yata-deep underline-offset-2'>
          {" "}
          資料之傳遞
        </span>
        <ul className='mx-6 mt-1 leading-relaxed text-justify list-disc lg:mx-0 lg:ml-9'>
          <li>
            除了為上述目的使用有關資料時，合理而有需要把有關資料轉移予的相關人仕及機構外，我們不會以可識別閣下之方式向任何其他人士披露或傳遞閣下之資料。
          </li>
        </ul>
        <span className='mt-6 font-bold underline text-yata-deep underline-offset-2'>
          資料之查閱
        </span>
        <ul className='mx-6 mt-1 leading-relaxed text-justify list-disc lg:mx-0 lg:ml-9'>
          <li>
            閣下有權要求存取及更正我們所持有關於閣下之資料，如閣下同意向我們支付合理之手續費。倘若閣下需要查核我們是否持有閣下之個人資料，又或者想存取或更正閣下有關之任何不確資料，請電郵
            marketing@yata.hk
            往一田有限公司，或投寄香港沙田鄉事會路138號新城市中央廣場第一座九樓901-910室，市務部（資料保障主任）收。
          </li>
        </ul>
      </div>
    </TncLayout>
  );
};

PrivacyTnc.title = "條款及細則 | YATA eShop​";

export default PrivacyTnc;
