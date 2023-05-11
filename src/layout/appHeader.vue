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
          <el-input placeholder="Because Of You" v-model="keywords" class="custom-el-input"></el-input>
        </div>
      </el-col>
      <el-col :span="13">
        <div class="right-pannel">
          <el-popover :hide-after="60" :show-arrow="false" placement="bottom" :width="276" trigger="click">
            <template #reference>
              <div class="avatar">
                <img src="https://img2.baidu.com/it/u=260760610,2790622781&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
                  alt="">
                <p>伤心时别听慢歌</p>
                <el-icon>
                  <CaretBottom />
                </el-icon>
              </div>
            </template>
            <ProfileCard />
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
import { ArrowLeft, ArrowRight, CaretBottom } from '@element-plus/icons-vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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


    .el-button {
      margin: 0;
    }

    :deep(.el-input) {
      margin-left: 24px;
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

    .setting {
      display: flex;
      height: 54px;
      align-items: center;

      img {
        width: 20px;
        height: 20px;
        margin-right: 12px;
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
</style>