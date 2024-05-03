// import { createRouter, createWebHistory } from 'vue-router'

import UserAdd from '../views/users-manage/UserAdd.vue'
import UserList from '../views/users-manage/UserList.vue'
import ProductAdd from '../views/products-manage/ProductAdd.vue'
import ProductList from '../views/products-manage/ProductList.vue'
import NewsAdd from '../views/news-manage/NewsAdd.vue'
import NewsList from '../views/news-manage/NewsList.vue'
import UserCenter from '../views/UserCenter.vue'
import Home from '../views/Home.vue'

const routersConfig = [{
  path: '/mainbox/home',
  name: 'home',
  meta:{title:"首页"},
  component: Home
},{
  path: '/mainbox/UserCenter',
  name: 'usercenter',
  meta:{title:"用户中心"},
  component: UserCenter
},{
  path: '/mainbox/userAdd',
  name: 'userAdd',
  meta:{title:"添加用户"},
  component: UserAdd
},{
  path: '/mainbox/userlist',
  name: 'userlist',
  meta:{title:"用户列表"},
  component: UserList
},{
  path: '/mainbox/newsadd',
  name: 'newsadd',
  meta:{title:"添加新闻"},
  component: NewsAdd
},{
  path: '/mainbox/newslist',
  name: 'newslist',
  meta:{title:"新闻列表"},
  component: NewsList
},{
  path: '/mainbox/productadd',
  name: 'productadd',
  meta:{title:"添加产品"},
  component: ProductAdd
},{
  path: '/mainbox/productlist',
  name: 'productlist',
  meta:{title:"产品列表"},
  component: ProductList
}]

export default routersConfig
