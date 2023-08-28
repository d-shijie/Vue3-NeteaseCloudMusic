<template>
  <div>
    <section>
      <ul class="flex  justify-between flex-wrap">
        <li @click="gotoDetail(item.vid)" class="cursor-pointer w-30% mb-25px" v-for="(item, index) in videos"
          :key="index">
          <div class="w-full   relative">
            <img class="w-full rounded" :src="item.coverUrl" alt="">
            <span class="text-13px flex items-center absolute end-5px top-5px">
              <svg-icon name="play"></svg-icon>{{ formatCount(item.playTime) }}
            </span>
          </div>

          <div class="text-13px">
            <div class=" w-100% my-5px overflow-hidden text-ellipsis text-nowrap ">
              <span :style="{color: searchKeyword(i, String(route.query.keywords)) ? '#85b9e6' : ''}"
                v-for="(i, index1) in item.title" :key="index1">
                {{ i }}
              </span>
            </div>
            <div class=" w-100% overflow-hidden text-ellipsis text-nowrap ">
              <span :style="{color: searchKeyword(i, String(route.query.keywords)) ? '#85b9e6' : ''}"
                v-for="(i, index1) in formatAr(item.creator, 'userName') " :key="index1">
                {{ i }}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <section class="pagination-wrapper">
      <el-pagination @current-change="hanldCurrentChange" small background v-model:current-page="params.offset"
        :page-size="params.limit" layout="prev, pager, next" :total="total" />
    </section>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, reactive} from 'vue';
import {searchApi, type SearchType} from '@/api/search';
import {useRoute} from 'vue-router'
import {searchKeyword, formatAr, formatCount} from '@/util'
import router from '@/router';

const route = useRoute()

const params = reactive({
  keywords: String(route.query.keywords),
  type: 1014 as SearchType,
  offset: 1,
  limit: 24
})
const videos = ref<any[]>([])

const total = ref(0)
const getVideoList = () => {
  searchApi({
    keywords: params.keywords,
    type: params.type,
    limit: params.limit,
    offset: (params.offset - 1) * params.limit
  }).then(res => {
    total.value = res.data.result.videoCount
    videos.value = res.data.result.videos
  })
}
getVideoList()
const hanldCurrentChange = (page: number) => {
  params.offset = page
  getVideoList()
}

const gotoDetail = (id: number) => {
  router.push({
    path: '/video-detail',
    query: {
      id,
      type: 1
    }
  })
}
watch(route, () => {
  getVideoList()
})
</script>

<style scoped lang="scss">
.pagination-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 12px;

  :deep(.el-pagination) {
    button {
      background-color: rgb(58, 58, 58) !important;
      border-radius: 5px;
      color: var(--v-m-text-color);

      &:hover {
        background-color: transparent !important;
      }
    }

    .el-pager {
      li {
        background-color: rgb(43, 43, 43);
        border: 1px solid rgb(54, 54, 54);
        color: var(--v-m-text-color);
        border-radius: 5px;

        &:hover {
          border: none;
        }
      }

      .is-active {
        background-color: rgb(236, 65, 65);
      }
    }
  }
}

.action-btn {
  margin-right: 12px;
  border: 1px solid rgb(75, 75, 75);
  padding: 8px 16px;
  font-size: 13px;
  border-radius: 2em;
  display: flex;
  align-items: center;

  &:hover {
    background-color: rgb(54, 54, 54);
  }
}

.play {
  background-color: rgb(236, 65, 65);
  border: none;

  &:hover {
    background-color: rgb(217, 63, 63);
  }
}
</style>