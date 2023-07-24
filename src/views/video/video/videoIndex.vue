<template>
  <div class="w-100%">
    <section v-if="videoGroup.length" class="w-100% flex items-center justify-between mb-24px">
      <div class="title flex items-center px-24px py-6px ">
        {{ videoGroup[currentIndex].name }}
        <svg-icon name="arrow_right" class="ml-3px"></svg-icon>
      </div>
      <ul class="flex">
        <li @click="currentIndex = index" :class="{ 'active-group': currentIndex === index }"
          class="group-item mx-3px py-3px px-8px" v-for="(item, index) in videoGroup.slice(0, 9)" :key="index">
          {{ item.name }}
        </li>
      </ul>
    </section>
    <section class="flex flex-wrap justify-between">
      <div class="w-31% mb-15px" v-for="(item, index) in realVideos" :key="index">
        <template v-if="item.data">
          <div @mouseenter="changeImgUrl(item.data.previewUrl, index)" @mouseout="changeImgUrl(item.data.coverUrl, index)"
            class="cover w-100% relative cursor-pointer">
            <img ref="videoImgUrlRefs" class="w-100% h-146px rounded" :src="item.data.coverUrl" alt="">
            <span class="absolute top-5px end-5px flex items-center"> <svg-icon name="play"></svg-icon> {{
              formatCount(item.data.playTime)
            }}</span>
            <span class="absolute bottom-5px end-5px">{{ stampToMin(item.data.durationms) }}</span>
          </div>
          <div class="cursor-pointer video-title my-5px w-100% overflow-hidden whitespace-nowrap text-ellipsis">
            {{ item.data.title }}
          </div>
          <div class="nickname cursor-pointer">
            by {{ item.data.creator.nickname }}
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { getVideoGroupApi, getVideoByGroupApi } from '@/api/video'
import { stampToMin } from '@/util/timeFormat';
import { formatCount } from '@/util';
const videoGroup = ref<any>([])
const currentIndex = ref(0)
const getVideoGroup = () => {
  getVideoGroupApi().then(res => {
    videoGroup.value = res.data.data
    getVideoByGroup()
  })
}
getVideoGroup()


const videos = ref<any[]>([])
const getVideoByGroup = () => {
  getVideoByGroupApi({
    id: videoGroup.value[currentIndex.value].id,
  }).then(res => {
    videos.value = res.data.datas
  })
}

const realVideos = computed(() => {
  const num = videos.value.length % 3
  let arr = JSON.parse(JSON.stringify(videos.value))
  for (let i = 0; i < num; i++) {
    arr.push({})
  }
  return arr
})


const videoImgUrlRefs = ref()
const changeImgUrl = (url: string, index: number) => {
  videoImgUrlRefs.value[index].src = url
}

watch(currentIndex, () => {
  getVideoByGroup()
})
</script>

<style scoped lang="scss">
.title {
  border: 1px solid rgb(72, 72, 72);
  border-radius: 15px;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background-color: var(--v-m-hover-bgc);
  }
}

.group-item {
  font-size: 12px;
  color: rgb(135, 135, 135);
  cursor: pointer;

  &:not(:last-child) {
    &::after {
      content: '|';
      display: inline-block;
      position: relative;
      right: -12px;
      color: rgb(49, 49, 43) !important;
    }
  }

  &:hover {
    color: var(--v-m-text-color);
  }
}

.video-title {
  font-size: 14px;

  &:hover {
    color: #fff;
  }
}

.nickname {
  font-size: 12px;
  color: rgb(82, 82, 82);

  &:hover {
    color: rgb(102, 102, 102);
  }
}

.active-group {
  background-color: rgb(63, 45, 45);
  border-radius: 10px;
  color: rgb(236, 65, 65)
}
</style>