<template>
  <div class="wrapper flex justify-center">
    <section class="page">
      <section class="flex justify-between">
        <div class="w-620px">
          <div class="title  h-40px">
            <h3 @click="router.go(-1)" class="flex items-center cursor-pointer font-normal text-base"> <svg-icon
                style="font-size: 14px;margin-right: 8px;" name="left"></svg-icon>
              {{
                type ? 'MV' :
                '视频' }}详情</h3>
          </div>
          <video width="620" height="352" ref="videoRef" :src="url" autoplay controls></video>

          <section v-if="videoInfo.creator" class="flex items-center mt-15px">
            <img class="w-48px h-48px rounded-3xl mr-10px" :src="videoInfo.creator.avatarUrl" alt="">
            <a class="flex-1" style="font-size: 14px;">{{ videoInfo.creator.nickname || videoInfo.artistName }}</a>
            <span style="color: rgb(236, 65, 65);background-color: rgb(52, 44, 43);font-size: 14px;"
              class="flex items-center py-3px px-15px rounded-2xl cursor-pointer"><svg-icon style="font-size: 24px;"
                name="plus"></svg-icon>关注 </span>
          </section>

          <section v-if="videoInfo.artistName" class="flex items-center mt-15px">
            <img class="w-48px h-48px rounded-3xl mr-10px" :src="videoInfo.artists[0].img1v1Url" alt="">
            <a class="flex-1" style="font-size: 14px;">{{ videoInfo.artistName }}</a>
            <span style="color: rgb(236, 65, 65);background-color: rgb(52, 44, 43);font-size: 14px;"
              class="flex items-center py-3px px-15px rounded-2xl cursor-pointer"><svg-icon style="font-size: 24px;"
                name="plus"></svg-icon>关注 </span>
          </section>

          <section>
            <h2 class="p-0 mb-10px mt-30px "> {{ videoInfo.title || videoInfo.name }}</h2>
            <div style="color: var(--v-m-text-dark-color);font-size: 14px;" class="mb-10px flex items-center">发布：<span
                class="mr-30px">{{
                  formatDayTime(videoInfo.publishTime) }}</span>
              播放：<span>{{ formatCount(videoInfo.playTime) || formatCount(videoInfo.playCount)
              }}</span></div>
            <div>
              <span class="mr-6px py-3px px-8px rounded-2xl" style="font-size: 13px;background-color: rgb(50, 50, 50)"
                v-for="(item, index) in videoInfo.videoGroup" :key="index">
                {{ item.name }}
              </span>
            </div>
          </section>

          <section class="action-btns flex mt-15px items-center">
            <div @click="likeVideo" style="border:1px solid rgb(75, 75, 75);font-size: 14px;"
              class="cursor-pointer flex items-center px-20px py-6px rounded-2xl mr-10px">
              <svg-icon class="mr-3px" name="dianzan"></svg-icon> 赞({{ videoInfo.praisedCount || 0
              }})
            </div>
            <div @click="subscribeVideo" style="border:1px solid rgb(75, 75, 75);font-size: 14px;"
              class="cursor-pointer flex items-center px-20px py-6px rounded-2xl mr-10px">
              <svg-icon class="mr-3px" name="collect"></svg-icon>收藏({{
                videoInfo.subscribeCount || videoInfo.subCount }})
            </div>
            <div style="border:1px solid rgb(75, 75, 75);font-size: 14px;"
              class="cursor-pointer flex items-center px-20px py-6px rounded-2xl mr-10px">
              <svg-icon class="mr-3px" name="share"></svg-icon>分享({{
                videoInfo.shareCount }})
            </div>

            <span class="flex-1 text-right">
              <a style="font-size: 13px;"
                class="text-#66666d cursor-default underline underline-offset-1 hover:text-#8b8b8b">举报</a>
            </span>
          </section>

          <AppComment class="my-30px" @hanlde-comment="commentVideo" @like-comment="getComments" :type="5"
            :hot-comments="hotComments" :comments="videoComments">
            <template v-slot:pagination>
              <el-pagination @current-change="hanldCurrentChange" small background v-model:current-page="params.offset"
                :page-size="params.limit" layout="prev, pager, next" :total="total" />
            </template>
          </AppComment>
        </div>
        <div class="w-368px">
          <div class="title h-40px">
            <h3>相关音乐</h3>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { getVideoUrlApi, getVideoDetailApi, getRelatedVideoApi, getVideoCommentApi, likeVideoApi, subscribeVideoApi } from '@/api/video'
import { getMvUrlApi, getMvDetailApi, getMvCommentApi, subscribeMvApi } from '@/api/mv'
import { commentApi } from '@/api/comment'
import { formatCount, formatDayTime } from '@/util';
import AppComment, { type Comments } from '@/components/Comment/appComment.vue';
import { ElMessage } from 'element-plus';
const route = useRoute()
const router = useRouter()
const type = Number(route.query.type)

const url = ref('')
const videoRef = ref()
const getVideoUrl = () => {
  if (!type) {
    getVideoUrlApi(String(route.query.id)).then(res => {
      url.value = res.data.urls[0].url
    })
  } else {
    getMvUrlApi(String(route.query.id)).then(res => {
      url.value = res.data.data.url
    })
  }
}

getVideoUrl()

const videoInfo = ref<any>({})
const getVideoDetail = () => {
  if (type) {
    getMvDetailApi(String(route.query.id)).then(res => {
      videoInfo.value = res.data.data
    })
  } else {
    getVideoDetailApi(String(route.query.id)).then(res => {
      videoInfo.value = res.data.data
    })
  }

}
getVideoDetail()

const relatedVideos = ref<any[]>([])

const getRelatedVideo = () => {
  getRelatedVideoApi(String(route.query.id)).then(res => {

    relatedVideos.value = res.data.data
  })
}
getRelatedVideo()


// 获取评论
const hotComments = ref<Comments>([])
const videoComments = ref<Comments>([])
const total = ref(0)
const params = reactive({
  id: route.query.id,
  offset: 1,
  limit: 20
})
const getComments = () => {
  if (type) {
    getMvCommentApi({
      id: String(route.query.id),
      offset: (params.offset - 1) * params.limit,
      limit: params.limit
    }).then(res => {
      videoComments.value = []

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
        videoComments.value.push({
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
  } else {
    getVideoCommentApi({
      id: String(route.query.id),
      offset: (params.offset - 1) * params.limit,
      limit: params.limit
    }).then(res => {
      videoComments.value = []

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
        videoComments.value.push({
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

}
getComments()
const hanldCurrentChange = (page: number) => {
  params.offset = page
  getComments()
}
const commentVideo = (content: string) => {
  commentApi({
    content: content,
    t: 1,
    type: type ? 1 : 5,
    id: String(route.query.id)
  }).then(res => {
    if (res.data.code === 200) {
      getComments()
    } else {
      ElMessage.info('请登录')
    }
  })
}

const likeVideo = () => {
  likeVideoApi({ id: String(route.query.id), t: 1, type: type ? 1 : 5 }).then(res => {
    if (res.data.code === 200) {
      ElMessage.info('已赞')
      getVideoDetail()
    }
  })
}

const subscribeVideo = () => {
  if (type) {
    subscribeMvApi({ mvid: String(route.query.id), t: 1 }).then(res => {
      ElMessage.info(res.data.message)
      getVideoDetail()
    }).catch((err) => {
      ElMessage.info(err.response.data.message)
    })
  } else {
    subscribeVideoApi({ id: String(route.query.id), t: 1 }).then(res => {
      ElMessage.info(res.data.message)
      getVideoDetail()
    }).catch((err) => {
      ElMessage.info(err.response.data.message)
    })
  }
}

</script>

<style scoped lang="scss">
.page {
  max-width: 1024px;
  min-width: 1024px;
  height: calc(100vh - 56px);
  overflow: auto;

  .action-btns {
    >div {
      &:hover {
        background-color: var(--v-m-hover-bgc);
      }
    }
  }
}
</style>