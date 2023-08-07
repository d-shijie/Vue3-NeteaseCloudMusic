import { request } from '@/util/request'
// 获取用户歌单
interface MGetUserSongSheet {
  uid: string | number
  limit?: number
  offset?: number
}
export function getUserSongSheetApi(params: MGetUserSongSheet) {
  return request({
    url: '/user/playlist',
    method: 'get',
    params
  })
}

// 获取用户动态
export function getUserEventApi(uid: number) {
  return request({
    url: '/user/event',
    method: 'get',
    params: {
      uid
    }
  })
}

// 获取用户关注
export function getUserFollowsApi(uid: number) {
  return request({
    url: '/user/follows',
    method: 'get',
    params: {
      uid
    }
  })
}

// 获取用户粉丝
export function getUserFansApi(uid: number) {
  return request({
    url: '/user/followeds',
    method: 'get',
    params: {
      uid
    }
  })
}

// 用户详情
export function getUserDetailApi(uid: number) {
  return request({
    url: '/user/detail',
    method: 'get',
    params: {
      uid
    }
  })
}
// 热门话题
interface GetHotTopicType {
  limit?:number
  offset?:number
}
export function getHotTopicApi(params: GetHotTopicType) {
  return request({
    url: '/hot/topic',
    method: 'get',
    params
  })
}
// 删除用户动态
export function deleteUserEventApi(evId: number) {
  return request({
    url: '/event/del',
    method: 'post',
    data:{
      evId
    }
  })
}

