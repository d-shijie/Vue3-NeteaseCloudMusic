<template>
  <div>
    <section>
      <ul>
        <li :style="{background: (index % 2) === 0 ? '#2b2b2b' : '#2f2f2f'}"
          class="item cursor-pointer flex flex-col  h-100% p-15px overflow-hidden" v-for="(item, index) in lyricList"
          :key="index">
          <div class="w-full h-30px flex items-center justify-between mb-10px">
            <span class=" text-14px flex-1">
              <span :style="{color: searchKeyword(i, String(route.query.keywords)) ? '#85b9e6' : ''}"
                v-for="(i, index1) in item.name" :key="index1">
                {{ i }}
              </span>
            </span>

            <span class="text-#696969 text-13px w-200px">
              <span :style="{color: searchKeyword(i, String(route.query.keywords)) ? '#85b9e6' : ''}"
                v-for="(i, index1) in formatAr(item.ar)" :key="index1">
                {{ i }}
              </span>
            </span>
            <span class="text-#696969 text-13px flex items-center w-100px">
              <span :style="{color: searchKeyword(i, String(route.query.keywords)) ? '#85b9e6' : ''}"
                v-for="(i, index1) in item.al.name" :key="index1">
                {{ i }}
              </span>
            </span>
            <span class="text-#696969 text-13px flex items-center  flex-1 flex justify-end">
              {{ stampToMin(item.dt) }}
            </span>
          </div>
          <div ref="lyricRef" class="overflow-hidden h-80px text-12px flex">
            <ul class="flex-1">
              <li :style="{marginBottom: index1 === 0 ? '10px' : '5px'}" class=" text-#696969"
                v-for="(i, index1) in item.lyrics" :key="index1">
                <span v-html="i"></span>
              </li>
            </ul>
            <div class="mt-10px">
              <span @click.stop.prevent="expandLyric(index)"
                class="hover:bg-#414141 mr-10px py-3px px-15px border-1px border-solid border-#555555 rounded-xl">
                {{ expandIndexs.findIndex(indexx => indexx === index) > -1 ? '收起歌词' : '展开歌词' }} </span>
              <span @click.stop.prevent="copyLyric(index)"
                class="hover:bg-#414141 mr-10px py-3px px-15px border-1px border-solid border-#555555 rounded-xl">复制歌词</span>
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
import {searchKeyword, formatAr, stampToMin} from '@/util'
import {ElMessage} from 'element-plus';
const route = useRoute()
const params = reactive({
  keywords: String(route.query.keywords),
  type: 1006 as SearchType,
  offset: 1,
  limit: 20
})
const lyricList = ref<any[]>([])

const total = ref(0)
const getLyricList = () => {
  searchApi({
    keywords: params.keywords,
    type: params.type,
    limit: params.limit,
    offset: (params.offset - 1) * params.limit
  }).then(res => {
    total.value = res.data.result.songCount
    lyricList.value = res.data.result.songs
  })
}
getLyricList()
const hanldCurrentChange = (page: number) => {
  params.offset = page
  getLyricList()
}
const lyricRef = ref()
const expandIndexs = ref<number[]>([])
const expandLyric = (index: number) => {
  const i = expandIndexs.value.findIndex(item => item === index)
  if (i === -1) {
    expandIndexs.value.push(index)
    lyricRef.value[index].style.height = '100%'
  } else {
    expandIndexs.value.splice(i, 1)
    lyricRef.value[index].style.height = '80px'
  }
}

const copyLyric = (index: number) => {
  const text = lyricList.value[index].lyrics.reduce((last: string, current: string) => {
    return last.concat(current)
  }, '')
  navigator.clipboard.writeText(text)
    .then(() => {
      ElMessage.info('复制成功')
    })
    .catch(() => {
      ElMessage.info('复制失败')
    });
}
watch(route, () => {
  getLyricList()
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