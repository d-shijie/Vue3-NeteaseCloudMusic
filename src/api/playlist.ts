import { request } from '@/util/request'

// 获取歌单所有歌曲
interface GetPlaylistMusic {
  id: number | string
  limit?: number
  offset?: number
}
export function getPlaylistMusicApi(params: GetPlaylistMusic) {
  return request({
    url: '/playlist/track/all',
    method: 'get',
    params
  })
}

// 推荐歌单
export function getRecommendPlaylistApi() {
  return request({
    url: '/personalized',
    method: 'get'
  })
}
// 歌单详情
export function getPlaylistDetailApi(id: number | string) {
  return request({
    url: '/playlist/detail',
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
export function getPlaylistCollectorsApi(params: GetPlaylist) {
  return request({
    url: '/playlist/subscribers',
    method: 'get',
    params
  })
}
// 歌单评论
export function getPlaylistCommentsApi(params: GetPlaylist) {
  return request({
    url: '/comment/playlist',
    method: 'get',
    params
  })
}

// 收藏歌单
export function subscribePlaylistApi(id: number, t: 1 | 0) {
  return request({
    url: '/playlist/subscribe',
    method: 'post',
    data: {
      id,
      t
    }
  })
}

// 精品歌单
export function getBoutiquePlaylistApi(limit: number, before?: number) {
  return request({
    url: '/top/playlist/highquality',
    method: 'get',
    params: {
      limit,
      before
    },
    _fullLoading: true
  })
}
// 歌单完整分类
export function getPlaylistCategoryApi() {
  return request({
    url: '/playlist/catlist',
    method: 'get'
  })
}
// 热门歌单分类
export function getHotPlaylistCategoryApi() {
  return request({
    url: '/playlist/hot',
    method: 'get'
  })
}
// 获取歌单
interface GetPlaylistType {
  order?: 'new' | 'hot'
  cat?: string
  limit?: number
  offset?: number
}
export function getPlaylistApi(params: GetPlaylistType) {
  return request({
    url: '/top/playlist',
    method: 'get',
    params
  })
}

export function getMusicCategoryRankApi() {
  return request({
    url: '/toplist',
    method: 'get',
    _fullLoading: true
  })
}
