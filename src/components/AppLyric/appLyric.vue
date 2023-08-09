<template>
  <div>
    <section v-if="detailInfo">
      <h2>{{ detailInfo.name }}</h2>
      <div class="flex justify-between text-13px text-#a9a9a9">
        <span class="overflow-hidden text-ellipsis text-nowrap w-40%">
          专辑：<a class="text-#8a8a8a cursor-pointer">{{ detailInfo.al.name }}</a>
        </span>
        <span class="overflow-hidden text-ellipsis text-nowrap w-40%">
          歌手：<a class="text-#2e5b8e cursor-pointer hover:text-#306cb2">{{ formatAr(detailInfo.ar) }}</a>
        </span>
      </div>
      <section>
        <ul class="h-400px overflow-auto mt-20px">
          <li class="py-10px text-#606060 text-14px leading-24px" v-for="item in lyric" :key="item.time">
            {{ item.text }}
          </li>
        </ul>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { getMusicDetailApi, getMusicLyricApi } from '@/api/music'
import { formatAr } from '@/util'
import { useGlobalStore } from '@/stores/modules/global';
const globalStore = useGlobalStore()
interface Props {
  id: number,
}
const props = withDefaults(defineProps<Props>(), {
  id: 0,
})

const detailInfo = ref()
const getMusicDetail = () => {
  getMusicDetailApi(props.id).then(res => {
    detailInfo.value = res.data.songs[0]
  })
}
getMusicDetail()

const lyric = ref<any[]>([])
const getMusicLyric = () => {
  getMusicLyricApi(props.id).then(res => {
    const arr = res.data.lrc.lyric.split('\n')
    arr.pop()
    const regex = /\[\d{2}:\d{2}\.\d{2,3}\]/g;
    arr.forEach((item: string) => {
      const matches = item.match(regex);
      if (item.replace(regex, '').trim()) {
        lyric.value.push({
          time: matches ? matches[0].replace(/^\[|\]$/g, "") : 0,
          text: item.replace(regex, '').trim()
        })
      }
    })
  })
}
getMusicLyric()

const timer = ref()
globalStore.$subscribe(() => {
  if (globalStore.currentMusicId === props.id) {

    clearInterval(timer.value)
    console.log(globalStore.isPlay);

    if (globalStore.isPlay) {
      timer.value = setInterval(() => {
        console.log(globalStore.appAudio.currentTime);
      }, 1000)
    }
  }
})
</script>

<style scoped></style>