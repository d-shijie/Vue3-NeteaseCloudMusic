<template>
  <div class="recommend-mv">
    <div class="item" v-for="item in list" :key="item.id">
      <div class="cover">
        <img :src="item.coverImg" alt="">
        <div class="play-count">
          <svg-icon style="font-size: 12px;margin-right: 3px;position: relative;top: -1px;"
            name="play_outline"></svg-icon> {{
              formatCount(item.playcount) }}
        </div>
      </div>
      <div class="name">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatCount } from '@/util'
interface Item {
  id: number
  coverImg: string
  name: string
  playcount: number
}
export type RecommendMVType = Array<Item>

interface Props {
  list: RecommendMVType
}
withDefaults(defineProps<Props>(), {
  list: () => []
})
</script>

<style scoped lang="scss">
.recommend-mv {
  display: flex;
  align-items: center;

  .item {
    width: 32%;
    margin-right: 12px;
    cursor: pointer;

    .cover {
      position: relative;

      img {
        border-radius: 10px;
        width: 100%;
      }

      .play-count {
        display: flex;
        align-items: center;
        font-size: 13px;
        position: absolute;
        right: 6px;
        top: 6px;
      }
    }

    .name {
      font-size: 14px;
    }
  }
}
</style>