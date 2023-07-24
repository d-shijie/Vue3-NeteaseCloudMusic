<template>
  <div class="find-music-new-music">
    <div class="tabs flex items-center rounded-3xl border-1 border-solid">
      <span @click="currentTab = 'music'"
        :style="{ color: currentTab === 'music' ? 'rgb(215,215,215)' : 'rgb(124,124,124' }"
        :class="{ active: currentTab === 'music' }" class="rounded-3xl px-30px py-5px text-sm cursor-pointer">新歌速递</span>
      <span @click="currentTab = 'ablum'" style="color: var(--v-m-text-dark-color)"
        :style="{ color: [currentTab === 'ablum' ? 'rgb(215,215,215)' : 'rgb(124,124,124'] }"
        :class="{ active: currentTab === 'ablum' }" class="rounded-3xl px-30px py-5px text-sm cursor-pointer">新碟上架</span>
    </div>
    <div class="w-100%" v-show="currentTab === 'music'">
      <div class="tab w-100% mt-24px mb-15px flex items-center justify-between">
        <div class="search-params flex">
          <span @click="current.musicType = item.value" :style="{
            color: current.musicType === item.value ? 'rgb(215,215,215)' : 'rgb(124,124,124'
          }" class="mr-24px text-sm cursor-pointer" v-for="(item, index) in musicSearchParams" :key="index">
            {{ item.name }}
          </span>
        </div>
        <div class="music-list flex items-center">
          <span class="play mr-15px flex items-center px-10px py-5px text-13px rounded-xl"><svg-icon name="play"
              class="mr-3px"></svg-icon> 播放全部</span>
          <span class="collect text-13px flex items-center px-10px py-5px rounded-xl"><svg-icon name="collect"
              class="mr-3px"></svg-icon> 收藏全部</span>
        </div>
      </div>
      <div class="list">
        <ul>
          <li @dblclick="handlePlay(item.mp3Url, item.id)" :style="{ background: index % 2 ? '' : 'rgb(47, 47, 47)' }"
            class="hover cursor-pointer py-12px px-12px flex flex-nowrap items-center" v-for="(item, index) in newMusics"
            :key="index">
            <span class="over-e mr-10px w-24px">{{ indexMethod(index) }}</span>
            <span class="over-e mr-10px flex-1 flex items-center">
              <img @click="handlePlay(item.mp3Url, item.id)" :src="item.album.picUrl" alt=""
                class="w-68px h-68px rounded-sm mr-12px" />
              {{ item.name }}</span>
            <span class="over-e mr-10px w-200px">{{ formatAr(item.artists) }}</span>
            <span class="over-e mr-10px w-200px">{{ item.album.name }}</span>
            <span class="over-e w-54px">{{ stampToMin(item.duration) }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="w-100%" v-show="currentTab === 'ablum'">
      <div class="tab w-100% mt-24px mb-15px flex items-center justify-between">
        <div class="search-params flex">
          <span @click="current.albumType = item.value" :style="{
            color: current.albumType === item.value ? 'rgb(215,215,215)' : 'rgb(124,124,124'
          }" class="mr-24px text-sm cursor-pointer" v-for="(item, index) in albumSearchParams" :key="index">
            {{ item.name }}
          </span>
        </div>
        <div class="album-list flex items-center">
          <span @click="current.albumNewOrHot = 'hot'" :class="{ 'active-ablum': current.albumNewOrHot === 'hot' }"
            class="recommend flex items-center px-10px py-5px text-13px rounded-xl">推荐</span>
          <div style="color: rgb(53, 53, 53)" class="mx-10px">|</div>
          <span @click="current.albumNewOrHot = 'new'" :class="{ 'active-ablum': current.albumNewOrHot === 'new' }"
            class="all text-13px flex items-center px-10px py-5px rounded-xl">全部</span>
        </div>

      </div>
      <div class="list flex">
        <div class="w-64px">
          <div class="px-12px text-xl leading-none mb-10px text-center">本周新碟</div>
          <div class="time px-12px  text-4xl pb-32px text-center">{{ getNowDay() }}</div>
        </div>
        <div ref="ablumRef" class="ablum-container flex-1 flex flex-wrap justify-between ">
          <div class="album-item mx-10px " v-for="(item, index) in newAlbumList.monthData" :key="index">
            <newAlbum :cover="item.picUrl" :author="item.artist.name" :name="item.name" :info="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { getNewMusicsApi, getMusicUrlApi } from '@/api/music'
import { getNewAlbumApi, type AlbumArea } from '@/api/playlist'
import { formatAr, indexMethod } from '@/util/index'
import { stampToMin } from '@/util/timeFormat'
import { useGlobalStore } from '@/stores/modules/global'
import newAlbum from './findMusicNewMusic/newAlbum.vue'
const globalStore = useGlobalStore()
const currentTab = ref<'music' | 'ablum'>('music')
const musicSearchParams = ref([
  { name: '全部', value: '0' },
  { name: '华语', value: '7' },
  { name: '欧美', value: '96' },
  { name: '日本', value: '8' },
  { name: '韩国', value: '16' }
])

type AlbumSearchParams = {
  name: string
  value: AlbumArea
}
const albumSearchParams = ref<Array<AlbumSearchParams>>([
  { name: '全部', value: 'ALL' },
  { name: '华语', value: 'ZH' },
  { name: '欧美', value: 'EA' },
  { name: '日本', value: 'JP' },
  { name: '韩国', value: 'KR' }
])
const current = reactive({
  musicType: '0',
  offset: 0,
  limit: 10,
  albumType: 'ALL' as AlbumArea,
  albumNewOrHot: 'hot' as 'new' | 'hot'
})

const newMusics = ref<any[]>([])
const getNewMusics = () => {
  getNewMusicsApi(current.musicType).then((res) => {
    newMusics.value = res.data.data
  })
}
getNewMusics()


const newAlbumList = reactive({
  weekData: [] as any[],
  monthData: [] as any[]
})
const getNewAlbum = () => {
  getNewAlbumApi({
    offset: current.offset * current.limit,
    limit: current.limit,
    type: current.albumNewOrHot,
    area: current.albumType
  }).then((res) => {

    newAlbumList.weekData = res.data.weekData
    newAlbumList.monthData = res.data.monthData
  })
}



const handlePlay = (url: string, id: number) => {
  getMusicUrlApi({
    id,
    level: globalStore.currentMusicLevel
  }).then((res: any) => {
    globalStore.setAudioUrlAndId(res.data.data[0].url, id)
    globalStore.audioPlay()
  })
}

const getNowDay = (): string => {
  let str = ''
  const date = new Date()
  const day = date.getDate() + ''
  str = day.length > 1 ? day : '0' + day
  return str
}

watch(currentTab, (val) => {
  if (val === 'ablum') {
    getNewAlbum()
  } else {
    getNewMusics()
  }
})
watch(
  () => current,
  (nVal, oVal) => {
    if (nVal.musicType !== oVal.musicType) {
      getNewMusics()
    } else {
      getNewAlbum()
    }
  },
  { deep: true }
)
// 窗口缩放加载动画
window.addEventListener('resize', () => {
  const ablumItems = document.querySelectorAll('.album-item')
  for (let i = 0; i < ablumItems.length; i++) {
    (ablumItems[i] as HTMLElement).style.animation = 'bounce-in 0.5s ease-in-out'
    setTimeout(function () {
      (ablumItems[i] as HTMLElement).style.animation = "";
    }, 300);
  }
})
</script>

<style scoped lang="scss">
@media screen and (max-width: 1024px) {
  .album-item {
    animation: bounce-in 0.5s ease-in-out;
  }

  .ablum-container {

    .album-item:last-child {
      margin-right: auto
    }
  }

  .ablum-container>* {
    flex-basis: 25%;
    animation: bounce-in 0.5s ease-in-out;
  }
}

@media screen and (min-width: 1024px) {
  .album-item {
    animation: bounce-in 0.5s ease-in-out;
  }

  .ablum-container {
    .album-item :last-child {
      margin-right: auto
    }
  }

  .ablum-container>* {
    flex-basis: 18%;
    animation: bounce-in 0.5s ease-in-out;
  }
}

@keyframes bounce-in {
  0% {
    transform: scale(0.7);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}



.tabs {
  border-color: rgb(85, 85, 85);
}

.search-params {
  span:hover {
    color: var(--m-v-text-color) !important;
  }
}

.music-list {
  span {
    cursor: pointer;
  }

  .play {
    background-color: rgb(236, 65, 65);

    &:hover {
      background-color: rgb(215, 53, 53);
    }
  }

  .collect {
    background-color: rgb(43, 43, 43);
    border: 1px solid rgb(75, 75, 75);

    &:hover {
      background-color: rgb(53, 53, 53);
    }
  }
}

.over-e {
  color: var(--v-m-text-dark-color);
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.album-list {
  span {
    color: var(--v-m-text-dark-color);

    &:hover {
      cursor: pointer;
      color: var(--m-v-text-color) !important;
    }
  }



}

.time {
  position: relative;

  &::after {
    content: '';
    // background-color: rgb(250, 250, 252);
    display: inline-block;
    width: 0;
    height: 0;
    // border-bottom: 10px solid rgb(250, 250, 252);
    border-left: 50px solid transparent;
    border-bottom: 28px solid rgb(250, 250, 252);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10px;
  }
}

.hover:hover {
  background-color: var(--v-m-hover-bgc) !important;
}

.active {
  background-color: rgb(102, 102, 102);
}

.active-ablum {
  background-color: rgb(53, 44, 44);
  color: rgb(236, 65, 65) !important;

  &:hover {
    color: rgb(236, 65, 65) !important;
  }
}
</style>
