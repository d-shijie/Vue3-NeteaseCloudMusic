<template>
  <div class="app-comment__item">
    <img :src="comment.avatarUrl" alt="">
    <div class="content-wrapper">
      <div class="content">
        <span class="nickname">{{ comment.nickname }} : </span>
        <span>{{ comment.content }}</span>
      </div>
      <div class="time">
        {{ formateTime(comment.time) }}
      </div>
    </div>
    <div class="actions">
      <div class="svg warn">举报 <el-divider style="border-left:none;background-color: rgb(73,73,66);"
          direction="vertical" /></div>
      <div @click="likeComment" class="svg">
        <svg-icon v-if="comment.lieked" name="unlike" style="margin-right: 3px;"></svg-icon>
        <svg-icon v-else name="dianzan" style="margin-right: 3px;"></svg-icon>
        <div>
          {{ comment.likeCount }}
        </div>
      </div>
      <el-divider style="border-left:none;background-color: rgb(73,73,66);" direction="vertical" />
      <svg-icon class="svg" name="share"></svg-icon>
      <el-divider style="border-left:none;background-color: rgb(73,73,66);" direction="vertical" />
      <svg-icon class="svg" name="comment"></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { formateTime } from '@/util/timeFormat'
import { likeCommentApi, type CType } from '@/api/comment'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
const route = useRoute()
export interface Comment {
  avatarUrl: string
  nickname: string
  content: string
  lieked: boolean
  time: string | number
  likeCount: number
  userId: number
  commentId: number
  [propName: string]: any
}
const props = defineProps({
  comment: {
    type: Object as PropType<Comment>,
    default: () => { }
  },
  type: {
    type: Number as PropType<CType>,
    default: 0
  }
})

const emits = defineEmits(['likeComment'])
const likeComment = () => {
  const t = props.comment.lieked ? 0 : 1
  likeCommentApi({
    id: Number(route.query.id),
    cid: props.comment.commentId,
    type: props.type,
    t
  }).then((res: any) => {
    const message = props.comment.lieked ? '取消点赞成功' : '点赞成功'
    if (res.code === 200) {
      ElMessage.success(message)
      emits('likeComment')
    } else {
      ElMessage.info(res.data.msg)
    }
  })

}

</script>

<style scoped lang="scss">
.app-comment__item {
  padding: 14px 0 20px 0;
  border-bottom: 1px solid rgb(54, 54, 54);
  display: flex;
  align-items: center;
  position: relative;

  &:hover {
    .actions {
      .warn {
        opacity: 1;
      }
    }
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 12px;
    cursor: pointer;
  }

  .content-wrapper {
    display: flex;
    height: 36px;
    flex-direction: column;
    justify-content: space-between;
    font-size: 12px;

    .content {
      .nickname {
        color: rgb(78, 153, 230);
        cursor: pointer;

        &:hover {
          color: rgb(179, 206, 229);
        }
      }
    }

    .time {
      color: var(--v-m-text-dark-color)
    }
  }

  .actions {
    position: absolute;
    right: 12px;
    bottom: 6px;
    display: flex;
    align-items: center;

    .warn {
      color: var(--v-m-text-dark-color);
      font-size: 12px;
      opacity: 0;

      &:hover {
        color: var(--v-m-text-color);
      }
    }

    .svg {
      display: flex;
      align-items: center;
      font-size: 13px;
      cursor: pointer;

      div {
        font-size: 12px;
        color: var(--v-m-text-dark-color);
      }
    }
  }
}
</style>