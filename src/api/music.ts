import { request } from '@/util/request'
import type { currentMusicLevel } from '@/stores/modules/global'
// 获取音乐url
interface GetMusicUrl {
  id: string | number
  level: currentMusicLevel
}
export function getMusicUrlApi (params: GetMusicUrl) {
  return request({
    url: "/song/url/v1",
    method: 'get',
    params
  })
}