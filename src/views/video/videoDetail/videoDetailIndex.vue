<template>
  <div class="wrapper flex justify-center">
    <section class="page">
      <section class="flex justify-between">
        <div class="w-620px">
          <div class="title  h-40px">
            <h3 @click="router.back()" class="flex items-center cursor-pointer font-normal text-base"> <svg-icon
                style="font-size: 14px;margin-right: 8px;" name="left"></svg-icon>
              {{
                type ? 'MV' :
                '视频' }}详情</h3>
          </div>
          <video width="620" height="352" ref="videoRef" :src="url" autoplay controls></video>

          <div v-if="videoInfo.creator" class="flex items-center mt-15px">
            <img class="w-48px h-48px rounded-3xl mr-10px" :src="videoInfo.creator.avatarUrl" alt="">
            <a class="flex-1" style="font-size: 14px;">{{ videoInfo.creator.nickname }}</a>
            <span style="color: rgb(236, 65, 65);background-color: rgb(52, 44, 43);font-size: 14px;"
              class="flex items-center py-3px px-15px rounded-2xl cursor-pointer"><svg-icon style="font-size: 24px;"
                name="plus"></svg-icon>关注 </span>
          </div>

          <section>
            <h2> {{ videoInfo.title }}</h2>
            <div>发布：<span>{{ formatDayTime(videoInfo.publishTime) }}</span> 播放：<span>{{ formatCount(videoInfo.playTime)
            }}</span></div>
            <div>
              <span v-for="(item, index) in videoInfo.videoGroup" :key="index">
                {{ item.name }}
              </span>
            </div>
          </section>
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
import { getVideoUrlApi, getVideoDetailApi } from '@/api/video'
import { formatCount, formatDayTime } from '@/util';

const route = useRoute()
const router = useRouter()
const type = Number(route.query.type)

const url = ref('')
const videoRef = ref()
const getVideoUrl = () => {
  getVideoUrlApi(String(route.query.id)).then(res => {
    url.value = res.data.urls[0].url
  })
}

getVideoUrl()

const videoInfo = ref<any>({})
const getVideoDetail = () => {
  getVideoDetailApi(String(route.query.id)).then(res => {
    videoInfo.value = res.data.data
  })
}
getVideoDetail()
</script>

<style scoped lang="scss">
.page {
  max-width: 1024px;
  min-width: 1024px;
}
</style>