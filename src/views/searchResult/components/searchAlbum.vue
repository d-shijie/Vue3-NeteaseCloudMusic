<template>
  <div>
    <section>
      <ul>
        <li @click="gotoDetail(item.id)" class="cursor-pointer flex items-center p-10px hover:bg-#373737"
          v-for="(item, index) in albums" :key="index">
          <img class="w-60px h-60px rounded mr-15px" :src="item.picUrl" alt="">
          <span class="flex-1 text-14px">
            <span :style="{color: searchKeyword(i, String(route.query.keywords)) ? '#85b9e6' : ''}"
              v-for="(i, index1) in item.name" :key="index1">
              {{ i }}
            </span>
            <span v-if="item.alias.length" class="text-#6f6f6f">(
              <span :style="{color: searchKeyword(i1, String(route.query.keywords)) ? '#85b9e6' : ''}"
                v-for="(i1, index2) in item.alias[0]" :key="index2">
                {{ i1 }}
              </span>
              )</span>
          </span>
          <span class="text-14px flex-1">
            <span :style="{color: searchKeyword(i2, String(route.query.keywords)) ? '#85b9e6' : ''}"
              v-for="(i2, index3) in formatAr(item.artists)" :key="index3">
              {{ i2 }}
            </span>
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
import {searchKeyword, formatAr} from '@/util'
import router from '@/router';

const route = useRoute()

const params = reactive({
  keywords: String(route.query.keywords),
  type: 10 as SearchType,
  offset: 1,
  limit: 20
})
const albums = ref<any[]>([])

const total = ref(0)
const getAlbumList = () => {
  searchApi({
    keywords: params.keywords,
    type: params.type,
    limit: params.limit,
    offset: (params.offset - 1) * params.limit
  }).then(res => {
    total.value = res.data.result.albumCount
    albums.value = res.data.result.albums
  })
}
getAlbumList()
const hanldCurrentChange = (page: number) => {
  params.offset = page
  getAlbumList()
}

// 这里id好像有问题
const gotoDetail = (id: number) => {
  router.push({
    path: '/index/playlist-detail',
    query: {
      id
    }
  })
}
watch(route, () => {
  getAlbumList()
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