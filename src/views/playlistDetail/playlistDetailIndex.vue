<template>
  <div class="playlist-detail">
    <div v-if="playlist" class="playlist-detail-header">
      <img :src="playlist.coverImgUrl" alt="">
      <div class="playlist-detail-header-info">
        <div class="playlist-detail-header-info-title">{{ playlist.name }}</div>
        <div class="playlist-detail-header-info-creator">
          <label>
            <span class="avatar">
              <img :src="playlist.creator.avatarUrl" alt="">
            </span>
            <span class="creator-name">
              {{ playlist.creator.nickname }}
            </span>
          </label>
          <span class="create-time">
            {{ formatDayTime(playlist.createTime) }}创建
          </span>
        </div>
        <div class="playlist-detail-header-info-actions">
          <div class="action-btn play">
            <svg-icon style="font-size: 18px;margin-right: 6px;" name="play"></svg-icon> 播放全部
            <svg-icon style="font-size: 18px;margin-left: 6px;" name="plus_white"></svg-icon>
          </div>
          <div @click="subscribePlaylist" class="action-btn">
            <svg-icon v-if="!playlist.subscribed" style="font-size: 18px;margin-right: 6px;" name="collect"></svg-icon>
            {{ playlist.subscribed ? '取消收藏' : '收藏' }}({{
              formatCount(playlist.subscribedCount) }})
          </div>
          <div class="action-btn">
            <svg-icon style="font-size: 18px;margin-right: 6px;" name="share"></svg-icon> 分享({{
              formatCount(playlist.shareCount) }})
          </div>
          <div class="action-btn">
            <svg-icon style="font-size: 18px;margin-right: 6px;" name="download"></svg-icon> 下载全部
          </div>
        </div>
        <div class="playlist-detail-header-info-counts" style="font-size: 12px;">
          <span style="margin-right: 8px;" class="musics">
            <span style="color:rgb(213,213,213)">歌曲: </span><span style="color:rgb(139,139,139)">{{ playlist.trackCount
            }}</span>
          </span>
          <span class="plays">
            <span style="color:rgb(213,213,213)">播放: </span><span style="color:rgb(139,139,139)"> {{
              formatCount(playlist.playCount)
            }}</span>
          </span>
        </div>
        <div class="playlist-detail-header-info-desc" style="font-size: 12px;">
          <div style="color:rgb(213,213,213)">简介: </div>
          <div class="desc" style="color:rgb(139,139,139)">
            {{ playlist.description }}</div>
        </div>
      </div>
    </div>
    <div class="tabs">
      <div @click="activeTab = 'musicList'" class="tab" :class="{ 'active': activeTab === 'musicList' }">歌曲列表</div>
      <div @click="activeTab = 'comment'" class="tab" :class="{ 'active': activeTab === 'comment' }">评论({{
        playlist ? playlist.commentCount : 0 }})</div>
      <div @click="activeTab = 'collectors'" class="tab" :class="{ 'active': activeTab === 'collectors' }">收藏者</div>
    </div>
    <!-- TODO 如何使用动态组件传值 -->
    <!-- <component :is="activeComponent" /> -->
    <PlaylistMusics v-if="activeTab === 'musicList'" />
    <Collectors v-if="activeTab === 'collectors'" />
    <Comment @like-comment="getComments" :type="2" @hanlde-comment="commentPlaylist" :hot-comments="hotComments"
      :comments="playlistComments" v-if="activeTab === 'comment'">
      <template v-slot:pagination>
        <el-pagination @current-change="hanldCurrentChange" small background v-model:current-page="params.offset"
          :page-size="60" layout="prev, pager, next" :total="total" />
      </template>
    </Comment>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue';
import PlaylistMusics from '@/components/playlist/playlistMusics.vue';
import Collectors from './playlistCollectors.vue';
import Comment, { type Comments } from '@/components/Comment/appComment.vue';
import { formatDayTime } from '@/util/timeFormat'
import { formatCount } from '@/util/index'
import { getPlaylistDetailApi, getPlaylistCommentsApi, subscribePlaylistApi } from '@/api/playlist'
import { commentApi } from '@/api/comment'
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';

const route = useRoute()
// 歌单详情
const playlist = ref()
const getPlaylistDetail = () => {
  getPlaylistDetailApi(String(route.query.id)).then(res => {
    playlist.value = res.data.playlist
  })
}

watch(route, () => {
  params.id = route.query.id
  getComments()
  getPlaylistDetail()
})
getPlaylistDetail()

// tabs
const activeTab = ref<'musicList' | 'comment' | 'collectors'>('musicList')

// 获取评论
const hotComments = ref<Comments>([])
const playlistComments = ref<Comments>([])
const total = ref(0)
const params = reactive({
  id: route.query.id,
  offset: 1,
  limit: 60
})
const getComments = () => {
  getPlaylistCommentsApi({
    id: String(params.id),
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
getComments()
const hanldCurrentChange = (page: number) => {
  params.offset = page
  getComments()
}

// 发送评论
const commentPlaylist = (content: string) => {
  commentApi({
    content: content,
    t: 1,
    type: 2,
    id: Number(route.query.id)
  }).then(res => {
    if (res.data.code === 200) {
      getComments()
    } else {
      ElMessage.info('请登录')
    }
  })
}

// 收藏歌单
const subscribePlaylist = () => {
  const t = playlist.value.subscribed ? 0 : 1
  subscribePlaylistApi(Number(route.query.id), t).then((res: any) => {
    if (res.code === 200) {
      const message = playlist.value.subscribed ? '取消收藏成功' : '收藏成功'
      ElMessage.success(message)
      getPlaylistDetail()
    } else {
      ElMessage.info(res.data.msg)
    }
  }).catch((err: any) => {
    ElMessage.info(err)
  })
}


</script>

<style scoped lang="scss">
.playlist-detail {
  &-header {
    padding: 30px 30px 15px;
    display: flex;

    >img {
      width: 180px;
      height: 180px;
      border-radius: 0.25em;
      margin-right: 12px;
    }

    &-info {
      div {
        margin-bottom: 12px;
      }

      &-actions {
        display: flex;
        align-items: center;
        cursor: pointer;

        .action-btn {
          margin-right: 12px;
          border: 1px solid rgb(75, 75, 75);
          padding: 8px 16px;
          font-size: 13px;
          border-radius: 2em;
          display: flex;
          align-items: center;

          &:hover {
            background-color: rgb(54, 54, 54);
          }
        }

        .play {
          background-color: rgb(236, 65, 65);
          border: none;

          &:hover {
            background-color: rgb(217, 63, 63);
          }
        }
      }

      &-title {
        font-size: 22px;
        font-weight: 600;
        color: var(--v-m-text-color);
      }

      &-creator {
        display: flex;
        align-items: center;
        font-size: 12px;

        label {
          display: flex;
          cursor: pointer;
          color: rgb(95, 172, 230);
          align-items: center;

          &:hover {
            color: rgb(179, 206, 229);
          }
        }

        span {
          margin-right: 8px;
        }

        .avatar {
          img {
            width: 26px;
            height: 26px;
            border-radius: 50%;
          }
        }

        .create-time {
          color: rgb(139, 139, 139)
        }
      }

      &-desc {
        display: flex;
        align-items: center;

        .desc {
          display: inline-block;
          width: 100px;
          height: 100%;
          margin-left: 4px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
  }

  .tabs {
    display: flex;
    font-size: 14px;
    padding: 0 30px 20px;

    .tab {
      margin-right: 24px;
      display: flex;
      cursor: pointer;
      align-items: center;

      &:hover {
        color: #fff;
      }
    }

    .active {
      padding: 3px 0;
      font-size: 18px;
      font-weight: 600;
      border-bottom: 3px solid rgb(236, 65, 65)
    }
  }
}
</style>