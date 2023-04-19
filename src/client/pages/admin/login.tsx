import sha256 from "crypto-js/sha256";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { loginAsAdmin, selectIsAdmin, selectUserInfo } from "../../redux/auth/slice";
import { adminLoginThunk } from "../../redux/auth/thunk";
import { selectWindowSize } from "../../redux/control/slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector(selectIsAdmin);
  const windowSize = useAppSelector(selectWindowSize);
  const userInfo = useAppSelector(selectUserInfo);


  useEffect(()=>{
    console.log('isAdmin check',isAdmin)
    if(isAdmin){
      if(userInfo){
        router.push(windowSize == "mobile" ? "/account" : "/account/profile")
        
      }else{
        router.push("/admin/login-member");

      }
      
    }
  },[])


  const [input,setInput] = useState<any>({username:"",password:""})
  const [error,setError] = useState("")
  const inputVaild = (input:any)=>{
    const lengthCheck :any[]= []
    Object.keys(input).map((k,index)=>{lengthCheck[index]= input[k].length>3})
    return lengthCheck.some(e=>e==false)
  }
useEffect(()=>{
  // console.log(SHA256(input.password).toString(),'sadfasdfsadfdsfs')
},[input.password])


  const toggleAdminLogin = async() =>{

    if(inputVaild(input)){ setError("請輪入正確登入資料") ;return}
      setError("")
  console.log(sha256(input.password).toString(),'sadfasdfsadfdsfs')
// 
    const result:any = await dispatch(adminLoginThunk({...input,password:sha256(input.password).toString()}))
    // dispatch(loginAsAdmin(true));
    if (result?.payload.data?.getLogin.success!=0)  router.push("/admin/login-member")
      setError(result?.payload.data?.getLogin.error)
  }

  return (
    <div className='flex flex-col w-full'>
      {/* <div className="h-4 shadow-md"></div> */}
      <div className='flex flex-col items-center justify-center w-full pt-16 '>
        <h2 className='mb-8 text-xl font-semibold'>Admin 登入</h2>
        <div className='flex flex-col items-center w-full h-auto mb-4 space-y-4 '>
          <input
            type='text'
            placeholder='Username'
            className='border-b border-[#6A3B0D] py-1 w-[80%] lg:w-[22%] outline-none'
            onChange={(e)=>setInput({...input,username:e.target.value})}
          />
          <input
            type='password'
            placeholder='Password'
            className='border-b border-[#6A3B0D] py-1 w-[80%] lg:w-[22%] outline-none'
            onChange={(e)=>setInput({...input,password:(e.target.value)})}

          />
          {error?<div className="text-red-500 ">{error}</div>:null}
        </div>
        <button
          type='submit'
          className='w-[80%] lg:w-[22%] font-medium text-lg text-white bg-[#82A90E] rounded-3xl my-8 py-2'
          onClick={toggleAdminLogin}
        >
          登入{" "}
        </button>
      </div>
    </div>
  );
};

export default Login;
