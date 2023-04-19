import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Home from ".";
import Loading from "../components/common/Loading";
import LoginFrame from "../components/modal/Auth/LoginFrame";

import { selectIsAuthenticated } from "../redux/auth/slice";
import { selectWindowSize } from "../redux/control/slice";
import { useAppSelector } from "../redux/store";
import { useMsal } from "@azure/msal-react";
import { silentRequest } from "../components/layout/Buttons/LoginButton";

const Login = () => {
  const router = useRouter();
  const { instance } = useMsal();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const windowSize = useAppSelector(selectWindowSize);
  const [iframePage, setIframePage] = useState<string>("");

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    } else {
      setTimeout(() => {
        instance.loginRedirect(silentRequest);
      }, 1000);
    }
  }, [router, isAuthenticated]);

  // useEffect(() => {
  //   const handleEvent = (event: any) => {
  //     const { data, origin } = event;
  //     if (origin === "https://yataloyaltyuat.b2clogin.com") {
  //       // console.log('cross origin data', data)
  //       setIframePage(data);
  //     }
  //   };

  //   window.addEventListener("message", handleEvent, false);
  //   return function cleanup() {
  //     window.removeEventListener("message", handleEvent);
  //   };
  // }, [iframePage]);

  // const setHeight =
  //   iframePage == "opt" ? 480 : iframePage == "register" ? 600 : 480;

  return <Loading isLoading={true} />;
};

export default Login;
