<template>
  <div class="w-100% flex justify-center flex-col items-center">
    <section class="flex  w-600px " v-if="fms.length">
      <section class="flex-1 mr-20px my-50px">
        <div class="relative">
          <img class="w-300px h-300px rounded-l" :src="fms[currentIndex].album.picUrl" alt="">
          <span v-show="!playing" ref="playBtnRef" @click="playFm"
            class="play-btn bg-#fff -translate-x-50% -translate-y-50% cursor-pointer opacity-80 absolute start-50% top-50% flex items-center justify-center w-50px h-50px rounded-full">
            <svg-icon class="text-20px relative start-2px" name="play_red"></svg-icon>
          </span>
          <span v-show="playing" ref="pauseBtnRef" @click="pauseFm"
            class="play-btn bg-#fff cursor-pointer opacity-80 absolute end-10px bottom-10px flex items-center justify-center w-40px h-40px rounded-full">
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
      <section class="flex-1 ml-20px">
        <AppLyric :id="fms[currentIndex].id" />
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
import { ref, reactive, watch, onMounted } from 'vue'
import { getPrivateFmApi, getMusicUrlApi } from '@/api/music';
import { getMusicCommentApi, commentApi } from '@/api/comment'
import { useGlobalStore } from '@/stores/modules/global';
import AppComment, { type Comments } from '@/components/Comment/appComment.vue';
import AppLyric from '@/components/AppLyric/appLyric.vue'
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
    total.value = res.data.total
    if (res.data.hotComments) {
      hotComments.value = []
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
    }
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

// 歌词

const playing = ref(false)
const playBtnRef = ref()
const pauseBtnRef = ref()
const playFm = () => {
  pauseBtnRef.value?.classList.remove('pause')
  playBtnRef.value?.classList.add('play')
  setTimeout(() => {
    playing.value = !playing.value
  }, 1000)
  if (globalStore.currentMusicId === fms.value[currentIndex.value].id) {
    globalStore.audioPlay()
    return
  }
  getMusicUrlApi({
    id: fms.value[currentIndex.value].id,
    level: globalStore.currentMusicLevel
  }).then(res => {
    globalStore.setAudioUrlAndId(res.data.data[0].url, fms.value[currentIndex.value].id)
    globalStore.audioPlay()
  })
}

const pauseFm = () => {
  globalStore.audioPause()
  playBtnRef.value?.classList.remove('play')
  pauseBtnRef.value?.classList.add('pause')
  setTimeout(() => {
    playing.value = !playing.value
  }, 1000)
}
watch(() => params.id, () => {
  getMusicComment()
})


</script>

<style scoped lang="scss">
.play {
  animation: play-out 1s ease;
}

@keyframes play-out {
  0% {
    transform: translate(0px, 0px);
    scale: (1);
  }

  100% {
    transform: translate(120px, 120px);
    scale: (0.8);
  }
}

.pause {
  animation: pause-out 1s ease;
}

@keyframes pause-out {
  0% {
    transform: translate(0px, 0px);
    scale: (1);
  }

  100% {
    transform: translate(-100px, -100px);
    scale: (1.2);

  }
}
</style>