<template>
  <div class="exclusive-custom" ref="scrollRef">
    <SubTitle title="晚风吹过的时光" :enabled="false" />
    <div class="play-list">
      <div v-for="(item, index) in playlist" :key="index" class="item">
        <playlistCover :cover="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SubTitle from '@/components/SubTitle/subTitle.vue';
import { getBoutiquePlaylistApi } from '@/api/playlist'
import playlistCover, { type PlaylistCover } from '@/components/playlist/playlistCover.vue';
import { reactive, ref, onMounted } from 'vue';
import { useScroll } from '@/hooks/useScroll'

const scrollRef = ref()
const params = reactive({
  before: undefined,
  limit: 15
})
const playlist = ref<PlaylistCover[]>([])
const getBoutiquePlaylist = () => {
  getBoutiquePlaylistApi(params.limit, params.before).then(res => {
    playlist.value = []
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
getBoutiquePlaylist()
onMounted(() => {
  window.addEventListener('scroll', scroll, true)
})
const scroll = () => {
  useScroll(scrollRef, () => {
    params.limit += 15
    getBoutiquePlaylist()
  })
}
</script>

<style scoped lang="scss">
.exclusive-custom {
  padding: 0 30px;
  max-width: 1098px;
  min-width: 765px;
  width: 75vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: auto;
 
  .play-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
height: 100%;
    .item {
      width: 17%;
    }
  }
}
</style>