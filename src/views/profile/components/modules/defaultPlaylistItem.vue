<template>
  <div :style="{ opacity: props.id ? '1' : '0' }">
    <section @click="gotoDetail" class="cover relative cursor-pointer">
      <img class="w-full" :src="props.cover" alt="">
      <div class="absolute top-5px end-5px flex items-center text-13px">
        <svg-icon name="play"></svg-icon> {{ formatCount(props.playCount) }}
      </div>
      <div class="btn absolute end-10px bottom-10px w-40px h-40px rounded-full bg-#fff flex items-center justify-center">
        <svg-icon class="text-18px relative left-2px" name="play_red"></svg-icon>
      </div>
    </section>
    <div class="text-15px my-5px">
      {{ props.name }}
    </div>
    <div class="text-13px text-#666666">
      {{ formatCount(props.musicCount) }}首
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { formatCount } from '@/util'
const router = useRouter()

interface Props {
  id: number
  cover: string
  playCount?: number
  musicCount: number
  name: string
}
const props = withDefaults(defineProps<Props>(), {
  id: 0,
  cover: 'https://img1.baidu.com/it/u=950943067,1138707327&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  playCount: 0,
  musicCount: 0,
  name: ''
})

const gotoDetail = () => {
  if (props.id) {
    router.push({
      path: '/index/playlist-detail',
      query: {
        id: Number(props.id)
      }
    })
  }

}
</script>

<style scoped lang="scss">
.cover {
  .btn {
    transition: all .5s ease-in-out;
    opacity: 0;
  }

  &:hover {
    .btn {
      opacity: 1;
    }
  }
}
</style>