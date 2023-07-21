<template>
  <div v-if="detail" class="dj-detail-info">
    <div class="title">
      电台内容简介
    </div>
    <p>{{ detail.desc }}</p>
    <div class="title">
      作者简介
    </div>
    <p></p>
    <div class="title">
      主播简介
    </div>
    <p>{{ detail.dj.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getDjDetailApi } from '@/api/dj';
import { useRoute } from 'vue-router';
const route = useRoute()
const detail = ref()
const getDjDetail = () => {
  getDjDetailApi(Number(route.query.id)).then(res => {
    detail.value = res.data.data
  })
}
getDjDetail()
</script>

<style scoped lang="scss">
.dj-detail-info {
  padding: 10px 30px;

  .title {

    margin-bottom: 12px;
    text-indent: 12px;
    line-height: 20px;
    font-size: 15px;
    font-weight: 600;
    position: relative;

    &::before {
      content: '';
      width: 2px;
      height: 80%;
      background-color: rgb(236, 65, 65);
      display: inline-block;
      position: absolute;
      left: 0;
      bottom: 4px;
    }
  }

  p {
    font-size: 13px;
    color: var(--v-m-text-dark-color);
    margin-bottom: 24px;
  }
}
</style>