<template>
  <div class="recommend-playlist">
    <playlistCover class="item " :cover="dayRecommend">
      <template v-slot:text>
        <a style="font-size: 24px;font-weight: 600;">
          {{ nowDay }}
        </a>
      </template>
    </playlistCover>

    <playlistCover class="item" v-for="(item, index) in playlist" :key="index" :cover="item" />
  </div>
</template>

<script setup lang="ts">
import playlistCover, { type PlaylistCover } from '@/components/playlist/playlistCover.vue';
import { reactive, type PropType } from 'vue';
export type Playlist = Array<PlaylistCover>
defineProps({
  playlist: {
    type: Array as PropType<Playlist>,
    default: () => []
  }
})
const dayRecommend = reactive<PlaylistCover>({
  id: '',
  nickname: '',
  playcount: 0,
  path: '/index/dayly-songs-recommend',
  picUrl: new URL('@/assets/dayRecommend.png', import.meta.url).href,
  name: '每日歌曲推荐'
})
const nowDay = new Date().getDate()
</script>

<style scoped lang="scss">
.recommend-playlist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;



  .item {

    width: 18% !important;
  }

  &::after {
    content: '';
    width: 20%;
  }
}
</style>