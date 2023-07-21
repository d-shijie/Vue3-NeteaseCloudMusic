<template>
  <div>
    <SubTitle :title="props.name" />
    <section class="flex justify-between">
      <div class="item w-20% " v-for="(item, index) in recommends.slice(0, 5)" :key="index">
        <img class="w-100% rounded" :src="item.picUrl" alt="">
        <div class="name"><a class="category">{{ item.secondCategory }}</a> {{ item.name }}
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SubTitle from '@/components/SubTitle/subTitle.vue';
import { getDjCategoryRecommendApi } from '@/api/dj'
interface Props {
  name: string
  cid: number
}
const props = withDefaults(defineProps<Props>(), {
  name: '',
  cid: 0
})

const recommends = ref<any[]>([])
getDjCategoryRecommendApi(props.cid).then(res => {
  recommends.value = res.data.djRadios
})
</script>

<style scoped lang="scss">
.item:not(:first-child):not(:last-child) {
  margin: 0 15px;
}

.item:first-child {
  margin-right: 15px;
}

.item:last-child {
  margin-left: 15px;
}

.name {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-wrap: break-all;
  font-size: 14px;
  margin-top: 10px;
  padding: 1px 0;
}

.category {
  border: 1px solid rgb(128, 128, 128);
  color: rgb(128, 128, 128);
  font-size: 12px;

}</style>