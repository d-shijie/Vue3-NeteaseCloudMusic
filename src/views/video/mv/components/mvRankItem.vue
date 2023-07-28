<template>
  <div class="flex w-100% justify-center items-center">
    <h3 class="w-10% text-center text-#666666">{{ indexMethod(props.index) }}</h3>
    <div @click="handleClick" class="w-40% relative cursor-pointer mr-10px">
      <img class="w-100% rounded-l h-90px" :src="props.cover" alt="">
      <span style="font-size:12px" class="absolute end-5px top-5px flex items-center">
        <svg-icon name="play" class="mr-1px"></svg-icon>
        {{ formatCount(props.playCount) }}</span>
    </div>
    <div class="w-50% h-90px flex flex-col items-start">
      <div @click="handleClick" style="font-size: 14px;"
        class=" hover:text-#fff mb-24px w-60% cursor-pointer text-ellipsis whitespace-nowrap overflow-hidden">{{
          props.title
        }}</div>
      <div style="font-size: 13px;" class="cursor-pointer text-#666666 hover:text-#8ea8af">{{ formatAr(props.artist) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCount, formatAr, indexMethod } from '@/util'
interface Props {
  cover: string
  playCount: number
  title: string
  artist: Artist[]
  index: number
}
type Artist = {
  name: string
  id: number
}
const props = withDefaults(defineProps<Props>(), {
  cover: '',
  playCount: 0,
  title: '',
  artist: () => [],
  index: 0
})

const emits = defineEmits(['handleClick'])

const handleClick = () => {
  emits('handleClick')
}
</script>

<style scoped></style>