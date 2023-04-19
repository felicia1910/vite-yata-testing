import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectWindowSize } from "../../redux/control/slice";
import HeadTitle from "../common/HeadTitle";
import Sidebar from "./Sidebar";
import ReturnButton from "../common/ReturnButton";
import {
  selectIsAdmin,
  selectAdminUserInfo,
  initAdminUser,
  selectUserInfo,
  logout,
} from "../../redux/auth/slice";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  isRequired: boolean;
  isBack?: boolean;
}

const AccountLayout = ({
  children,
  title,
  isRequired,
  isBack = false,
}: LayoutProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const windowType = useAppSelector(selectWindowSize);
  const isAdmin = useAppSelector(selectIsAdmin);
  const adminUser = useAppSelector(selectAdminUserInfo);
  const userInfo = useAppSelector(selectUserInfo);
  

  const onMobile = windowType === "mobile";
  const onLaptop = windowType === "laptop";

  const removeGrabUser = ()=>{
    console.log(userInfo,'userInfo')
    dispatch(logout());

  }

  return (
    <div className='flex flex-col justify-center mb-8 text-lg lg:items-center lg:w-full'>
      <div className='items-start justify-center mb-8 lg:flex lg:w-full '>
        {onLaptop && (
          <div className='flex flex-col w-3/12 px-8 mt-2'>
            <HeadTitle
              title={title}
              path={"/account"}
              head={isAdmin ? "用戶帳戶" : "我的帳戶"}
            />

            <Sidebar />
          </div>
        )}

        {onMobile && (
          <div className='flex flex-col sx:w-1/2 lg:w-3/12 px-8 mt-2'>
            <HeadTitle
              title={title}
              path={"/account"}
              head={isAdmin ? "用戶帳戶" : "我的帳戶"}
            />
          </div>
          
        )}

        <div className='lg:w-7/12 bg-[#FCFCFB] py-3 mx-2 rounded-lg lg:m-0 lg:px-2'>
          <div className='flex items-center h-0 space-x-4 lg:h-16 lg:px-2 '>
            {/* {isAdmin && adminUser && (
              <>
                <span className='font-medium '>{adminUser.memberNo}</span>
                <button
                  onClick={() => {
                    dispatch(initAdminUser());
                    router.push("/admin/login-member");
                  }}
                  className='hidden font-medium underline lg:block text-yata-deep underline-offset-2'
                >
                  登出此帳戶
                </button>
              </>
            )} */}
          </div>
          {children}
        </div>
      </div>
      {isRequired && onMobile && (
        <ReturnButton btnName='返回' goBack={isBack} />
      )}
    </div>
  );
};

export default AccountLayout;
