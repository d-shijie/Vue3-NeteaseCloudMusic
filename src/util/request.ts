import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

function createInstance () {
  const instance = axios.create()
  instance.interceptors.request.use((config) => {
    if (config.method?.toLowerCase() === 'post') {
      const nowStamp = new Date().getTime()
      config.url = config.url + `?t=${nowStamp}`
    }
    return config
  }, (error) => Promise.reject(error))

  instance.interceptors.response.use((response) => response, (error) => {
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
    return instance(Object.assign(configDefault, config))
  }
}
export const instance = createInstance()
export const request = createRequest(instance)