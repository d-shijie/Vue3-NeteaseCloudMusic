<template>
  <div class="find-music-playlist">
    <!-- TODO axios实例增加请求时骨架屏 -->
    <el-skeleton style="width: 100%" :loading="loading" animated>
      <template #template>
        <div style="display: flex;flex-wrap: wrap;justify-content: space-between;">
          <el-skeleton-item v-for="item in 20" :key="item" variant="image"
            style="width: 21%;;margin: 15px;height: 168px" />
        </div>
      </template>
      <template #default>
        <div class="category" v-if="hotPlaylistCategory.length">
          <div class="name">
            <el-popover ref="popoverRef" style="background:red" trigger="click" width="880px" :show-arrow="false"
              placement="bottom-start">
              <div class="popover-title">
                <a @click="getAllPlaylist('全部歌单')"> 全部歌单</a>
              </div>
              <div class="popover-content">
                <div class="popover-content__item" v-for="(item, index) in playlistCategory" :key="index">
                  <div class="icon">
                    <svg-icon style="font-size: 26px;margin-right: 5px;" :name="item.label"></svg-icon> {{ item.label }}
                  </div>
                  <div class="categories">
                    <div class="item" v-for="(i, index) in item.data " :key="index">
                      <a @click="getAllPlaylist(i)" :class="{ 'active': currentIndexName === i }">
                        {{ i }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <template #reference>
                {{ currentIndexName }}
                <svg-icon style="font-size: 14px;margin-left: 2px;" name="arrow_right"></svg-icon>
              </template>
            </el-popover>
          </div>
          <div class="tags">
            <div :class="{ 'active': currentIndexName === item.name }" @click="changeCategory(index)" class="item"
              v-for="(item, index) in hotPlaylistCategory" :key="index">
              {{ item.name }}
            </div>
          </div>

        </div>
        <div class="play-list">
          <div v-for="(item, index) in playlist" :key="index" class="item">
            <playlistCover style="width: 100%;" :cover="item" />
          </div>
        </div>
        <div class="pagination-wrapper">
          <el-pagination @current-change="hanldCurrentChange" small background v-model:current-page="params.offset"
            :page-size="60" layout="prev, pager, next" :total="total" />
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { getHotPlaylistCategoryApi, getPlaylistApi, getPlaylistCategoryApi } from '@/api/playlist'
import playlistCover, { type PlaylistCover } from '@/components/playlist/playlistCover.vue'

const loading = ref(false)
// 歌单完整分类
interface PlaylistCategoryItem {
  key: number | string
  label: string
  data: string[]
}
const playlistCategory = ref<PlaylistCategoryItem[]>([])
async function getPlaylistCategory () {
  const { data } = await getPlaylistCategoryApi()

  playlistCategory.value = []
  for (let k in data.categories) {
    playlistCategory.value.push({
      key: k,
      label: data.categories[k],
      data: []
    })
  }
  data.sub.forEach((item: any) => {
    playlistCategory.value.forEach(i => {
      if (item.category === Number(i.key)) {
        i.data.push(item.name)
      }
    })
  })
}
await getPlaylistCategory()

// 歌单热门分类
const hotPlaylistCategory = ref<any[]>([])
const currentIndexName = ref('')

async function getHotPlaylistCategory () {
  const { data } = await getHotPlaylistCategoryApi()
  hotPlaylistCategory.value = data.tags
}

await getHotPlaylistCategory()

// 歌单列表
const params = reactive({
  offset: 1,
  limit: 80,
  cat: '',
})
const total = ref(0)
const playlist = ref<PlaylistCover[]>([])
currentIndexName.value = hotPlaylistCategory.value[0].name
params.cat = hotPlaylistCategory.value[0].name
const getPlaylist = () => {
  loading.value = true
  getPlaylistApi({
    offset: params.limit * params.offset - 1,
    limit: params.limit,
    cat: params.cat
  }).then(res => {
    playlist.value = []
    total.value = res.data.total
    res.data.playlists.forEach((item: any) => {
      playlist.value.push({
        id: item.id,
        name: item.name,
        nickname: item.creator.nickname,
        playcount: item.playCount,
        picUrl: item.coverImgUrl,
        path: '/index/playlist-detail'
      })
    })
  }).finally(() => {
    loading.value = false
  })
}
getPlaylist()
const changeCategory = (index: number) => {
  currentIndexName.value = hotPlaylistCategory.value[index].name
  params.cat = hotPlaylistCategory.value[index].name
  getPlaylist()
}

const hanldCurrentChange = (page: number) => {
  params.offset = page
  getPlaylist()
}

const popoverRef = ref()
const getAllPlaylist = (name: string) => {
  popoverRef.value.hide()
  params.cat = name
  currentIndexName.value = name
  getPlaylist()
}
</script>

<style scoped lang="scss">
.category {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  .name {
    font-size: 15px;
    border: 1px solid var(--v-m-dark-border-color);
    padding: 5px 30px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: var(--v-m-hover-bgc);
    }
  }

  .tags {
    display: flex;

    .item {
      display: flex;
      align-items: centera;
      font-size: 12px;
      cursor: pointer;
      color: var(--v-m-text-dark-color);
      padding: 3px 10px;
      border-radius: 10px;

      &:hover {
        color: var(--v-m-text-color);

      }
    }
  }
}

.play-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 100%;

  .item {
    width: 22%;
  }
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

.popover-title {
  color: var(--v-m-text-color);
  cursor: default;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--v-m-dark-border-color);

  a:hover {
    color: rgb(236, 65, 65);
  }
}

.popover-content {
  margin-top: 15px;

  &__item {
    display: flex;
    margin-bottom: 20px;

    .icon {
      width: 100px;
      display: flex;
      align-items: center;
    }

    .categories {
      flex: 1;
      color: var(--v-m-text-color);
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .item {
        margin-right: 10px;
        font-size: 13px;
        padding: 10px 0;
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        a {
          padding: 3px 10px;
          border-radius: 15px;
        }

        a:hover {
          color: rgb(236, 65, 65) !important;
        }
      }
    }
  }
}

.active {
  background-color: rgb(68, 55, 55);
  color: rgb(236, 65, 65) !important;

  &:hover {
    color: rgb(236, 65, 65);
  }
}
</style>