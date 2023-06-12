import { ElLoading } from 'element-plus'
// 全局全屏loading
export class FullLoading {
  public loadingInstance: ReturnType<typeof ElLoading.service> | null
  constructor() {
    this.loadingInstance = null
  }
  public startLoading() {
    this.loadingInstance = ElLoading.service({
      fullscreen: true,
      lock: true,
      text: '加载中...',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }
  public endLoading() {
    this.loadingInstance?.close()
  }
}
// TODO 局部加载 加载时区分加载样式[骨架屏，动画等]
export class PartLoading {
  
}