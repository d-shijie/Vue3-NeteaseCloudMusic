<template>
  <div v-if="detail" class="dj-detail-header">
    <img :src="detail.picUrl" alt="">
    <div class="info">
      <div class="name"><span class="cate">{{ detail.rcmdText }}</span> {{ detail.name }}</div>
      <div class="nickname"> <img :src="detail.dj.avatarUrl" alt=""> {{ detail.dj.nickname }}</div>
      <div class="actions">
        <div class="action-btn play">
          <svg-icon style="font-size: 18px;margin-right: 6px;" name="play"></svg-icon> 播放全部
          <svg-icon style="font-size: 18px;margin-left: 6px;" name="plus_white"></svg-icon>
        </div>
        <div class="action-btn">
          <svg-icon style="font-size: 18px;margin-right: 6px;" name="collect"></svg-icon> 收藏({{
            formatCount(detail.subCount) }})
        </div>
        <div class="action-btn">
          <svg-icon style="font-size: 18px;margin-right: 6px;" name="share"></svg-icon> 分享({{
            formatCount(detail.shareCount) }})
        </div>

      </div>
      <div class="desc"><span class="cate">{{ detail.category }}</span> {{ detail.desc }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { getDjDetailApi } from '@/api/dj';
import { useRoute } from 'vue-router';
import { formatCount } from '@/util';
const route = useRoute()

const detail = ref()
const getDjDetail = () => {
  getDjDetailApi(Number(route.query.id)).then(res => {
    detail.value = res.data.data
  })
}
getDjDetail()

watch(route, () => {
  getDjDetail()
})
</script>

<style scoped lang="scss">
.dj-detail-header {
  display: flex;
  padding: 30px 30px 20px;
  font-size: 13px;

  >img {
    width: 184px;
    height: 184px;
    border-radius: 10px;
    margin-right: 20px;
  }

  .cate {
    padding: 3px;
    border: 1px solid rgb(224, 60, 52);
    color: rgb(224, 60, 52);
    font-size: 12px;
    border-radius: 3px;
    margin: 0 5px 5px 0;
  }

  .info {
    >div {
      margin-bottom: 12px;
    }

    .actions {
      display: flex;
      align-items: center;
      cursor: pointer;

      .action-btn {
        margin-right: 12px;
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

    .name {
      font-size: 20px;
      font-weight: 600;

    }

    .nickname {
      display: flex;
      align-items: center;
      color: rgb(133, 185, 230);

      &:hover {
        color: rgb(179, 206, 229);
        cursor: pointer;
      }

      img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 6px;
      }
    }

    .desc {
      line-height: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      word-wrap: break-all;
    }
  }
}
</style>