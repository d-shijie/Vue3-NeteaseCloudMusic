import KEYS from '@/config/storage'
export function setToken (token: string) {
  localStorage.setItem(KEYS.NMTOKEN, token)
}
export function getToken () {
  return JSON.parse(JSON.stringify(localStorage.getItem(KEYS.NMTOKEN)))
}
export function removeToken () {
  localStorage.removeItem(KEYS.NMTOKEN)
}