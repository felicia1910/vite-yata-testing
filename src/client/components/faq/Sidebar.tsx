import React from "react";
import ChevronRightSvg from "../../public/common/arrow/chevron-right";
import { selectWindowSize } from "../../redux/control/slice";
import { selectImgUrl } from "../../redux/config/index";
import { useAppSelector } from "../../redux/store";
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { RouterList } from '../../redux/config/type';

interface SidebarProps {
  data: RouterList[];
}

const Sidebar = ({ data }: SidebarProps) => {
  const imgUrl = useAppSelector(selectImgUrl);
  const windowType = useAppSelector(selectWindowSize);
  const onMobile = windowType === "mobile";
  const onLaptop = windowType === "laptop";
  const router = useLocation();
  console.log("windowType:",windowType)

  return (
    <div className='flex flex-col items-center w-full mb-12 lg:mb-0'>
      {onLaptop && (
        <div className='flex flex-col w-full h-auto mt-5 justify-evenly rounded-tl-3xl bg-yata-brown-light rounded-bl-3xl'>
          {data.map((option, idx) => (
            <Link to={option.path} key={"faq-laptop-" + idx}>
              <div
                className={`py-4 px-5 text-yata-brown flex items-center h-16 cursor-pointer ${
                  router.pathname === option.path &&
                  "bg-yata text-yata-extra-light font-bold rounded-tl-full rounded-bl-full "
                }`}
                key={option.id}
              >
                <div
                  className='relative object-contain w-6 h-auto '
                  style={{ aspectRatio: option.ratio ?? "1/1" }}
                >
                  <img src={
                      router.pathname === option.path
                        ? imgUrl+option.active
                        : imgUrl+option.route
                    } alt={option.route} />
                </div>
                <span className='ml-4 text-base font-medium'>
                  {option.content}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {onMobile && (
        <div className='w-full mb-12'>
          {data.map((option, idx) => (
            <Link to={option.path} key={"faq-mobile-" + idx}>
              <div
                className='flex items-center mt-5 justify-between text-lg px-8 py-2.5 cursor-pointer'
                key={option.id}
              >
                <div className='flex items-center space-x-3'>
                  <div
                    className='relative object-contain w-6 h-auto '
                    style={{ aspectRatio: option.ratio ?? "1/1" }}
                  >
                    <img src={imgUrl+option.route} alt={option.route} />
                  </div>
                  <span className='ml-4 '>{option.content}</span>
                </div>
                <ChevronRightSvg width={14} height={14} fill={"#6A3B0D"} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
