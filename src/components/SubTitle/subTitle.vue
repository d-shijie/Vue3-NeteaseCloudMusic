<template>
  <div class="sub-title">
    <div :class="{ 'sub-title-after': enabled }">
      {{ title }}
    </div>

  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ''
  },
  enabled: {
    type: Boolean,
    default: true
  }
})

</script>

<style scoped lang="scss">
.sub-title {
  width: 100%;
  text-align: left;
  color: var(--v-m-text-color);
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  margin-top: 24px;
}

.sub-title-after {
  cursor: pointer;
  width: 100px;

  &:hover {
    color: #fff;
  }

  &::after {
    content: '';
    width: 16px;
    height: 16px;
    position: relative;
    left: 2px;
    display: inline-block;
    font-size: 10px;
    background: url('@/icons/svg/arrow_right.svg') no-repeat;
    background-size: 100% 100%;
  }
}
</style>