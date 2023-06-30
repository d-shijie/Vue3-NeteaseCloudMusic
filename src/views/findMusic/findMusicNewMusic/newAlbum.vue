<template>
  <div class="new-albumn w-100% mx-15px mb-20px">
    <div class="cover relative cursor-pointer">
      <img @click="gotoDetail" class="w-100% rounded" :src="props.cover" alt="">
      <div class="icon   absolute w-40px h-40px rounded-50% flex items-center justify-center"><svg-icon name="play_red"
          class="absolute left-13px"></svg-icon> </div>
    </div>

    <div @click="gotoDetail" class="name mt-5px cursor-pointer hover:text-#fff">{{ props.name }}</div>
    <div class="author mt-5px cursor-pointer hover:text-#fff">{{ props.author }}</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
interface Info {
  id: number
  [propName: string]: any
}
interface Props {
  cover: string
  author: string
  name: string
  info: Info
}

const props = withDefaults(defineProps<Props>(), {
  cover: '',
  author: '',
  name: '',
  info: () => ({ id: 0 })
})

const gotoDetail = () => {
  router.push({
    path: '/index/playlist-detail',
    query: {
      id: props.info.id
    }
  })
}
</script>

<style scoped lang="scss">
.cover {
  .icon {
    transition: opacity 0.75s;
    background-color: rgba(255, 255, 255, 0.7);
    opacity: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover {
    .icon {
      opacity: 1;
    }
  }
}

.name {
  font-size: 13px;
}

.author {
  font-size: 12px;
  color: var(--v-m-text-dark-color);
}
</style>