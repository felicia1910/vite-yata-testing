import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { saveCodeVerifier, selectCodeChallenge, selectIsAuthenticated } from '../../../redux/auth/slice'
import { closeLoginModal } from '../../../redux/control/slice'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { msalConfig, policyNames, scope, loginRequest } from '../../../utils/authConfig';
import { genCodeVerifier } from '../../../utils/codeVerifier'
import { useMsal } from '@azure/msal-react';
import { selectImgUrl } from "../../../redux/config/index";

type Props = {
  page: string,
  height: number
  setPage?: Dispatch<SetStateAction<string>>
}

const LoginFrame = ({ page, height, setPage }: Props) => {
  const iframeRef = useRef<any>()
  const router = useNavigate()
  const dispatch = useAppDispatch();
  const imgUrl = useAppSelector(selectImgUrl);
  const { instance, accounts } = useMsal();

  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const codeChallenge = useAppSelector(selectCodeChallenge)
  const code = genCodeVerifier();

  useEffect(() => {
    dispatch(saveCodeVerifier({
      codeChallenge: code!.challenge,
      codeVerifier: code!.verifier
    }))
    localStorage.setItem('codeChallenge', code!.challenge);
    localStorage.setItem('codeVerifier', code!.verifier);
  }, [])

  const handleLoginModalClose = () => {
    dispatch(closeLoginModal());
    setPage!("")
  }

  const adb2cLink = `
    https://${process.env.AUTH_TENANT_NAME}.b2clogin.com/${process.env.AUTH_TENANT_NAME}.onmicrosoft.com/oauth2/v2.0/authorize?p=${policyNames.signUpSignIn}&client_id=${process.env.AUTH_CLIENT_ID}&nonce=defaultNonce&redirect_uri=${msalConfig.auth.redirectUri}&scope=${scope}&response_type=code&prompt=login&code_challenge=${codeChallenge}
  `
  // const adb2cLink = `
  //   https://${process.env.AUTH_TENANT_NAME}.b2clogin.com/${process.env.AUTH_TENANT_NAME}.onmicrosoft.com/oauth2/v2.0/authorize?p=${policyNames.signUpSignIn}&client_id=${process.env.AUTH_CLIENT_ID}&nonce=defaultNonce&redirect_uri=${msalConfig.auth.redirectUri}&scope=${scope}&response_type=token&prompt=login
  // `

  // console.log(adb2cLink)

  useEffect(() => {
    if (isAuthenticated) {
      router('/')
    } else {
      // if (typeof window !== 'undefined') {
      //   window.location.replace(adb2cLink)
      // }
    }
  }, [isAuthenticated])

  return (
    <>
      {!isAuthenticated && (
        <>
          <div className='sticky top-0 flex items-center justify-center w-full bg-white border-b-[0.5px] h-[56px] border-yata-brown/[.4] scrollbar-hide'>
            <div className='text-xl font-semibold'>
              {page == 'login' || page == 'login-done'
                ? "登入"
                : page == 'opt' || page == 'register' || page == 'register-done'
                  ? "註冊"
                  : "登入 / 註冊"
              }
            </div>
            <button
              className='absolute items-center justify-center hidden w-8 h-8 lg:flex right-4'
              onClick={handleLoginModalClose}
            >
              {/* <span className='absolute h-4/6 border-[1px] border-yata-brown rounded-full bg-yata-brown rotate-45' />
              <span className='absolute h-4/6 border-[1px] border-yata-brown rounded-full bg-yata-brown -rotate-45' /> */}
              <img
                src='/modal/close.svg'
                className='object-contain'
              />
            </button>
          </div>
          <iframe
            id="mainframe"
            ref={(ref) => iframeRef.current = ref}
            height={height - 56}
            // sandbox="allow-scripts"
            className='w-full overflow-scroll scrollbar-hide'
            src={adb2cLink}
            // src="/login-msal"
            onLoad={() => { }}
            onClick={() => { console.log(adb2cLink) }}
          />
        </>
      )}
    </>
  )
}

export default LoginFrame