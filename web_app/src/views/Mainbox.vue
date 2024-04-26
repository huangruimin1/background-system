<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside :width="openAside ? '200px' : '60PX'">
          <Aside></Aside>
        </el-aside>
        <el-main>
          <div class="togle" :class="{open:openAside}" @click=" openAside = !openAside"></div>
          <el-button @click="gopath">点击</el-button>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/mainbox/Header.vue'
import Aside from '@/components/mainbox/Aside.vue'

import { useLoginStore } from '@/stores/loginStore'
import { onMounted, ref } from 'vue';
import { useRouter } from "vue-router"

const router = useRouter();
const { lodding } = useLoginStore();

const gopath = () => {
  router.push('/mainbox/userAdd')
}

const openAside = ref(true);
const togleAside = () => {

}
onMounted(() => {
  // console.log(lodding)
})

</script>


<style scoped lang="less">
.el-header {
  border-bottom: 1px solid #eee;
}

.common-layout {
  .el-container {
    min-height: calc(100vh - 60px);
  }
}

.el-aside {
  border-right: 1px solid #eee;
}
.el-main{
  position: relative;
  .togle{
    position: absolute;
    opacity: .6;
    width: 14px;
    height: 50px;
    border: 1px solid #eee;
    border-left: none;
    border-top: none;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    top: 0;
    background-color: rgba(190, 255, 204, .5);
    z-index: 99;
  }
  .togle::before{
    content: '';
    position: absolute;
    border-left: 6px solid #55815e;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    margin: 0 auto;
  }
  .open.togle::before{
    content: '';
    border-left: none;
    border-right: 6px solid #55815e;
  }
  .togle:hover{
    cursor: pointer;
    background-color: rgba(190, 255, 204, 1);
  }
}
</style>
