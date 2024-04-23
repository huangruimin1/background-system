import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Mainbox from '../views/Mainbox.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '/',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/mainbox',
      name: 'mainbox',
      component: Mainbox
      // component: () => import('../views/AboutView.vue')
    }
  ]
})

import routersConfig from './config'
import { useLoginStore } from '@/stores/loginStore'

// 路由守卫
router.beforeEach((to,from,next)=>{
  if(to.fullPath === '/login'){
    next();
  }else{
    const loginStore = useLoginStore();
    if(loginStore.token.value){
      configRuters();
      next();
    }else{
      next('/login')
    }
  }
})

// 通过循环动态添加路由
function configRuters(){
  const loginStore = useLoginStore();
  if(loginStore.ifSingin) return;

    routersConfig.forEach((item)=>{
      router.addRoute(item);
    })
    loginStore.ifSingin = true
}



export default router
