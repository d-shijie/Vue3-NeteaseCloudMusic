<template>
  <div class="exclusive-custom">
    <SubTitle title="晚风吹过的时光" :enabled="false" />

  </div>
</template>

<script setup lang="ts">
import SubTitle from '@/components/SubTitle/subTitle.vue';
</script>

<style scoped>
.exclusive-custom {
  padding: 0 30px;
  max-width: 1098px;
  min-width: 765px;
  width: 75vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>