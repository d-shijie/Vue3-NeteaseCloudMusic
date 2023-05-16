import { request } from '@/util/request'

// 获取banner
export function getBannersApi (type: 0 | 1 | 2 | 3) {
  return request({
    url: "/banner",
    method: 'get',
    params: {
      type
    }
  })
}