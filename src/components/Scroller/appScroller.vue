<template>
  <div class="h-100% flex">
    <div class="flex w-20px items-center mx-8px cursor-pointer">
      <svg-icon v-show="currentIndex !== 0" @click="prev" style="font-size: 20px;" name="left"></svg-icon>
    </div>
    <div class="flex-1 relative overflow-hidden">
      <ul ref="categoryWrapperRef" class="flex w-300% absolute overflow-hidden h-100%">
        <li ref="categoryPageRef" class="w-100% " v-for="(item, index) in pages" :key="index">
          <div class="flex flex-wrap h-100%">
            <div class="flex flex-col justify-between items-center" v-for="(i, index1) in props.row " :key="index1">
              <div class="flex  justify-between items-center h-100%">
                <div class="flex flex-col justify-center items-center"
                  v-for="(i2, index3) in currentItem(index).slice((i - 1) * props.column, i * props.column) "
                  :key="index3">
                  <slot name="default" :row="i2"></slot>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="flex w-20px items-center mx-8px cursor-pointer">
      <svg-icon v-show="currentIndex !== pages - 1" @click="next" style="font-size: 20px;" name="right"></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
interface Item {
  name: string
  [propName: string]: any
}
interface Props {
  row?: number
  column?: number
  modelValue?: Array<Item>
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  row: 2,
  column: 4
})
const emits = defineEmits(['next', 'prev'])
const pages = computed(() => Math.ceil(props.modelValue.length / (props.row * props.column)))
const currentItem = computed(() => (index: number) => {
  const prefix = index * (props.row * props.column)
  const suffix = (index + 1) * (props.row * props.column)
  return props.modelValue.slice(prefix, suffix)
})

const categoryWrapperRef = ref<HTMLElement>()
const categoryPageRef = ref<HTMLElement[]>()
const currentWidth = ref(0)
const currentIndex = ref(0)
const prev = () => {
  const width = categoryPageRef.value![0].clientWidth
  let w = width * currentIndex.value
  currentWidth.value = width * (currentIndex.value - 1)
  currentIndex.value -= 1
  setInterval(() => {
    if (w > currentWidth.value) {
      w -= 10
      categoryWrapperRef.value!.style.transform = `translateX(${-w}px)`
    }
  }, 10)
  emits('prev', currentIndex.value)
}

const next = () => {
  const width = categoryPageRef.value![0].clientWidth
  let w = width * currentIndex.value
  currentWidth.value = width * (currentIndex.value + 1)
  currentIndex.value += 1
  setInterval(() => {
    if (w < currentWidth.value) {
      w += 10
      categoryWrapperRef.value!.style.transform = `translateX(${-w}px)`
    }
  }, 10)
  emits('next', currentIndex.value)
}

</script>

<style scoped lang="scss"></style>