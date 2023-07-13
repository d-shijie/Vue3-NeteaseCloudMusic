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
