<template>
  <div class="flex h-100%">
    <div class="w-164px h-100% flex cursor-move mr-12px">
      <div class="relative">
        <img class="h-156px w-66px relative start--12px" src="@/assets/ruler.png" alt="">
        <svg-icon class="absolute start-10px top-50% translate-y--50%" style="font-size: 40px" name="point_to"></svg-icon>
      </div>
      <div @wheel="handleWheel($event)" class="h-100% overflow-hidden">
        <Transition name="slider">
          <ul v-if="show" class=" h-100% flex flex-col justify-between relative">
            <li :class="{ 'active': index === 2, 'side': index === 0 || index === 4, 'mid': index === 1 || index === 3 }"
              class="whitespace-nowrap overflow-hidden text-ellipsis"
              v-for="(item, index) in titles.slice(currentIndex, currentIndex + 5)" :key="index">{{
                item.name
              }}
            </li>
          </ul>
        </Transition>
      </div>
    </div>
    <div class="right-content flex-1 flex items-center justify-center overflow-hidden">
      <Transition name="slider">
        <img v-if="show" class="w-90% h-90% rounded" :src="titles[currentIndex + 2].coverUrl" alt="">
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
export interface Program {
  id: number
  coverUrl: string
  name: string
  [propName: string]: any
}
interface Props {
  programs: Array<Program>
}
const props = withDefaults(defineProps<Props>(), {
  programs: () => []
})
const titles = ref(props.programs)
const currentIndex = ref(0)
const index = ref(0)

const show = ref(true)
const handleWheel = (event: WheelEvent) => {
  // 获取滚动方向和滚动量
  const delta = Math.max(-1, Math.min(1, event.deltaY || -event.detail));
  if (delta > 0) {
    if (currentIndex.value === titles.value.length - 5) {
      titles.value.push(titles.value[index.value])
      index.value += 1
    }
    currentIndex.value += 1
    show.value = false
    setTimeout(() => {
      show.value = true
    }, 0)
  } else {
    if (currentIndex.value === 0) return
    currentIndex.value -= 1
    show.value = false
    setTimeout(() => {
      show.value = true
    }, 0)
  }
}
</script>

<style scoped lang="scss">
.active {
  font-size: 18px;
  color: #fff;
}

.side {
  font-size: 14px;
  color: rgb(161, 157, 149);
}

.mid {
  font-size: 16px;
  color: rgb(167, 166, 165);
}

.right-content {
  background-image: linear-gradient(to bottom, #e20505, #1f1f1f);
}

.slider-enter-active {
  transition: all 0.3s ease-out;
}

.slider-leave-active {
  transition: all 0.3s ease-in;
}

.slider-enter-from,
.slider-leave-to {
  transform: translateY(-50px);
}
</style>