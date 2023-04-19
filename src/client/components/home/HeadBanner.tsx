import { IBannerImages } from "../../redux/config/slice";

type Props = {
  middleImages: IBannerImages[];
  narrowImages: IBannerImages[];
};

const HeadBanner = ({ middleImages, narrowImages }: Props) => {

  // console.log("middleImages", middleImages);
  return (
    <div className='w-full overflow-x-scroll lg:overflow-hidden mt-[20px]'>
      {middleImages.length > 0 && (
        <div className='flex flex-row justify-center lg:w-full w-[150%] mt-3 space-x-2 lg:space-x-4 lg:mt-0'>
          {middleImages.map((img, idx) => (
            <div
              key={`mid-banner-${idx}`}
              className='w-1/2 lg:w-1/3'
            >
              <img src={img.images_url} className='min-w-full' />
            </div>
          ))}
        </div>
      )}

      <div className='underLg:hidden'>
        {narrowImages.length > 0 && (
          <div
            className='w-full'
            onClick={() => {
            }}
          >
            <img src={narrowImages[0].images_url} className='w-full mt-7' />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeadBanner;
