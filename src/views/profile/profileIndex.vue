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

            <el-button :style="editBtnStyle" :icon="Edit" round>编辑个人信息</el-button>
          </div>
        </section>

        <div>
          <span>
            {{ userInfo.profile.eventCount }}
          </span>
          <span>
            {{ userInfo.profile.follows }}
          </span>
          <span>
            {{ userInfo.profile.followeds }}
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { getUserDetailApi } from '@/api/user'
import { useRoute } from 'vue-router'
import { Edit } from '@element-plus/icons-vue'
const route = useRoute()
const uid = route.query.id

const editBtnStyle = computed(() => {
  return reactive({
    background: '#2b2b2b',
    color: '#fff',
    borderColor: '#4b4b4b'
  })
})
const userInfo = ref<any>()
const getUserDetail = () => {
  getUserDetailApi(Number(uid)).then(res => {
    userInfo.value = res.data
  })
}
getUserDetail()
</script>

<style scoped></style>