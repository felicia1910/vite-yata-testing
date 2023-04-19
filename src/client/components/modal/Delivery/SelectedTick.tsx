import { selectWindowSize } from '../../../redux/control/slice';
import { useAppSelector } from '../../../redux/store';
import { selectImgUrl } from "../../../redux/config/index";

const SelectedTick = () => {
  const windowSize = useAppSelector(selectWindowSize);
  const imgUrl = useAppSelector(selectImgUrl);

  return (
    <div className="absolute flex items-center justify-center w-8 h-8 rounded-full lg:w-10 lg:h-10 bg-yata-deep -right-3 -top-3 lg:-right-4 lg:-top-4 ">
      <div className='relative object-contain rotate-3 w-6 lg:w-7 aspect-[32/23]'>
        <img src={imgUrl+"/common/tick-white.png"} alt="pic" />
      </div>
    </div>
  )
}

export default SelectedTick