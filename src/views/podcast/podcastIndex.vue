<template>
  <div class="podcast">
    <div class="page">
      <div class="flex w-100%">
        <div style="flex: 3;background: rgb(13, 12, 12);" class="bg-red mr-12px h-148px rounded">1</div>
        <div style="flex: 2;background:rgb(55, 45, 45)" class="ml-12px h-148px rounded">
          <DjCategory v-model="category" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getDjCategoryApi } from '@/api/dj';
import DjCategory from './components/djCategory.vue'
const category = ref<any[]>([])
const getDjCategory = () => {
  getDjCategoryApi().then(res => {
    category.value = res.data.categories
  })
}
getDjCategory()
</script>

<style scoped lang="scss">
.podcast {
  display: flex;
  flex-direction: column;
  align-items: center;

  .page {
    padding: 30px;
    max-width: 1098px;
    min-width: 765px;
    width: 75vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
