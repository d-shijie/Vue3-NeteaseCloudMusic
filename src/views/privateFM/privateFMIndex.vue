<template>
  <div class="fm">
    <div class="page">
     <FmPlayer/>
    </div>
  </div>
</template>

<script setup lang="ts">
import FmPlayer from './components/fmPlayer.vue'
</script>

<style scoped lang="scss">
.fm {
  display: flex;
  flex-direction: column;
  align-items: center;

  .page {
    padding: 20px 30px;
    max-width: 860px;
  
    min-width: 665px;
    width: 75vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>