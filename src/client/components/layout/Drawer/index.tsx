import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { WindowScreen } from "../../../utils/types";
import LoginButton from "../Buttons/LoginButton";
import MoreButton from "../Buttons/MoreButton";
import NavBarButtons from "../Buttons/NavBarButtons";
import OtherButtons from "../Buttons/OtherButtons";
import Footer from "../Footer";
import DropDownList from "../NavBar/DropDownList";
import SearchBar from "../NavBar/SearchBar";
import { closeDrawer, selectWindowSize } from "../../../redux/control/slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { selectImgUrl } from "../../../redux/config/index";
import { Link, useNavigate, useLocation } from 'react-router-dom';

type DrawerProps = {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Drawer = ({ isOpen, setIsOpen }: DrawerProps) => {
  const router = useNavigate();
  const location = useLocation();
  const imgUrl = useAppSelector(selectImgUrl);
  const dispatch = useAppDispatch();
  const windowSize = useAppSelector(selectWindowSize);
  const isDrawerOpen = useAppSelector((state) => state.control.isDrawerOpen);
  const onMobile = windowSize === "mobile";

  useEffect(() => {
    if (!onMobile) {
      // setIsOpen(false)
      dispatch(closeDrawer());
    }
  }, [windowSize]);

  const [activeDept, setActiveDept] = useState<number | null>(null);
  const [activeSegment, setActiveSegment] = useState<number>(0);
  const [activeType, setActiveType] = useState<number | null>(null);

  return (
    <Transition show={isDrawerOpen} as={Fragment}>
      <Dialog
        unmount={true}
        onClose={() => dispatch(closeDrawer())}
        className={"fixed inset-0 z-50 overflow-y-auto "}
      >
        <div className='flex w-screen h-auto overflow-y-auto'>
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-in duration-300 fixed inset-0'
            enterFrom='opacity-0 invisible'
            enterTo='opacity-30 visible'
            entered='opacity-30'
            leave='transition-opacity ease-out duration-300 fixed inset-0'
            leaveFrom='opacity-30 visible'
            leaveTo='opacity-0 invisible'
          >
            <Dialog.Overlay className='fixed inset-0 z-50 bg-yata' />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter='transition ease-in duration-300 fixed inset-0 transform'
            enterFrom='translate-x-[100vw]'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 fixed inset-0 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <div className='z-50 flex flex-col w-screen h-auto min-h-screen overflow-y-scroll text-left align-middle bg-yata-extra-light '>
              {/* Mobile navbar */}
              <div className='fixed top-0 z-50 w-full h-16 bg-yata'>
                <div className='flex items-center justify-between h-full px-4 py-2'>
                  <button
                    onClick={() => dispatch(closeDrawer())}
                    className='flex items-center'
                  >
                    <img src={imgUrl+'common/arrow/arrow-left-solid.svg'} alt="pic" className="w-7 h-7"/>
                  </button>

                  <div className='flex'>
                    <LoginButton />
                    <MoreButton />
                  </div>
                </div>
              </div>

              <div className='mt-16 mb-12'>
                <SearchBar window={WindowScreen.mobile} />
                <div className='relative flex p-2 pr-3 transition-all duration-500 ease-in-out'>
                  <NavBarButtons
                    activeDept={activeDept === null ? 0 : activeDept}
                    setActiveDept={setActiveDept}
                    over={null}
                    setOver={() => null}
                  />
                  <DropDownList
                    activeDept={activeDept === null ? 0 : activeDept}
                    activeSegment={activeSegment}
                    activeType={activeType}
                    setActiveDept={setActiveDept}
                    setActiveSegment={setActiveSegment}
                    setActiveType={setActiveType}
                  />
                </div>
              </div>
              <Footer />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Drawer;
