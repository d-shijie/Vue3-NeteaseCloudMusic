<template>
  <div class="app-index">
    <appController />
    <appHeader />
    <appMeuns />
  </div>
</template>

<script setup lang="ts">
import appController from '@/layout/appController.vue';
import appHeader from '@/layout/appHeader.vue';
import appMeuns from '@/layout/appMeuns.vue';
</script>

<style scoped></style>
