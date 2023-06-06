<template>
  <div class="find-music-playlist">
    <div class="category" v-if="hotPlaylistCategory.length">
      <div class="name">{{ hotPlaylistCategory[currentIndex].name }}
        <svg-icon style="font-size: 14px;margin-left: 2px;" name="arrow_right"></svg-icon>
      </div>
      <div class="tags">
        <div :class="{ 'active': currentIndex === index }" @click="changeCategory(index)" class="item"
          v-for="(item, index) in hotPlaylistCategory" :key="index">
          {{ item.name }}
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getHotPlaylistCategoryApi } from '@/api/playlist'

// 歌单分类
const hotPlaylistCategory = ref<any[]>([])
const currentIndex = ref(0)
const getHotPlaylistCategory = () => {
  getHotPlaylistCategoryApi().then(res => {
    hotPlaylistCategory.value = res.data.tags
  })
}
getHotPlaylistCategory()

// 歌单列表


const changeCategory = (index: number) => {
  currentIndex.value = index

}
</script>

<style scoped lang="scss">
.category {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .name {
    font-size: 15px;
    border: 1px solid var(--v-m-dark-border-color);
    padding: 5px 30px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: var(--v-m-hover-bgc);
    }
  }

  .tags {
    display: flex;

    .item {
      display: flex;
      align-items: centera;
      font-size: 12px;
      cursor: pointer;
      color: var(--v-m-text-dark-color);
      padding: 3px 10px;
      border-radius: 10px;

      &:hover {
        color: var(--v-m-text-color);

      }
    }

    .active {
      background-color: rgb(68, 55, 55);
      color: rgb(236, 65, 65);

      &:hover {
        color: rgb(236, 65, 65);
      }
    }
  }

}
</style>