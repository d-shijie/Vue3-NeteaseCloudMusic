<template>
  <div class="comment">
    <el-input v-model="commentContent" type="textarea" resize="none" :rows="3" maxlength="140" show-word-limit></el-input>
    <div class="comment-btns">
      <div class="left">
        <svg-icon class="svg" name="topic"></svg-icon>
        <svg-icon class="svg" name="@"></svg-icon>
        <svg-icon class="svg" name="smile"></svg-icon>
      </div>
      <div class="right">
        <div @click="hanldeComment" class="btn">
          发送
        </div>
      </div>
    </div>
    <h5 class="subtitle">精彩评论</h5>
    <CommentItem @like-comment="likeComment" :type="type" :comment="item" v-for="(item, index) in hotComments"
      :key="index" />
    <div class="pagination-wrapper ">
      <div class="more-btn">更多精彩评论 ></div>
    </div>
    <h5 class="subtitle">最新评论</h5>
    <CommentItem @like-comment="likeComment" :type="type" :comment="item" v-for="(item, index) in comments"
      :key="index" />
    <div class="pagination-wrapper">
      <slot name="pagination"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue';
import CommentItem, { type Comment } from './commentItem.vue';
import type { CType } from '@/api/comment'
export type Comments = Array<Comment>
const commentContent = ref('')
defineProps({
  hotComments: {
    type: Array as PropType<Comments>,
    default: () => []
  },
  comments: {
    type: Array as PropType<Comments>,
    default: () => []
  },
  type: {
    type: Number as PropType<CType>,
    default: 0
  }
})
const emits = defineEmits(['hanldeComment', 'likeComment'])
const hanldeComment = () => {
  emits('hanldeComment', commentContent.value)
  commentContent.value = ''
}
const likeComment = () => {
  emits('likeComment')
}
</script>

<style scoped lang="scss">
.comment {
  padding: 0 30px 20px;

  :deep(.el-textarea) {

    .el-textarea__inner {
      background-color: rgb(58, 58, 58) !important;
      box-shadow: none !important;
      color: var(--v-m-text-color);
    }

    .el-input__count {
      background-color: transparent;
    }
  }

  .comment-btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 6px;

    .left {
      display: flex;
      align-items: center;

      .svg {
        font-size: 20px;
        margin-right: 6px;
        cursor: pointer;
      }
    }

    .right {
      .btn {
        padding: 6px 12px;
        border: 1px solid rgb(75, 75, 75);
        border-radius: 2em;
        font-size: 14px;
        cursor: pointer;

        &:hover {
          background-color: rgb(54, 54, 54);
        }
      }
    }
  }
}

.pagination-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 12px;

  :deep(.el-pagination) {
    button {
      background-color: rgb(58, 58, 58) !important;
      border-radius: 5px;
      color: var(--v-m-text-color);

      &:hover {
        background-color: transparent !important;
      }
    }

    .el-pager {
      li {
        background-color: rgb(43, 43, 43);
        border: 1px solid rgb(54, 54, 54);
        color: var(--v-m-text-color);
        border-radius: 5px;

        &:hover {
          border: none;
        }
      }

      .is-active {
        background-color: rgb(236, 65, 65);
      }
    }
  }
}

.more-btn {
  padding: 8px 16px;
  border: 1px solid rgb(75, 75, 75);
  border-radius: 2em;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: rgb(54, 54, 54);
  }
}

.subtitle {
  margin-bottom: 6px;
}
</style>