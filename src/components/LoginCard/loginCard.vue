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
            <div v-if="qrcodeStatus === 800 || qrcodeStatus === 802" class="refresh-qrcode-small">
              <span>二维码已过期</span>
              <el-button @click="qrLogin" size="small" type="primary">刷新验证码</el-button>
            </div>
            <qrcode-vue :value="qrcodeUrl" :size='qrcodeSize'></qrcode-vue>
            <p>使用<a href="https://music.163.com/#/download">网易云音乐APP</a> 扫码登录</p>
          </div>
        </Transition>
      </div>
      <Transition name="qrcode">
        <div v-if="!isShowLeft" style="position: absolute;top:120px" @mouseenter="qrcodeEnter">
          <div v-if="qrcodeStatus === 800 || qrcodeStatus === 802" class="refresh-qrcode">
            <span>二维码已过期</span>
            <el-button @click="qrLogin" type="primary">刷新验证码</el-button>
          </div>

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
          <el-button @click="login" color="rgb(255, 58, 58)" style="width: 100%;">登录</el-button>
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
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { visitorLoginApi, createQRcodeKeyApi, createQRcodeApi, checkQRcodeStatusApi, getLoginStatusApi } from '@/api/login'
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()

const qrcodeEnter = () => {
  qrcodeSize.value = 120
  isShowLeft.value = true
}
const qrcodeLeave = () => {
  qrcodeSize.value = 170
  isShowLeft.value = false
}
// 手机号登录 暂时只支持二维码登录
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
const login = () => {
  loginFormRef.value?.validate(valid => {
    if (!valid) return
    if (isAgree.value) {
      visitorLoginApi().then(res => {
        console.log(res);
      })
    } else {
      ElMessage({
        message: '请先勾选同意相关政策',
        customClass: 'm-message',
        type: undefined,
      })
    }
  })

}
// 二维码登录
const qrcodeSize = ref(170)
const isShowLeft = ref(false)
const isShowQrcode = ref(true)

const qrcodeKey = ref('')
const qrcodeUrl = ref('')
const qrcodeStatus = ref(0)
const timer = ref<number | undefined>(undefined)
async function qrLogin () {
  if (!userStore.loginState) {
    await createQRcodeKey()
    await createQRcode()
    timer.value = setInterval(checkQRcodeStatus, 2000)
  }
}
async function createQRcodeKey () {
  const { data } = await createQRcodeKeyApi()
  try {
    qrcodeKey.value = data.data.unikey
  } catch (error) {
    return new Error('Error')
  }
}
async function createQRcode () {
  const { data } = await createQRcodeApi(qrcodeKey.value)
  try {
    qrcodeUrl.value = data.data.qrurl


  } catch (error) {
    return new Error('Error')
  }
}
async function checkQRcodeStatus () {
  const { data } = await checkQRcodeStatusApi(qrcodeKey.value)
  try {
    // 800 过期 801等待扫码 802待确认 803授权成功
    qrcodeStatus.value = data.code
    // clearInterval(timer.value)
    // userStore.loginSuccess({ nickname: '伤心的人别听慢歌', avatarUrl: 'http://p2.music.126.net/3dKztt6YVCnBMgBWuhvaQg==/109951163772574480.jpg', userId: 350231932 }, new Date() + '')
    switch (qrcodeStatus.value) {
      case 800:
        ElMessage.info('二维码已过期')
        clearInterval(timer.value)
        break;
      case 801:
        break;
      case 802:
        break;
      case 803:
        clearInterval(timer.value)
        ElMessage.success('登录成功')
        getLoginStatusApi(data.cookie).then(res => {
          userStore.loginSuccess(res.data.data.profile, data.cookie)
        }).finally(() => {
          // 先手动刷新 避免菜单未渲染
          location.reload()
        })
        break
      default:
        ElMessage.error('发生未知错误')
    }
  } catch (error) {
    console.log(error);

    return new Error('error')
  }
}
qrLogin()

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

  .refresh-qrcode {
    position: absolute;
    top: 38%;
    background: rgba(0, 0, 0, .3);
    left: 46%;
    width: 170px;
    height: 180px;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    span {
      color: #fff;
      font-size: 16px;
      margin-bottom: 12px;
    }

  }

  .refresh-qrcode-small {
    width: 120px;
    height: 120px;
    position: absolute;
    background-color: rgba(0, 0, 0, .3);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    span {
      color: #fff;
      font-size: 12px;
      margin-bottom: 12px;
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
