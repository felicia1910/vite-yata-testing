import React, { useState } from "react";
import { selectImgUrl } from "../../redux/config/index";
import { useAppSelector} from "../../redux/store";
import { selectWindowSize } from "../../redux/control/slice";

const imgPath = [
  {
    laptop: "/purchase-process/guideline-b1.png",
    mobile: "/purchase-process/guideline-b1-mobile.png",
    ratio: "720 / 466",
  },
  {
    laptop: "/purchase-process/guideline-b2.png",
    mobile: "/purchase-process/guideline-b2-mobile.png",
    ratio: "720 / 548",
  },
  {
    laptop: "/purchase-process/guideline-b3.png",
    mobile: "/purchase-process/guideline-b3-mobile.png",
    ratio: "720 / 604",
  },
];
const noticeList = [
  { id: 1, title: '購物流程', route: '/purchase-process/guideline-a1' },
  { id: 2, title: '訂購果籃/禮籃', route: '/purchase-process/guideline-hamper' },
]

export default function ShoppingGuideline() {
  const imgUrl = useAppSelector(selectImgUrl);
  const windowSize = useAppSelector(selectWindowSize);
  const onMobile = windowSize == "mobile";
  const [noticeTag,setNoticeTag] = useState<number>(1);


  interface Inotice {
    id: number;
    title: string;
    route: string;
}

  return (
    <div className='relative px-4 mt-2 mb-16 lg:mt-8 lg:mb-28 rangeLg:px-8 rangeXl:px-24 2xl:px-48 rangeMd:pt-4 rangeSm:pt-4 rangeXs:pt-4'>
      <div className='flex items-center'>
        <div className='h-[18px] w-[18px] bg-yata rounded-md'></div>
        <span className='mx-2 text-lg font-semibold leading-none lg:text-xl lg:font-normal lg:text-yata-deep'>
          購物流程
        </span>
      </div>
      <div className="flex text-center w-full gap-4">

        {noticeList.map((n: Inotice, index: number) => {
          return (
            <div key={index} onClick={() => setNoticeTag(n.id)}
              className={'py-2 mt-8 mb-4 text-center rounded-lg lg:my-8 w-1/2 cursor-pointer border-4 border-solid ' + (noticeTag == n.id ? " bg-yata-deep" : ' border-yata')}>
              <span className={'text-xl font-semibold lg:text-2xl tranistion-all duration-300 ease-in-out ' + (noticeTag == n.id ? "text-white" : "text-yata")}>{n.title}</span>
            </div>

          )
        })}
      </div>

      <div className='w-full h-auto mt-4 bg-light-yellow rounded-3xl'>
        <div
          className='relative object-contain w-full overflow-hidden'
          style={{
            aspectRatio: onMobile ? (noticeTag == 1 ? "360 / 2819" : "360 / 2372") : "348 / 761",
            imageRendering: "crisp-edges",
          }}
        >
          <img src={
              onMobile
                ? imgUrl + noticeList.filter(n => n.id == noticeTag)[0].route + "-mobile.png"
                : imgUrl + noticeList.filter(n => n.id == noticeTag)[0].route + ".png"
            } alt="pic" />
        </div>
      </div>

      <div className='py-2 mt-12 text-center rounded-lg lg:mt-16 bg-yata-deep'>
        <span className='text-2xl font-semibold text-white'>精明小貼士</span>
      </div>

      <div className='w-full mt-4'>
        <div className='w-full grid-cols-3 gap-4 space-y-4 lg:space-y-0 lg:grid'>
          {imgPath.map((path, idx) => (
            <div
              key={"guideline-b-img" + idx}
              className='relative w-full'
              style={{ aspectRatio: onMobile ? path.ratio : "860/956" }}
            >
              <img src={onMobile ? imgUrl + path.mobile : imgUrl + path.laptop} alt="pic" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ShoppingGuideline.title = "購物流程 | YATA eShop​";
