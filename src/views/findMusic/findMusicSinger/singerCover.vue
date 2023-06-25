<template>
  <div class="singer-cover my-10px cursor-pointer">
    <img :src="props.content.picUrl" alt="">
    <div class="text-sm hover:text-white">{{ props.content.name }}</div>
  </div>
</template>

<script setup lang="ts">
interface Content {
  picUrl: string
  id: number
  name: string,
  [propName: string]: any
}
interface Props {
  content: Content
}
const props = withDefaults(defineProps<Props>(), {
  content: () => ({ name: '', id: 0, picUrl: '' })
})
</script>

<style scoped lang="scss">
img {
  width: 100%;
  height: 150px;
  border-radius: 10px;
  background-size: 100% 100%;
}
</style>