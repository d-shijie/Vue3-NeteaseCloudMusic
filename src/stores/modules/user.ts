import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { setToken } from "@/util/storage";
export const useUserStore = defineStore(
  'user', () => {
    const loginState = ref(false)
    let userInfo = reactive<any>({})
    const loginSuccess = <T extends Object> (profile: T, token: string): void => {
      loginState.value = true
      userInfo = profile
      setToken(token)
    }
    const logout = () => {
      loginState.value = false
      userInfo = {}
      setToken('')
    }
    return { loginState, userInfo, loginSuccess, logout }
  },

)