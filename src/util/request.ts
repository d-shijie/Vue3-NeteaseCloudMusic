import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

function createInstance () {
  const instance = axios.create()
  instance.interceptors.request.use((config) => config, (error) => Promise.reject(error))

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
      data: {}
    }
    return instance(Object.assign(configDefault, config))
  }
}
export const instance = createInstance()
export const request = createRequest(instance)