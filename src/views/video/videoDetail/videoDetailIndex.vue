<template>
  <div class="wrapper flex justify-center">
    <section class="page">
      <section class="flex">
        <div class="flex-1">
          <div class="title  h-40px">
            <h3 @click="router.back()" class="flex items-center cursor-pointer font-normal text-base"> <svg-icon
                style="font-size: 14px;margin-right: 8px;" name="left"></svg-icon>
              {{
                type ? 'MV' :
                '视频' }}详情</h3>
          </div>
          <video width="620" height="352" ref="videoRef" :src="url" autoplay controls></video>
        </div>
        <div class="w-368px">
          <div class="title h-40px">
            <h3>相关音乐</h3>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { getVideoUrlApi } from '@/api/video'
const route = useRoute()
const router = useRouter()
const type = Number(route.query.type)


const url = ref('')
const videoRef = ref()
const getVideoUrl = () => {
  getVideoUrlApi(route.query.id).then(res => {
    url.value = res.data.urls[0].url
  })
}

getVideoUrl()

</script>

<style scoped lang="scss">
.page {
  max-width: 1024px;
  min-width: 1024px;
}
</style>