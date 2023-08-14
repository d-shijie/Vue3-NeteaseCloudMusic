<template>
  <div class="flex">
    <section class="flex-1 px-30px overflow-hidden">
      <section class="fixed-button pt-20px flex items-center fixed bg-#2b2b2b z-1000">
        <h3 class="p-0 m-0 mr-15px">动态</h3>
        <span @click="showShareDialog = true"
          class="flex items-center bg-#ec4141 px-18px py-8px rounded-2xl hover:bg-#d73535 cursor-default">
          <svg-icon name="send_event" class="mr-3px"></svg-icon>
          <span style="font-size: 14px;">发动态</span>
        </span>
      </section>
      <section class="mt-72px w-100% relative">
        <EventList />
      </section>
    </section>
    <section class="profile w-232px">
      <UserInfo />
    </section>

    <el-dialog modal-class="modal" center v-model="showShareDialog" title="分享" width="468px">
      <section v-if="!showList" class="h-264px">
        <section class="editor">
          <Editor ref="editorRef" api-key="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc" :init="tinymceConfig"
            v-model="content" />
        </section>
        <section @click="showList = !showList"
          class="rounded-b-md h-46px border-r-1px border-b-1px border-l-1px border-t-0px border-#4a4a4a border-solid">
          <div class="hover:bg-#404040 cursor-pointer flex items-center h-100% w-100%">
            <img class="mx-5px w-34px h-34px" src="@/assets/logo.png" alt="">
            <span class="text-#d6d6d6">给动态配上音乐</span>
            <span class="flex-1 flex items-center justify-end">
              <svg-icon class="text-26px mr-5px" name="plus"></svg-icon>
            </span>
          </div>
        </section>
        <footer class="flex justify-between items-center mt-24px">
          <span class="flex justify-between items-center text-12px">同时分享到：<svg-icon class="text-30px" name="weibo">
            </svg-icon></span>
          <el-button :disabled="!content" class="cursor-pointer w-80px h-30px text-center tracking-3px leading-30px"
            :style="sendBtnStyle">分享</el-button>
        </footer>
      </section>
      <section v-else class="h-264px">
        <el-input :prefix-icon="Search" placeholder="单曲/歌手/专辑/歌单/播客"></el-input>
        <section class="px-10px">
          <h4 class="m-0 my-10px">最近播放:</h4>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </section>
        <footer class="flex justify-center mt-30px">
          <el-button :style="backBtnStyle" @click="showList = !showList">返回</el-button>
        </footer>

      </section>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import EventList from './components/eventList.vue'
import UserInfo from './components/userInfo.vue'
import Editor from '@tinymce/tinymce-vue'
import { Search } from '@element-plus/icons-vue';
import { getRecentPlayApi } from '@/api/user'
const showShareDialog = ref(false)
const showList = ref(false)
const content = ref('')
const tinymceConfig = ref({
  language: 'zh_CN',
  // automatic_uploads: true,
  images_upload_url: '/upload',
  convert_urls: false,
  images_upload_base_path: '/',
  plugins: 'emoticons image imagetools', // 启用表情插件
  toolbar: 'emoticons image', // 在工具栏上添加表情按钮
  emoticons_append: ',smile1,laughing,tongue_out,wink,cry', // 自定义表情图标
  menubar: false,
  toolbar_location: 'bottom',
  branding: false,
  height: 168,
  content_style: 'body { background-color: #363636;color:rgb(215,215,215) }',
})
const sendBtnStyle = computed(() => {
  return reactive({
    background: content.value ? '#ec4141' : '#913b3b',
    borderRadius: '15px',
    color: content.value ? '#fff' : '#9a9a9a',
    border: 'none'
  })
})
const backBtnStyle = computed(() => {
  return reactive({
    background: '#ec4141',
    borderRadius: '15px',
    color: '#fff',
    padding: '0px 30px',
    border: 'none'
  })
})
const getRecentPlay = () => {
  getRecentPlayApi('music', 5).then(res => {
    console.log(res);

  })
}
getRecentPlay()
</script>

<style scoped lang="scss">
.profile {
  box-shadow: -1px 0px 1px #363636;
  min-height: calc(100vh - 112px);
  border-left: 1px solid #363636;

}

.fixed-button {
  width: calc(100vw - 520px);
}

:deep(.el-dialog) {
  background-color: #363636;
  border-radius: 5px;
  z-index: 10;
}

:deep(.el-dialog__title) {
  color: var(--v-m-text-color);
  font-size: 16px;
  font-weight: 600;
}

:deep(.el-overlay) {
  background-color: transparent
}

.editor::-webkit-scrollbar {
  display: none !important;
}

:deep(.el-input__wrapper) {
  background-color: #363636 !important;

  box-shadow: 0 0 1px 1px #4b4b4b;
}
</style>