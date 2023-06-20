<template>
  <div :style="{ width }" class="playlist-cover">

    <div @click="gotoDetail" class="cover" ref="playlistCoverRef">
      <div class="text">
        <slot name="text"></slot>
      </div>
      <img :src="cover.picUrl" alt="">
      <div v-if="cover.playcount" class="play-count">
        {{ formatCount(cover.playcount) }}
      </div>
      <div v-if="cover.nickname" class="creator">
        {{ cover.nickname }}
      </div>
      <div class="play-icon"></div>
    </div>
    <div @click="gotoDetail" class="desc">
      {{ cover.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCount } from '@/util/index'
import type { PropType } from 'vue';
import { useRouter } from 'vue-router';
export interface PlaylistCover {
  id: number | string
  playcount: number
  nickname?: string
  name?: string
  picUrl: string
  path: string
}
const props = defineProps({
  cover: {
    type: Object as PropType<PlaylistCover>,
    default: () => { }
  },
  height: {
    type: String,
    default: '175px'
  },
  width: {
    type: String,
    default: '175px'
  }
})


const router = useRouter()
const gotoDetail = () => {
  router.push({
    path: props.cover.path,
    query: {
      id: props.cover.id
    }
  })
}
</script>

<style scoped lang="scss">
.playlist-cover {
  margin-bottom: 12px;
}

.cover {
  position: relative;
  font-size: 14px;

  cursor: pointer;
  margin-bottom: 5px;


  .text {
    position: absolute;
    left: 50%;
    top: 65%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    .play-icon {
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: 100%;
    max-width: 238px;
    max-height: 238px;
    background-size: 100% auto;
    border-radius: 0.25em;
  }

  .play-count {
    position: absolute;
    right: 5px;
    top: 5px;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 13px;

    &::before {
      content: '';
      width: 16px;
      height: 16px;

      display: inline-block;
      font-size: 10px;
      background: url('@/icons/svg/playlist_play.svg') no-repeat;
      background-size: 100% 100%;

    }
  }

  .play-icon {
    opacity: 0;
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 10px;
    border-radius: 50%;
    justify-content: center;

    &::before {
      content: '';
      width: 16px;
      height: 16px;
      position: relative;
      left: 2px;
      display: inline-block;
      font-size: 10px;
      background: url('@/icons/svg/play_red.svg') no-repeat;
      background-size: 100% 100%;

    }
  }

  .creator {
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: flex;
    align-items: center;

    &::before {
      content: '';
      width: 14px;
      height: 14px;
      position: relative;
      left: -3px;
      display: inline-block;
      font-size: 10px;
      background: url('@/icons/svg/person.svg') no-repeat;
      background-size: 100% 100%;

    }
  }
}

.desc {

  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-wrap: break-all;
  font-size: 14px;


  &:hover {
    color: #fff;
    cursor: pointer;
  }
}
</style>