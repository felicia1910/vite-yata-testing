import React from "react";

type Props = {
  tick: boolean;
};

const Tick = ({ tick }: Props) => {
  return (
    <div>
      {tick && (
        <div
          id="tick"
          className="absolute top-0 right-0 px-4 py-2 bg-yata rounded-tr-md rounded-bl-md"
        >
          <img src="/cart/5.png" className="w-4 h-4 " />
        </div>
      )}
    </div>
  );
};
export default Tick;
