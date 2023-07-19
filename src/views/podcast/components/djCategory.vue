<template>
  <div class="h-100% flex">
    <div class="flex w-20px items-center mx-8px cursor-pointer">
      <svg-icon v-show="currentIndex!==0" @click="prev" style="font-size: 20px;" name="left"></svg-icon>
    </div>
    <div class="flex-1 relative overflow-hidden">
      <ul ref="categoryWrapperRef" class="flex w-300% absolute overflow-hidden">
        <li ref="categoryPageRef" class="w-100% " v-for="(item, index) in pages" :key="index">
      <div  class="flex flex-wrap">
        <div v-for="(i,index1) in currentItem(index)" :key="index1"  class="w-25% flex flex-col justify-center items-center mb-12px cursor-pointer" >
           <img  class="w-50% mb-5px" :src="i.pic56x56Url" alt="">
           <div style="font-size: 12px;">{{ i.name }}</div>
        </div>
      </div>
      
      </li>
      </ul>
    </div>
    <div class="flex w-20px items-center mx-8px cursor-pointer">
      <svg-icon v-show="currentIndex!==pages-1" @click="next" style="font-size: 20px;" name="right"></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
interface Item {
  name: string
  [propName: string]: any
}
interface Props {
  row?: number
  column?: number
  modelValue?: Array<Item>
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  row: 2,
  column: 4
})
const pages=computed(()=>Math.ceil(props.modelValue.length/(props.row*props.column)) )
const currentItem=computed(()=>(index:number)=>{
  const prefix=index*(props.row*props.column)
  const suffix=(index+1)*(props.row*props.column)
 return props.modelValue.slice(prefix,suffix)
})

const categoryWrapperRef = ref<HTMLElement>()
const categoryPageRef = ref()
const currentWidth = ref(0)
const currentIndex = ref(0)
const prev = () => {
  const width = categoryPageRef.value[0].clientWidth
  let w=width * currentIndex.value 
  currentWidth.value = width * (currentIndex.value-1)
  currentIndex.value -= 1
  setInterval(()=>{
    if(w>currentWidth.value){
      w-=10
      categoryWrapperRef.value.style.transform = `translateX(${-w}px)`
    }
  },10)
}

const next = () => {
  const width = categoryPageRef.value[0].clientWidth
  let w=width *currentIndex.value 
  currentWidth.value = width * (currentIndex.value + 1)
  currentIndex.value += 1
  setInterval(()=>{
    if(w<currentWidth.value){
      w+=10
      categoryWrapperRef.value.style.transform = `translateX(${-w}px)`
    }
  },10)
}

</script>

<style scoped lang="scss"></style>