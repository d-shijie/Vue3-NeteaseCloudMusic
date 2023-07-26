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

// mv地址
export function getMvUrlApi(id:number|string){
  return request({
    url: '/mv/url',
    method: 'get',
    params:{
      id
    }
  })
}
// mv详情
export function getMvDetailApi(mvid:number|string){
  return request({
    url: '/mv/detail',
    method: 'get',
    params:{
      mvid
    }
  })
}
// mv评论
interface GetMvCommentParams {
  id:string
  limit:number
  offset:number
  before?:number
}
export function getMvCommentApi(params:GetMvCommentParams){
  return request({
    url: '/comment/mv',
    method: 'get',
    params
  })
}
// 收藏mv

interface SubscribeMvData {
  mvid:number|string
  t:1|0
}
export function subscribeMvApi(data:SubscribeMvData){
  return request({
    url: '/mv/sub',
    method: 'post',
    data
    
  })
}