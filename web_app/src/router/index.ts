
import { useLoginStore } from '@/stores/loginStore'
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
console.log('router.beforeEach 路由守卫之前')

// 路由守卫
router.beforeEach((to,from,next)=>{
  if(to.fullPath === '/login'){
    next();
  }else{
    const loginStore = useLoginStore();
    if(loginStore.token.value){
      const { ifSingin } = storeToRefs(useLoginStore())
      if(!ifSingin.value){
        console.log(' router.addRoute 路由守卫之前')
        configRuters(ifSingin);
        next({...to,replace:true});
      }else{
        console.log('先走了这里？？')
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
      console.log('这里来了吗')
      router.addRoute("mainbox",item);
    })
    ifSingin.value = true

}

export default router
