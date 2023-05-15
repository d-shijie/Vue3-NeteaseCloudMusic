<template>
  <div class="app-menus">
    <ul>
      <li @click="router.push(item.url)" :class="{ 'active': route.path.includes(item.url) }"
        v-for="(item, index) in mainMenus" :key="index">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const mainMenus = ref([
  {
    title: '发现音乐',
    url: '/index/find-music'
  },
  {
    title: '播客',
    url: '/index/podcast'
  },
  {
    title: '视频',
    url: '/index/video'
  },
  {
    title: '关注',
    url: '/index/follow'
  },
  {
    title: '直播',
    url: '/index/live-broadcast'
  },
  {
    title: '私人FM',
    url: '/index/private-fm'
  },
])
console.log(route.path.includes('/index/find-music'));

</script>

<style scoped lang="scss">
@import url(@/styles/root.css);

.app-menus {
  position: relative;
  z-index: 100;
}

li {
  font-size: 14px;
  height: 34px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-indent: 5px;
  border-radius: 0.25em;
  margin: 2px 0;

  &:hover {
    background-color: var(--v-m-hover-bgc);
    cursor: pointer;
  }
}

.active {
  font-weight: 600;
  font-size: 17px;
  background-color: var(--v-m-hover-bgc);
}
</style>