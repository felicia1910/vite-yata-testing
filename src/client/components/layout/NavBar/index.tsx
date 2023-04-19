import React, { useState, lazy, Suspense } from "react";

import DropDownList from "./DropDownList";
import DeliveryButton from "../Buttons/DeliveryButton";
import ShoppingCartButton from "../Buttons/ShoppingCartButton";
import LoginButton from "../Buttons/LoginButton";
import DeliveryModal from "../../modal/Delivery/DeliveryModal";
//
// import NavBarButtons from "../Buttons/NavBarButtons";
// import LoginModal from "../../modal/Auth/LoginModal";
// import SessionModal from "../../modal/SessionExpiredModal";
//
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  selectWindowSize,
  selectIsCheckOut,
} from "../../../redux/control/slice";
import { WindowScreen } from "../../../utils/types";
import {
  initCrmGrabUser,
  selectAdminGrabUserInfo,
  selectAdminUserInfo,
  selectIsAdmin,
  selectUserInfo,
} from "../../../redux/auth/slice";
import { Link, useNavigate, useLocation } from 'react-router-dom';


const NavBarButtons = lazy(() => import("../Buttons/NavBarButtons"));
const LoginModal = lazy(() => import("../../modal/Auth/LoginModal"));
const SessionModal = lazy(() => import("../../modal/SessionExpiredModal"));

// export const getStaticProps: GetStaticProps = wrapper.getStaticProps((store) => ({ }) => {
//   const isAuthenticated = useAppSelector(selectIsAuthenticated)
//   !isAuthenticated &&
//     window.addEventListener('message', (e: any) => {
//       if (e.data.message == "login") {
//         console.log('message a', e)
//         store.dispatch(loginSuccess(e.data.user))
//         store.dispatch(closeLoginModal())
//       }
//     })
//   return { props: {} }
// })

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useNavigate();
  const location = useLocation();
  const windowType = useAppSelector(selectWindowSize);
  const isAdmin = useAppSelector(selectIsAdmin);
  const adminUser = useAppSelector(selectAdminUserInfo);
  const isCheckout = useAppSelector(selectIsCheckOut);
  const adminGrabUser = useAppSelector(selectAdminGrabUserInfo)

  const [over, setOver] = useState<number | null>(null);
  const [activeDept, setActiveDept] = useState<number | null>(null);
  const [activeSegment, setActiveSegment] = useState<number>(0);
  const [activeType, setActiveType] = useState<number | null>(null);

  const onLaptop = windowType === "laptop";
  const atPaymentPage = location.pathname === "/shopping-cart/confirmation";
  const atAdminLoginPage = location.pathname === "/admin/login";

  return (
    <>
      <nav
        className={
          "sticky items-center justify-between hidden w-screen px-0 transition-all duration-500 lg:flex lg:z-40 rangeLg:px-8 bottom-0 rangeXl:px-24 2xl:px-40 bg-yata " +
          (atPaymentPage || atAdminLoginPage
            ? "h-0 top-full pointer-events-none invisible"
            : "h-[3.5rem] top-0 translate-y-0 visible ")
        }
        onMouseLeave={() => {
          // Hide the dropdown and deactivate buttons while mouse leave this area
          setActiveDept(null);
          setOver(null);
          setActiveSegment(0);
          setActiveType(null);
        }}
      >
        {/* // Navigation buttons */}
        <div className='relative flex items-center w-3/5 h-full overflow-x-scroll scrollbar-hide '>
          {!(atAdminLoginPage || isAdmin) && (
            <NavBarButtons
              activeDept={activeDept}
              setActiveDept={setActiveDept}
              over={over}
              setOver={setOver}
            />
          )}
        </div>

        {/* Login buttons group */}
        <div
          className={
            "relative flex items-center transition-all duration-500 ease-in-out " +
            (atPaymentPage
              ? "h-0 pointer-events-none invisible"
              : "h-full visible ")
          }
        >
          {!(atAdminLoginPage || isAdmin) && <DeliveryButton />}
          {isAdmin && adminGrabUser && (
            <button
              className='items-center justify-center hidden w-32 p-2 text-sm text-white transition-colors duration-300 ease-in-out rounded-lg cursor-pointer lg:flex h-3/5 min-w-fit bg-yata-deep lg:hover:bg-yata '
              onClick={() => {
                dispatch(initCrmGrabUser());
                router("/admin/login-member");
              }}
            >
              登出 {adminGrabUser.memberNo}
            </button>
          )}
          <LoginButton />
          {!(atAdminLoginPage || isAdmin) && (
            <ShoppingCartButton window={WindowScreen.laptop} />
          )}
        </div>

        {/* // Dropdown list */}
        <DropDownList
          activeDept={activeDept}
          activeSegment={activeSegment}
          activeType={activeType}
          setActiveSegment={setActiveSegment}
          setActiveDept={setActiveDept}
          setActiveType={setActiveType}
        />

        <LoginModal />
        {onLaptop && <DeliveryModal />}
        <SessionModal />
      </nav>
    </>
  );
};

export default Navbar;
