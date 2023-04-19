import { WindowProps } from "../../../utils/types";
import { useAppSelector } from "../../../redux/store";
import { selectImgUrl } from "../../../redux/config/index";
import { selectIsAuthenticated } from "../../../redux/auth/slice";
import { useMsal } from "@azure/msal-react";
import { silentRequest } from "./LoginButton";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const ShoppingCartButton = ({ window }: WindowProps) => {
  const router = useNavigate();
  const location = useLocation();
  const imgUrl = useAppSelector(selectImgUrl);
  const { instance } = useMsal();
  const shoppingCartItem = useAppSelector(
    (state) => state.shopping.cartItemQty
  );
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const onMobile = window === "mobile";
  const atPaymentPage = location.pathname === "/shopping-cart/confirmation";
  const adminLoginPage = location.pathname === "/admin/login";
  const adminCustomerLoginPage = location.pathname === "/admin/login-member";
  const adminPickUpPage = location.pathname === "/admin/pickup/[id]";

  return (
    <div
      className={
        "relative w-16 lg:mx-1 lg:w-auto lg:min-w-fit  " +
        (atPaymentPage ||
        adminLoginPage ||
        adminCustomerLoginPage ||
        adminPickUpPage
          ? "hidden lg:h-0"
          : "block lg:h-3/5")
      }
    >
      <button
        className={`flex items-center h-full relative justify-center transition-colors duration-300 ease-in-out rounded-lg group
        ${
          onMobile
            ? "bg-white mr-1 pr-1"
            : "bg-yata-deep hover:bg-yata p-2 pr-3 "
        }
        `}
        onClick={() => {
          isAuthenticated
            ? router("/shopping-cart")
            : [
                localStorage.setItem("redirectUrl", "/shopping-cart"),
                instance.loginRedirect(silentRequest),
              ];
        }}
      >
        <Link to='/shopping-cart'>
          <>
            <div className='relative flex items-center object-contain lg:w-5 w-8 aspect-[14/13]'>
            <img src={
                  onMobile ? imgUrl+"/mobile/cart.svg" : imgUrl+`/homepage/navbar/cart.svg`
                } alt='shopping-cart' className="transition duration-300 ease-in-out w-10 h-9" />
            </div>

            {shoppingCartItem > 0 && (
              <div className='absolute right-0 flex items-center justify-center w-4 h-4 overflow-hidden bg-red-500 rounded-full lg:w-5 lg:h-5 lg:-top-2 lg:-right-2 -top-1'>
                <span className='text-xs text-white'>{shoppingCartItem} </span>
              </div>
            )}
          </>
        </Link>
      </button>
    </div>
  );
};

export default ShoppingCartButton;
