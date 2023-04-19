import { IRegisterUserInfo } from "../../pages/account/login-result";

export const checkUserStatusApi = async (userPhone: string, countryCodeId: number) => {
  try {
    const res = await fetch(`${process.env.APP_API_URL}/Register/CheckUser?mobile=${userPhone}&countryCodeId=${countryCodeId}`, {
      method: 'GET'
    })
    const result = await res.json();
    // console.log('check user result: ', result)
    if (result.isSuccess) {
      const status: number = result.data.registeredStatus
      const userId: string = result.data.userId

      switch (status) {
        case 0:
          return { userType: 'exist', userId: userId }
        case 1:
          return { userType: 'migrate', userId: userId }
        case 2:
          return { userType: 'new', userId: userId }
      }
    } else {
      return { userType: '', userId: '', error: '檢查電話註冊不成功' }
    }
  } catch (error) {
    return { userType: '', userId: '', error: '檢查電話註冊失敗' }
  }
}

export const checkRegisterStatusApi = async (userId: string) => {
  try {
    const res = await fetch(`${process.env.APP_API_URL}/Register?logId=${userId}`, {
      method: 'GET'
    })
    const result = await res.json();

    if (result.isSuccess) {
      return { success: true, data: result.data.result }
    } else {
      return { success: false, error: '檢查註冊結果不成功' }
    }
  } catch (error) {
    return { success: false, error: '檢查註冊結果失敗' }
  }
}

export const postRegisterInfo = async (registeredUser: IRegisterUserInfo) => {
  try {
    const res = await fetch(`${process.env.APP_API_URL}/Register`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registeredUser),
    })
    const result = await res.json();

    if (res.status != 200) {
      // console.log('post register not 200: ', res)
      return { success: false, msg: '註冊異常，請稍後再試' }
    }

    if (result.isSuccess) {
      switch (result.data.result) {
        case 1:
          return { success: false, msg: '此電話已被註冊，請嘗試登入' }
        case 2:
          // console.log('post register success: ', result)
          return { success: true, id: result.data.id }
        case 3:
          return { success: false, msg: '網路䌓忙，請稍後再註冊' }
      }
    } else {
      // console.log('post register not success: ', result)
      if (result.errorMsg == 'This Mobile has been registered.') {
        return { success: false, msg: '此電話已被註冊，請嘗試登入' }
      } else {
        return { success: false, msg: '註冊失敗，請稍後再試' }
      }
    }
  } catch (error) {
    return { success: false, msg: error }
  }
}