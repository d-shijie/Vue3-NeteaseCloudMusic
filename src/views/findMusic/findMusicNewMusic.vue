<template>
  <div class="find-music-new-music">
    <div class="tabs flex items-center rounded-3xl border-1 border-solid ">
      <span @click="currentTab = 'music'"
        :style="{ color: currentTab === 'music' ? 'rgb(215,215,215)' : 'rgb(124,124,124' }"
        :class="{ 'active': currentTab === 'music' }"
        class=" rounded-3xl px-30px py-5px text-sm cursor-pointer">新歌速递</span>
      <span @click="currentTab = 'ablum'" style="color:var(--v-m-text-dark-color)"
        :style="{ color: [(currentTab === 'ablum' ? 'rgb(215,215,215)' : 'rgb(124,124,124')], }"
        :class="{ 'active': currentTab === 'ablum' }"
        class=" rounded-3xl px-30px py-5px text-sm cursor-pointer">新碟上架</span>
    </div>
    <div class="w-100%" v-show="currentTab === 'music'">
      <div class="tab w-100% mt-24px mb-15px flex items-center justify-between">
        <div class="search-params flex ">
          <span @click="current.musicType = item.value"
            :style="{ color: current.musicType === item.value ? 'rgb(215,215,215)' : 'rgb(124,124,124' }"
            class="mr-24px text-sm cursor-pointer" v-for="(item, index) in musicSearchParams" :key="index">
            {{ item.name }}
          </span>
        </div>
        <div class="music-list flex items-center">
          <span class="play  mr-15px flex items-center px-10px py-5px text-13px  rounded-xl"><svg-icon name="play"
              class="mr-3px"></svg-icon> 播放全部</span>
          <span class="collect text-13px flex items-center px-10px py-5px  rounded-xl"><svg-icon name="collect"
              class="mr-3px"></svg-icon> 收藏全部</span>
        </div>
      </div>
      <div class="list">
        <ul>
          <li @dblclick="handlePlay(item.mp3Url, item.id)" :style="{ background: index % 2 ? '' : 'rgb(47, 47, 47)' }"
            class="hover cursor-pointer py-12px px-12px flex flex-nowrap items-center" v-for="(item, index) in newMusics"
            :key="index">
            <span class="over-e mr-10px w-24px">{{ indexMethod(index) }}</span>
            <span class="over-e mr-10px flex-1 flex items-center ">
              <img @click="handlePlay(item.mp3Url, item.id)" :src="item.album.picUrl" alt=""
                class="w-68px h-68px rounded-sm mr-12px">
              {{ item.name }}</span>
            <span class="over-e mr-10px w-200px">{{ formatAr(item.artists) }}</span>
            <span class="over-e mr-10px w-200px">{{ item.album.name }}</span>
            <span class="over-e w-54px">{{ stampToMin(item.duration) }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="search" v-show="currentTab === 'ablum'">
      2
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { getNewMusicsApi, getMusicUrlApi } from '@/api/music'
import { formatAr, indexMethod } from '@/util/index'
import { stampToMin } from '@/util/timeFormat'
import { useGlobalStore } from '@/stores/modules/global'
const globalStore = useGlobalStore()
const currentTab = ref<'music' | 'ablum'>('music')
const musicSearchParams = ref([
  { name: '全部', value: '0' },
  { name: '华语', value: '7' },
  { name: '欧美', value: '96' },
  { name: '日本', value: '8' },
  { name: '韩国', value: '16' }
])
const current = reactive({
  musicType: '0',
  albumType: 'ALL'
})

const newMusics = ref<any[]>([])
const getNewMusics = () => {
  getNewMusicsApi(current.musicType).then(res => {

    newMusics.value = res.data.data
  })
}
getNewMusics()

const handlePlay = (url: string, id: number) => {
  getMusicUrlApi({
    id,
    level: globalStore.currentMusicLevel
  }).then((res: any) => {
    globalStore.setAudioUrlAndId(res.data.data[0].url, id)
    globalStore.audioPlay()
  })
}

watch(currentTab, (val) => {
  console.log(val);
})
watch(() => current.musicType, () => {
  getNewMusics()
})

</script>

<style scoped lang="scss">
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

.hover:hover {
  background-color: var(--v-m-hover-bgc) !important;
}

.active {
  background-color: rgb(102, 102, 102);

}
</style>