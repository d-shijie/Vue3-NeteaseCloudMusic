<template>
  <div class="flex flex-wrap justify-between">
    <template v-if="props.currentLayout === 0">
      <DefaultPlaylistItem @click='gotoDetail(item.id)' class="w-23%  mb-30px" v-for="(item, index) in playlist"
        :key="index" :id="item.id" :cover="item.coverImgUrl" :name="item.name" :playCount="item.playCount"
        :musicCount="item.trackCount" />
    </template>
    <template v-if="props.currentLayout === 1">
      <RowPlaylistItem @click='gotoDetail(item.id)' class="row-item"
        :style="{ background: (index % 2) ? '#2b2b2b' : '#2f2f2f' }" v-for="(item, index) in playlist" :key="index"
        :cover="item.coverImgUrl" :name="item.name" :playCount="item.playCount" :musicCount="item.trackCount"
        :creator="item.creator?.nickname" />
    </template>
    <template v-if="props.currentLayout === 2">
      <ColumnPlaylistItem class="mb-30px" v-for="(item, index) in playlist" :key="index" :name="item.name"
        :cover="item.coverImgUrl" :id="item.id" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { getUserPlaylistApi } from '@/api/user'
import { useRoute, useRouter } from 'vue-router'

import DefaultPlaylistItem from './modules/defaultPlaylistItem.vue'
import RowPlaylistItem from './modules/rowPlaylistItem.vue'
import ColumnPlaylistItem from './modules/columnPlaylistItem.vue'
interface Props {
  currentLayout: number
}
const route = useRoute()
const router = useRouter()

const props = withDefaults(defineProps<Props>(), {
  currentLayout: 0
})

const playlist = ref<any[]>([])
const getUserPlaylist = () => {
  getUserPlaylistApi({
    uid: Number(route.query.id)
  }).then(res => {

    playlist.value = res.data.playlist.filter((item: any) => {
      return item.creator.userId === Number(route.query.id)
    })
  })
}
getUserPlaylist()

const gotoDetail = (id: number) => {
  router.push({
    path: '/index/playlist-detail',
    query: {
      id
    }
  })
}
watch(() => route.query.id, () => {
  getUserPlaylist()
})
</script>

<style scoped lang="scss">
.row-item {
  &:hover {
    background: #373737 !important
  }
}
</style>