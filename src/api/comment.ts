import { request } from '@/util/request'

interface CommentType {
  // 1 发送, 2 回复
  t: 1 | 2
  // 0: 歌曲 1: mv  2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
  type: 0 | 1 | 2 | 3 | 4 | 5 | 6
  id: number
  content: string
  commentId?: number
}
export function commentApi (data: CommentType) {
  return request({
    url: "/comment",
    method: 'post',
    data
  })
}