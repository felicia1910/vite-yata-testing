import React, { Dispatch, SetStateAction } from "react";
import ChevronDownSvg from "../../../public/common/arrow/chevron-down";
import ChevronUpSvg from "../../../public/common/arrow/chevron-up";
import { TExpand } from "../../../utils/types";

type Props = {
  expand: TExpand;
  setExpand: Dispatch<SetStateAction<TExpand>>;
  type: string;
};

const MoreBtn = ({ expand, setExpand, type }: Props) => {
  return (
    <div
      className='w-20 px-2 h-8 border-[1px] flex items-center justify-between bg-white text-sm border-yata-brown'
      onClick={() => {
        setExpand({ ...expand, [type]: !expand[type] });
      }}
    >
      更多
      <div
        className={
          "flex items-center object-contain w-4 h-4 transition-all ease-in-out duration-300 " +
          (expand[type] ? "rotate-180" : "rotate-0")
        }
      >
        <ChevronDownSvg fill='#6A3B0D' />
      </div>
    </div>
  );
};

export default MoreBtn;
