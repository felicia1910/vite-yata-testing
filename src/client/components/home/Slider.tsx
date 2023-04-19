import { selectWindowSize } from "../../redux/control/slice";
import { selectImgUrl } from "../../redux/config/index";
import { useAppSelector } from "../../redux/store";
import { IBannerImages } from "../../redux/config/slice";
import { Link, useNavigate } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


type Props = {
  images: IBannerImages[];
};

const Slider = ({ images }: Props) => {
  const router = useNavigate();
  const imgUrl = useAppSelector(selectImgUrl);

  return (
    <>
      {images.length > 0 && (
        <Carousel>
          {images.map((img, idx) => (
            <div key={`top-slider-${idx}`} className='flex items-center justify-center keen-slider__slide bg-gradient-to-br from-yata-light to-yata-deep aspect-[1366/394] rounded-lg overflow-hidden'> 
              <img src={img.images_url} alt="pic" className='object-contain' />
            </div>
          ))}
        </Carousel>
      )}






    </>
  );
};

export default Slider;
