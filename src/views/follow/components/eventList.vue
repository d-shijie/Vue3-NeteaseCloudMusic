<template>
  <div class="relative">
    <section v-if="!events.length" class="absolute start-50% top-50% h-100%">暂无动态</section>
    <section class="mt-88px">
      <div v-for="(item, index) in events" :key="index" class="mb-24px pb-24px flex"
        style="border-bottom:1px solid #444444">
        <img class="w-40px h-40px rounded-full mr-10px cursor-pointer " :src="item.user.avatarUrl" alt="">
        <div class="flex flex-col w-100%">
          <span style="font-size: 13px;">
            <div class="mb-10px">
              <span class="mr-10px text-#7098ba hover:text-#98aec1 cursor-pointer ">{{ item.user.nickname }}</span>
              <span class="text-#8a8a8a">分享声音</span>
            </div>
            <div class="text-#8a8a8a mb-20px" style="font-size: 12px;">
              {{ formateTime(item.eventTime) }}
            </div>
          </span>
          <div style="font-size: 13px;" class="mb-10px">{{ JSON.parse(item.json).msg }}</div>
          <div class="bg-#333335 hover:bg-#363739 cursor-pointer h-54px w-100% rounded-l flex items-center mb-20px">
            <span>
              <img class="w-40px h-40px rounded-l mx-10px" :src="JSON.parse(item.json).program.radio.picUrl" alt="">
            </span>
            <span class="ml-10px flex flex-col justify-between h-40px">
              <div style="font-size: 13px;">
                {{ JSON.parse(item.json).program.name }}
              </div>
              <div style="font-size: 12px;">
                <span class="app-red-tag ">{{ JSON.parse(item.json).program.radio.category }}</span>
                <span class="text-#646465 ml-10px">{{ JSON.parse(item.json).program.radio.name }}</span>
              </div>
            </span>
          </div>
          <div class="flex justify-end">
            <svg-icon style="font-size: 12px;" class="ml-20px cursor-pointer" name="dianzan"></svg-icon>
            <svg-icon style="font-size: 12px;" class="ml-20px cursor-pointer" name="share"></svg-icon>
            <svg-icon style="font-size: 12px;" class="ml-20px cursor-pointer" name="comment"></svg-icon>
            <el-icon @click="deleteEvent(item.id)" style="font-size: 12px;color:#808080" class="ml-20px cursor-pointer">
              <DeleteFilled />
            </el-icon>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getUserEventApi, deleteUserEventApi } from '@/api/user'
import { useUserStore } from '@/stores/modules/user'
import { formateTime } from '@/util';
import { DeleteFilled } from "@element-plus/icons-vue"
const userStore = useUserStore()
const userId = userStore.userInfo.userId
const events = ref<any[]>([])
const getUserEvent = () => {
  getUserEventApi(userId).then(res => {
    events.value = res.data.events
  })
}
getUserEvent()

const deleteEvent = (id: number) => {
  deleteUserEventApi(id).then(() => {
    getUserEvent()
  })
}
</script>

<style scoped></style>