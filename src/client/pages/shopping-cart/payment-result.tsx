import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import FullLoading from "../../components/common/FullLoading";
import ReturnButton from "../../components/common/ReturnButton";
import CryptoJS from "crypto-js";
import { isJsonStr, isBytesWordArr } from "../../utils/checkStrType";
import { sendPaymentDataApi } from "../../redux/shopping/thunk";

const PaymentResult = () => {
  const router = useRouter();
  const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null);
  const [order, setOrder] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (router.isReady) {
        const state = router.query.state as string;
        // console.log("state: ", state.length);

        const bytes = CryptoJS.AES.decrypt(
          state,
          process.env.ENCRYPTED_SECRET!
        );
        if (!isBytesWordArr(bytes)) {
          router.push("/");
          return;
        }
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        if (!isJsonStr(decryptedData)) {
          router.push("/");
          return;
        }

        const data = JSON.parse(decryptedData) ?? "";
        await sendPaymentDataApi(data);
        // console.log("decryptedData", data);
        setPaymentSuccess(data.state == 1);
        setOrder((data.merRef as string) ?? "");
      }
    })();
  }, [router.isReady]);

  return (
    <div className='lg:bg-grey'>
      {paymentSuccess != null && (
        <div className='pt-16 rangeLg:px-16 rangeXl:px-24 2xl:px-40 lg:py-16'>
          <div className='flex text-center flex-col bg-white pt-[28px] pb-[120px] lg:py-[83px] underLg:px-10 lg:rounded-2xl items-center w-full'>
            <div className='relative object-contain w-32 h-32'>
              <Image
                src={
                  paymentSuccess
                    ? `/common/icon-success.svg`
                    : `/common/icon-failure.svg`
                }
                layout='fill'
              />
            </div>
            <h1 className='py-[20px] font-semibold text-3xl'>
              付款{paymentSuccess ? "成功" : "失敗"}
            </h1>

            <div className='space-y-1 text-sm lg:text-lg'>
              {paymentSuccess ? (
                <>
                  <div>您已成功付款，您的訂單已確認。</div>
                  <div>訂單編號: {order}</div>
                  {/* <div>購買日期: {time}</div> */}
                </>
              ) : (
                <>
                  <div>對不起，是次交易不成功。</div>
                  <div>訂單編號: {order}</div>
                </>
              )}
            </div>

            {paymentSuccess == false && (
              <div className='flex-col mx-3 my-1 text-sm lg:mt-5 lg:text-lg lg:flex lg:w-[32rem] '>
                <span>
                  您可於30分鐘内於「我的帳戶」{">"}
                  「訂單紀錄」點選這個訂單，重新進行付款。逾期未完成付款，訂單將自動取消。
                </span>
              </div>
            )}

            <div className='pt-[50px] w-full'>
              <ReturnButton btnName='返回主頁' path='/' />
              <ReturnButton btnName='查看訂單' path='/account/orders' />
            </div>
          </div>
        </div>
      )}

      {paymentSuccess == null && (
        <div className='h-[60vh]'>
          <FullLoading />
        </div>
      )}
    </div>
  );
};

export default PaymentResult;
