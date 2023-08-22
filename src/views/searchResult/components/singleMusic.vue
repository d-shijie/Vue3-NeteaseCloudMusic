<template>
  <div>
    <header class="flex mb-15px">
      <div @click="playAll" class="action-btn play cursor-pointer">
        <svg-icon style="font-size: 18px;margin-right: 6px;" name="play"></svg-icon> 播放全部
        <svg-icon style="font-size: 18px;margin-left: 6px;" name="plus_white"></svg-icon>
      </div>
      <div class="action-btn cursor-pointer">
        <svg-icon style="font-size: 18px;margin-right: 6px;" name="download"></svg-icon> 下载全部
      </div>
    </header>
    <main>
      <PlaylistMusics :data="musicList" />
    </main>
    <section class="pagination-wrapper">
      <el-pagination @current-change="hanldCurrentChange" small background v-model:current-page="params.offset"
        :page-size="params.limit" layout="prev, pager, next" :total="total" />
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import { searchApi } from '@/api/search';
import { useRoute } from 'vue-router'
import PlaylistMusics from '@/components/playlist/playlistMusics.vue';
import { useGlobalStore } from '@/stores/modules/global';
const globalStore = useGlobalStore()
const route = useRoute()

const params = reactive({
  keywords: String(route.query.keywords),
  type: 1,
  offset: 1,
  limit: 100
})
const musicList = ref<any[]>([])

const total = ref(0)
const getMusicList = () => {
  searchApi({
    keywords: params.keywords,
    type: params.type,
    limit: params.limit,
    offset: (params.offset - 1) * params.limit
  }).then(res => {
    total.value = res.data.result.songCount
    musicList.value = res.data.result.songs
  })
}
getMusicList()
const hanldCurrentChange = (page: number) => {
  params.offset = page
  getMusicList()
}

const playAll = () => {
  globalStore.setCurrentPlaylist(musicList.value)
}
watch(route, () => {
  getMusicList()
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