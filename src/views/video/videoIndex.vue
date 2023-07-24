<template>
  <div class="video">
    <div class="page">
      <div class="w-100% flex justify-start mb-24px">
        <SubTab :tabs="tabs" />
      </div>
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SubTab, { type Tab } from '@/components/SubTab/subTab.vue';

const tabs = ref<Tab[]>([{
  tab: '视频',
  path: '/index/video/video-index'
}, {
  tab: 'MV',
  path: '/index/video/mv-index'
}])
</script>

<style scoped lang="scss">
.video {
  display: flex;
  flex-direction: column;
  align-items: center;

  .page {
    padding: 30px;
    max-width: 1098px;
    min-width: 765px;
    width: 75vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>