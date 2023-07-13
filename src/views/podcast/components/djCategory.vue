<template>
  <div class="h-100% flex">
    <div class="flex items-center mx-8px cursor-pointer">
      <svg-icon style="font-size: 20px;" name="left"></svg-icon>
    </div>
    <div class="flex-1 relative">
      <ul class="flex  flex-wrap absolute ">
        <li v-for="(item, index) in 3" :key="index">{{ item }}</li>
      </ul>
    </div>
    <div class="flex items-center mx-8px cursor-pointer">
      <svg-icon style="font-size: 20px;" name="right"></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Item {
  name: string
  [propName: string]: any
}
interface Props {
  row: number
  column: number
  modelValue: Array<Item>
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  row: 2,
  column: 4
})
console.log(props);


</script>

<style scoped lang="scss"></style>