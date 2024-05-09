import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import VueCropper from 'vue-cropper'; 
import 'vue-cropper/dist/index.css'

import { createPersistedState } from 'pinia-plugin-persistedstate'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const pinia =  createPinia();
pinia.use(
  createPersistedState({
    storage: sessionStorage,//使pinia持久化配置
  })
)
app.use(pinia)
app.use(VueCropper)
app.use(router)
app.mount('#app')

import '@/util/axios'