<template>
  <div class="dj-detail-program">
    <div class="sort-wrapper">
      <span>共{{ total }}期</span>
      <span class="sort">
        <span style="margin-right: 3px;">排序 </span>
        <div @click="sortPrograms(false)" :class="{ 'active': !params.asc }" class="svg"> <svg-icon
            style="font-size: 20px;" name="desc"></svg-icon>
        </div>
        <div @click="sortPrograms(true)" :class="{ 'active': params.asc }" class="svg"> <svg-icon style="font-size: 20px;"
            name="asc"></svg-icon>
        </div>

      </span>
    </div>
    <div class="table-wrapper">
      <el-table element-loading-background="rgb(43, 43, 43)" element-loading-text="载入中..." v-loading="loading"
        :show-header="false" :data="programs" style="width: 100%">
        <el-table-column type="index" width="50px" />
        <el-table-column prop="name">
          <template #default="scope">
            <div style="display: flex;align-items: center;">
              <img style="width: 56px;height:56px;border-radius: 10px;margin-right: 12px;" :src="scope.row.coverUrl"
                alt="">
              <span style="color:var(--v-m-text-color)">{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="playedNum" width="66px">
          <template #default="scope">
            <div style="display: flex;align-items: center;">
              <svg-icon style="font-size: 10px;margin-right: 5px;" name="play_outline"></svg-icon> {{
                formatCount(scope.row.mainSong.playedNum) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="likedCount" width="66px">
          <template #default="scope">
            <div style="display: flex;align-items: center;">
              <svg-icon style="font-size: 12px;margin-right: 5px;" name="dianzan"></svg-icon> {{
                formatCount(scope.row.likedCount) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" width="120px">
          <template #default="scope">
            <div>
              {{ formatDayTime(scope.row.createTime) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="duration" width="88px">
          <template #default="scope">
            <div>
              {{ stampToMin(scope.row.duration) }}
            </div>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <div class="pagination-wrapper">
      <el-pagination @current-change="hanldCurrentChange" small background v-model:current-page="params.offset"
        :page-size="params.limit" layout="prev, pager, next" :total="total" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { getDjProgramApi } from '@/api/dj';
import { useRoute } from 'vue-router';
import { formatCount } from '@/util';
import { stampToMin, formatDayTime } from '@/util/timeFormat';
const route = useRoute()

const params = reactive({
  offset: 1,
  limit: 100,
  asc: true
})
const total = ref<number>(0)
const loading = ref<boolean>(false)
const programs = ref<any[]>([])
const getDjProgram = () => {
  loading.value = true
  getDjProgramApi({
    rid: Number(route.query.id),
    limit: params.limit,
    offset: (params.offset - 1) * params.limit,
    asc: params.asc
  }).then((res: any) => {
    total.value = res.data.count
    programs.value = res.data.programs
  }).finally(() => {
    loading.value = false
  })
}
getDjProgram()
const hanldCurrentChange = (page: number) => {
  params.offset = page
  getDjProgram()
}

const sortPrograms = (asc: boolean) => {
  params.asc = asc
  getDjProgram()
}

watch(route, () => {
  getDjProgram()
})
</script>

<style scoped lang="scss">
.sort-wrapper {
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--v-m-text-dark-color);

  .active {
    background-color: rgb(96, 96, 96) !important;
  }

  .sort {
    display: flex;
    align-items: center;

    .svg {
      padding: 1px 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: rgb(54, 54, 54);
    }
  }
}

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
</style>