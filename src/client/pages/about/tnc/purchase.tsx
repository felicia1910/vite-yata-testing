import TncLayout from "../../../components/tnc/TncLayout";

const PurchaseTnc = () => {
  return (
    <TncLayout isRequired title='訂購條款'>
      <div className='flex flex-col items-start w-full'>
        <ul className='px-4 mx-6 mt-2 text-base font-normal leading-relaxed list-disc lg:mx-0 lg:px-0 lg:ml-9'>
          <li>顧客須先成為YATA-Fans會員方可選購一田eShop產品</li>
          <li>顧客在一田eShop消費所得之積分，將於14天內存入相關帳戶</li>
          <li>貨品圖片僅供參考，與實際貨品可能有所差異</li>
          <li>由於測量方法不同，貨品尺寸資料可能存在1-4cm誤差</li>
          <li>
            由於貨品數量於付款後方扣減庫存，加入購物車不代表成功購買貨品，一切以結賬為準
          </li>
          <li>每款產品數量有限，售完即止</li>
          <li>
            成功完成訂購後，訂單確認電郵會於12小時內發送到顧客提供的電郵。請檢查電郵及登入帳戶檢查，以確保資料無誤
          </li>
          <li>
            {" "}
            如付款訂購24小時後仍未收到確認電郵，顧客亦可登入eShop帳戶查閱訂單狀態
          </li>
          <li> eShop產品價錢以顧客結帳時的發售價為準</li>
          <li> 在訂單準備好後（一般會在取貨/送貨前一天），您將收到取貨/送貨提示電郵。取貨提示電郵內包含一個取貨二維碼 (QR code) 。</li>
          <li>
            訂單一經確認，將不設取消或更改訂單內容，所收款項亦將不獲退還。如顧客所訂購的貨品缺貨，一田eShop將為缺貨貨品進行退款，退款需時4至6個星期。不便之處，敬請見諒。
          </li>
        </ul>

        {/* <span className='mx-3 mt-8 font-bold'>
          「一田購物優惠日率先搶購」特別優惠詳情及細則
        </span>
        <ul className='px-4 mx-6 mt-2 text-base font-normal leading-relaxed list-disc lg:mx-0 lg:px-0 lg:ml-9'>
          <li>
            單次折實滿$1500或以上，即送$50電子優惠券 (每張訂單限送1張 |
            22/11或之前買滿$150即用乙張){" "}
          </li>
          <li>須以 YATA-Fans 會員身份登入，方可享有優惠。</li>
          <li>如有任何爭議，一田保留最終決定權。 </li>
        </ul> 

        <span className='mx-3 mt-8 font-bold'>
         「PayMe x 一田限定激安優惠」條款及細則（推廣期：2022年11月16 - 22日）
        </span>
        <ul className='px-4 mx-6 mt-2 text-base font-normal leading-relaxed list-disc lg:mx-0 lg:px-0 lg:ml-9'>
          <li>推廣期內，合資格用戶於一田門市或網店使用 PayMe 消費港幣 350 元或以上，即可在 PayMe 錢包獲享港幣 35 元的 PayMe x 一田折扣優惠券。</li>
          <li>
            合資格用戶於推廣期內最多可獲取兩張優惠券。優惠名額數量有限，送完即止。
          </li>
          <li>
            優惠券適用於一田門市或網店，須使用 PayMe 進行港幣 150 元或以上的交易。優惠劵於2023年2月28日到期。
          </li>
          <li>
            有關優惠劵的使用條款及細則，請參閱PayMe App 或相關網頁。
          </li>
          <li>
            如有任何爭議，香港上海滙豐銀行有限公司及一田有限公司保留最終決定權。
          </li>
        </ul>

        <span className='mx-3 mt-8 font-bold'>
          「HUGGIES BB秋日祭」條款及細則
        </span>
        <ul className='px-4 mx-6 mt-2 text-base font-normal leading-relaxed list-disc lg:mx-0 lg:px-0 lg:ml-9'>
          <li>優惠只適用於網上商店，贈品數量有限，送完即止。</li>
          <li>
            有關一田電子優惠劵的使用條款請參閱YATA-Fans 內電子優惠劵之細則。
          </li>
          <li>
            如有任何爭議，Huggies、金佰利(香港)有限公司及一田有限公司保留最終決定權。{" "}
          </li>
        </ul>*/}

        <span className='mx-3 mt-8 font-bold'>「中銀信用卡客戶專享 - 一田購物禮遇」條款及細則</span>
        <ul className='px-4 mx-6 mt-2 text-base font-normal leading-relaxed list-disc lg:mx-0 lg:px-0 lg:ml-9'>
          <li>優惠期由2023年2月1日至 3月31日（「優惠期」），客戶必須以中銀信用卡簽帳，方有機會獲享以上優惠。</li>
          <li>於優惠期內，合資格用戶每卡簽帳滿$400或以上即減$30（每張訂單最多可獲$30折扣）。優惠名額數量有限，送完即止。</li>
          <li>中國銀行(香港)有限公司及一田有限公司保留隨時更改或終止以上優惠及不時修訂優惠條款及細則之權利。</li>
          <li>如有任何爭議，中國銀行(香港)有限公司及一田有限公司保留最終決定權。</li>
        </ul>
        <span className='mx-3 mt-8 font-bold'>「一田春日BB用品展 - eShop 購物優惠」條款及細則</span>
        <ul className='px-4 mx-6 mt-2 text-base font-normal leading-relaxed list-disc lg:mx-0 lg:px-0 lg:ml-9'>
          <li>推廣期由2023年2月8日至3月8日，客戶單次購買嬰幼兒產品滿$1,000或以上 ，將獲得$60電子優惠券。</li>
          <li>合資格客戶於推廣期內最多獲取1張優惠劵，下次於門市購買嬰幼兒產品滿$200可用，有效期為30天。</li>
          <li>如於星期三/生日月份購物，額外積分將以取得較高者方法計算。</li>
          <li>購物條件不適用於個人護理/ 家品/ 玩具/健康部門之嬰幼兒產品 (個人護理/ 家品部門: AQ、baby SWIPE、Bilka、Elmex 、EMOUNT 、HIPP、PAPA JELLY、SANOSAN 、Tai san(KAWAI)、卡洛塔妮、思詩樂、威潔、蚊專家、柏橋、立保、力達; 健康部門：日本命力、家得路、澳至尊、卓營方、片仔癀、馬百良、Green Tree、Life Nutrition、Quest Nutrition ; 玩具部門：樂高、英語童書)、嬰兒奶粉(1號)、塑膠購物袋環保徵費、拆舊機/舊機回收棄置徵費、送貨費用、搬運樓梯費用、安裝費用、因更換/ 逾期取貨/ 未能成功派送貨品而收取之網購額外行政費用、修改服裝費用、訂金、自動售賣機/扭蛋機貨品、捐款及指定商戶之產品。</li>
          <li>如有任何爭議，一田保留最終決定權。</li>
        </ul>
        <span className='mx-3 mt-8 font-bold'>果籃及禮籃適用</span>
        <ul className='px-4 mx-6 mt-2 text-base font-normal leading-relaxed list-disc lg:mx-0 lg:px-0 lg:ml-9'>
          <li>禮籃及禮盒之圖片僅供參考</li>
          <li>如個別貨品缺貨，一田保留權利以同等貨值之貨品替換</li>
          <li>貨品不包括餐具、擺設和裝飾品 </li>
          <li>包裝尺寸以一田最後決定為準 </li>
          <li>
            送禮果籃為新鮮食品，建議顧客即時食用，如顧客簽收時，即時發現品質情況，請保留完整包裝之貨品及拍下相片，以便安排退換貨品
            (果籃適用)
          </li>
          <li>如有任何爭議，一田保留最終決定權</li>
        </ul>
        <span className='mx-3 mt-8 font-bold'>「一田超市宅急便」服務條款及細則</span>
        <ul className='px-4 mx-6 mt-2 text-base font-normal leading-relaxed list-disc lg:mx-0 lg:px-0 lg:ml-9'>
          <li>即日送貨服務只適用於：</li>
          <p>- 成功註冊「一田超市宅急便」服務之YATA-Fans會員</p>
          <p>- 每日中午12時前成功確認之超市貨品訂單 </p>
          <p>- 送貨至8個特選屋苑*之服務處（不提供送貨上門及店鋪自取服務）</p>
        </ul>
        <span className='mx-3 mt-8 text-sm'>*特選屋苑包括：Imperial Kennedy、形薈、曉峰閣、雋巒、帝景園、浪琴園、淺水灣道127號及Wetland Seasons Park</span>

      </div>
    </TncLayout>
  );
};

PurchaseTnc.title = "條款及細則 | YATA eShop​";

export default PurchaseTnc;
