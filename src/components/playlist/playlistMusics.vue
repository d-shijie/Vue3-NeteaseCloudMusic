<template>
  <div class="playlist-music">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="标题" />
      <el-table-column label="歌手">
        <template #default="scope">
          <div>
            {{ formatAr(scope.row.ar) }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="专辑">
        <template #default="scope">
          <div>
            {{ scope.row.al.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="时间">
        <template #default="scope">
          <div>
            {{ scope.row.dt }}
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
</script>

<style scoped></style>