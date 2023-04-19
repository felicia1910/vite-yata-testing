var lang = 1

function goBack(){
  console.log('goback')
  location.href = 'https://yatafans.b2clogin.com/yatafans.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1A_SIGNUP_SIGNIN&client_id=928ca589-8e88-4562-a5e8-11b978262a25&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fyatafansblob.blob.core.windows.net%2Fyatafansstorage%2FresultPage.html&scope=openid%20https%3A%2F%2Fyatafans.onmicrosoft.com%2Ff10e1c0a-7e6f-4a4f-86cc-f29123a38800%2FYataFansAppBackend&response_type=id_token%20token&prompt=login'

}



const signInName = document.getElementById('signInName')

const yataoldPassword = document.getElementById('yataoldPassword')
const oldPassword = document.getElementById('oldPassword')

const newPassword = document.getElementById('newPassword')
const reenterPassword = document.getElementById('reenterPassword')
const continueBtn  = document.getElementById('continue')

const yatanewPassword =document.getElementById('yatanewPassword')
const yatareenterPassword =document.getElementById('yatareenterPassword')
const yataSubmit = document.getElementById('yataSubmit')

const eroldPassword =document.getElementById('eroldPassword')
const ernewPassword =document.getElementById('ernewPassword')
const erreenterPassword =document.getElementById('erreenterPassword')

const passwordMatch = document.getElementById('passwordEntryMismatch')





function changeLang(){
  if (lang ==1){
    yataoldPassword.placeholder = 'Old Password'
    yatanewPassword.placeholder = 'New Password'
    yatareenterPassword.placeholder =  'Re-enter Your Password'
    yataSubmit.innerHTML = 'Confirm'
    document.getElementById('hnopw').innerHTML = '6-12 digit must include at least 1 number and 1 letter (Except space)'
    document.getElementById('hnpw').innerHTML = '6-12 digit must include at least 1 number and 1 letter (Except space)'
    document.getElementById('hnpwr').innerHTML = '6-12 digit must include at least 1 number and 1 letter (Except space)'
  
  }
  else{

    yataoldPassword.placeholder = '輸入舊密碼'
    yatanewPassword.placeholder = '輸入新密碼'
    yatareenterPassword.placeholder =  '確認新密碼'
    yataSubmit.innerHTML = '確認'
    document.getElementById('hnopw').innerHTML = '6-12字元，必須包括字母及數字 （空格除外）'
    document.getElementById('hnpw').innerHTML = '6-12字元，必須包括字母及數字 （空格除外）'
    document.getElementById('hnpwr').innerHTML = '6-12字元，必須包括字母及數字 （空格除外）'
  }
}
const signupList = [
  {input:yataoldPassword,er:eroldPassword,name:'Old Password',tcName:'舊密碼'},
  {input:yatanewPassword,er:ernewPassword,name:'New Password',tcName:'新密碼'},
  {input:yatareenterPassword,er:erreenterPassword,name:'Confirm New password',tcName:'新密碼'},
]


yataoldPassword.addEventListener('input',oldpasswordcopy)
function oldpasswordcopy(){
  oldPassword.value = yataoldPassword.value
}
yatanewPassword.addEventListener('input',passwordcopy)
function passwordcopy(){
  newPassword.value = yatanewPassword.value
}

yatareenterPassword.addEventListener('input',yatareenterPasswordcopy)
function yatareenterPasswordcopy(){
  reenterPassword.value = yatareenterPassword.value
}

yataSubmit.addEventListener('click',signupSubmit)

function signupSubmit(e){
  e.preventDefault();
  var sumbitPass = [false,false,false]
  signupList.map((item,index)=>{
    if(item.name =='Confirm New password'){

      item.er.innerHTML =  lang==1?`*${item.name} is required`:`*請確認${item.tcName} `
    }
    if(item.input.value.length<=0){
      item.er.innerHTML =  lang==1?`*${item.name} is required`:`*請輸入${item.tcName} `
    }else if(item.input.value.length>0){
      item.er.innerHTML ="";
      sumbitPass[index]=true
    }
    else{return }
  })

  console.log('create step 1')
  console.log(sumbitPass)
  console.log(sumbitPass.some(el=>el==false))
  
  if (!sumbitPass.some(el=>el==false)){
    continueBtn.click()
    setTimeout(showErrors,1500)
    console.log('create step 2')

  }
}



document.getElementById('visibleNPWBox').addEventListener('click',showNPw)
function showNPw(){
console.log('pushing ')
  if(yatanewPassword.type == 'password')
    { yatanewPassword.type ='text';
    document.getElementById('visibleNPW1').style.display = 'flex'
    document.getElementById('visibleNPW2').style.display = 'none'
  }
  else {
    yatanewPassword.type ='password';
    document.getElementById('visibleNPW2').style.display = 'flex'
    document.getElementById('visibleNPW1').style.display = 'none'


  }
}
document.getElementById('visibleOPWBox').addEventListener('click',showOPw)
function showOPw(){
console.log('pushing ')
  if(yataoldPassword.type == 'password')
    { yataoldPassword.type ='text';
    document.getElementById('visibleOPW1').style.display = 'flex'
    document.getElementById('visibleOPW2').style.display = 'none'
  }
  else {
    yataoldPassword.type ='password';
    document.getElementById('visibleOPW2').style.display = 'flex'
    document.getElementById('visibleOPW1').style.display = 'none'


  }
}
document.getElementById('visibleRPWBox').addEventListener('click',showRPw)
function showRPw(){
console.log('pushing ')
  if(yatareenterPassword.type == 'password')
    { yatareenterPassword.type ='text';
    document.getElementById('visibleRPW1').style.display = 'flex'
    document.getElementById('visibleRPW2').style.display = 'none'
  }
  else {
    yatareenterPassword.type ='password';
    document.getElementById('visibleRPW2').style.display = 'flex'
    document.getElementById('visibleRPW1').style.display = 'none'


  }
}

function showErrors(){

  console.log('errors testing ')
    const errorsShow = document.querySelectorAll('.show')
    console.log(document.getElementById('claimVerificationServerError').innerHTML)

    document.getElementById('ernewPassword').innerHTML =''
    document.getElementById('erreenterPassword').innerHTML =''

    for(let i=0;i<errorsShow.length;i++){
      // console.log(errorsShow[i].innerHTML)
      // if(errorsShow[i].innerHTML.match(/email/)){
      //   console.log('find email error')
      //    document.getElementById('eremail').innerHTML = errorsShow[i].innerHTML
      //  }else
       if(errorsShow[i].innerHTML.match(/new/)){
         console.log('find password error')
         document.getElementById('ernewPassword').innerHTML = lang==1?'Password format is not correct':'密碼格式不正確' //errorsShow[i].innerHTML
        }else
        if(errorsShow[i].innerHTML.match(/confirm/)){
          console.log('find re-password error')
          document.getElementById('erreenterPassword').innerHTML = lang==1?'Password format is not correct':'密碼格式不正確'
        }else
        if(errorsShow[i].innerHTML.match(/The password/)){
          console.log('find re-password error')
          if(document.getElementById('yatanewPassword').value.length<6){
            document.getElementById('ernewPassword').innerHTML = lang==1?'Password format is not correct':'密碼格式不正確'//errorsShow[i].innerHTML
          }else
          if(document.getElementById('yatanewPassword').value.length>12){
            document.getElementById('ernewPassword').innerHTML = lang==1?'Password format is not correct':'密碼格式不正確'
          }else
          if(errorsShow[i].innerHTML.match(/new password must/)){
            document.getElementById('ernewPassword').innerHTML = lang==1?'Password format is not correct':'密碼格式不正確'
          }else
          if(errorsShow[i].innerHTML.match(/confirm password must/)){
            document.getElementById('erreenterPassword').innerHTML = lang==1?'Password format is not correct':'密碼格式不正確'
          }else
          { document.getElementById('ernewPassword').innerHTML=""}
          if(document.getElementById('yatareenterPassword').value.length<6){
            document.getElementById('erreenterPassword').innerHTML = lang==1?'Password format is not correct':'密碼格式不正確'
          }else
          if(document.getElementById('yatareenterPassword').value.length>12){
            document.getElementById('erreenterPassword').innerHTML = lang==1?'Password format is not correct':'密碼格式不正確'
          } else{ document.getElementById('erreenterPassword').innerHTML=""}
          

          
        }else
        if(document.getElementById('claimVerificationServerError').style.display=='block'){
          document.getElementById('ernewPassword').innerHTML = 'Unable to validate the information provided. Please try later'
        }else{
          
        }
        {}
        
        
      }
      if(passwordMatch.style.display=='block'){
        console.log('find re-password error')
        document.getElementById('erreenterPassword').innerText = lang==1?'Passwords do not match':'密碼和確認密碼不一樣'//passwordMatch.innerHTML
      }
    setTimeout(()=>{
      if(document.getElementById('claimVerificationServerError').innerHTML=='Your password is incorrect'){
        document.getElementById('eroldPassword').innerHTML = lang==1?'Old Password is incorrect':'舊密碼不正確'
      }else
      if(document.getElementById('claimVerificationServerError').innerHTML=='Your account is temporarily locked to prevent unauthorized use. Try again later.'){
        document.getElementById('eroldPassword').innerHTML = lang==1?'Your account is temporarily locked to prevent unauthorized use. Try again later.':'帳號暫時停止，請稍候再試。'
      }else{}
    },1500)
  }
  
  showErrors()

  document.addEventListener('keydown',(e)=>{
    console.log(e)
    if (e.key=='Enter'){
      console.log(e.key)
      yataSubmit.click()
      // continueBtn.click();
    }
  })

  changeLang()
  