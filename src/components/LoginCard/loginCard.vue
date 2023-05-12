<template>
  <div class="login-card">
    <div v-if="isShowQrcode" class="qrcode">
      <h1 style="margin-top: 50px;">扫码登录</h1>
      <div @mouseleave="qrcodeLeave" class="shift-content">
        <Transition name="cover-left">
          <div v-if="isShowLeft" class="left content">
            <img src="@/assets/cover.png" alt="">
          </div>
        </Transition>
        <Transition name="cover-right">
          <div v-if="isShowLeft" class="right content">
            <qrcode-vue :value="qrcodeUrl" :size='qrcodeSize'></qrcode-vue>
            <p>使用<a href="https://music.163.com/#/download">网易云音乐APP</a> 扫码登录</p>
          </div>
        </Transition>
      </div>
      <Transition name="qrcode">
        <div v-if="!isShowLeft" style="position: absolute;top:120px" @mouseenter="qrcodeEnter">
          <qrcode-vue :value="qrcodeUrl" :size='qrcodeSize'></qrcode-vue>
          <p>使用<a href="https://music.163.com/#/download">网易云音乐APP</a> 扫码登录</p>
        </div>
      </Transition>
      <a @click="isShowQrcode = false" style="position: absolute;bottom:24px">选择其他登录方式 ></a>
    </div>
    <div v-else class="phone-login">
      <div class="top-wrapper">
        <div @click="isShowQrcode = true" class="triangle"></div>
        <p class="info">扫码登录更安全</p>
      </div>
      <div style="text-align: center;margin: 12px 0;" class="logo">
        <img style="width: 66px;" src="@/assets/logo.png" alt="">
      </div>
      <div class="form">
        <el-form :rules="loginFormRules" ref="loginFormRef" :model="params">
          <el-form-item prop="phone">
            <el-input :prefix-icon="Iphone" v-model="params.phone" placeholder="请输入手机号" class="input-with-select">
              <template #prepend>
                <el-select :teleported="false" v-model="phoneArea" style="width: 75px">
                  <el-option label="中国" value="86" />
                  <el-option label="美国" value="87" />
                  <el-option label="法国" value="88" />
                </el-select>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :prefix-icon="Lock" show-password v-model="params.password" placeholder="请输入密码">

            </el-input>
          </el-form-item>
        </el-form>
        <div class="form-bottom">
          <el-checkbox size="small" v-model="isAutoLogin" label="自动登录" />
          <div class="forget-password">
            <a>忘记密码</a>
            <el-divider style="background-color:rgb(223, 231, 243)" direction="vertical" />
            <a>验证码登录</a>
          </div>
        </div>
        <div class="login-btn">
          <el-button color="rgb(255, 58, 58)" style="width: 100%;">登录</el-button>
          <a>注册</a>
        </div>
        <div class="third-party-login">
          <svg-icon class="icon" name="weixin"></svg-icon>
          <svg-icon class="icon" name="qq"></svg-icon>
          <svg-icon class="icon" name="weibo-red"></svg-icon>
          <svg-icon class="icon" name="netease"></svg-icon>
        </div>

      </div>
      <div class="policy">
        <el-checkbox size="small" v-model="isAgree">
          <div style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;width: 250px"> 同意 <a
              href="https://st.music.163.com/official-terms/service">《服务条款》</a><a
              href="https://st.music.163.com/official-terms/privacy">《隐私政策》</a><a
              href="https://st.music.163.com/official-terms/children">《儿童隐私政策》</a></div>
        </el-checkbox>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'
import { reactive, ref } from 'vue'
import { Lock, Iphone } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
// 二维码
const qrcodeUrl = ref('www.baidu.com')
const qrcodeSize = ref(170)
const isShowLeft = ref(false)
const isShowQrcode = ref(true)
const qrcodeEnter = () => {
  console.log(1);

  qrcodeSize.value = 120
  isShowLeft.value = true
}
const qrcodeLeave = () => {
  console.log(2);
  qrcodeSize.value = 170
  isShowLeft.value = false
}
// 登录
const phoneArea = ref('86')
const isAutoLogin = ref(false)
const isAgree = ref(false)
const loginFormRef = ref<FormInstance | null>(null)
const loginFormRules = ref<FormRules>({
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  passwrod: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})
const params = reactive({
  phone: '',
  password: ''
})

</script>

<style scoped lang="scss">
.login-card {
  height: 441px;
}

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

  .shift-content {
    display: flex;
    justify-content: space-between;

    .left {
      margin-right: 12px;
    }

    .content {

      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

}

.phone-login {
  .triangle {
    clip-path: polygon(0% 0, 100% 0%, 0 100%);
    width: 40px;
    height: 40px;
    cursor: pointer;
    background-color: red;
    background: url('@/assets/qrcode.png') no-repeat;
    background-size: 100% 100%;
  }

  .top-wrapper {
    display: flex;
    align-items: center;

    .info {
      background-color: rgb(153, 153, 153);
      color: #fff;
      padding: 5px 10px;
      font-size: 12px;
      margin-left: 12px;
      border-radius: 5px;
      position: relative;

      &::before {
        display: block;
        content: '';
        position: absolute;
        left: -5px;
        top: 0px;
        width: 0px;
        height: 0px;
        border-top: 5px solid rgb(153, 153, 153);
        border-right: 5px solid rgb(153, 153, 153);
        border-left: 5px solid transparent;
        border-bottom: 5px solid transparent;
      }
    }
  }

  .form {
    padding: 0 12px;
  }

  .form-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .forget-password {
      display: flex;
      align-items: center;
      cursor: pointer;

      a {
        color: rgb(12, 115, 194);
        font-size: 12px;
      }
    }
  }

  .third-party-login {
    display: flex;
    margin: 12px 0;
    font-size: 32px;

    justify-content: space-between;

    .icon {
      cursor: pointer;
    }
  }

  .login-btn {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    a {
      text-decoration: underline;
      cursor: pointer;
      margin-top: 8px;
    }
  }
}



.qrcode-enter-active {
  transition: all 0.3s ease-out;
}

.qrcode-leave-active {
  transition: all 0.3s ease-in;
}

.qrcode-enter-from,
.qrcode-leave-to {
  transform: translateX(50px);
  opacity: 0;
}

.cover-left-enter-active {
  transition: all 0.3s ease-out;
}

.cover-left-leave-active {
  transition: all 0.3s ease-in;
}

.cover-left-enter-from,
.cover-left-leave-to {
  transform: translateX(50px);
  opacity: 0;
}

.cover-right-enter-active {
  transition: all 0.3s ease-out;
}

.cover-right-leave-active {
  transition: all 0.3s ease-in;
}

.cover-right-enter-from,
.cover-right-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}
</style>
