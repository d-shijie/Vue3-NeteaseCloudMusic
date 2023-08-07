<template>
  <div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getPrivateFmApi } from '@/api/music';
import { useGlobalStore } from '@/stores/modules/global';
const globalStore = useGlobalStore()
const fms = ref<any[]>([])
const getPrivateFm = () => {
  getPrivateFmApi().then((res: any) => {
    fms.value = res.data.data
    globalStore.setCurrentPlaylist(res.data.data)
  })
}
getPrivateFm()
</script>

<style scoped></style>