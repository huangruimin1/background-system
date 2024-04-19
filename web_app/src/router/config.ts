import { createRouter, createWebHistory } from 'vue-router'

import UserAdd from '../views/users-manage/UserAdd.vue'
import UserList from '../views/users-manage/UserList.vue'
import ProductAdd from '../views/products-manage/ProductAdd.vue'
import ProductList from '../views/products-manage/ProductList.vue'
import NewsAdd from '../views/news-manage/NewsAdd.vue'
import NewsList from '../views/news-manage/NewsList.vue'

const routersConfig = [{
  path: '/main/useradd',
  name: 'UserAdd',
  component: UserAdd
},{
  path: '/main/userlist',
  name: 'UserAdd',
  component: UserAdd
},{
  path: '/main/newsadd',
  name: 'NewsAdd',
  component: NewsAdd
},{
  path: '/main/newslist',
  name: 'NewsList',
  component: NewsList
},{
  path: '/main/productadd',
  name: 'ProductAdd',
  component: ProductAdd
},{
  path: '/main/productlist',
  name: 'ProductList',
  component: ProductList
}]

export default routersConfig
