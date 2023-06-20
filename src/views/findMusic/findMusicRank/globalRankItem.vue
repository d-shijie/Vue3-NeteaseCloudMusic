<template>
  <div class="global-rank-item">
    <div @click="gotoDetail" class="cover">
      <img :src="props.content.coverImgUrl" alt="">
      <div class="play">
        <svg-icon name="play_red"></svg-icon>
      </div>
      <div class="play-count">
        {{ formatCount(props.content.playCount) }}
      </div>
    </div>
    <div class="name">{{ props.content.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { formatCount } from '@/util'
import { useRouter } from 'vue-router'
const router = useRouter()
interface RankType {
  name: string
  playCount: number
  id: number
  coverImgUrl: string
  [propName: string]: any
}
interface Props {
  content: RankType
}
const props = withDefaults(defineProps<Props>(), {
  content: () => ({ name: '', playCount: 0, id: 0, coverImgUrl: '' })
})
const gotoDetail = () => {
  router.push({
    path: '/index/playlist-detail',
    query: {
      id: props.content.id
    }
  })
}
</script>

<style scoped lang="scss">
.cover {
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;

  img {
    width: 100%;
    border-radius: 10px;
    height: 100%;
  }

  &:hover {
    .play {
      opacity: 1;
    }
  }

  .play-count {
    position: absolute;
    right: 4px;
    top: 4px;
    color: #fff;
    font-size: 13px;
  }

  .play {
    opacity: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, .8);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>