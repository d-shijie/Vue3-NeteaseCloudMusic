<template>
  <div>
    <section class="w-60%" v-if="detailInfo">
      <h2 class="overflow-hidden text-ellipsis text-nowrap w-100%">{{ detailInfo.name }}</h2>
      <div class="flex justify-between text-13px text-#a9a9a9">
        <span class="overflow-hidden text-ellipsis text-nowrap w-40%">
          专辑：<a class="text-#8a8a8a cursor-pointer">{{ detailInfo.al.name }}</a>
        </span>
        <span class="overflow-hidden text-ellipsis text-nowrap w-40%">
          歌手：<a class="text-#2e5b8e cursor-pointer hover:text-#306cb2">{{ formatAr(detailInfo.ar) }}</a>
        </span>
      </div>
      <section class="h-400px overflow-auto mt-20px">
        <ul ref="lyricRef">
          <li :class="{ 'active-lyric': currentIndex === index }"
            class="text-nowrap overflow-hidden text-ellipsis py-10px text-#606060 text-14px leading-24px"
            v-for="(item, index) in lyric" :key="item.time">
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
import { formatAr, minToSecond } from '@/util'
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
        const minStr = matches ? matches[0].replace(/^\[|\]$/g, "").replace(/[:.]\d+$/, '') : '00:00'
        lyric.value.push({
          time: minToSecond(minStr),
          text: item.replace(regex, '').trim()
        })
      }
    })
    lyric.value.forEach((item, index) => {
      item.index = index
    })
  })
}
getMusicLyric()

const currentTime = ref(0)
const currentIndex = ref(0)
const lyricRef = ref()
// 通过props.id globalStore.currentMusicId 判断是否当前为需要歌词的页面 
// 监听appAudio的时间改变进行歌词的时间对应 改变元素高度
const timer = ref()
globalStore.$subscribe(() => {
  if (globalStore.currentMusicId === props.id) {
    clearInterval(timer.value)
    if (globalStore.isPlay) {
      timer.value = setInterval(() => {
        currentTime.value = Number(globalStore.appAudio.currentTime.toFixed(0))
      }, 1000)
    }
  }
})
watch(currentTime, (time) => {
  for (let i = 0; i < lyric.value.length; i++) {
    if (time === lyric.value[i].time) {
      currentIndex.value = i
    }
  }
  lyricRef.value.style.transform = `translateY(${100 - 44 * currentIndex.value}px)`
})
</script>

<style scoped lang="scss">
.active-lyric {
  color: var(--v-m-text-color) !important;
  font-weight: 600 !important;
}
</style>