<template>
  <div :style="{ height, width }" class="playlist-cover">
    <div class="cover" ref="playlistCoverRef">
      <img src="https://p1.music.126.net/xhSzvDHirgjv95C7999Qvw==/109951165469113989.jpg" alt="">
      <div class="play-count">
        {{ formatCount(111111111) }}
      </div>
      <div class="creator">tttss</div>
      <div class="play-icon"></div>
    </div>
    <div class="desc">我杀杀杀杀杀杀哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇</div>
  </div>
</template>

<script setup lang="ts">
import { formatCount } from '@/util/index'
defineProps({
  cover: {
    type: Object,
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

</script>

<style scoped lang="scss">
.cover {
  position: relative;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    .play-icon {
      opacity: 1;
    }
  }

  img {
    width: 100%;

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

  &:hover {
    color: #fff;
    cursor: pointer;
  }
}
</style>