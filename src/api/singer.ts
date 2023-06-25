import { request } from '@/util/request'

interface GetSingerListType {
  limit: number
  offset?: number
  type: string
  area: string
  initial: string
}
export function getSingerListApi(params: GetSingerListType) {
  return request({
    url: '/artist/list',
    params,
    _fullLoading: true
  })
}
