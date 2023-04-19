import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import LoginFrame from "./LoginFrame";
import AnimatedModalOverlay from "../AnimatedModalOverlay";
import { getUserProfileThunk } from "../../../redux/auth/thunk";
import { useAppSelector, useAppDispatch } from "../../../redux/store";
import {
  setCurrentPolicy,
  selectIsAuthenticated,
} from "../../../redux/auth/slice";
import {
  closeLoginModal,
  selectIsLoginModalOpen,
  selectWindowSize,
} from "../../../redux/control/slice";
import { policyNames } from "../../../utils/authConfig";

const LoginModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loginModal = useAppSelector(selectIsLoginModalOpen);
  const windowSize = useAppSelector(selectWindowSize);
  const [iframePage, setIframePage] = useState<string>("");
  const [at, setAt] = useState<string>("");
  const router = useNavigate();

  useEffect(() => {
    if (windowSize === "mobile") {
      dispatch(closeLoginModal());
    }
  }, [windowSize]);

  useEffect(() => {
    const handleEvent = (event: any) => {
      const { data, origin } = event;
      if (origin === "https://yataloyaltyuat.b2clogin.com") {
        // console.log('cross origin data', data)
        if (data == "opt" || data == "login" || data == "register")
          setIframePage(data);
        else if (data == "login-done") {
          dispatch(setCurrentPolicy(policyNames.signUpSignIn));
          setIframePage(data);
        } else if (data == "register-done") {
          dispatch(setCurrentPolicy(policyNames.signUpDirectly));
          setTimeout(() => {
            setIframePage(data);
          }, 2000);
        }
      }
    };

    window.addEventListener("message", handleEvent, false);
    return function cleanup() {
      window.removeEventListener("message", handleEvent);
    };
  }, [iframePage]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!isAuthenticated) {
        window.addEventListener("storage", () => {
          // const adb2cResult = JSON.parse(localStorage.getItem('adb2c_login_result')!)
          const adb2cResult = localStorage.getItem("adb2c_access_token");
          const isNewUser = localStorage.getItem("newUser");
          // console.log('adb2c result: ', adb2cResult)
          // Detect new user to open modal for delivery method
          if (isNewUser == "true") {
          }
          if (adb2cResult) {
            // localStorage.setItem('adb2c_access_token', adb2cResult.access_token)
            // setAt(adb2cResult.access_token)
            setAt(adb2cResult);
          }
        });
      }
    }
  }, []);

  useEffect(() => {
    if (at) {
      // console.log("get access token", at);
      setTimeout(() => {
        dispatch(getUserProfileThunk());
        dispatch(closeLoginModal());
        if (windowSize == "mobile") {
          router("/");
        }
      }, 2000);
    }
  }, [at]);

  const setHeight =
    iframePage == "opt" ? 480 : iframePage == "register" ? 660 : 400;

  return (
    <>
      {!isAuthenticated && (
        <AnimatedModalOverlay showModal={loginModal!} height={setHeight}>
          <LoginFrame
            page={iframePage}
            height={setHeight}
            setPage={setIframePage}
          />
        </AnimatedModalOverlay>
      )}
    </>
  );
};

export default LoginModal;
