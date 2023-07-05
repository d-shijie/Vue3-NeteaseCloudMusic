<template>
  <div class="app-controller">

    <div class="cover">
      <img
        :src="currentMusicInfo.info.al?.picUrl || 'https://img1.baidu.com/it/u=950943067,1138707327&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'"
        alt="">
      <div class="music-info">
        <div style="font-size: 14px;">
          <span
            style="display: inline-block; white-space: nowrap;text-overflow: ellipsis;overflow: hidden;max-width: 168px;">{{
              currentMusicInfo.info.name || ''
            }}</span>
          <svg-icon v-if="currentMusicInfo.info.name" style="font-size: 20px;cursor: pointer;position: relative;top: 4px;"
            name="like_outline"></svg-icon>
        </div>
        <div style="font-size: 13px;">
          {{ formatAr(currentMusicInfo.info.ar) }}
        </div>
      </div>
    </div>
    <div class="main">
      <div class="controll-wrapper">
        <div class="controll-item">
          <svg-icon class="svg" style="font-size: 16px;" name="play_order"></svg-icon>
        </div>
        <div @click="globalStore.prevPlay" class="controll-item">
          <svg-icon class="svg" style="font-size: 16px;" name="prefix"></svg-icon>
        </div>
        <div class="controll-item play">
          <svg-icon @click="pause" v-if="globalStore.isPlay" class="svg" style="font-size: 22px;" name="pause"></svg-icon>
          <svg-icon @click="play" v-else class="svg" style="font-size: 22px;" name="play"></svg-icon>
        </div>
        <div @click="globalStore.nextPlay" class="controll-item">
          <svg-icon class="svg" style="font-size: 16px;" name="suffix"></svg-icon>
        </div>
        <div class="controll-item">
          <svg-icon class="svg" style="font-size: 16px;" name="lyric">
          </svg-icon>
        </div>
      </div>
      <div class="time">
        <span class="current-time">{{ stampToMin(currentTime) }}</span>
        <div class="controll-time">
          <div ref="timerRef" class="timer">

          </div>
        </div>
        <span class="end-time">{{ stampToMin(currentMusicInfo.info.dt) }}</span>
      </div>
    </div>
    <div class="setting">
      <div class="setting-item tone-quality">
        <el-popover placement="top" :show-arrow="false" :width="200" trigger="click">
          <ui>
            <li @click="shiftMusicQuality(item.value)" class="my-10px cursor-pointer text-#fefefe flex items-center"
              v-for="(item, index) in musicQuality" :key="index">
              <svg-icon :style="{ opacity: globalStore.currentMusicLevel === item.value ? '1' : '0' }" class="mr-3px"
                name="correct"></svg-icon>
              <span :style="{ color: globalStore.currentMusicLevel === item.value ? 'red' : '#fefefe' }">
                {{ item.label }}
              </span>
            </li>
          </ui>
          <template #reference>
            <div class="overflow-hidden text-ellipsis whitespace-nowrap"> {{ musicLevel?.label }}</div>
          </template>
        </el-popover>
      </div>
      <div class="setting-item">
        <svg-icon class="svg" style="font-size: 24px;" name="tone">
        </svg-icon>
      </div>
      <div class="setting-item">
        <svg-icon class="svg" style="font-size: 24px;" name="volume">
        </svg-icon>
      </div>
      <div class="setting-item">
        <svg-icon class="svg" style="font-size: 24px;" name="listen_together">
        </svg-icon>
      </div>
      <div class="setting-item">
        <svg-icon class="svg" style="font-size: 20px;" name="playlist">
        </svg-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore, type currentMusicLevel } from '@/stores/modules/global'
import { getMusicDetailApi } from '@/api/music'
import { computed, reactive, ref } from 'vue'
import { stampToMin } from '@/util/timeFormat'
const globalStore = useGlobalStore()

const timerRef = ref()
const timer = ref()
const currentTime = ref()
const currentMusicInfo = reactive({
  info: {} as any
})
// 触发pinia订阅事件
globalStore.$subscribe(() => {
  clearInterval(timer.value)
  getMusicDetailApi(globalStore.currentMusicId as string).then(res => {
    currentMusicInfo.info = res.data.songs[0]
    timer.value = setInterval(() => {
      currentTime.value = Number(globalStore.appAudio.currentTime.toFixed(0)) * 1000
      const w = (currentTime.value / currentMusicInfo.info.dt * 100).toFixed(2) + '%'
      timerRef.value.style.width = w

    }, 1000)
  })
})
const play = () => {
  if (globalStore.currentMusicUrl) {
    if (!globalStore.appAudio.paused) {
      globalStore.setAudioUrlAndId(globalStore.currentMusicUrl, globalStore.currentMusicId as string)
    }
    globalStore.audioPlay()
  }
}
const pause = () => {
  if (globalStore.currentMusicUrl) {
    globalStore.audioPause()
  }
}

const musicQuality = ref<{ label: string, value: currentMusicLevel }[]>([
  {
    label: '标准音质',
    value: 'standard'
  },
  {
    label: '较高音质',
    value: 'higher'
  },
  {
    label: '极高音质',
    value: 'exhigh'
  },
  {
    label: '无损音质',
    value: 'lossless'
  },
  {
    label: 'Hi-Res音质',
    value: 'hires'
  },
  {
    label: '沉浸环绕声音质',
    value: 'sky'
  },
  {
    label: '高清环绕声音质',
    value: 'jyeffect'
  },
  {
    label: '超清母带音质',
    value: 'jymaster'
  },
])

const musicLevel = computed(() => {
  const level = musicQuality.value.find(item => {
    return item.value === globalStore.currentMusicLevel
  })
  return level
})
const shiftMusicQuality = (levle: currentMusicLevel) => {
  globalStore.currentMusicLevel = levle
  if (globalStore.currentMusicUrl) {
    globalStore.setAudioUrlAndId(globalStore.currentMusicUrl, globalStore.currentMusicId as string)
    globalStore.audioPlay()
  }
}

const formatAr = (arr: any[]): string => {
  if (!arr) return ''
  let res: string = ''
  arr.forEach((item, index) => {
    const l = index === arr.length - 1 ? '' : '/'
    res += item.name + l
  })
  return res
}
</script>

<style scoped lang="scss">
.app-controller {

  display: flex;
  align-items: center;
  height: 68px;
  background-color: rgb(33, 33, 36);
  border-top: 1px solid rgb(61, 61, 64);
  justify-content: space-between;

  .cover {
    display: flex;
    align-items: center;
    width: 267px;
    margin-left: 16px;

    img {
      cursor: pointer;
      width: 44px;
      height: 44px;
      margin-right: 14px;
      border-radius: 0.15em;
      position: relative;

      &:hover {
        filter: blur(2px);
      }
    }

    .music-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      div {
        margin-bottom: 8px;
      }
    }
  }

  .main {
    width: 432px;

    .controll-wrapper {
      display: flex;
      justify-content: center;
      margin-bottom: 6px;

      .play {
        background-color: rgb(43, 43, 46);

        &:hover {
          background-color: var(--v-m-hover-bgc);
        }
      }

      .controll-item {
        cursor: pointer;
        display: flex;
        margin: 0 10px;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 34px;
        border-radius: 50%;

        &:hover {
          background-color: var(--v-m-hover-bgc);
        }
      }
    }

    .time {
      display: flex;
      align-items: center;
      font-size: 10px;
      color: rgb(101, 101, 104);

      .controll-time {
        height: 3px;
        flex: 1;
        cursor: pointer;
        margin: 0 6px;
        background-color: #fff;


        .timer {
          background-color: #fff;
          background-color: rgb(236, 65, 65);
          height: 100%;
          width: 0;
        }
      }
    }


  }

  .setting {
    width: 256px;
    justify-content: right;
    display: flex;
    align-items: center;

    .tone-quality {
      font-size: 12px;
      border: 1px solid #fff;
      padding: 2px;
      border-radius: 0.20em;
    }

    .setting-item {
      display: flex;
      margin: 0 10px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
}
</style>