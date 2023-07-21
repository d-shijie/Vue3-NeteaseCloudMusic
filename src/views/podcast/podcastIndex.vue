<template>
  <div class="podcast">
    <div class="page">
      <div class="flex w-100%">
        <div style="flex: 3;background: rgb(55, 45, 45);" class="mr-12px h-156px rounded">
          <CategoryScroller :programs="programs" />
        </div>
        <div style="flex: 2;background:rgb(55, 45, 45)" class="ml-12px h-156px rounded">
          <Scroller v-loading="loading" v-model="category">
            <template #default="scope">
              <img @click="gotoDjList(scope.row.id)" class="w-50% mb-5px cursor-pointer" :src="scope.row.pic56x56Url"
                alt="">
              <div style="font-size: 12px;">{{ scope.row.name }}</div>
            </template>
          </Scroller>
        </div>
      </div>

      <div v-for="(item, index) in category" :key="index">
        <CategoryRecommend :name="item.name" :rid="item.id" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getDjCategoryApi, getDjRecommendProgramApi } from '@/api/dj';
import Scroller from '@/components/Scroller/appScroller.vue'
import CategoryScroller, { type Program } from './components/categoryScroller.vue';
import CategoryRecommend from './components/categoryRecommend.vue';
import router from '@/router';

const category = ref<any[]>([])
const loading = ref(false)
const getDjCategory = () => {
  loading.value = true
  getDjCategoryApi().then(res => {
    category.value = res.data.categories
  }).finally(() => {
    loading.value = false
  })
}
getDjCategory()


const programs = ref<Program[]>([])
const getDjRecommendProgram = () => {
  getDjRecommendProgramApi().then(res => {
    res.data.programs.forEach((item: any) => {
      programs.value.push({
        name: item.name,
        id: item.id,
        coverUrl: item.coverUrl
      })
    })
  })
}
getDjRecommendProgram()

const gotoDjList = (id: number) => {
  console.log(id);
  router.push({
    path: '/index/dj-list',
    query: {
      id
    }
  })
}
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
