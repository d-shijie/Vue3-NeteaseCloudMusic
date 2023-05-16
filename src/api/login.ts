import { request } from '@/util/request'

// 暂不支持
interface TPhoneLogin {
  phone: string
  password: string
  countrycode?: String
  md5_password?: string
  captcha?: string
}
export function phoneLoginApi (data: TPhoneLogin) {
  return request({
    url: "/login/cellphone",
    method: 'post',
    data
  })
}
// 游客登录
export function visitorLoginApi () {
  return request({
    url: "/register/anonimous",
    method: 'post',

  })
}

// 生成二维码key
export function createQRcodeKeyApi () {
  return request({
    url: "/login/qr/key",
    method: 'post',
  })
}
// 由key生成登录二维码
export function createQRcodeApi (key: string) {
  return request({
    url: "/login/qr/create",
    method: 'post',
    data: {
      key
    }
  })
}
// 检测扫码状态
export function checkQRcodeStatusApi (key: string) {
  return request({
    url: "/login/qr/check",
    method: 'post',
    data: {
      key
    }
  })
}
// 登录状态
export function getLoginStatusApi (cookie: string) {
  return request({
    url: "/login/status",
    method: 'post',
    data: {
      cookie
    }
  })
}
// 退出登录
export function logoutApi () {
  return request({
    url: "/logout",
    method: 'post',

  })
}