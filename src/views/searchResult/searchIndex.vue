<template>
  <div class="p-30px">
    <header class="font-bold flex items-center ">
      <span class="text-20px mr-3px">搜索</span>
      <span class="text-21px">
        {{ keywords }}
      </span>
    </header>
    <SubTab with-query class="my-20px" :tabs="tabs"></SubTab>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import {useRoute} from 'vue-router'
import SubTab, {type Tab} from '@/components/SubTab/subTab.vue'
const route = useRoute()
const keywords = ref('')
keywords.value = String(route.query.keywords)

const tabs = ref<Array<Tab>>([
  {
    tab: '单曲',
    path: '/index/search/single-music'
  },
  {
    tab: '歌手',
    path: '/index/search/singer'
  },
  {
    tab: '专辑',
    path: '/index/search/album'
  },
  {
    tab: '视频',
    path: '/index/search/video'
  },
  {
    tab: '歌单',
    path: '/index/search/playlist'
  },
  {
    tab: '歌词',
    path: '/index/search/lyric'
  },
  {
    tab: '播客',
    path: '/index/search/dj'
  },
  {
    tab: '声音',
    path: '/index/search/program'
  },
  {
    tab: '用户',
    path: '/index/search/user'
  },
])
watch(route, () => {
  keywords.value = String(route.query.keywords)
})
</script>

<style scoped lang="scss">
:deep(.item) {
  &:hover {
    background-color: #373737 !important;
  }
}
</style>