window.onload = function () {
  document.activeElement.blur()
}

const windowParentUrl = localStorage.getItem('windowParentUrl')

parent.postMessage('register', windowParentUrl)
// parent.postMessage('register', 'https://localhost:3000')
// parent.postMessage('register', 'https://yata-ec-front-end-dev.azurewebsites.net/')

const title = document.getElementById('extension_title')
const givenName = document.getElementById('givenName')
const surname = document.getElementById('surname')
const displayName = document.getElementById('displayName')
const birthday = document.getElementById('extension_birthday')
const email = document.getElementById('extension_email')
const promoCode = document.getElementById('extension_promotionCode')
const langPre = document.getElementById('extension_lang')
const newPassword = document.getElementById('newPassword')
const reenterPassword = document.getElementById('reenterPassword')
const signInNames = document.getElementById('signInNames.phoneNumber')
const continueBtn = document.getElementById('continue')

const yatatitle = document.getElementById('yatatitle')
const yatagivenName = document.getElementById('yatagivenName')
const yatasurname = document.getElementById('yatasurname')
const yataCountryCode = document.getElementById('yataCountryCode')
const yataMobile = document.getElementById('yataMobile')
const yatabirthday = document.getElementById('yatabirthday')
const yataemail = document.getElementById('yataemail')
const yatanewPassword = document.getElementById('yatanewPassword')
const yatareenterPassword = document.getElementById('yatareenterPassword')
const yataPromoCode = document.getElementById('yataPromoCode')
const yataSubmit = document.getElementById('yataSubmit')
// const yataCondition1 = document.getElementById('yataCondition1')
// const yataCondition2en = document.getElementById('yataCondition2en')
const yataCondition2tc = document.getElementById('yataCondition2tc')
// const yataCondition3 = document.getElementById('yataCondition3')

// const erCountryCode =document.getElementById('erCountryCode')
// const erMobile =document.getElementById('erMobile')
const ertitle = document.getElementById('ertitle')
const ergivenName = document.getElementById('ergivenName')
const ersurname = document.getElementById('ersurname')
const erbirthday = document.getElementById('erbirthday')
const eremail = document.getElementById('eremail')
const ernewPassword = document.getElementById('ernewPassword')
const erreenterPassword = document.getElementById('erreenterPassword')

const passwordMatch = document.getElementById('passwordEntryMismatch')
// const tncCancelen = document.getElementById('tncCancelen')
const tncCanceltc = document.getElementById('tncCanceltc')

langPre.value = 2

// yataCondition2en.addEventListener('click', () => {
//   document.getElementById('tncen').style.display = 'flex';
//   // console.log('yataCondition2en yataCondition2en')
// })
yataCondition2tc.addEventListener('click', () => {
  document.getElementById('tnctc').style.display = 'flex';
  window.scrollTo({ top: 0, behavior: 'smooth' });
})
// tncCancelen.addEventListener('click', () => {
//   document.getElementById('tncen').style.display = 'none';
// })
tncCanceltc.addEventListener('click', () => {
  document.getElementById('tnctc').style.display = 'none';
})

$(document).ready(function () {
  console.log("birthday ready!");
  new Rolldate({
    el: ['#yatabirthday', '#birthday'],
    format: 'YYYY-MM',
    beginYear: 1900,
    endYear: 2022,
    lang: {
      title: '請選擇您的生日年月',
      cancel: '取消',
      confirm: '確定',
      year: '',
      month: '',
      day: '',
      hour: '',
      min: '',
      sec: ''
    }
  });
});

const signupList = [
  { input: yatatitle, er: ertitle, name: 'Title', tcName: '稱謂' },
  { input: yatagivenName, er: ergivenName, name: 'First Name', tcName: '名字' },
  { input: yatasurname, er: ersurname, name: 'Last Name', tcName: '姓氏' },
  { input: yatabirthday, er: erbirthday, name: 'Birthday', tcName: '出生年月' },
  { input: yataemail, er: eremail, name: 'Email', tcName: '電郵地址' },
  { input: yatanewPassword, er: ernewPassword, name: 'Password', tcName: '登入密碼' },
  { input: yatareenterPassword, er: erreenterPassword, name: 'Confirm password', tcName: '登入密碼' },
]

const user = localStorage.getItem('signup')
const olduser = localStorage.getItem('olduser')
console.log('signup user: ', user, ' & old user:', olduser)

if (user) {
  const juser = JSON.parse(user)
  const username = "+" + juser.cc + juser.phone

  document.getElementById('yataCountryCode').value = juser.cc;
  document.getElementById('extension_cc').value = juser.cc;
  document.getElementById('yataMobile').value = juser.phone;
  document.getElementById('extension_nNumber').value = juser.phone;

  signInNames.value = username

  if (olduser == 'true') {
    // document.getElementById('signupTitle').innerHTML = "重設密碼"
    const rawOldUserData = localStorage.getItem('')
    const oldUserData = JSON.parse(rawOldUserData)
    console.log('old user: ', oldUserData, '-- reset password')

    yatatitle.value = oldUserdata.salutationId
    yatagivenName.value = oldUserdata.chineseFirstName
    yatasurname.value = oldUserdata.chineseLastName
    yatabirthday.value = oldUserdata.birthdayYYYY + '-' + oldUserdata.birthdaymm
    yataemail.value = oldUserdata.email
    title.value = oldUserdata.salutationId
    givenName.value = oldUserdata.chineseFirstName
    surname.value = oldUserdata.chineseLastName
    displayName.value = oldUserdata.chineseFirstName + ' ' + oldUserdata.chineseLastName
    email.value = oldUserdata.email
    birthday.value = oldUserdata.birthdayYYYY + '-' + oldUserdata.birthdaymm

    document.getElementById('helpNotice').style.display = 'none';

  } else {
    // document.getElementById('signupTitle').innerHTML = '加入'

    function inputRow() {
      var rows = document.getElementsByClassName('inputRow')
      for (i = 0; i < rows.length; i++) {
        rows[i].style.display = 'flex';
        rows[i].style.minHeight = '40px';
      }
    }
    inputRow()
    // localStorage.clear()
  }
}

yataSubmit.addEventListener('click', signupSubmit)
yatatitle.addEventListener('change', fillTitle)
function fillTitle() {
  title.value = yatatitle.value
}

yatagivenName.addEventListener('change', fillGivenName)
function fillGivenName() {
  givenName.value = yatagivenName.value
}

yatasurname.addEventListener('change', fillSurname)
function fillSurname() {
  surname.value = yatasurname.value
  displayName.value = yatagivenName.value + " " + yatasurname.value
}

yatabirthday.addEventListener('change', fillBirthday)
function fillBirthday() {
  birthday.value = yatabirthday.value
}

yataemail.addEventListener('change', fillEmail)
function fillEmail() {
  email.value = yataemail.value
}

yatanewPassword.addEventListener('change', fillNewPassword)
function fillNewPassword() {
  newPassword.value = yatanewPassword.value
  // console.log(yatanewPassword.value)
}

yatareenterPassword.addEventListener('change', fillReenterPassword)
function fillReenterPassword() {
  reenterPassword.value = yatareenterPassword.value
}

yataPromoCode.addEventListener('change', fillPromoCode)
function fillPromoCode() {
  promoCode.value = yataPromoCode.value
}

// const list = [
//   {
//     ori: 'title',
//     new: 'yatatitle',
//     min: 1,
//     max: 10,
//     msg: 'within 1-10 words',
//   },
// ]

document.getElementById('visiblePWBox').addEventListener('click', showPw)
function showPw() {
  console.log('pushing ')
  if (yatanewPassword.type == 'password') {
    yatanewPassword.type = 'text';
    document.getElementById('visiblePW1').style.display = 'flex'
    document.getElementById('visiblePW2').style.display = 'none'
  } else {
    yatanewPassword.type = 'password';
    document.getElementById('visiblePW2').style.display = 'flex'
    document.getElementById('visiblePW1').style.display = 'none'
  }
}

document.getElementById('visibleRPWBox').addEventListener('click', showRepeatPw)
function showRepeatPw() {
  console.log('pushing ')
  if (yatareenterPassword.type == 'password') {
    yatareenterPassword.type = 'text';
    document.getElementById('visibleRPW1').style.display = 'flex'
    document.getElementById('visibleRPW2').style.display = 'none'
  } else {
    yatareenterPassword.type = 'password';
    document.getElementById('visibleRPW2').style.display = 'flex'
    document.getElementById('visibleRPW1').style.display = 'none'
  }
}

function signupSubmit(e) {
  e.preventDefault();
  fillBirthday()

  let sumbitPass = [false, false, false, false, false, false, false,]
  signupList.map((item, index) => {
    console.log('item.er.innerHTML', item.er.innerHTML)
    item.er.innerHTML = "";

    if (item.input.value.length <= 0) {
      if (item.name == 'Confirm password') {
        item.er.innerHTML = `請重覆輸入${item.tcName} `
      }
      item.er.innerHTML = `請輸入${item.tcName}`
    } else if (item.input.value.length > 0) {

      switch (item.name) {
        case 'Birthday':
          if (!(item.input.value.match(/^\d{4}-0[1-9]|1[0-2].*$/))) {
            erbirthday.innerHTML = '出生年日格式不正確'
          } else erbirthday.innerHTML = ''
        // return
        case 'Email':
          if (!(item.input.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))) {
            eremail.innerHTML = '電郵地址格式不正確'
          } else eremail.innerHTML = ''
        // return
        case 'Password':
          if (item.input.value.length < 6 || item.input.value.length > 12) {
            ernewPassword.innerHTML = '密碼格式不正確'
          } else ernewPassword.innerHTML = ''
        // return
        case 'Confirm password':
          if (yatanewPassword.value !== item.input.value) {
            erreenterPassword.innerHTML = '這些密碼不相符，請再試一次'
          } else erreenterPassword.innerHTML = ''
        // return
      }

      if (item.er.innerHTML == "") {
        // item.er.innerHTML = ""
        sumbitPass[index] = true
      }
    } else { return }
  })

  console.log('create step 1', sumbitPass)

  if (!sumbitPass.some(el => el == false)) {
    continueBtn.click()
    setTimeout(showErrors, 1000)
    console.log('create step 2')
    parent.postMessage('register-done', windowParentUrl)
    // parent.postMessage('register-done', 'https://localhost:3000/')
    // parent.postMessage('register-done', 'https://yata-ec-front-end-dev.azurewebsites.net/')
    localStorage.clear()
  }
}

function showErrors() {
  console.log('errors testing ')
  const errorsShow = document.querySelectorAll('.show')

  for (let i = 0; i < errorsShow.length; i++) {
    console.log(errorsShow[i].innerHTML)
    if (errorsShow[i].innerHTML.match(/email/)) {
      console.log('find email error')
      document.getElementById('eremail').innerHTML = '電郵地址不正確'
    } else if (errorsShow[i].innerHTML.match(/new/)) {
      console.log('find password error')
      document.getElementById('ernewPassword').innerHTML = '密碼格式不正確' //errorsShow[i].innerHTML
    } else if (errorsShow[i].innerHTML.match(/confirm/)) {
      console.log('find re-password error')
      document.getElementById('erreenterPassword').innerHTML = '密碼格式不正確'
    } else if (errorsShow[i].innerHTML.match(/The password/)) {
      console.log('find re-password error', errorsShow[i].innerHTML)
      if (document.getElementById('yatanewPassword').value.length < 6) {
        document.getElementById('ernewPassword').innerHTML = '密碼格式不正確'//errorsShow[i].innerHTML
      } else if (document.getElementById('yatanewPassword').value.length > 12) {
        document.getElementById('ernewPassword').innerHTML = '密碼格式不正確'
      } else if (errorsShow[i].innerHTML.match(/new password must/)) {
        document.getElementById('ernewPassword').innerHTML = '密碼格式不正確'
      } else if (errorsShow[i].innerHTML.match(/confirm password must/)) {
        document.getElementById('erreenterPassword').innerHTML = '密碼格式不正確'
      }

      if (document.getElementById('yatareenterPassword').value.length < 6) {
        document.getElementById('erreenterPassword').innerHTML = '密碼格式不正確'
      } else if (document.getElementById('yatareenterPassword').value.length > 12) {
        document.getElementById('erreenterPassword').innerHTML = '密碼格式不正確'
      }

    } else if (document.getElementById('claimVerificationServerError').style.display == 'block') {
      document.getElementById('ernewPassword').innerHTML = '資料不正，請再試'
    }
  }

  if (passwordMatch && passwordMatch.style.display == 'block') {
    console.log('find re-password error')
    document.getElementById('erreenterPassword').innerHTML = '自訂登入密碼不相同,請重試'// passwordMatch.innerHTML
  }
}

showErrors()

// const gobackBtn = document.getElementById('ntcgoBack')
// gobackBtn.addEventListener('click', goBack)

function goBack() {
  console.log('goback')
  location.href = localStorage.getItem('firstLink')
}
