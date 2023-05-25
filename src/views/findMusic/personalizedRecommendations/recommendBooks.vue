<template>
  <div class="recommend-playlist">
    <playlistCover class="item " :cover="dayRecommend">

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
  id: 0,
  nickname: '',
  playcount: 0,
  path: '',
  picUrl: new URL('@/assets/history.png', import.meta.url).href,
  name: '听过的有声书'
})

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