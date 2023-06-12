import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import {FullLoading} from './loading'
declare module "axios" {
  export interface AxiosRequestConfig {
    _fullLoading?: boolean;
  }
}
const fullLoading=new FullLoading()
function createInstance () {
  const instance = axios.create()
  instance.interceptors.request.use((config) => {
    if (config.method?.toLowerCase() === 'post') {
      const nowStamp = new Date().getTime()
      config.url = config.url + `?t=${nowStamp}`
    }
    return config
  }, (error) => Promise.reject(error))

  instance.interceptors.response.use((response) =>{
    response.config?._fullLoading&& fullLoading.endLoading()
    return response
  } , (error) => {
    error.config?._fullLoading&& fullLoading.endLoading()
    return Promise.reject(error)
  })
  
  return instance
}


function createRequest (instance: AxiosInstance) {
  return function (config: AxiosRequestConfig) {
    const configDefault = {
      headers: {},
      timeout: 5000,
      baseURL: '/api',
      withCredentials: true,
      data: {}
    }
    config?._fullLoading&&fullLoading.startLoading()
    return instance(Object.assign(configDefault, config))
  }
}
export const instance = createInstance()
export const request = createRequest(instance)