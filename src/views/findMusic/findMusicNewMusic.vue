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
    <div class="w-100% mt-24px mb-15px flex items-center justify-between" v-show="currentTab === 'music'">
      <div class="search-params flex ">
        <span @click="current.musicType = item.value"
          :style="{ color: current.musicType === item.value ? 'rgb(215,215,215)' : 'rgb(124,124,124' }"
          class="mr-24px text-sm cursor-pointer" v-for="(item, index) in musicSearchParams" :key="index">
          {{ item.name }}
        </span>
      </div>
      <div>1</div>
    </div>
    <div class="search" v-show="currentTab === 'ablum'">
      2
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { getNewMusicsApi } from '@/api/music'
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

const getNewMusics = () => {
  getNewMusicsApi(current.musicType).then(res => {
    console.log(res);
  })
}
getNewMusics()
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

.active {
  background-color: rgb(102, 102, 102);

}
</style>