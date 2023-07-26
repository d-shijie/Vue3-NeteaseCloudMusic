<template>
  <div class='mb-30px'>
    <div @click="handleClick" class="w-100% relative cursor-pointer">
      <img class="w-100% h-144px rounded-l" :src="props.coverUrl" alt="">
      <span style="font-size:13px" class="flex items-center absolute end-5px top-5px"><svg-icon
          style="font-size: 14px; margin-right: 3px;" name="play"></svg-icon> {{
            formatCount(props.playCount) }}</span>
    </div>
    <div @click="handleClick" class="my-5px cursor-pointer hover:text-#fff" style="font-size:16px">{{ props.title }}</div>
    <div class="text-#878787 hover:text-#afafaf cursor-pointer" v-if="props.artist" style="font-size:12px">{{
      formatAr(props.artist) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCount, formatAr } from '@/util'
interface Props {
  coverUrl: string
  title: string
  playCount: number
  artist?: Artist | Artist[]
}
type Artist = {
  name: string
  id: number
}
const props = withDefaults(defineProps<Props>(), {
  coverUrl: '',
  title: '',
  playCount: 0,
  artist: () => []
})

const emits = defineEmits(['handleClick'])

const handleClick = () => {
  emits('handleClick')
}
</script>

<style scoped></style>