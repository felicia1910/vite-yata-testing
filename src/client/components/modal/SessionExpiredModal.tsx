import { selectImgUrl } from "../../redux/config/index";
import { closeCommonModal, openLoginModal, selectIsCommonModalOpen } from '../../redux/control/slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import AnimatedModalOverlay from './AnimatedModalOverlay';
import { Link, useNavigate } from 'react-router-dom';

const SessionExpiredModal = () => {
  const dispatch = useAppDispatch();
  const commonModal = useAppSelector(selectIsCommonModalOpen);
  const windowType = useAppSelector(state => state.control.windowSize);
  const router = useNavigate();
  const imgUrl = useAppSelector(selectImgUrl);

  const height = 400

  return (
    <AnimatedModalOverlay showModal={commonModal!} height={height}>
      <div className='relative h-full'>
        <div className='sticky top-0 flex items-center justify-center w-full bg-white border-b-[0.5px] h-[56px] border-yata-brown/[.4]'>
          <div className='text-xl font-semibold'>
            重新登入
          </div>
          <button
            className='absolute flex items-center justify-center w-8 h-8 right-4'
            onClick={() => dispatch(closeCommonModal())}
          >
            <img
              src={imgUrl+'/loginAndJoin/login/close.svg'}
              className="object-contain"
            />
          </button>
        </div>
        <div style={{ height: height - 56 }} className='flex flex-col items-center justify-center w-full'>
          <div className='flex items-center pb-10 text-lg font-bold'>帳戶驗證過期，請重新登入</div>
          <div className='flex items-center justify-center w-full mb-5'>
            <button
              onClick={() => {
                dispatch(closeCommonModal())
                windowType == 'mobile'
                  ? router('/login')
                  : dispatch(openLoginModal())
              }}
              className='flex items-center justify-center w-full h-12 max-w-sm px-4 py-2 mx-6 mb-2 text-left text-white border rounded-lg hover:border-2 hover:border-yata bg-yata-deep'
            >
              <div className='font-medium'>重新登入</div>
            </button>
          </div>
        </div>
      </div>
    </AnimatedModalOverlay>
  )
}

export default SessionExpiredModal