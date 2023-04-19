import { useMsal } from "@azure/msal-react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from "react";
import {
  loginAsAdmin,
  logout,
  selectIsAdmin,
  selectIsAuthenticated,
} from "../../../redux/auth/slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { accountInfo } from "../../../utils/contents/accountInfo";

interface Props {
  accountDropdown: boolean;
  setAccountDropdown: (value: boolean) => void;
}

const AccountList = ({ accountDropdown, setAccountDropdown }: Props) => {
  const { instance } = useMsal();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAdmin = useAppSelector(selectIsAdmin);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const renderDropdownButton = (
    item: {
      title: string;
      usage: string;
      iconDefault: any;
      iconSelected: any;
      route: string;
    },
    idx: number,
    isAdmin: boolean
  ) => {
    return (
      <Link
        to={
          item.usage === "logout"
            ? isAdmin
              ? "/admin/login"
              : process.env.NEXTAUTH_URL!
            : `/account${item.route}`
        }
        key={`${idx}-${item.usage}-all`}
      >
        <button
          className={`flex group justify-center w-full py-4 transition-color ease-in-out duration-300 ${idx === activeItem ? "bg-yata" : "bg-white"
            }`}
          onMouseOver={() => setActiveItem(idx)}
          onClick={() => {
            if (item.usage === "logout") {
              if (!isAdmin) {
                localStorage.removeItem("adb2c_access_token");
                instance.logout();
                // setAccountDropdown(false)
              } else {
                dispatch(loginAsAdmin(false));
                dispatch(logout());

              }
            }
            setAccountDropdown(false);
          }}
          key={`${idx}-${item.usage}-all-b`}
        >
          <div className='flex justify-start w-3/5 '>
            <img
              src={activeItem === idx ? item.iconSelected : item.iconDefault}
              className='transition-all duration-300 ease-in-out'
              alt={item.iconDefault} />
            {/* height={16} 16 */}

            <p
              className={`ml-1 font-medium duration-300 ease-in-out transition-color ${activeItem === idx ? "text-white" : ""
                }`}
            >
              {item.title}
            </p>
          </div>
        </button>
      </Link>
    );
  };

  return (
    <>
      {accountDropdown && (
        <div
          onClick={() => {
            setActiveItem(null);
            setAccountDropdown(false);
          }}
          className='fixed inset-0 w-full h-full'
        />
      )}
      <div
        className={`hidden lg:block absolute right-0 p-[0.3rem] md:mx-1 transition-all ease-in-out duration-300 overflow-hidden  ${accountDropdown
          ? "opacity-100"
          : "pointer-events-none opacity-0 -z-50"
          }`}
      >
        <div
          className={`
          absolute z-10 w-5 h-5 rotate-45  right-4 
          border-t-2 border-t-[#A5896D] 
          border-r-2 border-r-transparent 
          border-b-2 border-b-transparent 
          border-l-2 border-l-[#A5896D] 
          transition-color ease-in-out duration-300
          ${activeItem === 0 ? "bg-yata" : "bg-white"}
        `}
        />
        {isAuthenticated && (
          <div className='relative min-h-20 mt-[0.5rem] bg-white w-40 drop-shadow-lg border-t-2 border-t-[#A5896D] overflow-hidden rounded-sm'>
            {!isAdmin &&
              accountInfo.map((item, idx) =>
                renderDropdownButton(item, idx, isAdmin!)
              )}
            {isAdmin &&
              renderDropdownButton(
                accountInfo[accountInfo.length - 1],
                0,
                isAdmin
              )}
          </div>
        )}
      </div>
    </>
  );
};

export default AccountList;
