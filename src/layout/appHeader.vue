<template>
  <div class="app-header">
    <el-row>
      <el-col :span="4">
        <a class="logo" href="/">
          <img src="@/assets/logo_dark.png" alt="">
        </a>
      </el-col>
      <el-col :span="7">
        <div class="search">
          <el-button @click="router.go(-1)" text :icon="ArrowLeft"></el-button>
          <el-button text :icon="ArrowRight"></el-button>
          <el-input placeholder="好久不见" v-model="keywords" class="custom-el-input"></el-input>
        </div>
      </el-col>
      <el-col :span="13">
        <div class="right-pannel">
          <el-popover :hide-after="60" :show-arrow="false" placement="bottom" :width="276" trigger="click">
            <template #reference>
              <div class="avatar">
                <img
                  :src="userStore.userInfo.avatarUrl || 'https://img1.baidu.com/it/u=950943067,1138707327&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'"
                  alt="">
                <p>{{ userStore.userInfo.nickname || '未登录' }}</p>
                <el-icon>
                  <CaretBottom />
                </el-icon>
              </div>
            </template>
            <ProfileCard v-if="userStore.loginState" />
            <LoginCard v-else />
          </el-popover>
          <div class="setting">
            <img src="@/assets/cloth.png" alt="">
            <img src="@/assets/setting.png" alt="">
            <img src="@/assets/message.png" alt="">
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import ProfileCard from '../components/LoginCard/profileCard.vue';
import LoginCard from '@/components/LoginCard/loginCard.vue';
import { ArrowLeft, ArrowRight, CaretBottom } from '@element-plus/icons-vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()

const router = useRouter()

const keywords = ref('')

</script>

<style scoped lang="scss">
.app-header {
  height: 54px;
  background-color: rgb(33, 33, 36);
  border-bottom: 2px solid rgb(131, 16, 16);
  font-size: 14px !important;

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

  .search {
    display: flex;
    align-items: center;
    height: 54px;
    overflow: hidden;

    .el-button {
      margin: 0;
    }

    :deep(.el-input) {

      width: 186px;
      font-size: 14px !important;

      .el-input__wrapper {
        box-shadow: 0 0 0 0px;
        background: rgb(44, 44, 47) !important;
        border-radius: 20px;
        border: none !important;

        .el-input__inner {
          color: #fff;

        }
      }
    }
  }

  .right-pannel {
    display: flex;
    justify-content: right;
    overflow: hidden;

    .setting {
      display: flex;
      height: 54px;
      align-items: center;

      img {
        width: 20px;
        height: 20px;
        margin: 0 10px;
        cursor: pointer;
      }
    }
  }

  .avatar {
    display: flex;
    align-items: center;
    height: 54px;
    cursor: pointer;
    margin-right: 24px;

    &:hover {

      p,
      .el-icon {
        color: rgb(165, 167, 168);
      }
    }

    img {
      width: 24px;
      height: 24px;
      border-radius: 50%;

    }

    p {
      margin-left: 12px;
      margin-right: 12px;
      max-width: 70px;
      color: rgb(124, 162, 164);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .el-icon {
      color: rgb(124, 162, 164);
    }
  }


}

.el-col {
  height: 54px;
}
</style>