<template>
  <div class="flex h-100%">
    <div class="w-164px h-100% flex cursor-move">
      <div class="relative">
        <img class="h-156px w-66px relative start--12px" src="@/assets/ruler.png" alt="">
        <svg-icon class="absolute start-10px top-50% translate-y--50%" style="font-size: 40px" name="point_to"></svg-icon>
      </div>
      <div @wheel="handleWheel($event)" class="h-100% overflow-hidden">
        <ul class=" h-100% flex flex-col justify-between relative">
          <li :class="{ 'active': index === 2, 'side': index === 0 || index === 4, 'mid': index === 1 || index === 3 }"
            class="" v-for="(item, index) in titles.slice(currentIndex, (currentIndex + 1) * 5)" :key="item">{{ item }}
          </li>
        </ul>
      </div>
    </div>
    <div class="flex-1">2</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const titles = ['情感故事', '新闻资讯', '真实故事', '每日必听', '搞笑段子', '音乐推荐', '听见好书', '热门翻唱']
const currentIndex = ref(0)

const handleWheel = (event: WheelEvent) => {
  // 获取滚动方向和滚动量
  const delta = Math.max(-1, Math.min(1, event.deltaY || -event.detail));
  if (delta > 0) {
    console.log("向上滚动");
  } else {
    console.log("向下滚动");
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
</style>