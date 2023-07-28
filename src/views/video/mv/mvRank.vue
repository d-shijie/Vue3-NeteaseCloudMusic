<template>
  <div class="rank">
    <div class="page">
      <section class="w-100%">
        <div class="flex items-center justify-between">
          <h3 class="flex items-center cursor-pointer text-#afafaf hover:text-#fff">MV排行榜</h3>
          <ul class="flex items-center flex-1 justify-end">
            <li @click="params.area = item" style="font-size: 12px;" :class="{ 'active-group': params.area === item }"
              class="rounded-xl mx-3px py-3px px-8px cursor-default text-#666666 hover:text-#d0d0d0"
              v-for="(item, index) in areas" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
      </section>
      <section>
        <div class="flex justify-between flex-wrap">
          <MvRankItem @handleClick="gotoDetail(item.id)" class="rank-item w-50% h-130px" :cover="item.cover"
            :artist="item.artists" :title="item.name" :index="index" :playCount="item.playCount"
            v-for="(item, index) in mvs" :key="item" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { getMvByRankApi } from '@/api/mv'
import { useRouter } from 'vue-router';
import MvRankItem from './components/mvRankItem.vue';
const router = useRouter()
const params = reactive({
  limit: 50,
  area: '内地'
})
const areas = ref(['内地', '港台', '欧美', '日本', '韩国'])
const mvs = ref<any[]>([])

const getMvByRank = () => {
  getMvByRankApi({
    limit: params.limit,
    area: params.area
  }, true).then(res => {
    mvs.value = res.data.data
  })
}
getMvByRank()

const gotoDetail = (id: number) => {
  router.push({
    path: '/video-detail',
    query: {
      id,
      type: 1
    }
  })
}
watch(() => params.area, () => {
  getMvByRank()
})
</script>

<style scoped lang="scss">
.rank {
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

  .active-group {
    background-color: #3f2d2d;

    color: rgb(236, 65, 65)
  }

  .rank-item {
    box-shadow: 0px 1px 1px #363636;

    &:nth-child(odd) {
      box-shadow: 1px 1px 1px #363636;
    }

  }

  .rank-item:nth-last-child(2) {
    box-shadow: 1px 0px 0px #363636;
  }

  .rank-item:nth-last-child(1) {
    box-shadow: 0px 0px 0px #363636;
  }
}
</style>