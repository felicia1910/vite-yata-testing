import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  openDeliveryModal,
  selectIsLoading,
  selectWindowSize,
} from "../../../redux/control/slice";
import { selectImgUrl } from "../../../redux/config/index";
import { selectUserInfo } from "../../../redux/auth/slice";
import { selectShippingMode } from "../../../redux/delivery/slice";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const DeliveryButton = () => {
  const router = useNavigate();
  const location = useLocation();
  const imgUrl = useAppSelector(selectImgUrl);
  const dispatch = useAppDispatch();
  const windowType = useAppSelector(selectWindowSize);
  const userInfo = useAppSelector(selectUserInfo);
  const shippingMode = useAppSelector(selectShippingMode);
  const isLoading = useAppSelector(selectIsLoading);
  const atShoppingCartPage = location.pathname === "/shopping-cart";
  const atConfirmationPage = location.pathname === "/shopping-cart/confirmation";

  return (
    <button
      disabled={isLoading}
      onClick={(e) => {
        e.preventDefault();
        windowType === "laptop"
          ? dispatch(openDeliveryModal())
          : router("/delivery-method");
      }}
      className={`items-center justify-center p-[0.125rem] lg:p-2 transition-all duration-300 ease-in-out rounded-lg group 
        ${
          windowType === "mobile"
            ? "flex w-2/4 lg:hidden border-2 border-yata-deep mr-1 h-8"
            : ""
        }
        ${
          windowType === "laptop"
            ? "hidden lg:flex lg:border-0 lg:bg-yata-deep hover:bg-yata lg:mx-1 h-3/5"
            : ""
        } 
        ${
          atShoppingCartPage || atConfirmationPage || !userInfo
            ? "opacity-0 pointer-events-none invisible"
            : "opacity-100 pointer-events-auto visible"
        }
        `}
    >
      {shippingMode == "PU" && (
        <>
          <div className='flex items-center justify-center object-contain w-7'>
          <img src={
                windowType === "mobile"
                  ? imgUrl+ "/modal/delivery/pickup-green.png"
                  : imgUrl+ "/faq/sidebar/Pickup-White.png"
              } alt={"self-pickup"}
              className='transition duration-300 ease-in-out w-7 h-7'/>

          </div>
          <p
            className={`mx-1 text-sm whitespace-nowrap cursor-pointer text-yata-deep lg:text-white group-hover:font-semibold`}
          >
            店舖自取
          </p>
        </>
      )}
      {shippingMode == "HD" && (
        <>
          <div className='relative flex items-center object-contain w-7 aspect-[96/51]'>
          <img src={
                windowType === "mobile"
                  ? imgUrl+ "/modal/delivery/delivery-green.png"
                  : imgUrl+ "/homepage/navbar/delivery.svg"
              } alt={"delivery"}
              className='transition duration-300 ease-in-out w-7 h-4'/>
          </div>
          <p
            className={`mx-1 text-sm whitespace-nowrap cursor-pointer text-yata-deep lg:text-white group-hover:font-semibold`}
          >
            送貨上門
          </p>
        </>
      )}

      {windowType === "laptop" && (
        <img src={
         imgUrl+ '/homepage/navbar/arrow_right.svg'
        } alt={'arrow_right'}
        className='w-2 h-2'/>

      )}
    </button>
  );
};

export default DeliveryButton;
