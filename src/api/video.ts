import { request } from '@/util/request'

// 获取视频标签
export function getVideoGroupApi(){
  return request({
    url: '/video/group/list',
    method: 'get',
  })
}

// 标签下的视频
interface GetVideoByGroupType {
    id:number
    offset?:number
}
export function getVideoByGroupApi(params:GetVideoByGroupType){
  return request({
    url: '/video/group',
    method: 'get',
    params
  })
}