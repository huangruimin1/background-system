import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Mainbox from '../views/Mainbox.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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

export default router
