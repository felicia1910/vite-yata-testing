
// document.getElementById('signInName').style.backgroundColor = 'orange';

const ntcConfirm = document.getElementById('ntcConfirm')
const ntcCancel = document.getElementById('ntcCancel')
const verificationCode = document.getElementById('verificationCode')
const verifyBtn = document.getElementById('phoneVerificationControl_but_verify_code')
const sendBtn = document.getElementById('phoneVerificationControl_but_send_code')
const continueBtn = document.getElementById('continue')
const resendCodeBtn = document.getElementById('phoneVerificationControl_but_send_new_code')
const resendBtn = document.getElementById('resendBtn')
const otpPanel = document.getElementById('otpPanel')
// const gobackBtn = document.getElementById('ntcgoBack')
const errorMsg = document.getElementById('phoneVerificationControl_error_message')
const inputs = document.querySelectorAll('#otp > *[id]');
const sinput = document.getElementById("specInput")

const user = localStorage.getItem('signup')
const forgot = localStorage.getItem('forgot')
const windowParentUrl = localStorage.getItem('windowParentUrl')

let memberId = {}
let oldUser = false

function goBack() {
  location.href = localStorage.getItem('firstPage')
}

console.log('sign up page - opt: ', user)
parent.postMessage('opt', windowParentUrl)
// parent.postMessage('opt', 'https://localhost:3000')
// parent.postMessage('opt', 'https://yata-ec-front-end-dev.azurewebsites.net/')

if (user != null) {
  const juser = JSON.parse(user)

  //check olduser cache > api
  const username = "+" + juser.cc + juser.phone

  const newCC = juser.cc == '852' ? "HK" : juser.cc == '853' ? 'MO' : "CN"
  document.getElementById('countryCode').value = newCC;
  document.getElementById('nationalNumber').value = juser.phone;

  // userCheck(username)

  async function userCheckAPI(mobile) {
    //call api
    console.log("User api check")

    await fetch(`https://yataappservicetmp.azurewebsites.net/api/register/checkuser?mobile=${mobile}`)
      .then((response) => response.json())
      .then((user) => {
        console.log('fetch user data: ', user)
        if (!user.isSuccess) {
          document.getElementById('errorPanel').style.display = 'block'
          localStorage.clear()
        } else if (user.data.registeredStatus == 1) {
          console.log('old user renew notice: ', user.data)
          // document.getElementById('signupTitle').innerHTML = '重設密碼'
          document.getElementById('oldUserNotice').style.display = 'flex';

          localStorage.setItem('oldUserData', JSON.stringify(user.data))
          localStorage.setItem('oldUser', 'true')

        } else if (user.data.registeredStatus == 2) {
          console.log('new user signup')
          // document.getElementById('signupTitle').innerHTML = '驗證'
          otpPanel.style.display = 'block';
          document.getElementById('phoneVerificationControl_but_send_code').click();

          setTimeout(timesCheck, 500)

        } else if (user.data.registeredStatus == 0) {
          // have adb2c
          // 舊會員已被註冊過新app, registeredStatus = 0

          console.log('This number already register')
          document.getElementById('errorPanel').style.display = 'block'

          /////////////////////////// pass control //////////////////////////
          // otpPanel.style.display = 'block';
          // document.getElementById('phoneVerificationControl_but_send_code').click();

        }
      })
  }

  userCheckAPI(juser.phone)

  // if (oldUser) {
  //   console.log('old user renew notice')
  //   // otpPanel.style.display = 'none';
  //   localStorage.setItem('olduser', 'true')
  //   document.getElementById('oldUserNotice').style.display = 'flex';
  // } else {
  //   console.log('new user signup')
  //   otpPanel.style.display = 'block';
  //   document.getElementById('phoneVerificationControl_but_send_code').click();
  // }
}

if (forgot != null) {
  console.log("forgot: ", forgot)
  const fuser = {
    cc: forgot.slice(1, 4),
    phone: forgot.slice(4)
  }
  const newCC = fuser.cc == '852' ? "HK" : fuser.cc == '853' ? 'MO' : "CN"

  document.getElementById('countryCode').value = newCC;
  document.getElementById('nationalNumber').value = fuser.phone;
  // document.getElementById('signupTitle').innerHTML = '忘記密碼'
  otpPanel.style.display = 'block';
  document.getElementById('phoneVerificationControl_but_send_code').click();

  setTimeout(timesCheck, 500)
} else {
  document.getElementById('otpPanel').style.display = 'none'
}

ntcConfirm.addEventListener('click', confirmRenew)
ntcCancel.addEventListener('click', goBack)
// gobackBtn.addEventListener('click', goBack)

function confirmRenew() {
  otpPanel.style.display = 'block';
  document.getElementById('oldUserNotice').style.display = 'none';
  document.getElementById('phoneVerificationControl_but_send_code').click();

  setTimeout(timesCheck, 1000)
}

function timesCheck() {
  console.log('checking times')
  document.getElementById('otpErrorMsg').innerHTML = ""

  if (errorMsg.innerHTML == 'There are too many requests at this moment. Please wait for some time and try again.') {
    sinput.disabled = true; // input controll
    inputs[0].style.border = "0px "
    document.getElementById('counterResend').innerHTML = ""
    document.getElementById('otpErrorMsg').innerHTML = '重發次數太多，請稍侯再試。'
    resendBtn.disabled = true;
    resendBtn.style.color = 'red';

    setTimeout(activeResend, 120000)

    document.getElementById('vcWait').style.display = "none"
    document.getElementById('vcSec').style.display = "none"

    return
  } else if (document.getElementById('phoneVerificationControl_success_message').style.display != 'none') {
    document.getElementById('otpErrorMsg').innerHTML = ""

    return
  } else {
    document.getElementById('otpErrorMsg').innerHTML = ""
    disactiveResent()
  }
}

document.getElementById('otpbtn').addEventListener('click', otpVerity)

function otpVerity() {
  errorMsg && console.log(errorMsg)
  errorMsg && console.log(document.getElementById('phoneVerificationControl_success_message'))

  if (verificationCode.value.length >= 0 && verificationCode.value.length <= 3) {
    document.getElementById('otpErrorMsg').innerHTML = "請輸入驗證碼"
  } else if (verificationCode.value.length > 3 && verificationCode.value.length < 5) {
    if (errorMsg.style.display == 'inline') {
      document.getElementById('otpErrorMsg').innerHTML = errorMsg.innerHTML
    }
    if (errorMsg.innerHTML.length < 31) {
      document.getElementById('otpErrorMsg').innerHTML = errorMsg.innerHTML
      // document.getElementById('otpErrorMsg').innerHTML = "Please fill in the verifiation code"
    }
  } else if (verificationCode.value.length >= 5) {
    verifyBtn.click()
    setTimeout(checkErrorMsg, 1200)
    // setTimeout(parent.postMessage('register', 'https://localhost:3000'), 1200)
  } else {
    // please fill in verifiation code 
  }

  console.log('verifiation code ', document.getElementById('phoneVerificationControl_success_message').innerHTML)
}

function checkErrorMsg() {
  {
    console.log(errorMsg.innerHTML)
    document.getElementById('otpErrorMsg').innerHTML = ''

    if (document.getElementById('phoneVerificationControl_success_message').style.display == 'inline')//'The code has been verified. You can now continue.')
    {
      // lang==1?'The code has been verified. You can now continue.':'驗證碼已發送，請繼續輸入。' 
      continueBtn.click();

    } else
      if (errorMsg.innerHTML == "The specified verification session is invalid or may have expired.Please try resend a code.") {
        document.getElementById('otpErrorMsg').innerHTML = lang == 1 ? "The specified verification session is invalid or may have expired.Please try resend a code." : "驗証時間已過，試重發驗證碼。"
        activeResend()
      }
      else if (errorMsg.innerHTML == "Wrong code entered, please try again.") {
        document.getElementById('otpErrorMsg').innerHTML = lang == 1 ? '​​Incorrect verification code, please try again.' : '驗證碼錯誤，請重試。'
        // activeResend()
      }
      else if (errorMsg.innerHTML == "Wrong code entered too many times, please try again later.") {
        document.getElementById('otpErrorMsg').innerHTML = lang == 1 ? '​​Incorrect verifications code many times. Please click "RESEND".​' : "多次驗證碼錯誤，請按「重發驗證碼」。​​"
        // activeResend()
      }
      else {
        // document.getElementById('otpErrorMsg').innerHTML = 'Try Resend Verifiation code.'
        console.log('already vetify but cant sent out')
      }
  }
}

// function veriftcode() {
//   console.log('verification code: ', verificationCode.value)
//   let ve = ''
//   for (i = 0; i < inputs.length; i++) {
//     if (inputs[i].value) {
//       console.log(i, ' value ', inputs[i].value)
//       ve += inputs[i].value
//     }
//   }
//   console.log('reset verify code', ve)
//   verificationCode.value = ve
//   verifyBtn.click()
// }

sinput.addEventListener('input', fillin)

function fillin() {
  verificationCode.value = document.getElementById("specInput").value
  console.log(document.getElementById("specInput").value, ' > ', verificationCode.value)

  if (sinput.value && sinput.value.length > 0) {
    for (i = 0; i < sinput.value.length; i++) {
      console.log(sinput.value.split(""))
      inputs[i].innerHTML = sinput.value.split('')[i]
      if (i == sinput.value.length - 1) {
        inputs[i].style.border = "2px solid #82A90E"
      } else {
        inputs[i].style.border = ""
      }
    }
  }

  if (sinput.value && sinput.value.length >= 6) {
    document.getElementById('otpErrorMsg').innerHTML = '請按下一步'
  } else {
    document.getElementById('otpErrorMsg').innerHTML = " "
  }

  for (i = 5; i >= sinput.value.length; i--) {
    inputs[i].innerHTML = ""
    inputs[i].style.border = ""
  }
}

document.addEventListener('click', (e) => {
  console.log("click event item: ", e.target.id)
  if (e.target.id != "resendBtn" || e.target.id != "otpbtn" || e.target.id != "ntcgoBack" || e.target.id != "header") {
    sinput.focus()
    if (!sinput.value) {
      inputs[0].style.border = "2px solid #82A90E "
    }
  }
})

function switchToogle() {
  const a = document.getElementById('otpPanel')
  const b = document.getElementById('api')
  console.log(a.style.display)

  if (a.style.display == 'block') {
    a.style.display = 'none';
    b.style.display = 'flex';
  } else if (a.style.display == 'none') {
    a.style.display = 'block';
    b.style.display = 'none';
  }
}

const oriResendTime = 60
let resendTime = oriResendTime

function disactiveResent() {
  resendBtn.disabled = true;
  resendBtn.style.color = 'grey';
  setTimeout(activeResend, oriResendTime * 1000)

  document.getElementById('counterResendRow').style.display = "flex"
  document.getElementById('counterResendRow').style.justifyContent = "center"
  document.getElementById('vcWait').style.display = "block"
  document.getElementById('vcSec').style.display = "block"

  let resendCountdown = setInterval(function () {
    if (resendTime <= 0) {
      clearInterval(resendCountdown);
      setTimeout(() => { resendTime = oriResendTime }, 1500)
      document.getElementById('counterResend').innerHTML = ""
      document.getElementById('counterResendRow').style.display = "none"
      activeResend()

      document.getElementById('vcWait').style.display = "none"
      document.getElementById('vcSec').style.display = "none"
      // document.getElementById('counterResend').style.display = "none"
    } else {
      document.getElementById('counterResend').innerHTML = `${resendTime}`
      console.log(resendTime)
    }

    resendTime -= 1
  }, 1000)

  for (i = 0; i < inputs.length; i++) {
    inputs[i].value = ""
  }
}

function activeResend() {
  resendBtn.disabled = false;
  resendBtn.style.color = '#82A90E';
  document.getElementById('counterResendRow').style.display = "flex"
}

resendBtn.addEventListener('click', resendCode)

function resendCode() {
  document.getElementById('otpErrorMsg').innerHTML = '重發驗證碼'

  if (errorMsg.innerHTML == 'There are too many requests at this moment. Please wait for some time and try again.') {
    document.getElementById('otpErrorMsg').innerHTML = '重發次數太多，請稍侯再試。'
    document.getElementById('counterResendRow').style.display = "none"
    resendBtn.disabled = true;
    resendBtn.style.color = 'red';

    setTimeout(activeResend, 1200000)
  } else {
    setTimeout(document.getElementById('otpErrorMsg').innerHTML = "", 1200)
    resendCodeBtn.click()
    disactiveResent()
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    document.getElementById('otpbtn').click();
  }
})