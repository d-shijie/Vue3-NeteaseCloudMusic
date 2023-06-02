import { request } from '@/util/request'
// 0: 歌曲 1: mv  2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
export type CType = 0 | 1 | 2 | 3 | 4 | 5 | 6
interface CommentType {
  // 1 发送, 2 回复
  t: 1 | 2
  type: CType
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

//TODO 楼层评论
interface FloorCommentType {
  parentCommentId: number
  id: number
  type: CType
  limit?: number
}
export function getFloorCommentApi (params: FloorCommentType) {
  return request({
    url: "/comment/floor",
    method: 'get',
    params
  })
}
// 评论点赞
interface likeCommentType {
  id: number
  cid: number
  // 1点赞 0取消点赞
  t: 1 | 0
  type: CType
}
export function likeCommentApi (data: likeCommentType) {
  return request({
    url: "/comment/like",
    method: 'post',
    data
  })
}