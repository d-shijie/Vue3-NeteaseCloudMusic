<template>
  <div class="sub-tab">
    <a @click="handleClick(item, index)" v-for="(item, index)  in tabs" :key="index" class="tab"
      :class="{ 'active': activeClass(item, index) }">
      {{ item.tab }}
    </a>

  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PropType } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export interface Tab {
  tab: string
  path?: string
}
const router = useRouter()
const route = useRoute()
defineProps({
  tabs: {
    type: Array as PropType<Tab[]>,
    default: () => []
  },
})
const emits = defineEmits(['handleClick'])

// 根据是否传递path参数控制border-bottom
const handleClick = (item: Tab, index: number) => {
  if (item.path) {
    router.push(item.path)
  } else {
    currentIndex.value = index
  }
  emits('handleClick', item.path, index)
}

const currentIndex = ref(0)
const activeClass = computed(() => {
  return (item: Tab, index: number) => {
    if (item.path) {
      return route.path.includes(item.path)
    } else {
      return currentIndex.value === index
    }
  }
})
</script>

<style scoped lang="scss">
.sub-tab {
  display: flex;
  align-items: center;

  .tab {
    margin-right: 20px;
    color: rgb(181, 181, 181);
    padding-bottom: 3px;

    &:hover {
      color: #fff !important;
      cursor: pointer;
    }
  }

  .active {
    font-weight: 600;
    font-size: 20px;
    color: rgb(213, 213, 213);
    border-bottom: 3px solid rgb(236, 65, 65);
  }
}
</style>