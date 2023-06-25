<template>
  <div class="find-music-singer" ref="scrollRef">
    <div class="search-wrapper container">
      <div class="flex items-center  flex-wrap">
        <span class="text-sm mb-15px">语种：</span>
        <span @click="selectParams('area', index)" style="font-size: 13px;"
          class="custom relative cursor-pointer flex items-center px-10px py-3px mx-10px mb-15px"
          :class="{ 'active': index === current.area }" v-for="(item, index) in searchParams.area" :key="index">
          {{ item.name }}
        </span>
      </div>
      <div class="flex items-center  flex-wrap">
        <span class="text-sm mb-15px">分类：</span>
        <div class="flex-1 flex items-center">
          <span @click="selectParams('type', index)" style="font-size: 13px;"
            class="custom relative cursor-pointer flex items-center px-10px py-3px mx-10px mb-15px "
            :class="{ 'active': index === current.type }" v-for="(item, index) in searchParams.type" :key="index">
            {{ item.name }}
          </span>
        </div>

      </div>
      <div class="flex flex-wrap">
        <span class="text-sm mb-15px">筛选：</span>
        <div class="flex-1 flex items-center flex-wrap">
          <span @click="selectParams('initial', index)" style="font-size: 13px;"
            class="custom relative cursor-pointer flex items-center  px-10px py-3px mx-10px mb-15px"
            :class="{ 'active': index === current.initial }" v-for="(item, index) in searchParams.initial" :key="index">
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>
    <div class="singer flex flex-wrap justify-between">
      <div class="item mx-10px" v-for="(item, index) in singerList" :key="index">
        <singerCover :content="item"></singerCover>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { getSingerListApi } from '@/api/singer'
import { useScroll } from '@/hooks/useScroll'
import singerCover from './findMusicSinger/singerCover.vue'
import { ElMessage } from 'element-plus'
const params = reactive({
  initial: '-1',
  type: '-1',
  area: '-1',
  limit: 15,
  offset: 0
})
const searchParams = reactive({
  area: [
    {
      name: '全部',
      value: '-1'
    },
    {
      name: '华语',
      value: '7'
    },
    {
      name: '欧美',
      value: '96'
    },
    {
      name: '日本',
      value: '8'
    },
    {
      name: '韩国',
      value: '16'
    },
    {
      name: '其他',
      value: '0'
    }
  ],
  type: [
    {
      name: '全部',
      value: "-1"
    },
    {
      name: '男歌手',
      value: "1"
    },
    {
      name: '女歌手',
      value: "2"
    },
    {
      name: '乐队',
      value: "3"
    },
  ],
  initial: [
    {
      name: '热门',
      value: '-1'
    },
    {
      name: 'A',
      value: 'a'
    },
    {
      name: 'B',
      value: 'b'
    },
    {
      name: 'C',
      value: 'c'
    },
    {
      name: 'D',
      value: 'd'
    },
    {
      name: 'E',
      value: 'e'
    },
    {
      name: 'F',
      value: 'f'
    },
    {
      name: 'G',
      value: 'g'
    },
    {
      name: 'H',
      value: 'h'
    },
    {
      name: 'I',
      value: 'i'
    },
    {
      name: 'J',
      value: 'j'
    },
    {
      name: 'K',
      value: 'k'
    },
    {
      name: 'L',
      value: 'l'
    },
    {
      name: 'M',
      value: 'm'
    },
    {
      name: 'N',
      value: 'n'
    },
    {
      name: 'O',
      value: 'o'
    },
    {
      name: 'P',
      value: 'p'
    },
    {
      name: 'Q',
      value: 'q'
    },
    {
      name: 'R',
      value: 'r'
    },
    {
      name: 'S',
      value: 's'
    },
    {
      name: 'T',
      value: 'T'
    },
    {
      name: 'U',
      value: 'u'
    },
    {
      name: 'V',
      value: 'v'
    },
    {
      name: 'W',
      value: 'w'
    },
    {
      name: 'X',
      value: 'x'
    },
    {
      name: 'Y',
      value: 'y'
    },
    {
      name: 'Z',
      value: 'z'
    },
    {
      name: '#',
      value: '0'
    },
  ]
})
const current = reactive({
  area: 0,
  type: 0,
  initial: 0
})

const singerList = ref<any[]>([])

const getSingerList = () => {
  getSingerListApi({
    limit: params.limit,

    type: params.type,
    area: params.area,
    initial: params.initial
  }).then(res => {

    if (res.data.more) {
      singerList.value = res.data.artists
    } else {
      ElMessage.info('没有更多了！')
    }
  })
}
getSingerList()
const selectParams = (flag: 'area' | 'type' | 'initial', index: number) => {
  current[flag] = index
  params[flag] = searchParams[flag][index].value
  getSingerList()
}

const scrollRef = ref()
useScroll(scrollRef, () => {
  params.limit += 15
  getSingerList()
})
</script>

<style scoped lang="scss">
.find-music-singer {
  // height: calc(100vh - 250px);
  // overflow-y: auto;
}

.active {
  background: rgb(61, 45, 45) !important;
  color: rgb(236, 65, 65) !important;
  border-radius: 10px;
}

.custom {
  color: var(--v-m-text-dark-color);

  &:hover {
    color: var(--v-m-text-color);
  }

  &::after {
    content: '';
    display: inline-block;
    height: 18px;
    width: 1px;
    background-color: rgb(53, 53, 53);
    position: absolute;
    right: -12px;
  }
}

.item {
  flex: 16%;
}
</style>