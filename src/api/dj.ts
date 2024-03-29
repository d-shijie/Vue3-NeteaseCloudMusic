import { request } from '@/util/request'

// 电台详情
export function getDjDetailApi(rid: number) {
  return request({
    url: '/dj/detail',
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
export function getDjProgramApi(params: GetDjProgramType) {
  return request({
    url: '/dj/program',
    method: 'get',
    params
  })
}

// 电台分类推荐
export function getDjCateRecommendApi(type: number) {
  return request({
    url: '/dj/recommend/type',
    method: 'get',
    params: {
      type
    }
  })
}

// 电台分类
export function getDjCategoryApi() {
  return request({
    url: '/dj/catelist',
    method: 'get'
  })
}

// 推荐节目
export function getDjRecommendProgramApi() {
  return request({
    url: '/program/recommend',
    method: 'get'
  })
}

// 推荐电台
export function getRecommendDjApi() {
  return request({
    url: '/dj/recommend',
    method: 'get'
  })
}

// 电台分类推荐
export function getDjCategoryRecommendApi(type:number) {
  return request({
    url: '/dj/recommend/type',
    method: 'get',
    params:{
      type
    }
  })
}

// 获取类别热门电台
interface GetCategoryLististDjType {
  offset?:number
  limit?:number
  cateId:number
}
export function getCategoryLististDjApi(params:GetCategoryLististDjType) {
  return request({
    url: '/dj/radio/hot',
    method: 'get',
    params,
    _fullLoading:true
  })
}