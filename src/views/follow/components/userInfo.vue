<template>
  <div>
    userInfo
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getUserDetailApi } from '@/api/user'
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()
const userId = userStore.userInfo.userId
const userInfo = ref({})
const getUserDetail = () => {
  getUserDetailApi(userId).then(res => {

    userInfo.value = res.data.profile
  })
}
getUserDetail()
</script>

<style scoped></style>