import { closeWishListModal, selectIsWishListModalOpen } from "../../redux/control/slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import AnimatedModalOverlay from "./AnimatedModalOverlay";


const RemoveConfirmModal = ({handleClick}:any) => {
  const wishListModal = useAppSelector(selectIsWishListModalOpen);
  const dispatch = useAppDispatch();

  return (
    <>
      <AnimatedModalOverlay showModal={wishListModal!} height={230} width={560}>
      <div className="flex flex-col items-center justify-center w-full p-2 lg:p-4">
        <div className="text-xl lg:text-2xl mt-5 mb-12">確定要移除此產品？</div>
      <div className="flex justify-center items-center w-full space-x-3 mb-5 px-4 lg:px-8 text-[#FFFFFF]">
            <button
              onClick={handleClick}
              className="border rounded-lg p-4 border-[#E5E5E5] text-xl w-full font-normal bg-[#82A90E]"
            >
              確定
            </button>
            <button
              onClick={() => {
                dispatch(closeWishListModal())
              }}
              className="border rounded-lg p-4 border-[#E5E5E5] text-xl w-full font-normal bg-[#B49D86]"
            >
              取消
            </button>
          </div>
          </div>
      </AnimatedModalOverlay>
    </>
  );
};

export default RemoveConfirmModal;