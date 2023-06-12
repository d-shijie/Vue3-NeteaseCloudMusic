import { request } from '@/util/request'

// 获取banner
export function getBannerApi (type: 0 | 1 | 2 | 3) {
  return request({
    url: "/banner",
    method: 'get',
    params: {
      type
    },
    _fullLoading:true,
  })
}
// 推荐歌单
export function getDaylyRecommendPlaylistApi () {
  return request({
    url: "/recommend/resource",
    method: 'get',
  })
}
// 热门播客 电台个性推荐
export function getHotDjRecommendApi () {
  return request({
    url: "/personalized/djprogram",
    method: 'get',
  })
}

// 听见好书 电台有声书
export function getRecommendBooksApi () {
  return request({
    url: "/dj/recommend/type?type=10001",
    method: 'get',
  })
}

// 独家放送
export function getExclusiveBroadcastApi () {
  return request({
    url: "/personalized/privatecontent",
    method: 'get',
  })
}

// 推荐新音乐
export function getRecommendNewSongsApi () {
  return request({
    url: "/personalized/newsong?limit=12",
    method: 'get',
  })
}

// 主题播客 
export function getHotDjsApi () {
  return request({
    url: "/dj/hot",
    method: 'get',
    params: {
      limit: 6
    }
  })
}

// 推荐MV
export function getRecommendMVApi () {
  return request({
    url: "/personalized/mv",
    method: 'get',
  })
}