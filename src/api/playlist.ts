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