<template>
  <div class="personalized-recommendations">
    <div class="banner-wrapper">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item, index) in banners" :key="index">
          <img :src="item.imageUrl" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div>111111</div>
  </div>
</template>

<script setup lang="ts">
import { getBannerApi } from '@/api/login';
import { ref } from 'vue';
const banners = ref<any[]>([])
const getBanner = () => {
  getBannerApi(0).then(res => {
    banners.value = res.data.banners
  })
}
getBanner()
</script>

<style scoped lang="scss">
.personalized-recommendations {
  padding: 0 30px;
  max-width: 1098px;
  min-width: 765px;
  width: 75vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .banner-wrapper {
    width: 100%;

    img {
      border-radius: 0.45em;
      width: 100%;
      height: 100%;
    }

    :deep(.el-carousel__button) {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
  }

}
</style>