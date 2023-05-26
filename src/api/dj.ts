import { request } from '@/util/request'

// 电台详情
export function getDjDetailApi (rid: number) {
  return request({
    url: "/dj/detail",
    method: 'get',
    params: {
      rid
    }
  })
}

// 电台节目
interface GetDjProgramType {
  rid: number
  limit: number
  offset: number
  asc: boolean
}
export function getDjProgramApi (params: GetDjProgramType) {
  return request({
    url: "/dj/program",
    method: 'get',
    params
  })
}

// 电台分类推荐
export function getDjCateRecommendApi (type: number) {
  return request({
    url: "/dj/recommend/type",
    method: 'get',
    params: {
      type
    }
  })
}