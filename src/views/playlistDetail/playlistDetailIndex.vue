<template>
  <div class="playlist-detail">
    <div class="playlist-detail-header">
      <img
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F026b3f9c-ca71-4d5d-a6d7-b172dc761dbe%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1687083637&t=d0a2b1fafbfe64c30689ed2958dfa2b0"
        alt="">
      <div class="playlist-detail-header-info">
        <div class="playlist-detail-header-info-title">今天《爱在日出前（女声版）》爱不释耳|私人雷达</div>
        <div class="playlist-detail-header-info-creator">
          <label>
            <span class="avatar">
              <img
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F026b3f9c-ca71-4d5d-a6d7-b172dc761dbe%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1687083637&t=d0a2b1fafbfe64c30689ed2958dfa2b0"
                alt="">
            </span>
            <span class="creator-name">
              网易云音乐
            </span>
          </label>
          <span class="create-time">
            {{ formatDayTime(111111111) }}创建
          </span>
        </div>
        <div class="playlist-detail-header-info-actions">3</div>
        <div class="playlist-detail-header-info-counts" style="font-size: 12px;">
          <span style="margin-right: 8px;" class="musics">
            <span style="color:rgb(213,213,213)">歌曲: </span><span style="color:rgb(139,139,139)">35</span>
          </span>
          <span class="plays">
            <span style="color:rgb(213,213,213)">播放: </span><span style="color:rgb(139,139,139)"> {{ formatCount(23123131)
            }}</span>
          </span>
        </div>
        <div class="playlist-detail-header-info-desc" style="font-size: 12px;">
          <div style="color:rgb(213,213,213)">简介: </div>
          <div class="desc" style="color:rgb(139,139,139)">
            你爱的歌，值得反复聆听1111111111111111111111</div>
        </div>
      </div>
    </div>
    <PlaylistMusics />
  </div>
</template>

<script setup lang="ts">
import PlaylistMusics from '@/components/playlist/playlistMusics.vue';
import { formatDayTime } from '@/util/timeFormat'
import { formatCount } from '@/util/index'
</script>

<style scoped lang="scss">
.playlist-detail {
  &-header {
    padding: 30px;
    display: flex;

    >img {
      width: 180px;
      height: 180px;
      border-radius: 0.25em;
      margin-right: 12px;
    }

    &-info {
      div {
        margin-bottom: 12px;
      }

      &-title {
        font-size: 22px;
        font-weight: 600;
        color: var(--v-m-text-color);
      }

      &-creator {
        display: flex;
        align-items: center;
        font-size: 12px;

        label {
          display: flex;
          cursor: pointer;
          color: rgb(95, 172, 230);
          align-items: center;

          &:hover {
            color: rgb(179, 206, 229);
          }
        }

        span {
          margin-right: 8px;
        }

        .avatar {
          img {
            width: 26px;
            height: 26px;
            border-radius: 50%;
          }
        }

        .create-time {
          color: rgb(139, 139, 139)
        }

      }

      &-desc {
        display: flex;
        align-items: center;

        .desc {
          display: inline-block;
          width: 100px;
          height: 100%;
          margin-left: 4px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
  }

}
</style>