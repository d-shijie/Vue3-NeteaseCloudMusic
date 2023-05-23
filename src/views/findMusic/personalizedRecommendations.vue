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
    <div class="book">
      <div class="left">
        <svg-icon style="font-size: 24px;" name="refresh"></svg-icon>
        <span>听见好书</span>
      </div>


      <div class="right">
        <el-button @click="expandStatus = !expandStatus"
          style="font-size: 13px; background-color: rgb(43, 43, 43);color: var(--v-m-text-color);border-color: rgb(73,73,73);border-radius: 15px;">全部分类<el-icon
            class="el-icon--right">
            <CaretBottom v-if="!expandStatus" />
            <CaretTop v-else />
          </el-icon></el-button>
      </div>

    </div>
    <RecommendPlaylist :playlist="recommendBooks" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getBannerApi, getDaylyRecommendPlaylistApi, getHotDjRecommendApi, getRecommendBooksApi } from '@/api/personalizedRecommendations';
import { getRecommendPlaylistApi } from '@/api/playlist'
import { CaretBottom, CaretTop } from '@element-plus/icons-vue';
import SubTitle from '@/components/SubTitle/subTitle.vue';
import RecommendPlaylist, { type Playlist } from './personalizedRecommendations/recommendPlaylist.vue';
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
const recommendPlaylist = ref<Playlist>([])
const getRecommendPlaylist = () => {
  getDaylyRecommendPlaylistApi().then((res) => {
    recommendPlaylist.value = []
    res.data.recommend.slice(0, 9).forEach((item: any) => {
      recommendPlaylist.value.push({
        id: item.id,
        name: item.name,
        nickname: item.creator.nickname,
        playcount: item.playcount,
        picUrl: item.picUrl,
        path: '/index/playlist-detail'

      })
    })

  }).catch(() => {
    // TODO定位302错误
    // 防止线上接口302无数据 测试用
    getRecommendPlaylistApi().then((res) => {
      recommendPlaylist.value = []
      res.data.result.slice(0, 9).forEach((item: any) => {
        recommendPlaylist.value.push({
          id: item.id,
          name: item.name,
          nickname: item.creator ? item.creator.nickname : '',
          playcount: item.playCount,
          picUrl: item.picUrl,
          path: '/index/playlist-detail'
        })
      })
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

// 听见好书
const expandStatus = ref(false)
const recommendBooks = ref<any[]>([])
const getRecommendBooks = () => {
  getRecommendBooksApi().then(res => {
    recommendBooks.value = []
    res.data.djRadios.slice(0, 4).forEach((item: any) => {
      recommendBooks.value.push({
        id: item.id,
        name: item.name,
        nickname: '',
        playcount: item.playCount,
        picUrl: item.picUrl,
        //TODO dj详情页
        path: ''
      })
    })
  })
}
getRecommendBooks()
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

.book {
  display: flex;
  align-self: center;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 8px;
  margin-top: 24px;

  >div {
    display: flex;
    align-items: center;
  }

  .left {
    font-size: 20px;
    font-weight: 600;

    &:hover {
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>