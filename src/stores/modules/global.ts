import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useGlobalStore = defineStore('global', () => {
  const currentMusicUrl = ref('')
  const currentVideoUrl = ref('')
  const isPlay = ref<boolean>(false)
  const appAudio = new Audio()
  const setAudioUrl = (url: string) => {
    appAudio.src = url
    currentMusicUrl.value = url
  }
  const audioPlay = () => {
    isPlay.value = true
    appAudio.play()
  }
  const audioPause = () => {
    isPlay.value = false
    appAudio.pause()
  }
  return { currentMusicUrl, currentVideoUrl, isPlay, appAudio, setAudioUrl, audioPlay, audioPause }
}) 