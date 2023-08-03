<template>
  <div class="relative">
    <section v-if="!events.length" class="absolute start-50% top-50% h-100%">暂无动态</section>
    <section class="mt-88px">
      <div v-for="(item,index) in events" :key="index" class="flex items-center mb-24px">
          <img class="w-40px h-40px rounded-full mr-10px cursor-pointer " :src="item.user.avatarUrl" alt="">
          <span class="flex flex-col justify-between h-40px " style="font-size: 13px;">
            <div>
              <span class="mr-10px text-#7098ba hover:text-#98aec1 cursor-pointer " >{{  item.user.nickname}}</span>
              <span class="text-#8a8a8a">分享声音</span>
            </div>
            <div class="text-#8a8a8a" style="font-size: 12px;">
              {{formateTime( item.eventTime) }}
            </div>
          </span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {getUserEventApi} from '@/api/user'
import { useUserStore } from '@/stores/modules/user'
import { formateTime } from '@/util';
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