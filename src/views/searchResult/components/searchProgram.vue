<template>
  <div>
    <section>
      <ul>
        <li :style="{background: (index % 2) === 0 ? '#2b2b2b' : '#2f2f2f'}"
          class=" item cursor-pointer flex items-center p-10px hover:bg-#373737" v-for="(item, index) in programlist"
          :key="index">
          <img class="w-60px h-60px rounded mr-15px" :src="item.coverImgUrl" alt="">
          <span class="flex-1 text-14px">
            <span :style="{color: searchKeyword(i, String(route.query.keywords)) ? '#85b9e6' : ''}"
              v-for="(i, index1) in item.name" :key="index1">
              {{ i }}
            </span>
          </span>
          <span class="text-#696969 text-13px w-100px">
            {{ item.trackCount }}首
          </span>
          <span class="text-#696969 text-13px w-100px">
            by <span :style="{color: searchKeyword(i, String(route.query.keywords)) ? '#85b9e6' : ''}"
              v-for="(i, index1) in item.creator.nickname" :key="index1">
              {{ i }}
            </span>
          </span>
          <span class="text-#696969 text-13px flex items-center flex-1 justify-center">
            <svg-icon name="play_outline" class="mr-3px"></svg-icon> {{ formatCount(item.playCount) }}
          </span>
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
import {searchKeyword, formatCount} from '@/util'
import router from '@/router';

const route = useRoute()

const params = reactive({
  keywords: String(route.query.keywords),
  type: 2000 as SearchType,
  offset: 1,
  limit: 20
})
const programlist = ref<any[]>([])

const total = ref(0)
const getProgramlist = () => {
  searchApi({
    keywords: params.keywords,
    type: params.type,
    limit: params.limit,
    offset: (params.offset - 1) * params.limit
  }).then(res => {
    total.value = res.data.result.playlistCount
    programlist.value = res.data.result.playlists
  })
}
getProgramlist()
const hanldCurrentChange = (page: number) => {
  params.offset = page
  getProgramlist()
}


watch(route, () => {
  getProgramlist()
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