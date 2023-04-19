import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import AccountLayout from "../../components/account/AccountLayout";
import { selectIsAuthenticated, selectUserInfo } from "../../redux/auth/slice";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { getWishList } from "../../redux/shopping/thunk";
import ItemCard from "../../components/shopping/Product/ItemCard";
type TitleProps = {
  detail: string | string[] | undefined;
  payload: any;
};

const Wishlist = ({ detail }: TitleProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userInfo = useAppSelector(selectUserInfo);

  const [wishList, setWishList] = useState([]);
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    const getWishListApi = async () => {
      try {
        const result = await dispatch(getWishList());
        setWishList(result.payload);
      } catch (error) {
        console.log(error);
      }
    };
    if (trigger) {
      getWishListApi();
      setTrigger(false);
    }
    if (!isAuthenticated) {
      localStorage.setItem("redirectUrl", router.asPath);
      router.push("/login");
    }
  }, [isAuthenticated, router, detail, trigger]);

  return (
    <>
      {isAuthenticated && (
        <AccountLayout isRequired={true} title='喜愛清單'>
          <div className='hidden px-3 text-lg font-bold lg:inline text-yata-brown'>
            喜愛清單
          </div>

          <div className='grid flex-wrap justify-start w-full grid-cols-2 gap-1 rangeMd:grid-cols-4 underXs:grid-cols-1 lg:mt-2 rangeSm:grid-cols-3 lg:flex'>
            {wishList.length > 0 &&
              wishList.map((item: any, idx: number) => (
                <div key={"wish-list-" + idx} className='flex justify-center'>
                  <ItemCard detail={item} setTrigger={setTrigger} />
                </div>
              ))}
          </div>
        </AccountLayout>
      )}
    </>
  );
};

export default Wishlist;
