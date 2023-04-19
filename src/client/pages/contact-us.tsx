import React, { useEffect, useRef, useState } from "react";
import Input from "../components/account/Input";
import { selectUserInfo } from "../redux/auth/slice";
import { useAppSelector } from "../redux/store";
import { useAppDispatch } from "./../redux/store";
import { contactDataThunk } from "./../redux/config/thunk";
import { onLoaded, onLoading, selectWindowSize } from "../redux/control/slice";
import { useRouter } from "next/router";
import Image from "next/image";

type ContactFields = {
  [key: string]: string | undefined | boolean | ArrayBuffer | null;
  MemberId: string | undefined;
  EmailAddress: string | undefined;
  CaseCategory: string | boolean;
  RelatedSectionScore?: string;
  CaseTopic: string;
  CaseDescription: string;
  OrderNumber?: string;
  PrimaryImage?: string | ArrayBuffer | null;
};
type ErrorFields = {
  [key: string]: boolean;
  // MemberId: boolean;
  EmailAddress: boolean;
  CaseCategory: boolean;
  CaseTopic: boolean;
  // CaseDescription: boolean;
};
const options = [
  { tc: "查詢", en: "Enquiry" },
  { tc: "稱讚", en: "Compliment" },
  { tc: "投訴", en: "Complaint" },
  { tc: "其他", en: "Others" },
];
const ContactUs = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUserInfo);
  const windowSize = useAppSelector(selectWindowSize);
  const initialState: ContactFields = {
    MemberId: user?.memberNo,
    EmailAddress: user?.email,
    CaseCategory: "Enquiry",
    RelatedSectionScore: "eShop",
    CaseTopic: "",
    CaseDescription: "",
    OrderNumber: "",
    PrimaryImage: "",
  };
  const [dataSend, setDataSend] = useState<ContactFields>(initialState);
  const initialErrorState: ErrorFields = {
    EmailAddress: false,
    CaseCategory: false,
    CaseTopic: false,
  };
  const [error, setError] = useState<ErrorFields>(initialErrorState);
  const [fileName, setFileName] = useState<string>("");
  const [hover, setHover] = useState<boolean>(false);
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const fileNameRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };
  const handleChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }

    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          const sendImg = reader.result.toString().split(",")[1];
          // console.log("img base 64", sendImg);
          setDataSend({ ...dataSend, PrimaryImage: sendImg });
        }
      };
    }
  };
  const handleRemove = () => {
    setFileName("");
    setHover(false);
    setDataSend({ ...dataSend, PrimaryImage: "" });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(initialErrorState);
    let hasErr = false;
    await Object.keys(initialErrorState).map((err) => {
      if (dataSend[err] == "" || dataSend[err] == undefined) {
        setError({ ...error, [err]: true });
        hasErr = true;
      }
    });
    if (hasErr) return;

    dispatch(onLoading());
    const result = await dispatch(contactDataThunk(dataSend));
    // console.log("contact us result: ", result);
    if (result.payload && result.payload.Message) {
      const caseNo = result.payload.Message.split("Case Number: ")[1];
      setDataSend(initialState);
      setFileName("");
      setError(initialErrorState);
      router.push({ pathname: "/contact-success", query: { caseNo: caseNo } });
    }
  };

  useEffect(() => {
    const { orderNo } = router.query;
    if (orderNo) {
      setDataSend({
        ...dataSend,
        OrderNumber: orderNo as string,
      });
    }
  }, [router]);

  return (
    <div className='lg:mt-6 lg:w-9/12 lg:m-auto'>
      <div className='flex items-center px-6 space-x-2 text-lg font-bold'>
        <div className='min-w-[1.25rem] min-h-[1.25rem] max-h-[28px] max-w-[28px] mr-1 flex items-center '>
          <div className='w-5 h-5 rounded-md bg-yata' />
        </div>
        <span className=' lg:text-yata'>聯絡我們</span>
      </div>
      <form
        onSubmit={handleSubmit}
        className='rounded-lg pt-2.5 space-y-5 lg:mt-4 lg:mb-8 lg:bg-grey lg:px-4'
      >
        <div className=''>
          <div>
            <Input
              title='您的電郵地址'
              star
              style
              isRequired
              type='email'
              value={dataSend.EmailAddress ?? ""}
              handleFocus={() => setError({ ...error, EmailAddress: true })}
              onChange={(e) =>
                setDataSend({ ...dataSend, EmailAddress: e.target.value })
              }
            />

            {error.EmailAddress &&
              (!dataSend.EmailAddress ||
                !/\S+@\S+\.\S+/.test(dataSend.EmailAddress)) && (
                <span className='mx-6 my-2 text-[#FF0000] text-sm'>
                  請輸入有效的電郵地址
                </span>
              )}
          </div>
        </div>
        <div className='px-5'>
          <div className='flex items-start'>
            <span className='text-[#FF0000]'>*</span>
            <label className='mb-1 '>個案類別</label>
          </div>

          <select
            onChange={(e) =>
              setDataSend({ ...dataSend, CaseCategory: e.target.value })
            }
            required
            className='w-full p-2.5 text-yata-brown bg-white focus:outline-none border-2 rounded-lg border-grey'
            placeholder='請選擇您的個案類別'
          >
            {options.map((e, i) => {
              return (
                <option key={i} value={e.en}>
                  {e.tc}
                </option>
              );
            })}
          </select>
          {error.CaseCategory && !dataSend.CaseCategory && (
            <span className='mx-6 my-2 text-[#FF0000] text-sm'></span>
          )}
        </div>
        <div className=''>
          <Input
            title='個案主題'
            star
            style
            isRequired
            placeholder='請提供您的個案主題'
            value={dataSend.CaseTopic ?? ""}
            maxLength={100}
            handleFocus={() => setError({ ...error, CaseTopic: true })}
            onChange={(e) =>
              setDataSend({ ...dataSend, CaseTopic: e.target.value })
            }
          />
          {error.CaseTopic && !dataSend.CaseTopic && (
            <span className='mx-6 my-2 text-[#FF0000] text-sm'>
              請輸入個案主題
            </span>
          )}
        </div>
        <div className=''>
          <Input
            title='個案內容'
            style
            placeholder='請講解您的個案內容或意見'
            // handleFocus={() => setError({ ...error, CaseDescription: true })}
            value={dataSend.CaseDescription ?? ""}
            onChange={(e) =>
              setDataSend({ ...dataSend, CaseDescription: e.target.value })
            }
          />
          {error.CaseDescription && !dataSend.CaseDescription && (
            <span className='mx-6 my-2 text-[#FF0000] text-sm'>
              請輸入個案內容​
            </span>
          )}
        </div>
        <Input
          title='訂單編號'
          style
          isRequired
          placeholder='請提供您的訂單編號。'
          value={dataSend.OrderNumber ?? ""}
          onChange={(e) =>
            setDataSend({ ...dataSend, OrderNumber: e.target.value })
          }
        />

        <div>
          <div className='px-5'>
            <label className='block pr-4 mb-1'>上傳相關相片</label>
          </div>
          <div
            onClick={handleClick}
            className='px-2.5 py-4 mx-5 my-2 flex flex-col justify-center items-center w-36 border rounded-lg border-[#eaeaea] cursor-pointer bg-white'
          >
            <img src='/contactUs/upload.png' alt='' className='w-2/3' />
            <span className='border-b border-[#cdc9c9] text-yata-deep font-bold mt-2'>
              瀏覽我的電腦
            </span>
            <input
              type='file'
              className='hidden'
              accept='image/*'
              ref={hiddenFileInput}
              onChange={handleChange}
            />
          </div>

          <div
            className='relative h-auto lg:max-w-[20rem] mx-5 text-xs transition-all duration-200 ease-out cursor-default '
            onMouseEnter={(e) => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
            ref={fileNameRef}
          >
            <p className='w-full break-words lg:overflow-hidden lg:text-ellipsis lg:whitespace-nowrap'>
              {fileName != "" ? (
                <div className='flex items-center justify-start w-full'>
                  <span className='mr-2'>檔案名稱: {fileName}</span>
                  <Image
                    src='/modal/plus.png'
                    width={20}
                    height={20}
                    alt=''
                    className='rotate-45 cursor-pointer'
                    onClick={handleRemove}
                  />
                </div>
              ) : (
                ""
              )}
            </p>
            <div
              className='absolute hidden p-1.5 px-6 items-center justify-center text-white truncate transition-all duration-200 ease-in-out rounded lg:flex bg-yata-deep'
              style={{
                visibility: hover ? "visible" : "hidden",
                opacity: hover ? 1 : 0,
                top: -30,
                left: windowSize == "laptop" ? 150 : "20",
              }}
            >
              {fileName}
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center w-full py-6'>
          <button
            type='submit'
            className='pt-3 pb-3 font-bold text-white rounded bg-yata-deep px-36'
          >
            確認
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
