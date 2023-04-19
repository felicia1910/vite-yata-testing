import React, { Dispatch, SetStateAction } from "react";

type Props = {
  email: { isEdited: boolean; addr: string };
  errShow: { promoCode: boolean; email: boolean };
  // setEmail: Dispatch<SetStateAction<{ isEdited: boolean; addr: string }>>;
  setEmail: (email: { isEdited: boolean; addr: string }) => void;
  setErrShow: Dispatch<SetStateAction<{ promoCode: boolean; email: boolean }>>;
};

const EmailInput = ({ email, errShow, setEmail, setErrShow }: Props) => {
  return (
    <div className='relative bg-white rounded-md'>
      <div className='bg-grey-i rounded-tl-md rounded-tr-md'>
        <h1 className='py-2 ml-3 text-lg font-bold'>訂單電郵地址</h1>
      </div>

      <div className='px-3 py-3'>
        <div className='flex justify-between space-x-1'>
          <input
            placeholder='請填寫電郵地址'
            className={
              "w-9/12 border-[2px] py-2 px-4  rounded-md focus-visible:outline-none transition-all duration-300 " +
              (email.isEdited
                ? "bg-white border-yata text-yata-deep "
                : "border-grey-input lg:bg-grey-input ")
            }
            id='email'
            type='text'
            value={email.addr}
            disabled={!email.isEdited}
            onChange={(e) => {
              setEmail({ ...email, addr: e.target.value });
              setErrShow({ ...errShow, email: false });
            }}
          />
          <button
            onClick={() => {
              if (email.isEdited) {
                if (!email.addr.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                  setErrShow({ ...errShow, email: true });
                } else {
                  setEmail({ ...email, isEdited: false });
                  setErrShow({ ...errShow, email: false });
                }
              } else {
                setEmail({ ...email, isEdited: true });
              }
            }}
            className={`flex justify-center w-1/3 py-2 text-lg rounded transition-all duration-300 ${
              email.isEdited ? "bg-yata text-white " : "bg-grey-i"
            }`}
          >
            {email.isEdited ? "確定" : "更改"}
          </button>
        </div>
        <div
          className={
            "mt-1 text-sm text-red-600 transition-all duration-300 " +
            (errShow.email ? "opacity-100 h-5 " : "opacity-0 h-0")
          }
        >
          請填寫正確的電郵地址
        </div>
      </div>
    </div>
  );
};

export default EmailInput;
