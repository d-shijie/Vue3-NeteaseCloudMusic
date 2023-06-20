<template>
  <div class="official-rank">
    <img :src="props.content.coverImgUrl" alt="">
    <div class="info">
      <ul>
        <li @click="playMusic(item)" :style="[{ background: (index % 2 ? 'transparent' : 'rgb(47, 47, 47)') }]"
          v-for="(item, index) in top5Music" :key="index">
          <span :style="[{ color: (index > 2 ? 'var(--v-m-text-dark-color)' : 'rgb(236, 57, 51)') }]"
            style="margin-right: 12px">{{ index + 1 }}</span>
          <span> {{ item.name }}</span>
          <span> {{ formatAr(item.ar) }}</span>
        </li>
        <li class="find-all">
          <a @click="gotoDetail">查看全部</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getPlaylistDetailApi } from '@/api/playlist'
import { getMusicUrlApi } from '@/api/music'
import { useGlobalStore } from '@/stores/modules/global'
import { useRouter } from 'vue-router'
const router = useRouter()
const globalStore = useGlobalStore()
interface RankType {
  coverImgUrl: string
  updateTime: number
  id: number
  [propName: string]: any
}
interface Props {
  content: RankType
}

const props = withDefaults(defineProps<Props>(), {
  content: () => ({ coverImgUrl: '', updateTime: 0, id: 0 })
})

const top5Music = ref<any[]>([])
const getTop5Music = () => {
  getPlaylistDetailApi(props.content.id).then(res => {
    top5Music.value = res.data.playlist.tracks.slice(0, 5)
  })
}
getTop5Music()

const playMusic = (row: any) => {
  getMusicUrlApi({
    id: row.id,
    level: globalStore.currentMusicLevel
  }).then(res => {
    globalStore.setAudioUrlAndId(res.data.data[0].url, row.id)
    globalStore.audioPlay()
  })
}

const gotoDetail = () => {
  router.push({
    path: '/index/playlist-detail',
    query: {
      id: props.content.id
    }
  })
}
const formatAr = (arr: any[]): string => {
  let res: string = ''
  arr.forEach((item, index) => {
    const l = index === arr.length - 1 ? '' : '/'
    res += item.name + l
  })
  return res
}
</script>

<style scoped lang="scss">
.official-rank {
  display: flex;
  margin-bottom: 20px;
  padding-bottom: 20px;
  width: 100%;

  img {
    width: 168px;
    height: 168px;
    border-radius: 10px;
    margin-right: 30px;
  }

  .info {
    flex: 1;

    ul {
      li {
        font-size: 13px;
        padding: 8px 12px;

        display: flex;


        span:last-child {
          flex: 1;
          text-align: right;
          color: var(--v-m-text-dark-color)
        }
      }

      li:hover {
        background-color: var(--v-m-hover-bgc) !important;
      }

      .find-all {
        background-color: transparent;
        color: var(--v-m-text-dark-color);
        cursor: pointer;

        &:hover {
          background-color: transparent !important;
        }

        a {
          display: flex;
          align-items: center;
        }

        a::after {
          content: '';
          width: 10px;
          height: 10px;
          display: inline-block;
          font-size: 10px;
          background: url('@/icons/svg/arrow_right.svg') no-repeat;
          background-size: 100% 100%;
        }

        a:hover {
          color: var(--v-m-text-color);
        }
      }
    }
  }
}
</style>