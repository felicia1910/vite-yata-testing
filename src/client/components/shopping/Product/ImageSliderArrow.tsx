import React from "react";
import ChevronDownSvg from "../../../public/common/arrow/chevron-down";
import ChevronRightSvg from "../../../public/common/arrow/chevron-right";

const ImageSliderArrow = (props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) => {
  const disabled = props.disabled ? (
    <ChevronDownSvg fill={" rgba(255, 255, 255, 0.5)"} />
  ) : (
    ""
  );
  return (
    <div
      onClick={props.onClick}
      className={`translate-y-[50%] top-[40%] absolute lg:max-w-[24rem] cursor-pointer bg-yata-deep/60 p-1 rounded-full ${
        props.left ? "left-2" : "left-auto right-2"
      } ${disabled}`}
    >
      {props.left && (
        <ChevronDownSvg className='w-6 h-6 rotate-90' fill={"#fff"} />
      )}
      {!props.left && <ChevronRightSvg className='w-6 h-6 ' fill={"#fff"} />}
    </div>
  );
};

export default ImageSliderArrow;
