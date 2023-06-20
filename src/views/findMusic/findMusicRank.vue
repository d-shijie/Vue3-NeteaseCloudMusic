<template>
  <div class="find-music-rank">
    <subTitle :enabled="false" title="官方榜" />
    <div class="top-rank">
      <div v-for="(item, index) in officialRankList" :key="index" class="item">
        <officialRank :content="item" />
      </div>

    </div>

    <subTitle :enabled="false" title="全球榜" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import subTitle from '@/components/SubTitle/subTitle.vue';
import officialRank from './findMusicRank/officialRank.vue';
import { getMusicCategoryRankApi } from '@/api/playlist'

const officialRankList = ref([])
const getMusicCategoryRank = () => {
  getMusicCategoryRankApi().then(res => {

    officialRankList.value = res.data.list.slice(0, 4)
    console.log(officialRankList.value);

  })
}
getMusicCategoryRank()
</script>

<style scoped lang="scss">
.top-rank {
  width: 100%;

  .item {
    width: 100%;
    display: flex;
    justify-content: start;
  }
}
</style>