import React, { Dispatch, SetStateAction, useState } from "react";
import ButtonLoading from "../common/ButtonLoading";
import AnimatedModalOverlay from "../modal/AnimatedModalOverlay";

type Props = {
  isShowing: boolean;
  setIsShowing: Dispatch<SetStateAction<boolean>>;
};

const PaymentModal = ({ isShowing, setIsShowing }: Props) => {
  const [input, setInput] = useState({ type: "", debitNote: "", remark: "" });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRadioClick = (type: string) => {
    setInput((prevInput) => ({ ...prevInput, type: type }));
  };

  const handleSubmit = () => {
    if (input.type == "debit" && input.debitNote != "") {
      setIsProcessing(true);
      // TODO: add logic to send the debit note number to api
      console.log("sending debit note number to api: ", input.debitNote);
    } else if (input.type == "remark" && input.remark != "") {
      setIsProcessing(true);
      // TODO: add logic to send the remark to api
      console.log("sending remark to api: ", input.remark);
    }

    setTimeout(() => setIsProcessing(false), 1000);
  };

  return (
    <AnimatedModalOverlay showModal={isShowing} width={480} height={"auto"}>
      <div className='w-full h-full px-4 py-4 lg:px-8 '>
        <div className='h-4/5'>
          <div className='flex justify-center w-full text-lg font-semibold text-yata-deep'>
            請選擇付款方式：
          </div>
          <div className='w-full py-4 space-y-4 '>
            <div className='space-y-1'>
              <button
                className='flex items-center cursor-pointer '
                disabled={isProcessing}
                onClick={() => handleRadioClick("debit")}
              >
                <div className='box-border flex items-center justify-center w-4 h-4 mr-3 border-2 rounded-full border-yata-deep '>
                  <div
                    className={
                      "w-2 h-2 rounded-full transition-all duration-300 ease-in-out " +
                      (input.type == "debit" ? "bg-yata-deep " : "bg-white ")
                    }
                  />
                </div>
                <label
                  className={
                    "font-medium cursor-pointer " +
                    (input.type == "debit" ? "text-primary-blue " : "")
                  }
                >
                  客人已為會計部帳單 (Debit Note) 結帳
                </label>
              </button>
              <input
                className={
                  "w-full h-8 px-2 transition-all duration-300 ease-in-out rounded-md placeholder:font-light placeholder:text-sm focus:outline-none focus:border-yata-deep focus:text-yata-deep focus:border-2 " +
                  (input.type == "debit"
                    ? "border-yata-deep border-2 "
                    : "border ")
                }
                disabled={isProcessing}
                onClick={() => handleRadioClick("debit")}
                onChange={(e) =>
                  setInput({ ...input, debitNote: e.target.value })
                }
                placeholder='請輸入Debit Note編號'
              />
            </div>

            <div className='space-y-1'>
              <button
                className='flex items-center cursor-pointer '
                disabled={isProcessing}
                onClick={() => handleRadioClick("remark")}
              >
                <div className='box-border flex items-center justify-center w-4 h-4 mr-3 border-2 rounded-full border-yata-deep '>
                  <div
                    className={
                      "w-2 h-2 rounded-full transition-all duration-300 ease-in-out " +
                      (input.type == "remark" ? "bg-yata-deep " : "bg-white")
                    }
                  />
                </div>
                <label
                  className={
                    "font-medium cursor-pointer " +
                    (input.type == "remark" ? "text-primary-blue " : "")
                  }
                >
                  跳過付款
                </label>
              </button>
              <input
                className={
                  "w-full h-8 px-2 transition-all duration-300 ease-in-out rounded-md placeholder:font-light placeholder:text-sm focus:outline-none focus:border-yata-deep focus:text-yata-deep focus:border-2 " +
                  (input.type == "remark"
                    ? "border-yata-deep border-2 "
                    : "border ")
                }
                disabled={isProcessing}
                onClick={() => handleRadioClick("remark")}
                onChange={(e) => setInput({ ...input, remark: e.target.value })}
                placeholder='請輸入備註'
              />
            </div>
          </div>
        </div>

        <div className='flex items-center justify-between w-full py-2 space-x-2 '>
          <button
            disabled={isProcessing}
            className={
              "w-[48%] h-12 rounded-lg " +
              (isProcessing
                ? "bg-grey-i text-grey cursor-default"
                : "bg-[#D2C4B6] text-[#7F7A74] ")
            }
            onClick={() => setIsShowing(false)}
          >
            取消
          </button>
          <button
            disabled={isProcessing}
            className=' w-[48%] h-12 text-white flex justify-center items-center rounded-lg bg-yata-deep '
            onClick={handleSubmit}
          >
            {isProcessing ? <ButtonLoading /> : "確認"}
          </button>
        </div>
      </div>
    </AnimatedModalOverlay>
  );
};

export default PaymentModal;
