import { request } from '@/util/request'
export function getBannerApi (type: number) {
  return request({
    url: "/banner",
    method: 'get',
    params: {
      type
    }
  })
}
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