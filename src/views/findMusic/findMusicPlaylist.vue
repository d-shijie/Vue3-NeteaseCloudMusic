<template>
  <div class="find-music-playlist">
    <div class="category" v-if="hotPlaylistCategory.length">
      <div class="name">{{ hotPlaylistCategory[currentIndex].name }}
        <svg-icon style="font-size: 14px;margin-left: 2px;" name="arrow_right"></svg-icon>
      </div>
      <div class="tags">
        <div :class="{ 'active': currentIndex === index }" @click="changeCategory(index)" class="item"
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
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { getHotPlaylistCategoryApi, getPlaylistApi } from '@/api/playlist'
import playlistCover, { type PlaylistCover } from '@/components/playlist/playlistCover.vue'
// 歌单分类
const hotPlaylistCategory = ref<any[]>([])
const currentIndex = ref(0)

async function getHotPlaylistCategory () {
  const { data } = await getHotPlaylistCategoryApi()
  hotPlaylistCategory.value = data.tags
  console.log(hotPlaylistCategory.value);

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
const getPlaylist = () => {
  params.cat = hotPlaylistCategory.value[currentIndex.value].name
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
  })
}
getPlaylist()
const changeCategory = (index: number) => {
  currentIndex.value = index
  params.cat = hotPlaylistCategory.value[index].name
  console.log(hotPlaylistCategory.value[index].name);

  getPlaylist()

}

const hanldCurrentChange = (page: number) => {
  params.offset = page
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

    .active {
      background-color: rgb(68, 55, 55);
      color: rgb(236, 65, 65);

      &:hover {
        color: rgb(236, 65, 65);
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
</style>