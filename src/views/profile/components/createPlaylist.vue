<template>
  <div class="flex flex-wrap justify-between">
    <DefaultPlaylistItem class="w-23%  mb-30px" v-for="(item, index) in playlist" :key="index" :id="item.id"
      :cover="item.coverImgUrl" :name="item.name" :playCount="item.playCount" :musicCount="item.trackCount" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getUserPlaylistApi } from '@/api/user'
import DefaultPlaylistItem from './modules/defaultPlaylistItem.vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const playlist = ref<any[]>([])
const getUserPlaylist = () => {
  getUserPlaylistApi({
    uid: Number(route.query.id)
  }).then(res => {

    playlist.value = res.data.playlist

  })
}
getUserPlaylist()
</script>

<style scoped></style>