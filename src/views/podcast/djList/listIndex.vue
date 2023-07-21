<template>
  <div class="px-30px">
    <SubTitle :enabled="false" :title="title" />

    <section class="flex flex-wrap">
      <div class="w-45%  flex items-center mr-15px mb-15px" v-for="(item, index) in list" :key="index">

        <img @click="gotoDetail(item.id)" class="w-134px h-134px rounded mr-12px cursor-pointer" :src="item.picUrl"
          alt="">
        <section style="font-size: 14px;color: var(--v-m-text-dark-color);">
          <div style="color: var(--v-m-text-color);">{{ item.name }}</div>
          <div class="mt-24px mb-12px">{{ item.rcmdtext }}</div>
          <div>
            <span>声音：{{ item.programCount }}，</span>
            <span>收藏：{{ item.subCount }}</span>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getCategoryLististDjApi } from '@/api/dj'
import SubTitle from '@/components/SubTitle/subTitle.vue';
import { useRoute } from 'vue-router';
import router from '@/router';
const route = useRoute()


const list = ref<any[]>([])
const title = ref('')
const getCategoryLististDj = () => {
  getCategoryLististDjApi({
    cateId: Number(route.query.id),
  }).then(res => {
    list.value = res.data.djRadios
    title.value = res.data.djRadios[0].category
  })
}
getCategoryLististDj()

const gotoDetail = (id: number) => {
  router.push({
    path: '/index/dj-detail',
    query: {
      id
    }
  })
}
</script>

<style scoped></style>