<template>
  <div v-if="collectors.length" class="collectors">
    <div v-for="(item, index) in collectors" :key="index" class="collector">
      <img :src="item.avatarUrl" alt="">
      <div class="info">
        <div class="nickname">
          {{ item.nickname }}
          <svg-icon :name="item.gender === 1 ? 'man' : (item.gender === 0 ? '' : 'woman')"></svg-icon>
        </div>
        <div class="desc">
          {{ item.description ?? '' }}
        </div>
      </div>
    </div>
    <div class="pagination-wrapper">
      <el-pagination @current-change="hanldCurrentChange" small background v-model:current-page="params.offset"
        :page-size="60" layout="prev, pager, next" :total="total" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { getPlaylistCollectorsApi } from '@/api/playlist'
import { useRoute } from 'vue-router';
const route = useRoute()
const collectors = ref<any>([])
const total = ref()
const params = reactive({
  id: String(route.query.id),
  limit: 60,
  offset: 1
})
const getPlaylistCollectors = () => {
  getPlaylistCollectorsApi({
    id: params.id,
    limit: params.limit,
    offset: (params.offset - 1) * params.limit
  }).then(res => {
    total.value = res.data.total
    collectors.value = res.data.subscribers
  })
}
watch(route, () => {
  params.id = String(route.query.id)
  getPlaylistCollectors()
})

getPlaylistCollectors()

const hanldCurrentChange = (page: number) => {
  params.offset = page
  getPlaylistCollectors()
}
</script>

<style scoped lang="scss">
.collectors {
  padding: 20px 30px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .collector {
    width: 350px;
    display: flex;
    align-items: center;
    margin-bottom: 24px;

    img {
      width: 88px;
      height: 88px;
      border-radius: 50%;
      cursor: pointer;
    }

    .info {
      margin-left: 12px;
      font-size: 14px;

      .nickname {
        cursor: pointer;

        &:hover {
          color: #fff
        }
      }

      .desc {
        margin-top: 12px;
        font-size: 13px;
      }
    }
  }
}

.pagination-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;

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
</style>