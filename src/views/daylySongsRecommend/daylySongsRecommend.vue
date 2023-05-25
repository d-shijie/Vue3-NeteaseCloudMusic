<template>
  <div class="dayly-songs-recommend">
    <div class="header">
      <div class="calendar">
        {{ nowDay }}
      </div>
      <div>
        <div style="font-size: 20px;font-weight: 800;margin-bottom: 12px;">每日歌曲推荐</div>
        <div style="color:var(--v-m-text-dark-color);font-size:12px">根据你的音乐口味生成，每天6:00更新</div>
      </div>
    </div>
    <div class="actions">
      <div class="action-btn play">
        <svg-icon style="font-size: 18px;margin-right: 6px;" name="play"></svg-icon> 播放全部
        <svg-icon style="font-size: 18px;margin-left: 6px;" name="plus_white"></svg-icon>
      </div>
      <div class="action-btn">
        <svg-icon style="font-size: 18px;margin-right: 6px;" name="collect"></svg-icon> 收藏全部
      </div>

    </div>
    <PlaylistMusics :data="songs" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getDaylyRecommendSongsApi } from '@/api/music'
import { getToken } from '@/util/storage'
import PlaylistMusics from '@/components/playlist/playlistMusics.vue';
import { ElMessage } from 'element-plus';
const nowDay = new Date().getDate()

const songs = ref<any[]>([])
const getDaylyRecommendSongs = () => {
  if (getToken()) {
    getDaylyRecommendSongsApi().then(res => {
      songs.value = res.data.data.dailySongs
    })
  } else {
    ElMessage.info('未登录')
  }
}
getDaylyRecommendSongs()
</script>

<style scoped lang="scss">
.dayly-songs-recommend {
  .header {
    padding: 30px 30px 15px;
    display: flex;
    align-items: center;

    .calendar {
      margin-right: 24px;
      width: 88px;
      height: 88px;
      background: url("@/assets/dayRecommend_red.png") no-repeat;
      background-size: 100% 100%;
      display: flex;
      color: rgb(236, 65, 65);
      justify-content: center;
      line-height: 110px;
      font-size: 40px;
      font-weight: 800;
    }
  }

  .actions {
    padding: 0 30px;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 24px;

    .action-btn {
      margin-right: 24px;
      border: 1px solid rgb(75, 75, 75);
      padding: 8px 16px;
      font-size: 13px;
      border-radius: 2em;
      display: flex;
      align-items: center;

      &:hover {
        background-color: rgb(54, 54, 54);
      }
    }

    .play {
      background-color: rgb(236, 65, 65);
      border: none;

      &:hover {
        background-color: rgb(217, 63, 63);
      }
    }
  }
}
</style>