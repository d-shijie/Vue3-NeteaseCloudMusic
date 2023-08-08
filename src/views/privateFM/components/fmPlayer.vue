<template>
  <div>
    <section v-if="fms.length">
      <div>
        <img class="w-300px h-300px rounded-l" :src="fms[currentIndex].album.picUrl" alt="">
      </div>
      <div>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getPrivateFmApi } from '@/api/music';
import { useGlobalStore } from '@/stores/modules/global';
const globalStore = useGlobalStore()
const fms = ref<any[]>([])
const currentIndex = ref(0)
const getPrivateFm = () => {
  getPrivateFmApi().then((res: any) => {
    fms.value = res.data.data
    globalStore.setCurrentPlaylist(res.data.data)
  })
}
getPrivateFm()
</script>

<style scoped></style>