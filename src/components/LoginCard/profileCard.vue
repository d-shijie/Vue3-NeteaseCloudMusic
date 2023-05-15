<template>
  <div class="content">
    <div class="count-wrapper">
      <div class="counts">
        <span> 0 </span>
        <span> 2 </span>
        <span> 3 </span>
      </div>
      <div class="sign-in">
        <el-button color="rgb(64,64,64)" style="color: rgb(215, 215, 215); background: rgb(54, 54, 54)" :icon="Coin" plain
          round>签到</el-button>
      </div>
    </div>
    <div class="items">
      <div class="item" v-for="(item, index) in profileItmes" :key="index">
        <profileItem @click="profileItemClick(item.url)" :item="item">
          <template v-slot:prefix>
            <svg-icon :name="item.prefixIcon"></svg-icon>
          </template>
          <template v-slot:suffix>
            <svg-icon v-if="item.suffixIcon" :name="item.suffixIcon"></svg-icon>
            <p class="suffixText" v-else>{{ item.suffixText }}</p>
          </template>
        </profileItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Coin } from '@element-plus/icons-vue'
import profileItem from './profileItem.vue';
import { useUserStore } from '@/stores/modules/user';
const userStore = useUserStore()
const profileItmes = ref([
  {
    prefixIcon: 'vip',
    suffixIcon: '',
    label: '会员中心',
    url: 'test',
    showBorder: false,
    hasMessage: true,
    suffixText: '未订购'
  },
  {
    prefixIcon: 'level',
    suffixIcon: '',
    label: '等级',
    url: 'test',
    showBorder: false,
    hasMessage: true,
    suffixText: 'Lv.9'
  },
  {
    prefixIcon: 'shop',
    suffixIcon: '',
    label: '商城',
    url: 'test',
    showBorder: true,
    hasMessage: true
  },
  {
    prefixIcon: 'profile',
    suffixIcon: '',
    label: '个人信息设置',
    url: 'test',
    showBorder: false,
    hasMessage: true
  },
  {
    prefixIcon: 'socialize',
    suffixIcon: 'weibo',
    label: '绑定社交账号',
    url: 'test',
    showBorder: true,
    hasMessage: true
  },
  {
    prefixIcon: 'customer-service',
    suffixIcon: '',
    label: '我的客服',
    url: 'test',
    showBorder: true,
    hasMessage: true
  },
  {
    prefixIcon: 'logout',
    suffixIcon: '',
    label: '退出登录',
    url: '',
    showBorder: false,
    hasMessage: true
  }
])
const profileItemClick = (url: string) => {
  if (!url) {
    userStore.logout()
  }
  // TODO router url
}
</script>

<style scoped lang="scss">
@import url('@/styles/root.css');

.content {


  .count-wrapper {

    .counts {
      display: flex;
      padding: 12px;
      justify-content: space-between;

      span {
        font-size: 18px;
        color: var(--v-m-text-color);
        font-weight: 600;
        text-align: center;
      }

      span:after {
        display: block;
        font-size: 14px;
        font-weight: 400;
        color: rgb(141, 141, 141);
      }

      span:nth-child(1):after {
        content: '动态';
      }

      span:nth-child(2):after {
        content: '关注';
      }

      span:nth-child(3):after {
        content: '粉丝';
      }
    }

    .sign-in {
      padding: 12px 0;
      text-align: center;

      border-bottom: 0.5px solid var(--v-m-text-color);
    }
  }

  .suffixText {
    font-size: 12px;
    padding: 0;
    font-weight: 600;
    margin: 0;
  }
}
</style>
