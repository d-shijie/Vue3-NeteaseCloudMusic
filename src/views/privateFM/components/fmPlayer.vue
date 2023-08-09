<template>
  <div class="w-100% flex justify-center flex-col items-center">
    <section class="flex w-600px " v-if="fms.length">
      <section class="flex-1 mr-15px">
        <div class="relative">
          <img class="w-300px h-300px rounded-l" :src="fms[currentIndex].album.picUrl" alt="">
          <span
            class="bg-#fff -translate-x-50% -translate-y-50% cursor-pointer opacity-80 absolute start-50% top-50% flex items-center justify-center w-50px h-50px rounded-full">
            <svg-icon class="text-20px relative start-2px" name="play_red"></svg-icon>
          </span>
          <span
            class="bg-#fff cursor-pointer opacity-80 absolute end-10px bottom-10px flex items-center justify-center w-40px h-40px rounded-full">
            <svg-icon class="text-20px" name="pause_red"></svg-icon>
          </span>
        </div>
        <div class="flex justify-between my-30px">
          <span
            class="cursor-pointer hover:bg-#404040 border-1px border-#404040 border-solid w-40px h-40px inline-block bg-#393939 rounded-full flex items-center justify-center">
            <svg-icon style="font-size: 22px;" name="like_outline"></svg-icon>
          </span>
          <span
            class="cursor-pointer hover:bg-#404040 border-1px border-#404040 border-solid w-40px h-40px inline-block bg-#393939 rounded-full flex items-center justify-center">
            <svg-icon style="font-size: 18px;" name="delete"></svg-icon>
          </span>
          <span
            class="cursor-pointer hover:bg-#404040 border-1px border-#404040 border-solid w-40px h-40px inline-block bg-#393939 rounded-full flex items-center justify-center">
            <svg-icon class="relative start-2px" style="font-size: 16px;" name="play_outline"></svg-icon>
          </span>
          <span
            class="cursor-pointer hover:bg-#404040 border-1px border-#404040 border-solid w-40px h-40px inline-block bg-#393939 rounded-full flex items-center justify-center">
            <svg-icon style="font-size: 18px;" name="more"></svg-icon>
          </span>
        </div>
      </section>
      <section class="flex-1 ml-15px">
        <div>1</div>
      </section>
    </section>
    <section>
      <AppComment class="py-20px px-30px" @like-comment="getMusicComment" :type="0" @hanlde-comment="commentMusic"
        :hot-comments="hotComments" :comments="playlistComments">
        <template v-slot:pagination>
          <el-pagination @current-change="hanldCurrentChange" small background v-model:current-page="params.offset"
            :page-size="60" layout="prev, pager, next" :total="total" />
        </template>
      </AppComment>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { getPrivateFmApi } from '@/api/music';
import { getMusicCommentApi, commentApi } from '@/api/comment'
import { useGlobalStore } from '@/stores/modules/global';
import AppComment, { type Comments } from '@/components/Comment/appComment.vue';
import { ElMessage } from 'element-plus';
const globalStore = useGlobalStore()
const fms = ref<any[]>([])
const currentIndex = ref(0)
const getPrivateFm = () => {
  getPrivateFmApi().then((res: any) => {
    fms.value = res.data.data
    globalStore.setCurrentPlaylist(res.data.data)
    params.id = fms.value[currentIndex.value].id
  })
}
getPrivateFm()

const params = reactive({
  id: 0,
  offset: 1,
  limit: 20
})
const hotComments = ref<Comments>([])
const playlistComments = ref<Comments>([])
const total = ref(0)
const getMusicComment = () => {
  getMusicCommentApi({
    id: params.id,
    offset: (params.offset - 1) * params.limit,
    limit: params.limit
  }).then(res => {
    playlistComments.value = []
    hotComments.value = []
    total.value = res.data.total
    res.data.hotComments.slice(0, 9).forEach((item: any) => {
      hotComments.value.push({
        avatarUrl: item.user.avatarUrl,
        content: item.content,
        likeCount: item.likedCount,
        time: item.time,
        lieked: item.lieked,
        nickname: item.user.nickname,
        commentId: item.commentId,
        userId: item.user.userId
      })
    })

    res.data.comments.forEach((item: any) => {
      playlistComments.value.push({
        avatarUrl: item.user.avatarUrl,
        content: item.content,
        likeCount: item.likedCount,
        time: item.time,
        lieked: item.lieked,
        nickname: item.user.nickname,
        commentId: item.commentId,
        userId: item.user.userId
      })
    })
  })
}
const hanldCurrentChange = (page: number) => {
  params.offset = page
  getMusicComment()
}
// 发送评论
const commentMusic = (content: string) => {
  commentApi({
    content: content,
    t: 1,
    type: 0,
    id: fms.value[currentIndex.value].id
  }).then(res => {
    if (res.data.code === 200) {
      getMusicComment()
    } else {
      ElMessage.info('请登录')
    }
  })
}
watch(() => params.id, () => {
  getMusicComment()
})
</script>

<style scoped></style>