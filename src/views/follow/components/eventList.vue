<template>
  <div class="relative">
    <div v-if="!events.length" class="absolute start-50% top-50% h-100%">暂无动态</div>
    <div>111</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {getUserEventApi} from '@/api/user'
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()
const userId = userStore.userInfo.userId
const events=ref<any[]>([])
const getUserEvent=()=>{
  getUserEventApi(userId).then(res=>{
    events.value=res.data.events
  })
}
getUserEvent()
</script>

<style scoped></style>