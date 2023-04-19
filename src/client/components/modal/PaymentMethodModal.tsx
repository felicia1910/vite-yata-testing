import React, { Dispatch, SetStateAction } from "react";
import AnimatedModalOverlay from "./AnimatedModalOverlay";
import { useAppSelector } from "../../redux/store";
import { selectWindowSize } from "../../redux/control/slice";
import { IPaymentMethod, IPaymentReqBody } from "../../utils/types";
import { genPaymentSign } from "../shopping/ShoppingCart";

type Props = {
  openPaymentModal: boolean;
  setOpenPaymentModal: Dispatch<SetStateAction<boolean>>;
  paymentMethod: IPaymentMethod[];
  card: number | null;
  setCard: Dispatch<SetStateAction<number | null>>;
  paymentForm: IPaymentReqBody;
  setPaymentForm: Dispatch<SetStateAction<IPaymentReqBody>>;
  onClick: () => Promise<void>;
};

const PaymentMethodModal = ({
  openPaymentModal,
  setOpenPaymentModal,
  paymentMethod,
  card,
  setCard,
  paymentForm,
  setPaymentForm,
  onClick,
}: Props) => {
  const windowSize = useAppSelector(selectWindowSize);
  const onMobile = windowSize == "mobile";

  return (
    <AnimatedModalOverlay
      showModal={openPaymentModal}
      height={"auto"}
      width={onMobile ? "96vw" : "40vw"}
    >
      <div className='px-5 py-4'>
        <div className='mb-4 text-xl font-bold text-yata-deep'>信用卡優惠</div>

        <div className='relative w-full overflow-hidden bg-white rounded-lg border-[1px] '>
          <div className='bg-grey-i'>
            <h1 className='py-2 ml-3 text-lg font-semibold'>
              請選擇您的信用卡優惠
            </h1>
          </div>

          {/* All payment methods provided by API */}
          <div className='px-4 py-4 space-y-2 lg:px-8'>
            {paymentMethod.map((method, idx) => (
              <button
                key={`payment-method-${idx}`}
                className='rounded-lg border-[1px] w-full h-16 lg:h-20 flex items-center justify-between lg:px-10 px-4 transition-all ease-in-out duration-300'
                onClick={() => {
                  setCard(method.id === card ? null : method.id);
                  setPaymentForm({
                    ...paymentForm,
                    campaign:
                      paymentForm.campaign == method.payment_campaign_code
                        ? ""
                        : method.payment_campaign_code,
                    sign: genPaymentSign({
                      ...paymentForm,
                      campaign: method.payment_campaign_code,
                    }),
                  });
                }}
                style={{
                  borderColor: method.id === card ? "#A9CD07" : "#EEEEEE",
                  backgroundColor: method.id === card ? "#FAFFEB" : "#EEEEEE",
                }}
              >
                <div className='flex flex-col items-start mr-1 text-left'>
                  <div>{method.payment_type_description_c}</div>
                  {method.payment_terms_c !== "" && (
                    <div className='text-xs text-yata-deep'>
                      {method.payment_terms_c}
                    </div>
                  )}
                </div>
                <div
                  className={
                    "rounded-full w-6 h-6 min-w-[1.5rem] border-2 border-yata-brown transition-all ease-in-out duration-300 " +
                    (method.id === card ? "bg-yata-deep" : "bg-white")
                  }
                />
              </button>
            ))}
          </div>
        </div>

        <div className='flex items-center justify-center w-full mt-8 mb-4 space-x-4'>
          <button
            className='flex items-center justify-center bg-grey-input py-2 text-lg border-2 rounded-full  border-yata-deep text-yata-deep w-[48%] lg:w-44'
            onClick={() => {
              setOpenPaymentModal(false);
            }}
          >
            返回
          </button>
          <button
            className={
              "flex justify-center items-center py-2 text-lg text-white rounded-full w-[48%] lg:w-44 transition-all ease-in-out duration-300 " +
              (card == null ? "bg-yata-deep/40" : "bg-yata-deep")
            }
            disabled={card == null}
            onClick={onClick}
          >
            付款
          </button>
        </div>
      </div>
    </AnimatedModalOverlay>
  );
};

export default PaymentMethodModal;
