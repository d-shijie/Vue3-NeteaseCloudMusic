import { defineStore } from 'pinia'
import { ref } from 'vue'
export type currentMusicLevel = 'standard' | 'higher' | 'exhigh' | 'lossless' | 'hires' | 'jyeffect' | 'jymaster'
export const useGlobalStore = defineStore('global', () => {
  // TODO audio相关封装为hook
  const currentMusicId = ref<string | number | undefined>(undefined)
  const currentMusicUrl = ref('')
  const currentVideoUrl = ref('')
  const currentMusicLevel = ref<currentMusicLevel>('standard')
  const currentPlaylist = ref([])
  const isPlay = ref<boolean>(false)
  const appAudio = new Audio()
  const setAudioUrlAndId = (url: string, id: string | number) => {
    appAudio.src = url
    currentMusicUrl.value = url
    currentMusicId.value = id
  }
  const audioPlay = () => {
    isPlay.value = true
    appAudio.play()
  }
  const audioPause = () => {
    isPlay.value = false
    appAudio.pause()
  }
  return { currentMusicId, currentMusicUrl, currentVideoUrl, currentMusicLevel, currentPlaylist, isPlay, appAudio, setAudioUrlAndId, audioPlay, audioPause }
}) 