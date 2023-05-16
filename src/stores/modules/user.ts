import { defineStore } from "pinia";
import { ref } from "vue";
import { setToken, removeToken } from "@/util/storage";
import { logoutApi } from "@/api/login";
export const useUserStore = defineStore(
  'user', () => {
    const loginState = ref(false)
    const userInfo = ref<any>({})
    const loginSuccess = <T extends Object> (profile: T, token: string): void => {
      loginState.value = true
      userInfo.value = profile
      setToken(token)
    }
    const logout = () => {
      logoutApi().then(() => {
        loginState.value = false
        userInfo.value = {}
        removeToken()
        location.reload()
      })
    }
    return { loginState, userInfo, loginSuccess, logout }
  },

)