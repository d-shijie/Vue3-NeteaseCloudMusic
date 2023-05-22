<template>
  <div class="user-menus">
    <el-collapse>
      <el-collapse-item>
        <template #title>
          {{ options.title }}
          <svg-icon @click.stop.prevent="handleClick" class="action-svg" name="plus"></svg-icon>
        </template>
        <ul>
          <li @click="gotoPlaylist(item)" v-for="(item, index) in options.data" :key="index">
            <ProfileItemVue class="sub-menu" :item="item">
              <template v-slot:prefix>
                <svg-icon :name="item.prefixIcon"></svg-icon>
              </template>
            </ProfileItemVue>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import type { ProfileItem } from '../LoginCard/profileItem.vue';
import type { PropType } from 'vue'
import ProfileItemVue from '../LoginCard/profileItem.vue';
import { useRouter } from 'vue-router'
const router = useRouter()
export interface OptionData extends ProfileItem {
  [propName: string]: any
}
interface Options {
  title: string
  data: OptionData[]
}
defineProps({
  options: {
    type: Object as PropType<Options>,
    default: () => { }
  }
})

const handleClick = () => {
  console.log('test');
}
const gotoPlaylist = (item: ProfileItem) => {
  router.push({
    path: '/index/playlist-detail',
    query: {
      id: item.id
    }
  })
}
</script>

<style scoped lang="scss">
.user-menus {
  .user-menus-title {
    font-size: 12px;
    color: var(--v-m-text-dark-color);
    text-indent: 5px;

    p {
      margin-bottom: 0;
    }

  }

  .action-svg {
    position: relative;
    right: -85px;
    font-size: 24px;
  }

  .sub-menu {
    padding: 0 5px;
    border-radius: 0.25em;
    height: 34px;
  }
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

:deep(.el-collapse) {
  padding: 0;
  border: none;
  box-shadow: none;
  margin-top: 10px;
}

:deep(.el-collapse-item__header) {
  background-color: var(--v-m-bgc);
  color: var(--v-m-text-dark-color) !important;
  height: 20px;
  border: none !important;
  box-shadow: none !important;
  text-indent: 5px;

  .is-active {
    color: var(--v-m-text-dark-color) !important;
  }
}

:deep(.el-collapse-item__content) {
  background-color: var(--v-m-bgc);
  padding-bottom: 0;
}

:deep(.el-collapse-item__wrap) {
  border: none;
  background-color: var(--v-m-bgc);
}

:deep(.el-collapse-item__arrow) {
  position: relative;
  left: -80px;
}
</style>