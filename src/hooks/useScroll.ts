import type { Ref } from 'vue';
export function useScroll (ele: Ref<HTMLElement>, fn: Function) {
  const offsetHeight = ele.value.offsetHeight
  const scrollTop = ele.value.scrollTop
  const scrollHeight = ele.value.scrollHeight
  if ((offsetHeight + scrollTop) - scrollHeight >= -1) {
    fn()
  }
}
