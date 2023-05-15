import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/stores/index'
import { loadSvg } from "@/icons"
import './styles/app.css'
import 'normalize.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
loadSvg(app)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)

app.use(store)
app.use(router)

app.mount('#app')
