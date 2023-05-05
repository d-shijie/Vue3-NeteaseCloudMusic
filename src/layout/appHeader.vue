<template>
  <div class="app-header">
    <el-row>
      <el-col :span="4">
        <div class="logo">
          <img src="@/assets/logo_dark.png" alt="">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.app-header {
  height: 54px;
  background-color: rgb(33, 33, 36);
  border-bottom: 2px solid rgb(131, 16, 16);

  .logo {
    overflow: hidden;
    z-index: -1;
    height: 54px;

    img {
      width: 160px;
      position: relative;
      top: -52px;
    }
  }
}
</style>