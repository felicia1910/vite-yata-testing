import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AccountLayout from "../../components/account/AccountLayout";
import { selectIsAuthenticated } from "../../redux/auth/slice";
import { useAppSelector } from "../../redux/store";

const PurchaseRecord = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("redirectUrl", router.asPath);
      router.push("/login");
    }
  }, [isAuthenticated, router]);
  return (
    <>
      {isAuthenticated && (
        <AccountLayout isRequired={true} title='曾經購買'>
          <span className='hidden px-3 my-6 text-lg font-bold lg:inline text-yata-brown'>
            曾經購買
          </span>
        </AccountLayout>
      )}
    </>
  );
};

export default PurchaseRecord;
