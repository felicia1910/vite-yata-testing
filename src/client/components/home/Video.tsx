import React from "react";
import Videos from "../home/Videos";

export default function Video() {
  return (
    <div>
      <div className="lg:hidden">
        <div className="flex flex-row justify-between w-auto mt-3 bg-white border rounded border-yata-deep h-9">
          <h1 className="flex my-auto ml-3 text-yata-deep">一田百科</h1>
          <h1 className="flex my-auto ml-3 text-yata-deep">
            更多
            <img
              src="/homepage/more-recommend.svg"
              className="w-5 h-5 my-auto ml-1"
            />
          </h1>
        </div>
      </div>
      {/* <div>
        <Videos />
      </div> */}
    </div>
  );
}
