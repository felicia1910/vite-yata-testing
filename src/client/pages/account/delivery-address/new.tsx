import React, { useEffect } from "react";
import AddAddress from "../../../components/account/AddAddress";
import { useRouter } from "next/router";
import { useAppSelector } from "../../../redux/store";
import { selectWindowSize } from "../../../redux/control/slice";
import { selectIsAuthenticated } from "../../../redux/auth/slice";

const NewAddress = () => {
  const router = useRouter();
  const windowSize = useAppSelector(selectWindowSize);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (windowSize === "laptop") {
      router.push("/account/delivery-address");
    }
  }, [windowSize]);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("redirectUrl", router.asPath);
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return <AddAddress />;
};

export default NewAddress;
