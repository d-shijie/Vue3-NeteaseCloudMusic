<template>
  <div class="all-mv">
    <div class="page">
      <section class="w-100%">
        <h3 class="text-#afafaf hover:text-#fff cursor-pointer">全部MV</h3>
      </section>
      <section class="flex flex-wrap justify-between">
        <MvItem @handleClick="gotoDetail(item.id)" class="w-32%" v-for="(item, index) in mvs" :key="index"
          :coverUrl="item.cover" :title="item.name" :playCount="item.playCount" :artist="item.artists" />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { getMvByOrderApi } from '@/api/mv'
import MvItem from './components/mvItem.vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const params = reactive({
  limit: 30,
  offset: 0,
  area: '内地',
  type: '',
  order: '上升最快'
})
const mvs = ref<any[]>([])
const getMvByOrder = () => {
  getMvByOrderApi({
    limit: params.limit,
    area: params.area,
    order: params.order,
    offset: params.offset,
    type: params.type
  }).then(res => {
    mvs.value = res.data.data
  })
}
getMvByOrder()

const gotoDetail = (id: number) => {
  router.push({
    path: '/video-detail',
    query: {
      id,
      type: 1
    }
  })
}
</script>

<style scoped lang="scss">
.all-mv {
  display: flex;
  flex-direction: column;
  align-items: center;

  .page {
    padding: 20px 30px;
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