import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getPlaylistMusicApi } from '@/api/playlist'
import { getMusicUrlApi } from '@/api/music'
import { ElMessage } from 'element-plus'
export type currentMusicLevel =
  | 'standard'
  | 'higher'
  | 'exhigh'
  | 'lossless'
  | 'hires'
  | 'jyeffect'
  | 'jymaster'
export const useGlobalStore = defineStore(
  'global',
  () => {
    // TODO audio相关封装为hook
    // TODO 修改为promise setAudioUrlAndId只用传递歌曲id/视频id不再手动调用audioPlay

    // audio示例相关
    const appAudio = new Audio()
    const isPlay = ref<boolean>(false)
    const audioPlay = () => {
      isPlay.value = true
      appAudio.play()
    }
    const audioPause = () => {
      isPlay.value = false
      appAudio.pause()
    }

    // 播放音乐相关
    const currentMusicId = ref<string | number | undefined>(undefined)
    const currentMusicUrl = ref('')
    const currentMusicLevel = ref<currentMusicLevel>('standard')
    const setAudioUrlAndId = (url: string, id: string | number) => {
      appAudio.src = url
      currentMusicUrl.value = url
      currentMusicId.value = id
    }

    // 播放列表相关
    const currentPlaylistId = ref()
    const currentPlaylist = ref<any>([])
    const setCurrentPlaylist = async (id: number) => {
      currentPlaylistId.value = id
      currentPlaylist.value = await getCurrentPlaylist()
      // TODO此处需判断播放顺序 暂时为顺序播放
      currentMusicId.value = currentPlaylist.value[0].id
      currentMusicUrl.value = await getCurrentMusicUrl()

      audioPlay()
    }

    return {
      appAudio,
      isPlay,
      currentMusicId,
      currentMusicUrl,
      currentMusicLevel,
      currentPlaylistId,
      setCurrentPlaylist,
      setAudioUrlAndId,
      audioPlay,
      audioPause
    }
  },
  {
    persist: true
  }
)

async function getCurrentPlaylist() {
  const data = await getPlaylistMusicApi({
    id: useGlobalStore().currentPlaylistId
  }).catch(() => {
    ElMessage.error('出错啦!')
  })
  const res = data?.data.songs
  return res
}

async function getCurrentMusicUrl() {
  const data = await getMusicUrlApi({
    id: useGlobalStore().currentMusicId as number,
    level: useGlobalStore().currentMusicLevel
  }).catch(() => {
    ElMessage.error('出错啦!')
  })
  const res = data?.data.data[0].url
  return res
}
