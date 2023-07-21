<template>
  <div class="dj-detail">
    <DjDetailHeader />
    <div class="tabs">
      <div @click="activeTab = 'detail'" class="tab" :class="{ 'active': activeTab === 'detail' }">详情</div>
      <div @click="activeTab = 'programs'" class="tab" :class="{ 'active': activeTab === 'programs' }">声音</div>
      <div @click="activeTab = 'recommend'" class="tab" :class="{ 'active': activeTab === 'recommend' }">推荐</div>
    </div>
    <DjDetailInfo v-if="activeTab === 'detail'" />
    <DjDetailPrograms v-if="activeTab === 'programs'" />
    <Suspense v-if="activeTab === 'recommend'">
      <template #default>
        <DjDetailRecommend @handle-click="rcommendClick" />
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DjDetailHeader from './djDetailHeader.vue';
import DjDetailPrograms from './djDetailPrograms.vue';
import DjDetailInfo from './djDetailInfo.vue'
import DjDetailRecommend from './djDetailRcommend.vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const activeTab = ref<'detail' | 'programs' | 'recommend'>('programs')

const rcommendClick = (id: any) => {
  router.push({
    path: '',
    query: {
      id
    }
  })
  activeTab.value = 'programs'
}
</script>

<style scoped lang="scss">
.tabs {
  display: flex;
  font-size: 14px;
  padding: 0 30px 20px;

  .tab {
    margin-right: 24px;
    display: flex;
    cursor: pointer;
    align-items: center;

    &:hover {
      color: #fff;
    }
  }

  .active {
    padding: 3px 0;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 3px solid rgb(236, 65, 65)
  }
}
</style>