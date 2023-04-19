import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

type Props = {
  showModal: boolean;
  height?: number | string;
  width?: number | string;
  children: React.ReactNode;
};

const AnimatedModalOverlay = ({
  showModal,
  height = 400,
  width = "40%",
  children,
}: Props) => {
  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50 w-full h-full'
        onClose={() => {}}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 w-full h-full bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 w-full h-full overflow-y-scroll scrollbar-hide'>
          <div className='flex items-center justify-center min-w-full min-h-full p-4 text-center scrollbar-hide'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className='relative w-11/12 text-left align-middle transition-all transform bg-white shadow-xl scrollbar-hide rounded-2xl '
                style={{
                  maxHeight: 800,
                  height: height,
                  width: width,
                  overflowY: "scroll",
                }}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AnimatedModalOverlay;
