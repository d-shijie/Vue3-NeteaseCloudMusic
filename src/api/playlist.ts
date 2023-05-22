import { request } from '@/util/request'

// 获取歌单所有歌曲
interface GetPlaylistMusic {
  id: number | string
  limit?: number
  offset?: number
}
export function getPlaylistMusicApi (params: GetPlaylistMusic) {
  return request({
    url: "/playlist/track/all",
    method: 'get',
    params
  })
}

// 推荐歌单
export function getRecommendPlaylistApi () {
  return request({
    url: "/personalized",
    method: 'get',
  })
}
// 歌单详情
export function getPlaylistDetailApi (id: number | string) {
  return request({
    url: "/playlist/detail",
    method: 'get',
    params: {
      id
    }
  })
}