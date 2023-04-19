import React from "react";

type Props = {
  isLoading: boolean;
  bgColor?: string;
  height?: string | number;
  opacity?: number;
};

const Loading = ({
  isLoading,
  bgColor = "#A6CE39",
  height = "100vh",
  opacity = .4,
}: Props) => {
  return (
    <>
      <div
        className='fixed inset-0 z-50 flex items-center justify-center bg-transparent'
        style={{
          opacity: isLoading ? opacity : 0,
          visibility: isLoading ? "visible" : "hidden",
        }}
      />
      <div
        className='z-40 fixed flex items-center justify-center duration-300 ease-out backdrop-opacity-60 backdrop-blur-[200px]'
        style={{
          transitionProperty: "color, opacity, visibility",
          backgroundColor: bgColor,
          width: "100%",
          height: height,
          opacity: isLoading ? opacity : 0,
          visibility: isLoading ? "visible" : "hidden",
        }}
      >
        <div className='lds-roller z-[100] '>
          {[...Array(8)].map((_, idx) => (
            <div key={`dot-${idx}`} className='' />
          ))}
        </div>
      </div>
    </>
  );
};

export default Loading;
