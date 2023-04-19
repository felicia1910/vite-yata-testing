console.log('login script work', window.location.href)
const lang = localStorage.getItem('lang')

window.onload = function () {
  document.activeElement.blur()
}


const sumbitBtn = document.getElementById('formSumbit')
const passwordBtn = document.getElementById('password')
const errorNotice = document.getElementById('errorNotice')
const passwordNew = document.getElementById('passwordNew')
// const gobackBtn = document.getElementById('ntcgoBack')
const editnameBox = document.getElementById('editnameBox')
const editname = document.getElementById('editname')
const rememberMeBtn = document.getElementById('rememberMeBox')
// editnameBox.addEventListener('click', goBack)
// editname.addEventListener('click', goBack)

passwordBtn.style.display = "none";
let passwordCount = 0

const windowParentUrl = localStorage.getItem('windowParentUrl')
const signupUser = localStorage.getItem('signup')
console.log("sign up user: ", signupUser)
if (signupUser != null && signupUser.length > 4) {
  goSignUp()
} else {
  localStorage.removeItem('signup')
  parent.postMessage('login', windowParentUrl)
  // parent.postMessage('login', 'https://localhost:3000')
  // parent.postMessage('login', 'https://yata-ec-front-end-dev.azurewebsites.net/')
}

function goBack() {
  console.log('goback')
  location.href = localStorage.getItem('firstLink')

}

editname.innerHTML = "更改"
passwordNew.placeholder = '密碼 (6-12位字元，包括字母及數字)'
sumbitBtn.innerHTML = '登入'
document.getElementById('forgotPass').innerHTML = '忘記密碼?'

const loginUsername = document.getElementById('signInName')
const loginUser = localStorage.getItem('login')

if (loginUser && loginUser.length > 1) {
  console.log('login user: ', loginUser)
  loginUsername.value = loginUser;
  loginUsername.setAttribute('disabled', 'true')
  document.querySelector("#loginContainer").style.display = 'flex';
}

sumbitBtn.addEventListener("click", function (e) {
  event.preventDefault();
  if (passwordBtn.value.length > 0) {
    errorNotice.innerHTML == '' ? null :
      errorNotice.innerHTML = '';
  }
  goLogin();
});

rememberMeBtn.addEventListener("click", (e) => {
  document.getElementById('rememberMe').click();
})

document.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    document.getElementById('formSumbit').click();
  }
})

function goSignUp() {
  document.getElementById('createAccount').click()
}

function goLogin() {
  document.getElementById('next').click()

  if (passwordBtn.value.length <= 0) {
    document.getElementById('errorNotice').innerHTML = '請輸入密碼'
  } else if (passwordBtn.value.length > 0) {
    parent.postMessage('login-done', windowParentUrl)
    // parent.postMessage('login-done', 'https://localhost:3000/')
    // parent.postMessage('login-done', 'https://yata-ec-front-end-dev.azurewebsites.net/')
    localStorage.clear()
    setTimeout(showError, 1500)
  }
}

passwordNew.addEventListener('input', placePS)

function placePS() {
  document.getElementById('password').value = passwordNew.value
}

document.getElementById('visiblePWBox').addEventListener('click', showPw)

function showPw() {
  if (passwordNew.type == 'password') {
    passwordNew.type = 'text';
    document.getElementById('visiblePW1').style.display = 'flex'
    document.getElementById('visiblePW2').style.display = 'none'
  }
  else {
    passwordNew.type = 'password';
    document.getElementById('visiblePW2').style.display = 'flex'
    document.getElementById('visiblePW1').style.display = 'none'
  }
}

function showError() {
  console.log("errors[i].innerHTML", passwordNew.value)
  const errors = document.querySelectorAll('#localAccountForm > .error')
  for (let i = 0; i < errors.length; i++) {
    console.log(i, errors[i].innerText, i)
  }

  function copyError() {
    // console.log(errors[0].innerHTML)
    if (errors[0].innerHTML.length > 0) {//.includes('unauthorized')
      document.getElementById('errorNotice').innerHTML = "手機號碼/密碼不正確"
      errors[0].style.display = 'none';
      passwordCount += 1
      // console.log('passwordCount', passwordCount)
      if (passwordCount == 5) {
        sumbitBtn.disabled = true;
        sumbitBtn.style.color = 'gray';
        loginDisabled()
        passwordCount = 0
      }
    }
  }
  setTimeout(copyError, 1600)
}

function loginDisabled() {
  // console.log('disabled    disalbed')
  let sec = 60
  sumbitBtn.disabled = true;
  sumbitBtn.style.color = 'gray';

  let resendCountdown = setInterval(function () {
    if (sec <= 0) {
      clearInterval(resendCountdown);
      document.getElementById('errorNotice').innerHTML = ""
      sumbitBtn.disabled = false;
      sumbitBtn.style.color = 'white';//'#A5CD39'
    } else {
      // document.getElementById('errorNotice').innerHTML = lang == 1 ? `Incorrect password many times Please try again in ${t}s` : `多次輸入不正確，請等候${t}秒`
      document.getElementById('errorNotice').innerHTML = `多次輸入不正確，請等候 ${t} 秒`
    }
    sec -= 1
  }, 1000)
}

document.getElementById('forgotPass').addEventListener('click', function () {
  localStorage.setItem('forgot', loginUser)
  document.getElementById('forgotPassword').click()
})