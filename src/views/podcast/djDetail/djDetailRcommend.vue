<template>
  <div class="dj-detail-recommend">
    <div @click="handleClick(item.id)" class="item" v-for="item in recommendDjs" :key="item.id">
      <img :src="item.picUrl" alt="">
      <div class="info">
        <div style="font-size: 14px;">
          {{ item.name }}
        </div>
        <div class="info">
          <div><svg-icon name="play_outline" style="margin-right: 3px;font-size: 10px;"></svg-icon> {{ item.playCount }}
          </div>
          <div><svg-icon name="program" style="margin-right: 3px;font-size: 10px;"></svg-icon> {{ item.programCount
          }}</div>
          <div>{{ item.dj.nickname }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getDjCateRecommendApi, getDjDetailApi } from '@/api/dj'
import { useRoute } from 'vue-router';

const emits = defineEmits(['handleClick'])

const route = useRoute()

const detail = ref()
async function getDjDetail () {
  const { data } = await getDjDetailApi(Number(route.query.id))
  detail.value = data.data
}
await getDjDetail()

const recommendDjs = ref<any[]>([])
async function getDjCateRecommend () {
  const { data } = await getDjCateRecommendApi(detail.value.categoryId)
  recommendDjs.value = data.djRadios
}
await getDjCateRecommend()

const handleClick = (id: number) => {
  emits('handleClick', id)
}
</script>

<style scoped lang="scss">
.dj-detail-recommend {
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .item {
    display: flex;
    width: 48%;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;
    border-radius: 10px;

    &:hover {
      background-color: var(--v-m-hover-bgc);
    }

    img {
      width: 60px;
      height: 60px;
      border-radius: 10px;
      margin-right: 12px;

    }

    >.info {
      .info {
        margin-top: 12px;
        font-size: 12px;
        color: var(--v-m-text-dark-color);

        display: flex;
        align-items: center;

        div {
          display: flex;
          align-items: center;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>