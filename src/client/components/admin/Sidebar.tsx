
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const options = [
  {
    content: "帳戶資料",
    path: "/admin/profile",
    id: "1",
  },
  {
    content: "訂單記錄",
    path: "/admin/orders",
    id: "2",
  },
  {
    content: "建立果籃訂單",
    path: "/admin/create-order",
    id: "3",
  },
];

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className='flex flex-col items-center w-full'>
      <div className='flex flex-col w-full h-64 mt-5 justify-evenly rounded-tl-3xl bg-[#F7F4EF] rounded-bl-3xl'>
        {options.map((option, idx) => (
          <Link href={option.path} passHref key={"sidebar-link-" + idx}>
            <div
              className={`py-4 px-5 text-yata-brown flex items-center h-1/3 cursor-pointer ${
                router.pathname === option.path &&
                "bg-yata text-yata-extra-light font-bold rounded-tl-full rounded-bl-full "
              }`}
              key={option.id}
            >
              <span className='ml-4 text-lg'>{option.content}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
