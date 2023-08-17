<template>
  <div v-if="userInfo" class="m-30px">
    <section class="flex w-full">
      <img class="w-184px h-184px rounded-full mr-15px" :src="userInfo.profile.avatarUrl" />
      <div class="flex-1">
        <section>
          <h3 class="m-0 mb-10px">{{ userInfo.profile.nickname }}</h3>
          <div
            class="w-full flex items-center pb-10px border-0px border-b-1px border-solid border-#454545 justify-between">
            <div class="flex items-center">
              <a href="https://music.163.com/#/user/level" target="_blank"
                class="mr-5px rounded-xl bg-#f0f0f0 py-3px px-8px text-12px text-#000 cursor-pointer">{{ 'Lv' +
                  userInfo.level
                }}</a>
              <span> <svg-icon class="relative top-1px" :name="userInfo.profile.gender ? 'man' : 'woman'"></svg-icon>
              </span>
            </div>

            <el-button v-if="currentUserType" :style="editBtnStyle" :icon="Edit" round>编辑个人信息</el-button>
            <div v-else>
              <el-button :style="editBtnStyle" :icon="ChatSquare" round>发私信</el-button>
              <el-button :style="editBtnStyle" :icon="Plus" round>关注</el-button>
            </div>
          </div>
        </section>

        <div class="flex my-10px">
          <span class="cursor-pointer flex flex-col justify-center items-center hover:text-#fff">
            <div class="text-20px mb-3px">{{ userInfo.profile.eventCount }}</div>
            <div class="text-12px text-#878787">动态</div>
          </span>
          <span class="border-0 border-r-1px border-solid border-#444444 mx-25px"></span>
          <span class="cursor-pointer flex flex-col justify-center items-center hover:text-#fff">
            <div class="text-20px mb-3px">
              {{ userInfo.profile.follows }}
            </div>
            <div class="text-12px text-#878787">关注</div>
          </span>
          <span class="border-0 border-r-1px border-solid border-#444444 mx-25px"></span>
          <span class="cursor-pointer flex flex-col justify-center items-center hover:text-#fff">
            <div class="text-20px mb-3px">
              {{ userInfo.profile.followeds }}
            </div>
            <div class="text-12px text-#878787">粉丝</div>
          </span>
        </div>

        <section class="text-15px">
          <div class="flex items-center my-5px">所在地区:
            <span class="text-14px ml-5px text-#878787">艾欧尼亚</span>
          </div>
          <div class="flex items-center my-5px">社交网络: <svg-icon class="text-20px ml-5px" name="weibo"></svg-icon>
          </div>
          <div class="flex items-center my-5px">个人介绍: <span class="text-14px ml-5px text-#878787">{{
            userInfo.profile.signature
          }}</span>
          </div>
        </section>
      </div>
    </section>
    <nav class="flex items-center mt-30px mb-10px justify-between">
      <SubTab @handle-click="tabClick" :tabs="tabs" />
      <div class="flex">
        <span @click="currentBtnIndex = index" v-for="(item, index) in shiftLayoutBtns" :key="index"
          :style="activeShiftLayoutBtnStyle(index)"
          class="cursor-default w-20px h-20px bg-#363636 text-center leading-20px rounded-sm mr-2px">
          <svg-icon class="text-12px" :name="item"></svg-icon>
        </span>
      </div>
    </nav>
    <section>
      <component :currentLayout="currentBtnIndex" :is="components[currentComponentIndex]"></component>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { getUserDetailApi } from '@/api/user'
import { useRoute } from 'vue-router'
import { Edit, Plus, ChatSquare } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/modules/user'
import SubTab, { type Tab } from '@/components/SubTab/subTab.vue'
import CreatePlaylist from './components/createPlaylist.vue'
import SubPlaylist from './components/subPlaylist.vue'
const userStore = useUserStore()
const route = useRoute()
const uid = ref()
uid.value = route.query.id
const editBtnStyle = computed(() => {
  return reactive({
    background: '#2b2b2b',
    color: '#fff',
    borderColor: '#4b4b4b'
  })
})
const userInfo = ref<any>()
const getUserDetail = () => {
  getUserDetailApi(Number(uid.value)).then(res => {
    userInfo.value = res.data
    console.log(userInfo.value);
  })
}
getUserDetail()

const tabs = ref<Array<Tab>>([
  {
    tab: '创建的歌单',

  },
  {
    tab: '收藏的歌单',

  }
])

const components = [CreatePlaylist, SubPlaylist]
const currentComponentIndex = ref(0)
const tabClick = (index: number) => {
  currentComponentIndex.value = index
}

const shiftLayoutBtns = ref(['layout_default', 'layout_row', 'layout_column'])
const currentBtnIndex = ref(0)
const activeShiftLayoutBtnStyle = computed(() => {
  return (index: number) => reactive({
    background: currentBtnIndex.value === index ? '#606060' : '',
    color: currentBtnIndex.value === index ? '#fff' : ''
  })
})

const currentUserType = computed(() => {
  return userStore.userInfo.userId === Number(route.query.id)
})
watch(() => route.query.id, () => {
  uid.value = route.query.id
  getUserDetail()
})
</script>

<style scoped></style>