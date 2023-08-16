<template>
  <div class="flex px-20px py-10px w-full bg-#2f2f2f cursor-default hover:bg-#373737">
    <section class="flex-1 flex items-center">
      <span class="cover relative">
        <img class="w-54px h-54px rounded mr-10px" :src="props.cover" alt="">
        <div
          class="icon flex items-center justify-center absolute start-40% top-50% -translate-x-50% -translate-y-50% w-30px h-30px rounded-full bg-#fff opacity-80">
          <svg-icon class="text-14px relative left-2px" name="play_red"></svg-icon>
        </div>
      </span>

      <span class="text-15px">{{ props.name }}</span>
    </section>
    <section class="text-13px text-#666 flex-1 flex items-center justify-between">
      <span class="flex-1">歌曲：{{ formatCount(props.musicCount) }}首</span>
      <span class="flex-1 overflow-hidden text-ellipsis text-nowrap">by {{ props.creator }}</span>
      <span class=" flex-1 flex items-center"> <svg-icon class="text-20px mr-5px" name="collect"></svg-icon> {{
        formatCount(props.subCount) }}</span>
      <span class="flex-1 flex items-center"><svg-icon class="text-20px mr-5px" name="play"></svg-icon> {{
        formatCount(props.playCount)
      }}</span>
    </section>
  </div>
</template>

<script setup lang="ts">
import { formatCount } from '@/util'
interface Props {
  cover: string
  name: string
  musicCount?: number
  playCount?: number
  subCount?: number
  creator: string
}
const props = withDefaults(defineProps<Props>(), {
  cover: 'https://img1.baidu.com/it/u=950943067,1138707327&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  name: '',
  musicCount: 0,
  playCount: 0,
  subCount: 0,
  creator: 'Aryla'
})
</script>

<style scoped lang="scss">
.cover {
  .icon {
    opacity: 0;
    transition: all 0.5s ease-in-out;
  }

  &:hover {
    .icon {
      opacity: 0.7;
    }
  }
}
</style>