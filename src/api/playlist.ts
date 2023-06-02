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
// 收藏者
interface GetPlaylist {
  id: string | number
  offset: number
  limit: number
}
export function getPlaylistCollectorsApi (params: GetPlaylist) {
  return request({
    url: "/playlist/subscribers",
    method: 'get',
    params
  })
}
// 歌单评论
export function getPlaylistCommentsApi (params: GetPlaylist) {
  return request({
    url: "/comment/playlist",
    method: 'get',
    params
  })
}

// 收藏歌单
export function subscribePlaylistApi (id: number, t: 1 | 0) {
  return request({
    url: "/playlist/subscribe",
    method: 'post',
    data: {
      id,
      t
    }
  })
}