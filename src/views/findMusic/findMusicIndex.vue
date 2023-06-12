<template>
  <div class="find-music-index">
    <div class="tabs">
      <SubTab :tabs="tabs" />
    </div>
    <div class="router-wrapper">
      <Suspense>
        <RouterView class="router-wrapper__page" />
      </Suspense>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SubTab from '@/components/SubTab/subTab.vue';
import type { Tab } from '@/components/SubTab/subTab.vue';
const tabs = ref<Tab[]>([
  {
    tab: '个性推荐',
    path: '/index/find-music/personalized-recommendations'
  },
  {
    tab: '专属定制',
    path: '/index/find-music/exclusive-custome'
  },
  {
    tab: '歌单',
    path: '/index/find-music/find-music-playlist'
  },
  {
    tab: '排行榜',
    path: '/index/find-music/rank'
  },
  {
    tab: '歌手',
    path: '/index/4'
  },
  {
    tab: '最新音乐',
    path: '/index/5'
  },
])
</script>

<style scoped lang="scss">
.find-music-index {
  .tabs {
    padding: 30px;
  }

  .router-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 250px);
    overflow-y: auto;

    &__page {
      padding: 0 30px;
      max-width: 1098px;
      min-width: 765px;
      width: 75vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }


  }
}
</style>