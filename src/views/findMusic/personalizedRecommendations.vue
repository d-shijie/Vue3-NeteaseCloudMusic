<template>
  <div class="personalized-recommendations">
    <div class="banner-wrapper">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item, index) in banners" :key="index">
          <img :src="item.imageUrl" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <SubTitle title="推荐歌单" />
    <RecommendPlaylist :playlist="recommendPlaylist" />
    <SubTitle title="热门播客" />
    <podcastListVue :list="hotDjs" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getBannerApi, getDaylyRecommendPlaylistApi, getHotDjRecommendApi } from '@/api/personalizedRecommendations';
import { getRecommendPlaylistApi } from '@/api/playlist'
import SubTitle from '@/components/SubTitle/subTitle.vue';
import RecommendPlaylist from './personalizedRecommendations/recommendPlaylist.vue';
import podcastListVue, { type DjList } from '@/components/PodcastList/podcastList.vue';
// banner
const banners = ref<any[]>([])
const getBanner = () => {
  getBannerApi(0).then((res: any) => {
    banners.value = res.data.banners
  })
}
getBanner()

// 推荐歌单
const recommendPlaylist = ref<any[]>([])
const getRecommendPlaylist = () => {
  getDaylyRecommendPlaylistApi().then((res) => {
    recommendPlaylist.value = res.data.recommend.slice(0, 9)
  }).catch(() => {
    // TODO定位302错误
    // 防止线上接口302无数据 测试用
    getRecommendPlaylistApi().then((res) => {
      recommendPlaylist.value = res.data.result.slice(0, 9)
    })

  })
}
getRecommendPlaylist()

// 热门播客
const hotDjs = ref<DjList>([])
const getHotDjRecommend = () => {
  getHotDjRecommendApi().then(res => {
    hotDjs.value = []
    res.data.result.forEach((item: any) => {
      hotDjs.value.push({
        id: item.id,
        coverImg: item.picUrl,
        tag: item.program.channels[0],
        title: item.name,
        creator: item.program.name,
        playcount: item.program.mainSong.playNum,
        duration: item.program.duration
      })
    })


  })
}
getHotDjRecommend()
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