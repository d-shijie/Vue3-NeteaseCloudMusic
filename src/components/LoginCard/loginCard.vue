<template>
  <div class="login-card">
    <div class="qrcode">
      <h1>扫码登录</h1>
      <qrcode-vue :value="qrcodeUrl" :size='170'></qrcode-vue>
      <p>使用<a href="https://music.163.com/#/download">网易云音乐APP</a> 扫码登录</p>
      <a>选择其他登录方式 ></a>
    </div>

  </div>
</template>

<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'
import { ref } from 'vue';
const qrcodeUrl = ref('www.baidu.com')
</script>

<style scoped lang="scss">
.qrcode {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-weight: normal;
  }

  a {
    cursor: pointer;
    margin-top: 100px;
  }
}
</style>
