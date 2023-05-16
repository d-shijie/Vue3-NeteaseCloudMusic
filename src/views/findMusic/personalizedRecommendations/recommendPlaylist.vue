<template>
  <div class="recommend-playlist">
    <PlaylistCover class="item " :cover="dayRecommend">
      <template v-slot:text>
        <a style="font-size: 24px;font-weight: 600;">
          {{ nowDay }}
        </a>
      </template>
    </PlaylistCover>
    <PlaylistCover class="item" v-for="(item, index) in playlist" :key="index" :cover="(item as any)" />
  </div>
</template>

<script setup lang="ts">
import PlaylistCover from '@/components/playlist/playlistCover.vue';
import { reactive } from 'vue';
defineProps({
  playlist: {
    type: Array,
    default: () => []
  }
})
const dayRecommend = reactive({
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