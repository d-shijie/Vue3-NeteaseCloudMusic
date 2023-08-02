<template>
  <div>
    <section class="bg-#2e2e2e p-20px">
      <div class="flex">
        <img class="w-52px h-52px rounded-full mr-10px" :src="userInfo.avatarUrl" alt="">
        <div style="font-size: 12px;" class="flex flex-col justify-between">
          <span style="font-size: 13px;">
            {{ userInfo.nickname }}
          </span>
          <span>
            <svg-icon v-if="userInfo.gender === 1" name="man"></svg-icon>
            <svg-icon v-else name="woman"></svg-icon>
          </span>
          <span class="text-#808080">
            {{ userInfo.signature }}
          </span>
        </div>
      </div>
      <div style="font-size: 14px;color:#8c8c8c;font-weight: 600;" class="info flex justify-between mt-24px">
        <span class="flex-1 flex flex-col items-center justify-center">
          <div class="mb-5px"> {{ userInfo.eventCount }}</div>
          <div>动态</div>
        </span>
        <span class="flex-1 flex flex-col items-center justify-center">
          <div class="mb-5px"> {{ userInfo.follows }}</div>
          <div>关注</div>
        </span>
        <span class="flex-1 flex flex-col items-center justify-center">
          <div class="mb-5px">{{ userInfo.followeds }}</div>
          <div>粉丝</div>
        </span>
      </div>
    </section>

    <section class="mt-20px p-20px">
      <div style="font-size: 12px;" class="flex justify-between">
        <span style="font-weight: 600;">热门话题</span>
        <span class="text-#8a8a8a hover:text-#b1b1b1 cursor-pointer">更多></span>
      </div>
    </section>

    <section class="mt-20px p-20px">
      <div style="font-size: 12px;" class="flex justify-between">
        <span style="font-weight: 600;">认识的人</span>
        <span class="text-#8a8a8a hover:text-#b1b1b1 cursor-pointer">更多></span>
      </div>
    </section>
    <section class="mt-20px p-20px">
      <div style="font-size: 12px;" class="flex ">
        <span style="font-weight: 600;">添加关注</span>

      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getUserDetailApi, getHotTopicApi } from '@/api/user'
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()
const userId = userStore.userInfo.userId
const userInfo = ref<any>({})
const getUserDetail = () => {
  getUserDetailApi(userId).then(res => {

    userInfo.value = res.data.profile
  })
}
getUserDetail()

const getHotTopic = () => {
  getHotTopicApi({}).then(res => {
    console.log(res);
  })
}
getHotTopic()
</script>

<style scoped lang="scss">
.info {
  span:not(:last-child) {
    border-right: 1px solid #434343;
  }
}
</style>