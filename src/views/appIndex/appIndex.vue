<template>
  <div class="app-index">

    <div class="header">
      <appHeader />
    </div>
    <div class="main">
      <div class="menu">
        <appMenus />
      </div>
      <div class="wrapper">
        <RouterView />
      </div>
    </div>
    <div class="controller">
      <appController />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import appController from '@/layout/appController.vue';
import appHeader from '@/layout/appHeader.vue';
import appMenus from '@/layout/appMenus.vue';

</script>

<style scoped lang="scss">
.app-index {
  display: flex;
  flex-direction: column;
  height: 100vh;



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
