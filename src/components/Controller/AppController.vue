<template>
  <div class="controller">

    <div class="cover">
      <img src="@/assets/logo.png" alt="">
      <div class="music-info">
        <div style="font-size: 14px;">
          好久不见
          <svg-icon style="font-size: 20px;cursor: pointer;position: relative;top: 4px;" name="like_outline"></svg-icon>
        </div>
        <div style="font-size: 13px;">陈奕迅</div>
      </div>
    </div>
    <div class="main">
      <div class="controll-wrapper">
        <div class="controll-item">
          <svg-icon class="svg" style="font-size: 16px;" name="play_order"></svg-icon>
        </div>
        <div class="controll-item">
          <svg-icon class="svg" style="font-size: 16px;" name="prefix"></svg-icon>
        </div>
        <div @click="testAudio" class="controll-item play">
          <svg-icon class="svg" style="font-size: 16px;" name="pause"></svg-icon>
        </div>
        <div class="controll-item">
          <svg-icon class="svg" style="font-size: 16px;" name="suffix"></svg-icon>
        </div>
        <div class="controll-item">
          <svg-icon class="svg" style="font-size: 16px;" name="lyric">
          </svg-icon>
        </div>
      </div>
      <div class="time">
        <span class="current-time">01:44</span>
        <div class="controll-time"></div>
        <span class="end-time">03:53</span>
      </div>
    </div>
    <div class="setting">
      <div class="setting-item tone-quality">
        标准
      </div>
      <div class="setting-item">
        <svg-icon class="svg" style="font-size: 24px;" name="tone">
        </svg-icon>
      </div>
      <div class="setting-item">
        <svg-icon class="svg" style="font-size: 24px;" name="volume">
        </svg-icon>
      </div>
      <div class="setting-item">
        <svg-icon class="svg" style="font-size: 24px;" name="listen_together">
        </svg-icon>
      </div>
      <div class="setting-item">
        <svg-icon class="svg" style="font-size: 20px;" name="playlist">
        </svg-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const testAudio = () => {
  const audio = new Audio()
  audio.src = 'http://m701.music.126.net/20230516113351/38944789bb20eb30ca332187957d19bf/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096410711/7e04/100d/d588/25b0beab3b8bacaa87e4c5fc8eea6cf2.mp3'
  audio.play()
}
</script>

<style scoped lang="scss">
.controller {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;

  .cover {
    display: flex;
    align-items: center;
    width: 267px;
    margin-left: 12px;

    img {
      cursor: pointer;
      width: 44px;
      height: 44px;
      margin-right: 5px;
      border-radius: 0.15em;
      position: relative;

      &:hover {
        filter: blur(2px);
      }
    }

    .music-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      div {
        margin-bottom: 8px;
      }
    }
  }

  .main {
    width: 432px;

    .controll-wrapper {
      display: flex;
      justify-content: center;
      margin-bottom: 6px;

      .play {
        background-color: rgb(43, 43, 46);

        &:hover {
          background-color: var(--v-m-hover-bgc);
        }
      }

      .controll-item {
        cursor: pointer;
        display: flex;
        margin: 0 10px;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 34px;
        border-radius: 50%;

        &:hover {
          background-color: var(--v-m-hover-bgc);
        }
      }
    }

    .time {
      display: flex;
      align-items: center;
      font-size: 10px;
      color: rgb(101, 101, 104);

      .controll-time {
        height: 3px;
        flex: 1;
        cursor: pointer;
        margin: 0 6px;
        background-color: rgb(236, 65, 65);
      }
    }


  }

  .setting {
    width: 256px;
    justify-content: space-around;
    display: flex;
    align-items: center;

    .tone-quality {
      font-size: 12px;
      border: 1px solid #fff;
      padding: 2px;
      border-radius: 0.20em;
    }

    .setting-item {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
}
</style>