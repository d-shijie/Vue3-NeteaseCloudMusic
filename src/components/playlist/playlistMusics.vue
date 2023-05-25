<template>
  <div class="playlist-music">
    <el-table element-loading-background="rgb(43, 43, 43)" element-loading-text="载入中..." v-loading="loading" size="small"
      @row-click="playMusic" stripe :data="tableData" style="width: 100%">
      <template #empty>
        {{ '' }}
      </template>
      <el-table-column type="index" width="50px">
        <template #default="scope">
          <div style="text-align: right;width: 100%;">
            {{ indexMethod(scope.$index) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="70px">
        <template #default="scope">
          <svg-icon style="margin-right: 5px;font-size: 18px;cursor: pointer;" name="like_outline"></svg-icon>
          <svg-icon style="font-size: 18px;cursor: pointer;" name="download"></svg-icon>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="标题">
        <template #default="scope">
          <div style="color:rgb(213,213,213);display: flex;align-items: center;">
            {{ scope.row.name }}
            <svg-icon v-if="scope.row.sq && !scope.row.hr" style="font-size: 20px;margin-left: 5px;"
              name="high-quality"></svg-icon>
            <svg-icon v-if="scope.row.hr" style="font-size: 30px;margin-left: 5px;position: relative;top: 2px;"
              name="hires"></svg-icon>
            <svg-icon v-if="scope.row.mv" style="font-size: 18px;margin-left: 5px;cursor: pointer;" name="mv"></svg-icon>
          </div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="歌手">
        <template #default="scope">
          <div class="table-cell">
            {{ formatAr(scope.row.ar) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="专辑">
        <template #default="scope">
          <div class="table-cell">
            {{ scope.row.al.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="100px">
        <template #default="scope">
          <div>
            {{ stampToMin(scope.row.dt) }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getPlaylistMusicApi } from '@/api/playlist'
import { stampToMin } from '@/util/timeFormat'
import { getMusicUrlApi } from '@/api/music'
import { useGlobalStore } from '@/stores/modules/global';
const props = defineProps({
  id: {
    type: [String, Number],
    default: ''
  },
  data: {
    type: Array,
    default: () => []
  }
})
const globalStore = useGlobalStore()
const route = useRoute()
const loading = ref(false)
const tableData = ref<any[]>([])
const getPlaylistMusic = () => {
  loading.value = true
  if (!route.query.id && !props.id) {
    tableData.value = props.data
    loading.value = false
    return
  }
  getPlaylistMusicApi({ id: String(route.query.id || props.id) }).then(res => {
    tableData.value = res.data.songs
  }).finally(() => {
    loading.value = false
  })
}
watch(route, () => {
  getPlaylistMusic()
})
watch(props, () => {
  getPlaylistMusic()
})
getPlaylistMusic()

const playMusic = (row: any) => {

  getMusicUrlApi({
    id: row.id,
    level: globalStore.currentMusicLevel
  }).then(res => {
    globalStore.setAudioUrlAndId(res.data.data[0].url, row.id)
    globalStore.audioPlay()
  })
}

const formatAr = (arr: any[]): string => {
  let res: string = ''
  arr.forEach((item, index) => {
    const l = index === arr.length - 1 ? '' : '/'
    res += item.name + l
  })
  return res
}

const indexMethod = (index: number) => {
  let res = ''
  if (index < 9) {
    res = '0' + (index + 1)
  } else {
    res = String(index + 1)
  }
  return res
}

</script>

<style scoped lang="scss">
:deep(.el-table__header) {
  th {
    background-color: rgb(43, 43, 43);
    border: none !important;
  }

}

:deep(.el-table__body) {
  border: none !important;

  td {
    border: none;
    background-color: rgb(43, 43, 43);

    .cell {
      display: flex;
      align-items: center;
    }
  }
}

:deep(.el-table__row--striped) {
  td {
    background-color: rgb(47, 47, 47) !important;
  }
}

.table-cell {
  cursor: pointer;

  &:hover {
    color: var(--v-m-text-color);
  }
}

:deep(.el-table__empty-block) {
  background-color: var(--v-m-bgc);
}

:deep(.el-table__inner-wrapper::before) {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0;
  z-index: 3;
}
</style>