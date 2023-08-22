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
