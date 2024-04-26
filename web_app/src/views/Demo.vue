<template>
  demo
  <el-button @click="go">go</el-button>
  <el-button @click="add">addRouter</el-button>
  <el-button @click="goAdd">goAdd</el-button>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import NewsList from '../views/news-manage/NewsList.vue'
const router = useRouter();

const go = () => {
  router.push('/useradd');
}
const add = () => {
  router.addRoute({
    path: '/news',
    name: 'news',
    component: NewsList
  })  

  console.log(router)
}

const goAdd = () => {
  router.push('/news');
}
</script>

<style></style>