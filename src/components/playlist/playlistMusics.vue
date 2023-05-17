<template>
  <div class="playlist-music">
    <el-table size="small" stripe :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50px">
        <template #default="scope">
          <div style="text-align: right">
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
          <div style="color:rgb(213,213,213)">
            {{ scope.row.name }}
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
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { getPlaylistMusicApi } from '@/api/playlist'
import { stampToMin } from '@/util/timeFormat'
const route = useRoute()

const tableData = ref<any[]>([])
const getPlaylistMusic = () => {
  getPlaylistMusicApi({ id: String(route.query.id) }).then(res => {
    tableData.value = res.data.songs
  })
}
getPlaylistMusic()

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
  td {
    border: none;
    background-color: rgb(43, 43, 43);

    .cell {
      display: flex;
      align-items: center;
    }

    &:hover {
      background-color: red;
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
</style>