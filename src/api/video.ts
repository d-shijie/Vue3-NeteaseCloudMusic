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
    params,
    _fullLoading:true
  })
}

// 视频url
export function getVideoUrlApi(id:string){
  return request({
    url: '/video/url',
    method: 'get',
    params:{
      id
    }
  })
}

// 视频详情
export function getVideoDetailApi(id:string){
  return request({
    url: '/video/detail',
    method: 'get',
    params:{
      id
    }
  })
}

// 相关视频
export function getRelatedVideoApi(id:string){
  return request({
    url: '/related/allvideo',
    method: 'get',
    params:{
      id
    }
  })
}
// 视频评论
interface GetVideoCommentParams {
  id:string
  limit:number
  offset:number
  before?:number
}
export function getVideoCommentApi(params:GetVideoCommentParams){
  return request({
    url: '/comment/video',
    method: 'get',
    params
  })
}