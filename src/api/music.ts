import { request } from '@/util/request'
import type { currentMusicLevel } from '@/stores/types/global'
// 获取音乐url
interface GetMusicUrl {
  id: string | number
  level?: currentMusicLevel
}
export function getMusicUrlApi(params: GetMusicUrl) {
  return request({
    url: '/song/url/v1',
    method: 'get',
    params
  })
}
export function getOldMusicUrlApi(params: GetMusicUrl) {
  return request({
    url: '/song/url',
    method: 'get',
    params
  })
}
// 获取歌曲详情
export function getMusicDetailApi(ids: string) {
  return request({
    url: '/song/detail',
    method: 'get',
    params: {
      ids
    }
  })
}
// 每日推荐歌曲
export function getDaylyRecommendSongsApi() {
  return request({
    url: '/recommend/songs',
    method: 'get'
  })
}

// 新歌速递
export function getNewMusicsApi(type: string) {
  return request({
    url: '/top/song',
    method: 'get',
    params: {
      type
    },
    _fullLoading: true
  })
}
