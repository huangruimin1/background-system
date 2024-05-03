
import { useLoginStore } from '@/stores/loginStore'
import { useLocalStore } from '@/stores/useLocalStore'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Mainbox from '../views/Mainbox.vue'
import routersConfig from './config'
import { storeToRefs } from 'pinia'

import UserAdd from '../views/users-manage/UserAdd.vue'
import UserList from '../views/users-manage/UserList.vue'
import Demo from '../views/Demo.vue'
import NotFound from '../views/NotFound.vue'
import type { Ref } from 'vue'


const routArr = [{
  path: '/:pathMatch(.*)',
  component: NotFound 
},{
  path: '/',
  name: '/',
  component: Mainbox
},
{
  path: '/login',
  name: 'login',
  component: Login
},
{
  path: '/mainbox',
  name: 'mainbox',
  component: Mainbox,
},
{
  path: '/demo',
  name: 'demo',
  component: Demo,
}];

const router = createRouter({
  history: createWebHistory(),
  routes: routArr
})

// 路由守卫
router.beforeEach((to,from,next)=>{
  if(to.fullPath === '/login'){
    next();
  }else{
    const loginStore = useLoginStore();
    const { ifSingin } = storeToRefs(useLoginStore())
    const localStore = useLocalStore();
    if(loginStore.token.value){
      if(to.meta.title){//判断是否有标题
        localStore.setPageTitle(to.meta.title as string);
      }
      
      if(!ifSingin.value){
        configRuters(ifSingin);
        next({...to,replace:true});
      }else{
        next();
      }
    }else{
      next('/login')
    }
  }
})

// 通过循环动态添加路由
function configRuters(ifSingin:Ref<boolean>){
  routersConfig.forEach((item)=>{
      router.addRoute("mainbox",item);
    })
    ifSingin.value = true

}

export default router
