import type { Ref } from 'vue'
import _ from 'lodash'
export function useScroll(ele: Ref<HTMLElement>, fn: Function) {
  const onScroll = () => {
    const offsetHeight = ele.value.offsetHeight
    const scrollTop = ele.value.scrollTop
    const scrollHeight = ele.value.scrollHeight

    if (offsetHeight + scrollTop - scrollHeight >= -1) {
      // 滚动到底部执行回调
      fn()
    }
  }
  // 监听scroll事件
  window.addEventListener('scroll', _.debounce(onScroll, 500), true)
}
