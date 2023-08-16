<template>
  <div :style="{ display: props.name ? 'flex' : 'none' }" class="flex w-full">
    <section @click="gotoDetail" class="mr-30px cursor-pointer">
      <img class="w-146px h-146px rounded" :src="props.cover" alt="">
    </section>
    <section class="w-full">
      <h4 class="m-0 mb-10px flex items-center">{{ props.name }}
        <span @click="play(musics[0].id)"
          class="ml-10px w-18px h-18px rounded-full border-1px border-solid border-#d1d1d1 flex items-center justify-center">
          <svg-icon class="text-12px relative start-1px cursor-pointer" name="play"></svg-icon>
        </span>
      </h4>
      <ul class="w-full">
        <li @click="play(item.id)" class="cursor-default item flex py-10px  text-13px w-full text-#666666 rounded"
          :style="{ background: (index % 2) ? '#2b2b2b' : '#2f2f2f' }" v-for="(item, index) in musics" :key="index">
          <span class="flex-1 flex items-center">
            <span class="mx-3px ml-20px"> {{ indexMethod(index) }}</span>
            <span class="mx-3px"><svg-icon class="text-16px" name="like_outline"></svg-icon> </span>
            <span class="mx-3px"><svg-icon class="text-16px" name="download"></svg-icon> </span>
            <span class="mx-3px text-#d1d1d1"> {{ item.name }}</span>
          </span>
          <span class="w-64px">
            {{ stampToMin(item.dt) }}
          </span>
        </li>
      </ul>
      <div class="text-#666 text-right text-13px mt-10px">
        <span @click="gotoDetail" class="cursor-pointer hover:text-#878787"> 查看全部{{ total }}首></span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getPlaylistMusicApi } from '@/api/playlist'
import { indexMethod, stampToMin } from '@/util';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '@/stores/modules/global';
import type { Playlist } from '@/stores/types/global';
import { getMusicUrlApi } from '@/api/music'
interface Props {
  id: number
  cover: string
  name: string
}
const props = withDefaults(defineProps<Props>(), {
  id: 0,
  cover: 'https://img1.baidu.com/it/u=950943067,1138707327&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  name: ''
})
const router = useRouter()
const globalStore = useGlobalStore()
const musics = ref<Playlist[]>([])
const total = ref(0)
const getPlaylistMusic = () => {
  getPlaylistMusicApi({
    id: props.id
  }).then(res => {
    total.value = res.data.songs.length
    musics.value = res.data.songs.slice(0, 10)
  })
}
getPlaylistMusic()

const gotoDetail = () => {
  router.push({
    path: '/index/playlist-detail',
    query: {
      id: props.id
    }
  })
}

const play = (id: number) => {
  globalStore.setCurrentPlaylist(musics.value)
  getMusicUrlApi({
    id,
    level: globalStore.currentMusicLevel
  }).then(res => {
    globalStore.setAudioUrlAndId(res.data.data[0].url, id)
    globalStore.audioPlay()
  })
}
</script>

<style scoped lang="scss">
.item {
  &:hover {
    background: #373737 !important
  }
}
</style>