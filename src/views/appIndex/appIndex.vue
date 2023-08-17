<template>
  <div class="app-index">
    <div class="main">
      <div class="menu">
        <appMenus />
      </div>
      <div class="wrapper">
        <RouterView :key="routeKey" />
      </div>
    </div>
    <div class="controller">
      <appController />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import appController from '@/layout/appController.vue';

import appMenus from '@/layout/appMenus.vue';
import { computed } from 'vue';
const route = useRoute()
const routeKey = computed(() => {
  return route.path
})
</script>

<style scoped lang="scss">
.app-index {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 56px);

  .main {
    flex: 1;
    display: flex;

    .menu {
      width: 196px;
      border-right: 1px solid rgb(61, 61, 64);
    }

    .wrapper {
      flex: 1;
      height: calc(100vh - 142px);
      overflow-y: auto;
    }
  }
}
</style>
