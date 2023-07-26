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
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { getNewMVByAreaApi } from '@/api/mv'
import MvItem from './components/mvItem.vue'
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

const gotoDetail = (id: number) => {
  router.push({
    path: '/video-detail',
    query: {
      id,
      type: 1
    }
  })
}
watch(currentArea, () => {
  getNewMVByArea()
})
</script>

<style scoped lang="scss">
.active-group {
  background-color: #3f2d2d;

  color: rgb(236, 65, 65)
}
</style>