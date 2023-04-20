import React, {
  RefObject,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { IProductCard } from "../../../redux/shopping/slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { selectImgUrl } from "../../../redux/config/index";
import { selectIsAuthenticated } from "../../../redux/auth/slice";
import { silentRequest } from "../../layout/Buttons/LoginButton";
import { useMsal } from "@azure/msal-react";
import AddToCartPopup from "./AddToCartPopup";
type Props = {
  detail: IProductCard;
  cardRef?: RefObject<HTMLDivElement>;
  categoryId?: number;
  trigger?: boolean;
  setTrigger?: Dispatch<SetStateAction<boolean>>;
};

const ItemCard = ({ detail, cardRef, categoryId = 0, setTrigger }: Props) => {
  const router = useNavigate();
  const imgUrl = useAppSelector(selectImgUrl);
  const location=useLocation();
  const dispatch = useAppDispatch();
  const { instance } = useMsal();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [isAddToCart, setIsAddToCart] = useState<{
    success: boolean;
    err: string;
  } | null>(null);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [like, setLike] = useState("");

  const imgPath =
    detail.images.length > 0 ? detail.images[0].images_url : undefined;
  const saveAmt = parseFloat(detail.rsp) - parseFloat(detail.psp);

  useEffect(() => {
    if (detail.wish_list) setLike(detail.plu);
  }, [detail]);

  const likeChangeHandler = async (e: any) => {
    // console.log("detail.wish_list", detail.wish_list);
    e.stopPropagation();
    router('/account')
  };

  const toggleSubmit = async () => {
    //setBtnLoading(true);
  };

  return (
    <>
      <div
        ref={cardRef}
        onClick={() => router(`/product/${detail.plu}?id=${categoryId}`)}
        className={
          "relative flex-none px-2 py-2 bg-white border-2 border-dotted rounded-lg lg:mb-2 lg:mr-2 h-60 w-44 lg:w-97 border-yata-dotted transition-all duration-300 ease-in-out "
        }
      >
        <div className='relative w-full h-full'>
          {/* Wish list icon */}
          <div className='absolute z-10 object-contain w-5 h-5 right-2 top-2'>
          <img src={
                like == detail.plu
                  ?imgUrl+ "/homepage/heart-selected.svg"
                  :imgUrl+ "/homepage/heart-default.svg"
              } alt="heart" className='object-fill' onClick={likeChangeHandler}/>
            
          </div>

          {/* Image container */}
          <div className='relative flex flex-col items-center cursor-pointer h-5/12'>
            <div className='relative object-contain overflow-hidden h-28 w-28'>
              {imgPath && (
                <img src={imgPath} alt="product-card-img" className='fill' />
              )}
            </div>

            {detail.promotions.length > 0 && (
              <div className='absolute bottom-0 left-0 flex items-center h-6 max-w-full px-1 text-xs font-light text-white rounded-sm bg-red-500/90 '>
                <div className='overflow-hidden whitespace-nowrap text-ellipsis'>
                  {Object.values(detail.promotions[0])}
                </div>
              </div>
            )}
          </div>

          {/* Product description and amount */}
          <div className='w-full pt-2 overflow-hidden text-xs cursor-pointer h-6/12'>
            <div className='h-8 text-cat-pro-list'>{detail.full_name_c}</div>
            <div className='flex flex-row items-center justify-between w-auto h-7 '>
              {saveAmt ? (
                <>
                  <div className='text-sm font-bold align-text-bottom text-red-text'>
                    ${detail.psp}
                  </div>
                  <div className='pt-1 text-xs text-gray-500 line-through align-text-bottom decoration-2 decoration-gray-500'>
                    ${detail.rsp}
                  </div>
                </>
              ) : (
                <div className='text-sm font-bold align-text-bottom text-red-text'>
                  ${detail.rsp}
                </div>
              )}
            </div>
          </div>

          {/* Card button */}
          <button
            className={
              "relative flex justify-center w-full py-2 mt-1 space-x-1 text-sm text-white rounded-md bg-yata-deep"
            }
            onClick={async (e) => {
              e.stopPropagation();
              if (
                detail.configurable == 0 &&
                detail.product_status == 0 &&
                detail.inventory_status == 1
              ) {
                if (isAuthenticated) {
                  await toggleSubmit();
                } else {
                  localStorage.setItem("redirectUrl", location.pathname);
                  instance.loginRedirect(silentRequest);
                }
              } else {
                router(`/product/${detail.plu}?id=${categoryId}`);
              }
            }}
          >
            {detail.configurable != 0 ? (
              <span>產品詳情</span>
            ) : (
              <>
                {detail.product_status == 0 && (
                  <>
                    {detail.inventory_status == 1 && (
                      <>
                        <div className='relative object-contain w-5 h-5'>
                        <img src={imgUrl+'/homepage/navbar/cart.svg'} alt="pic" className='object-fill' />
  
                        </div>
                        <span>{!btnLoading ? "加入購物車" : "加入中"}</span>
                      </>
                    )}
                    {detail.inventory_status == 0 && <span>已售罄</span>}
                  </>
                )}
                {detail.product_status == 1 && <span>已下架</span>}
                {detail.product_status == 2 && <span>即將開售</span>}
              </>
            )}
            <AddToCartPopup
              isAddToCart={isAddToCart}
              setIsAddToCart={setIsAddToCart}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
