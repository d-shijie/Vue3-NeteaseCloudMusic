import { request } from '@/util/request'
// 最新mv
interface GetNewMVByAreaParams {
  limit:number
  area?:string
}
export function getNewMVByAreaApi(params:GetNewMVByAreaParams){
  return request({
    url: '/mv/first',
    method: 'get',
    params
  })
}