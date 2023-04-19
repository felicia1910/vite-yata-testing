import Image from "next/image";
import { useRouter } from "next/router";
import { Products } from "../../redux/admin/slice";
import { selectIsCheckOut, selectIsEdited } from "../../redux/control/slice";
import { useAppSelector } from "../../redux/store";


type Props = {
  el: Products,
};

const ItemList = ({ el }: Props) => {
  const router = useRouter();
  const isEdited = useAppSelector(selectIsEdited);
  const isCheckout = useAppSelector(selectIsCheckOut);

  return (
    <div className={`mb-2 flex flex-col`}>
      <div className="relative flex flex-row mx-2 ">
        <div className={`my-2 text-lg lg:w-[14%] `} />
        <div className={`my-2 text-lg lg:w-[31%] underLg:hidden`}>產品信息</div>
        <div className="my-2 text-lg lg:w-[12%] underLg:hidden ">價格</div>
        <div className="my-2 text-lg lg:w-[13%] underLg:hidden lg:pl-1">
          數量
        </div>
        <div className="my-2 text-lg lg:pl-2 lg:w-[14%] underLg:hidden">
          小計
        </div>
      </div>

      <div>
        {el.items.length > 0 &&
          el.items.map((item, i) => (
            <div key={i} className="lg:flex w-full justify-center items-start">
              <div
                className={`relative flex flex-row transition-all duration-300 ease-in-out items-center min-w-[22rem] h-32 border lg:border-0 lg:border-l  mt-1 flex-1 w-9/12"`}
              >
                <div className="flex items-center pl-2 lg:w-2/12 lg:h-32 lg:border-t lg:border-b">
                  <button
                    className="relative object-contain w-[6.4rem] lg:w-full lg:max-w-[7rem] border aspect-square"
                    onClick={() => router.push(`/product/${item.plu}`)}
                  >
                    <Image src={item.images_url ?? ""} layout="fill" alt="" />
                  </button>
                </div>

                <div className="h-full px-1 py-2 ml-2 lg:m-0 lg:w-5/12 lg:lg:h-32 lg:border-t lg:border-b">
                  <div className="flex flex-col justify-between h-full lg:ml-2">
                    <div>
                      <div
                        className={
                          "line-clamp-2 max-w-[12rem] pr-1 font-semibold sm:max-w-[18rem] transition-all duration-150 " +
                          (isEdited || isCheckout
                            ? "pointer-events-none"
                            : "cursor-pointer hover:underline hover:underline-offset-2")
                        }
                        onClick={() =>
                          isEdited || isCheckout
                            ? {}
                            : router.push(`/product/${item.plu}`)
                        }
                      >
                        {item.full_name_c}
                      </div>

                      <div className="text-sm font-light ">{item.plu}</div>
                      {/* Price in mobile view */}
                      <div className="flex flex-row items-center bottom-2 lg:hidden">
                        {item.rsp ? (
                          <>
                            <div className="text-lg font-semibold text-red-text">
                              ${item.psp}
                            </div>
                            <div className="text-xs line-through text-grey-deep sm:text-sm">
                              ${item.rsp}
                            </div>
                          </>
                        ) : (
                          <div className="text-lg font-semibold text-red-text">
                            ${item.psp}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price in laptop view */}
                <div className="hidden my-auto lg:block lg:w-2/12 lg:h-32 lg:border-t lg:border-b lg:pt-12">
                  {item.rsp ? (
                    <>
                      <div className="text-lg font-semibold text-red-text">
                        ${item.psp}
                      </div>
                      <div className="text-sm line-through text-grey-deep">
                        ${item.rsp}
                      </div>
                    </>
                  ) : (
                    <div className="text-lg font-semibold border lg:w-8/12 pl-2">
                      ${item.psp}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end my-auto lg:items-start lg:pt-11 underLg:overflow-hidden lg:w-2/12 underLg:absolute underLg:right-1 underLg:bottom-1 lg:h-32 lg:border-t lg:border-b">
                  <div className="relative inline-block mb-1 transition-all ease-in-out">
                    <div
                      className={
                        "flex rounded transition-all ease-in-out w-12 lg:w-8"
                      }
                    >
                      <div
                        className={
                          "px-2 py-1 w-8 transition-all ease-in-out text-right"
                        }
                      >
                        <div className="font-mono text-lg text-right w-full">
                          {/**windowSize == "mobile" && */}
                          {item.qty}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block lg:pt-12 lg:w-2/12 lg:my-auto aspect-square lg:h-32 lg:border-t lg:border-b ">
                  <div className="text-lg font-semibold text-red-text">
                    ${item.psp}
                  </div>
                </div>
              </div>

              <div className="w-2/12 mt-1 lg:block hidden border-r">
                {i == 0 ? (
                  <div
                    className={`hidden lg:block lg:my-auto h-32 border-t ${
                      i == el.items.length - 1 && " border-b"
                    }`}
                  ></div>
                ) : (
                  <div
                    className={`hidden lg:block lg:my-auto h-32 ${
                      i == el.items.length - 1 && " border-b"
                    }`}
                  ></div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ItemList;
