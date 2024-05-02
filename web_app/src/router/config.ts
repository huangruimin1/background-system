// import { createRouter, createWebHistory } from 'vue-router'

import UserAdd from '../views/users-manage/UserAdd.vue'
import UserList from '../views/users-manage/UserList.vue'
import ProductAdd from '../views/products-manage/ProductAdd.vue'
import ProductList from '../views/products-manage/ProductList.vue'
import NewsAdd from '../views/news-manage/NewsAdd.vue'
import NewsList from '../views/news-manage/NewsList.vue'
import UserCenter from '../views/UserCenter.vue'

const routersConfig = [{
  path: '/mainbox/UserCenter',
  name: 'usercenter',
  component: UserCenter
},{
  path: '/mainbox/userAdd',
  name: 'userAdd',
  component: UserAdd
},{
  path: '/mainbox/userlist',
  name: 'userlist',
  component: UserList
},{
  path: '/mainbox/newsadd',
  name: 'newsadd',
  component: NewsAdd
},{
  path: '/mainbox/newslist',
  name: 'newslist',
  component: NewsList
},{
  path: '/mainbox/productadd',
  name: 'productadd',
  component: ProductAdd
},{
  path: '/mainbox/productlist',
  name: 'productlist',
  component: ProductList
}]

export default routersConfig
