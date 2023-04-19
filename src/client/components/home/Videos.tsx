import React from "react";
import { videolink } from "../../utils/contents/videolink";

export default function Videos() {
  return (
    <div className="relative flex w-auto px-2 mx-1 mt-2 overflow-x-auto scroll-smooth scrollbar-hide lg:flex-col">
      {videolink.map((item, idx) => (
        <div key={`yata-wiki-home-video-${idx}`} className="flex-none h-auto mt-3 border w-50 underLg:my-2 underLg:mr-2 border-grey rounded-xl">
          <div className="">
            <img
              src={item.route}
              className="w-full h-32 rounded-tl-lg rounded-tr-lg"
            />
          </div>
          <button className="flex px-2 py-1 mt-1 ml-2 text-sm text-white rounded-full bg-yata">
            育兒攻略
          </button>
          <h1 className="py-2 ml-2 text-xs font-semibold text-justify text-yata-brown">
            {item.content}
          </h1>
        </div>
      ))}
    </div>
  );
}
