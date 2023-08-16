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
import { useUserStore } from '@/stores/modules/user'
const route = useRoute()
const userStore = useUserStore()
const playlist = ref<any[]>([])
const getUserPlaylist = () => {
  getUserPlaylistApi({
    uid: Number(route.query.id)
  }).then(res => {
    const userId = userStore.userInfo.userId
    playlist.value = res.data.playlist.filter((item: any) => {
      return item.creator.userId === userId
    })

    const num = 4 - (playlist.value.length % 4)
    if (num) {
      for (let i = 0; i < num; i++) {
        playlist.value.push('')
      }
    }
  })
}
getUserPlaylist()
</script>

<style scoped></style>