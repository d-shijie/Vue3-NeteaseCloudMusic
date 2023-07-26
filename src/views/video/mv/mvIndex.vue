<template>
  <div class="w-100%">
    <section>
      <div class="flex items-center">
        <h4 class="flex items-center cursor-pointer">最新MV <svg-icon name="arrow_right"></svg-icon></h4>
        <ul class="flex items-center flex-1 justify-end">
          <li @click="currentArea = item" style="font-size: 12px;" :class="{ 'active-group': currentArea === item }"
            class="rounded-xl mx-3px py-3px px-8px cursor-default text-#666666 hover:text-#d0d0d0"
            v-for="(item, index) in areas" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="flex flex-wrap justify-between">
        <MvItem @handleClick="gotoDetail(item.id)" class="w-32%" v-for="(item, index) in newMVs" :key="index"
          :coverUrl="item.cover" :title="item.name" :playCount="item.playCount" :artist="item.artists" />
      </div>
    </section>

    <section>
      <div class="flex items-center">
        <h4 class="flex items-center cursor-pointer">最热MV <svg-icon name="arrow_right"></svg-icon></h4>
      </div>
      <div class="flex flex-wrap justify-between">
        <MvItem @handleClick="gotoDetail(item.id)" class="w-32%" v-for="(item, index) in hotMvs" :key="index"
          :coverUrl="item.cover" :title="item.name" :playCount="item.playCount" :artist="item.artists" />
      </div>
    </section>

    <section>
      <div class="flex items-center">
        <h4 class="flex items-center cursor-pointer">网易出品 <svg-icon name="arrow_right"></svg-icon></h4>
      </div>
      <div class="flex flex-wrap justify-between">
        <MvItem @handleClick="gotoDetail(item.id)" class="w-32%" v-for="(item, index) in exclusiveMvs" :key="index"
          :coverUrl="item.cover" :title="item.name" :playCount="item.playCount" />
      </div>
    </section>

    <section>
      <div class="flex items-center">
        <h4 class="flex items-center cursor-pointer">MV排行榜 <svg-icon name="arrow_right"></svg-icon></h4>
      </div>
      <div class="flex justify-between flex-wrap">
        <MvRankItem @handleClick="gotoDetail(item.id)" class="rank-item w-50% h-130px" :cover="item.cover"
          :artist="item.artists" :title="item.name" :index="index" :playCount="item.playCount"
          v-for="(item, index) in rankMvs" :key="item" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { getNewMVByAreaApi, getMvByOrderApi, getMvByExclusiveApi, getMvByRankApi } from '@/api/mv'
import MvItem from './components/mvItem.vue'
import MvRankItem from './components/mvRankItem.vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const currentArea = ref('内地')
const areas = ref(['内地', '港台', '欧美', '日本', '韩国'])

const newMVs = ref<any[]>([])
const getNewMVByArea = () => {
  getNewMVByAreaApi({
    limit: 6,
    area: currentArea.value
  }).then(res => {

    newMVs.value = res.data.data
  })
}
getNewMVByArea()

const hotMvs = ref<any[]>([])
const getMvByOrder = () => {
  getMvByOrderApi({ order: '最热', limit: 6 }).then(res => {

    hotMvs.value = res.data.data
  })
}
getMvByOrder()

const exclusiveMvs = ref<any[]>([])
const getMvByExclusive = () => {
  getMvByExclusiveApi().then(res => {
    exclusiveMvs.value = res.data.data
  })
}
getMvByExclusive()
const gotoDetail = (id: number) => {
  router.push({
    path: '/video-detail',
    query: {
      id,
      type: 1
    }
  })
}

const rankMvs = ref<any[]>([])
const getMvByRank = () => {
  getMvByRankApi({
    limit: 10
  }).then(res => {
    rankMvs.value = res.data.data
  })
}
getMvByRank()
watch(currentArea, () => {
  getNewMVByArea()
})
</script>

<style scoped lang="scss">
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
</style>