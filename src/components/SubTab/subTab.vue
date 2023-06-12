<template>
  <div class="sub-tab">
    <a @click="router.push(item.path)" v-for="(item, index)  in tabs" :key="index" class="tab"
      :class="{ 'active': route.path.includes(item.path) }">
      {{ item.tab }}
    </a>

  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export interface Tab {
  tab: string
  path: string
}

const router = useRouter()
const route = useRoute()
defineProps({
  tabs: {
    type: Array as PropType<Tab[]>,
    default: () => []
  },
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