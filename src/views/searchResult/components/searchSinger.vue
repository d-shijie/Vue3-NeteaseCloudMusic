<template>
  <div v-if="singers.length">
    <section>
      <ul>
        <li :style="{background: (index % 2) === 0 ? '#2b2b2b' : '#2f2f2f'}"
          class="cursor-pointer flex items-center p-10px hover:bg-#373737" v-for="(item, index) in singers" :key="index">
          <img class="w-60px h-60px rounded mr-15px" :src="item.img1v1Url" alt="">
          <span class="flex-1 text-14px">
            <span :style="{color: searchKeyword(i, String(route.query.keywords)) ? '#85b9e6' : ''}"
              v-for="(i, index1) in item.name" :key="index1">
              {{ i }}
            </span>
            <span v-if="item.alias.length" class="text-#6f6f6f">(
              <span :style="{color: searchKeyword(i1, String(route.query.keywords)) ? '#85b9e6' : ''}"
                v-for="(i1, index2) in item.alias[0]" :key="index2">
                {{ i1 }}
              </span>
              )</span> </span>
          <span>
            <svg-icon name="profile"></svg-icon>
          </span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, watch} from 'vue'
import {searchApi, type SearchType} from '@/api/search'
import {useRoute} from 'vue-router'
import {searchKeyword} from '@/util'
const route = useRoute()
const params = reactive({
  keywords: String(route.query.keywords),
  type: 100 as SearchType,
  offset: 1,
  limit: 100
})
const singers = ref<any[]>([])
const getSingers = () => {
  searchApi({
    keywords: params.keywords,
    type: params.type,
    limit: params.limit,
    offset: (params.offset - 1) * params.limit
  }).then(res => {
    singers.value = res.data.result.artists
  })
}
getSingers()
watch(route, () => {
  getSingers()
})

</script>

<style scoped></style>