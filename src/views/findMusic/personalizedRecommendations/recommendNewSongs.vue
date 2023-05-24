<template>
  <div class="recommend-new-songs">
    <div @dblclick="playMusic(item.id)" class="item" v-for="item in list" :key="item.id">
      <div @click="playMusic(item.id)" class="cover">
        <img :src="item.coverImg" alt="">
        <div class="svg">
          <svg-icon style="font-size: 12px;position: relative;left: 1px;" name="play_red"></svg-icon>
        </div>
      </div>
      <div class="content">
        <div>
          {{ item.name }}
        </div>
        <div class="info">
          <svg-icon style="font-size: 20px;margin-right: 3px;" v-if="item.sq && !item.hires"
            name="high-quality"></svg-icon>
          <svg-icon style="font-size: 24px;margin-right: 3px" v-if="item.hires" name="hires"></svg-icon>
          <svg-icon style="font-size: 20px;margin-right: 3px" v-if="item.mvId" name="mv"></svg-icon>
          <span class="ar" v-for="(ar, index) in item.ar" :key="ar.id">
            {{ ar.name }} {{ index === item.ar.length - 1 ? '' : '/ ' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue';
import { getMusicUrlApi } from '@/api/music';
import { useGlobalStore } from '@/stores/modules/global'
interface NewSongs {
  list: RecommendNewSongsType
}
interface Ar {
  name: string
  id: number
  [propName: string]: any
}
interface Item {
  id: number
  ar: Ar[]
  coverImg: string
  name: string
  sq?: boolean
  hires?: boolean
  mvId?: number
}
export type RecommendNewSongsType = Array<Item>
withDefaults(defineProps<NewSongs>(), {
  list: () => []
})

const globalStore = useGlobalStore()
const playMusic = (id: number) => {
  getMusicUrlApi({
    id,
    level: 'standard'
  }).then(res => {
    globalStore.setAudioUrlAndId(res.data.data[0].url, id)
    globalStore.audioPlay()
  })
}
</script>

<style scoped lang="scss">
.recommend-new-songs {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;

  .item {
    width: 32%;
    display: flex;
    align-items: center;
    font-size: 13px;
    margin-bottom: 12px;
    border-radius: 10px;

    &:hover {
      background-color: var(--v-m-hover-bgc);
    }

    .cover {
      margin-right: 6px;
      width: 20%;
      cursor: pointer;
      position: relative;

      img {
        width: 100%;
        border-radius: 10px;
      }

      .svg {
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, .9);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}

.ar {
  cursor: pointer;

  &:hover {
    color: var(--v-m-text-color);
  }
}

.info {
  margin: 6px 0;
  font-size: 12px;
  color: var(--v-m-text-dark-color);
  display: flex;
  align-items: center;
}
</style>