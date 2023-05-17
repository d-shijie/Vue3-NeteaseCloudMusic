import { request } from '@/util/request'

// 获取banner
export function getBannerApi (type: 0 | 1 | 2 | 3) {
  return request({
    url: "/banner",
    method: 'get',
    params: {
      type
    }
  })
}
// 推荐歌单
export function getRecommendPlaylistApi () {
  return request({
    url: "/recommend/resource",
    method: 'post',
  })
}