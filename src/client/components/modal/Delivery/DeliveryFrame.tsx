
import { closeDeliveryModal, selectWindowSize } from '../../../redux/control/slice'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import Option from './Option';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { selectImgUrl } from "../../../redux/config/index";


const DeliveryFrame = () => {
  const router = useNavigate();
  const location = useLocation();
  const imgUrl = useAppSelector(selectImgUrl);
  const dispatch = useAppDispatch();
  const handleLoginModalClose = () => {
    dispatch(closeDeliveryModal());
  }
  const windowType = useAppSelector(selectWindowSize);

  if (windowType === "mobile") {
    router("/delivery-method")
  }
  const onLaptop = windowType === "laptop";

  return (
    <>
      {onLaptop &&
        <>
          <div className='sticky z-50 top-0 flex items-center justify-center w-full bg-white border-b-[0.5px] h-[56px] border-yata-brown/[.4]'>
            <div className='text-xl font-semibold'>
              請選擇您的取貨方式
            </div>
            <button
              className='absolute items-center justify-center hidden w-8 h-8 lg:flex right-4'
              onClick={handleLoginModalClose}
            >
              <img
                src={imgUrl+'/modal/close.svg'}
                className='object-contain'
              />
            </button>
          </div>
          <Option />
        </>
      }
    </>


  )
}

export default DeliveryFrame