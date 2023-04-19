console.log('try login: ')
document.activeElement.blur()

window.onload = function () {
  window.localStorage.clear();
}

const windowParentUrl = window.location.href.split('redirect_uri=')[1].split('/account/login-result')[0]
console.log('parent window url: ', windowParentUrl)

localStorage.setItem('firstLink', window.location.href)
localStorage.setItem('codeChallenge', window.location.href.split('code_challenge=')[1])
localStorage.setItem('windowParentUrl', window.location.href.split('redirect_uri=')[1].split('/account/login-result')[0])
const langStore = localStorage.getItem('lang')
let lang = 1
if (langStore) {
  lang = langStore
}
// console.log(lang == 1 ? "chi" : "en")

const cc = document.getElementById('yataCountryCode')
const phoneinput = document.getElementById('phoneInput')
const sumbitBtn = document.getElementById('formSumbit')
const continueBtn = document.getElementById('continue')
const accExist = document.getElementById('claimVerificationServerError')
let phoneLimit = 8


const scope = 'https://YataLoyaltyUat.onmicrosoft.com/965228eb-c605-4751-b069-d12544bb347c/CustomerAppApi'

const word = {
  require: { 1: 'Mobile is invalid', 2: "號碼無效" },
}

function setNationalNumber() {
  document.getElementById('nationalNumber').value = phoneinput.value;
  checkLimit();
}

function setCC() {
  document.getElementById('countryCode').value = cc.value == '852'
    ? 'HK'
    : (cc.value == '853' ? 'MO' : 'CN')
  cc.value == '852'
    ? phoneLimit = 8
    : (cc.value == '853'
      ? phoneLimit = 8
      : phoneLimit = 11
    )
  checkLimit();
}

function checkLimit() {
  // phoneinput.value.length == phoneLimit ?
  //   sumbitBtn.disabled = false :
  //   sumbitBtn.disabled = true
  // phoneinput.value.length == phoneLimit ?
  //   document.getElementById('formSumbit').style.backgroundColor = '#A5CD39' :
  //   document.getElementById('formSumbit').style.backgroundColor = 'grey'
  phoneinput.value.length == phoneLimit ?
    document.getElementById('usernameNotice').innerHTML = "" :
    document.getElementById('usernameNotice').innerHTML = '號碼無效' // `Phone number need ${phoneLimit} digi `
}

phoneinput.addEventListener('change', setNationalNumber)
cc.addEventListener('change', setCC)

document.getElementById('formSumbit').addEventListener("click", function (e) {
  e.preventDefault();
  const userAcc = "+" + cc.value + phoneinput.value
  console.log('userAcc  ', userAcc)

  accCheck(userAcc)
}, false);

function accCheck(userAcc) {
  //add check storage / cache memberNUmber
  localStorage.setItem('login', userAcc)
  continueBtn.click()
  setTimeout(existCheck, 1000)
}

function existCheck() {
  // if(document.getElementById('requiredFieldMissing').style.display ="block")
  if (document.getElementById('nationalNumber').value.length <= 0) {
    document.getElementById('usernameNotice').innerHTML = '請輸入電話號碼'
    // document.getElementById('requiredFieldMissing').innerHTML
  }

  if (accExist.innerHTML.length > 0) {
    accExist.innerHTML == "That phone number doesn't exist in our system. Please try signing up with the number." ?
      console.log('~~~~~~~~~~~~~~~~~~~~~') :
      console.log('check exciting: ', accExist.innerHTML.length)

    localStorage.removeItem('login')
    const userAcc = JSON.stringify({ cc: cc.value, phone: phoneinput.value })
    localStorage.setItem('signup', userAcc)

    // document.getElementById('usernameNotice').innerHTML = 'Processing Sign Up '
    const uri = `https://YataLoyaltyUat.b2clogin.com/YataLoyaltyUat.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1A_ESHOP_SIGNUP_DIRECTLY&client_id=3e35b101-c0df-4af3-bf2a-4578dd2f4a43&nonce=defaultNonce&redirect_uri=${localStorage.getItem('windowParentUrl')}/account/login-result&scope=${scope}&response_type=code&prompt=login&code_challenge=${localStorage.getItem('codeChallenge')}`
    location.href = uri
  } else {
    console.log("Loggin in: ", accExist.innerHTML.length)
  }
}

// function crmCheck(username) {
//   // step 1 check CRM
//   // get Localstore
//   const user = callCrmAPI(username)
//   user ? console.log("user :", user) : console.log('this user does not exist at crm')

//   //step 2.1 check azureId 
//   if (user && user.azureId.length > 0) { //
//     console.log('username checked, azureId check')
//     goLogin()

//   } else if (user) {
//     console.log('pass to Azure for login and migrate')
//     if (user.olduser) {
//       localStorage.setItem('user', document.getElementById('phoneInput').value);
//       localStorage.setItem('olduser', 'true')

//       // login check by azure ***** not done **** 
//       goSignUp()

//     } else {
//       localStorage.setItem('user', document.getElementById('phoneInput').value);
//       goSignUp();
//     }
//   } else {
//     console.log('pass to Azure for Sign UP check')
//     localStorage.setItem('user', document.getElementById('phoneInput').value);
//     goLogin()
//   }
// }

// function goSignUp() {
//   document.getElementById('createAccount').click()
// }

// function goLogin() {
//   document.getElementById('next').click()
// }