<template>
  <div class="profile-item" :class="{ 'border': item.showBorder }">
    <span class="icon prefix">
      <slot name="prefix"></slot>
    </span>
    <p class="label">{{ item.label }}</p>
    <span class="icon suffix">
      <slot name="suffix"></slot>
    </span>
    <el-icon v-if="item.url">
      <ArrowRight />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import type { PropType } from 'vue';
export interface ProfileItem {
  id?: number | string
  label: string
  url?: string
  showBorder?: boolean
  hasMessage?: boolean
  suffixText?: string
  suffixIcon?: string
  prefixIcon?: string
}
defineProps({
  item: {
    type: Object as PropType<ProfileItem>,
    default: () => { }
  }
})

</script>

<style scoped lang="scss">
@import url('@/styles/root.css');

.profile-item {
  padding: 10px;
  display: flex;
  align-items: center;

  &:hover {
    background: var(--v-m-hover-bgc);
    cursor: pointer;
  }

  .icon {
    font-size: 22px;
    display: flex;
    align-items: center;
    margin-right: 6px;
  }

  .label {
    font-size: 14px;
    padding: 0;
    margin: 0;
    color: var(--v-m-text-color);
    flex: 1;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.border {
  border-bottom: 1px solid var(--v-m-text-color);
}

.el-icon {
  color: var(--v-m-text-color)
}
</style>