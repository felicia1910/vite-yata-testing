import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { selectIsAdmin } from "../../redux/auth/slice";
import { useAppSelector } from "../../redux/store";
import { accountOptions } from "../../utils/contents/accountOptions";

const Sidebar = () => {
  const router = useRouter();
  const isAdmin = useAppSelector(selectIsAdmin);
  return (
    <div className='flex flex-col items-center w-full'>
      <div className='flex flex-col w-full h-auto mt-5 justify-evenly rounded-tl-3xl bg-yata-brown-light rounded-bl-3xl'>
        {accountOptions
          .filter((option) =>
            isAdmin
              ? option.adminAccess
              : option.memberAccess && option.level == 1
          )
          .map((option, idx) => (
            <Link href={option.path} passHref key={"sidebar-link-lv1-" + idx}>
              <div
                className={`py-4 px-5 text-yata-brown flex items-center h-16 cursor-pointer ${
                  router.pathname === option.path &&
                  "bg-yata text-yata-extra-light font-bold rounded-tl-full rounded-bl-full "
                }`}
              >
                <Image
                  src={
                    router.pathname === option.path
                      ? option.active
                      : option.route
                  }
                  alt=''
                  className='w-6 h-6'
                  width={20}
                  height={20}
                />
                <span className='ml-4 text-lg'>{option.content}</span>
              </div>
            </Link>
          ))}
      </div>

      <div className='flex flex-col w-full h-auto mt-5 justify-evenly rounded-tl-3xl bg-yata-brown-light rounded-bl-3xl'>
        {!isAdmin &&
          accountOptions
            .filter((option) => option.level == 2)
            .map((option, idx) => (
              <Link href={option.path} passHref key={"sidebar-link-lv2-" + idx}>
                <div
                  className={`py-4 px-5 text-yata-brown h-16 flex items-center cursor-pointer ${
                    router.pathname === option.path &&
                    "bg-yata text-yata-extra-light font-bold rounded-tl-full rounded-bl-full  "
                  }`}
                >
                  <Image
                    src={
                      router.pathname === option.path
                        ? option.active
                        : option.route
                    }
                    alt=''
                    className='w-6 h-6'
                    width={20}
                    height={20}
                  />
                  <span className='ml-4 text-lg'>{option.content}</span>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Sidebar;
