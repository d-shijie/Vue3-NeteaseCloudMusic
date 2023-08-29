import { request } from '@/util/request'

// 默认搜索关键字
export function getDefaultSearchKeywordsApi() {
  return request({
    url: '/search/default',
    method: 'get'
  })
}
// 热搜列表
export function getHotSearchListApi() {
  return request({
    url: '/search/hot/detail',
    method: 'get'
  })
}
// 热搜列表
interface SearchParams {
  keywords: string
  limit?: number
  offset?: number
  type: SearchType
}
// 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音
export type SearchType = 1 | 10 | 100 | 1000 | 1002 | 1004 | 1006 | 1009 | 1014 | 1018 | 2000
export function searchApi(params: SearchParams) {
  return request({
    url: '/cloudsearch',
    method: 'get',
    params
  })
}
