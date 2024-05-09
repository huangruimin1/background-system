<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside :width="localStore.ifOpenAside ? '200px' : '60PX'">
          <Aside :isCollapse="!localStore.ifOpenAside"></Aside>
        </el-aside>
        <el-main>
          <div class="togle" :class="{ open: localStore.ifOpenAside }" @click="localStore.togleOpenAside">
            <!-- 折叠侧边栏的按钮 -->
          </div>
          <el-page-header :icon="null" title="**后台管理系统" class="top-continer">
            <template #content>
              <div class="flex items-center">
                <!-- <el-avatar :size="32" class="mr-3"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" /> -->
                <!-- <span class="text-large font-600 mr-3"> Title </span> -->
                <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">
                 {{ localStore.pageTitle }}
                </span>
              </div>
            </template>
          </el-page-header>

          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/mainbox/Header.vue'
import Aside from '@/components/mainbox/Aside.vue'

import { useLocalStore } from '@/stores/useLocalStore'
import { onMounted, ref } from 'vue';
import { useRouter } from "vue-router"

const router = useRouter();
const localStore = useLocalStore();

// const gopath = () => {
//   router.push('/mainbox/productAdd')
// }

onMounted(() => {
})

</script>


<style scoped lang="less">
.el-header {
  border-bottom: 1px solid #eee;
  background-color: #d6fdf2;
  box-shadow: 2px 5px 8px #eee;
}

.common-layout {
  .el-container {
    min-height: calc(100vh - 60px);
  }
}


@media (max-width: 1200px) {
  .common-layout {
    .el-container {
      min-height: calc(100vh - 65px);
    }
  }
}

.el-aside {
  border-right: 1px solid #eee;
}

.el-main {
  position: relative;
  padding-top: 10px;
  .togle {
    position: absolute;
    opacity: .2;
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
    transition: all .25s ease;
  }

  .togle::before {
    content: '';
    position: absolute;
    border-left: 6px solid #55815e;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    margin: 0 auto;
  }

  .open.togle::before {
    content: '';
    border-left: none;
    border-right: 6px solid #55815e;
  }

  .togle:hover {
    cursor: pointer;
    opacity: .6;
    background-color: rgba(190, 255, 204, 1);
  }
}

.top-continer{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
</style>
