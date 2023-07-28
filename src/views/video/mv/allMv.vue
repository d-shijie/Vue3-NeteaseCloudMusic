<template>
  <div class="all-mv">
    <div class="page">
      <section class="w-100%">
        <h3 class="text-#afafaf hover:text-#fff cursor-pointer">全部MV</h3>
        <div style="font-size: 14px;" class="mb-10px">
          <span class="mr-15px">地区:</span>
          <span style="font-size: 12px;" @click="params.area = item.value"
            class="filter-item text-center w-68px inline-block " v-for="item in area" :key="item.value">
            <span :class="{ 'active-group': item.value === params.area }"
              class="rounded-xl text-center px-10px py-2px cursor-pointer inline-block  text-#666666 hover:text-#d0d0d0">
              {{ item.label }}
            </span>
          </span>
        </div>
        <div style="font-size: 14px;" class="mb-10px">
          <span class="mr-15px">类型:</span>
          <span style="font-size: 12px;" @click="params.type = item.value"
            class="filter-item text-center w-68px inline-block " v-for="item in type" :key="item.value">

            <span :class="{ 'active-group': item.value === params.type }"
              class="rounded-xl text-center px-10px py-2px cursor-pointer inline-block  text-#666666 hover:text-#d0d0d0">
              {{ item.label }}
            </span>
          </span>
        </div>
        <div style="font-size: 14px;" class="mb-10px">
          <span class="mr-15px">排序:</span>
          <span style="font-size: 12px;" @click="params.order = item.value"
            class="filter-item text-center w-68px inline-block " v-for="item in order" :key="item.value">
            <span :class="{ 'active-group': item.value === params.order }"
              class="rounded-xl text-center px-10px py-2px cursor-pointer inline-block  text-#666666 hover:text-#d0d0d0">
              {{ item.label }}
            </span>
          </span>
        </div>
      </section>
      <section class="flex flex-wrap justify-between mt-15px">
        <MvItem @handleClick="gotoDetail(item.id)" class="w-32%" v-for="(item, index) in mvs" :key="index"
          :coverUrl="item.cover" :title="item.name" :playCount="item.playCount" :artist="item.artists" />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { getMvByOrderApi } from '@/api/mv'
import MvItem from './components/mvItem.vue';
import { useRouter } from 'vue-router';
const router = useRouter()

const params = reactive({
  limit: 30,
  offset: 0,
  area: '',
  type: '',
  order: '上升最快'
})
const area = ref([
  {
    label: '全部',
    value: ''
  },
  {
    label: '内地',
    value: '内地'
  },
  {
    label: '港台',
    value: '港台'
  },
  {
    label: '欧美',
    value: '欧美'
  },
  {
    label: '韩国',
    value: '韩国'
  },
  {
    label: '日本',
    value: '日本'
  },
])
const type = ref([
  {
    label: '全部',
    value: ''
  },
  {
    label: '官方版',
    value: '官方版'
  },
  {
    label: '原声',
    value: '原声'
  },
  {
    label: '现场版',
    value: '现场版'
  },
  {
    label: '网易出品',
    value: '网易出品'
  },

])
const order = ref([
  {
    label: '上升最快',
    value: '上升最快'
  },
  {
    label: '最热',
    value: '最热'
  },
  {
    label: '最新',
    value: '最新'
  },
])
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

watch(() => params, () => {
  getMvByOrder()
}, {
  deep: true
})
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

.active-group {
  background-color: #3f2d2d;
  color: rgb(236, 65, 65)
}

.filter-item {
  &:not(:last-child) {
    border-right: 1px solid #353535;

  }

  padding: 0 5px;
}
</style>