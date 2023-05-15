import { request } from '@/util/request'
// 获取用户歌单
interface MGetUserSongSheet {
  uid: string | number
  limit?: number
  offset?: number
}
export function getUserSongSheetApi (params: MGetUserSongSheet) {
  return request({
    url: '/user/playlist',
    method: 'get',
    params
  })
}