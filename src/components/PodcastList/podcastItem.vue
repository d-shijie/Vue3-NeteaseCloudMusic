<template>
  <div class="podcast-item">
    <div class="cover" @click="coverClick">
      <img :src="dj.coverImg" alt="">
      <div class="svg">
        <svg-icon style="font-size: 12px;" name="play_red"></svg-icon>
      </div>
    </div>
    <div class="item">
      <div class="title">{{ dj.title }}</div>
      <div class="tag">{{ dj.tag }}</div>
      <div class="info">
        <span class="name">{{ dj.creator }}</span>
        <span class="palycount">
          <svg-icon style="font-size: 10px;margin-right: 3px;" name="play_outline"></svg-icon>
          {{ formatCount(dj.playcount) }}
        </span>
        <span class="time">
          <svg-icon style="font-size: 10px;margin-right: 3px;" name="time"></svg-icon>
          {{ stampToMin(dj.duration) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCount } from '@/util';
import { stampToMin } from '@/util/timeFormat';
import { ElMessage } from 'element-plus';
import type { PropType } from 'vue';
export interface Dj {
  coverImg: string
  title: string
  tag: string | string[]
  creator: string
  playcount: number
  duration: number
  id: number
}
defineProps({
  dj: {
    type: Object as PropType<Dj>,
    default: () => { }
  }
})

const coverClick = () => {
  ElMessage.info('接口获取的音频URL暂时都为NULL 此处只做展示')
}
</script>

<style scoped lang="scss">
.podcast-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 75px;

  &:hover {
    background-color: var(--v-m-hover-bgc);
    border-radius: 5px;
  }

  .cover {
    position: relative;
    margin-right: 6px;

    .svg {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: #fff;
      right: 5px;
      bottom: 7px;
    }

    img {
      width: 75px;
      height: 75px;
      border-radius: 5px;
      position: relative;
      top: 2px;
    }
  }

  .item {
    color: var(--v-m-text-dark-color);
    font-size: 12px;

    .tag {
      margin: 6px 0;

      display: inline-block;
      padding: 2px;
      border: 1px solid rgb(73, 73, 73);
    }

    .title {
      font-size: 14px;
      color: var(--v-m-text-color)
    }

    .info {
      display: flex;
      align-items: center;

      span {
        display: inline-block;
        display: flex;
        align-items: center;
        margin-right: 8px;
      }

      .name {
        max-width: 118px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>