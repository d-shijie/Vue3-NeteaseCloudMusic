<template>
  <div>
    <section v-if="detailInfo">
      <h2>{{ detailInfo.name }}</h2>
      <div class="flex justify-between text-13px text-#a9a9a9">
        <span>
          专辑：<a class="text-#8a8a8a cursor-pointer">{{ detailInfo.al.name }}</a>
        </span>
        <span>
          歌手：<a class="text-#2e5b8e cursor-pointer hover:text-#306cb2">{{ formatAr(detailInfo.ar) }}</a>
        </span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getMusicDetailApi, getMusicLyricApi } from '@/api/music'
import { formatAr } from '@/util'
interface Props {
  id: number
}
const props = withDefaults(defineProps<Props>(), {
  id: 0
})

const detailInfo = ref()
const getMusicDetail = () => {
  getMusicDetailApi(props.id).then(res => {

    detailInfo.value = res.data.songs[0]
  })
}
getMusicDetail()

const lyric = ref()
const getMusicLyric = () => {
  getMusicLyricApi(props.id).then(res => {

    lyric.value = res.data.lrc.lyric
  })
}
getMusicLyric()
</script>

<style scoped></style>