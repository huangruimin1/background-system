<template>
  <el-menu default-active="" :collapse="isCollapse" :collapse-transition="false" router>
    <el-menu-item index="/mainbox/Home">
      <el-icon><House /></el-icon>
      <template #title>首页</template>
    </el-menu-item>
    <el-menu-item index="/mainbox/UserCenter">
      <el-icon><LocationInformation /></el-icon>
      <template #title>个人中心</template>
    </el-menu-item>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><Coordinate /></el-icon>
        <span>用户管理</span>
      </template>
      <el-menu-item-group>
        <!-- <template #title><span>Group One</span></template> -->
        <el-menu-item index="/mainbox/userlist">用户列表</el-menu-item>
        <el-menu-item index="/mainbox/userAdd">用户添加</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <el-icon><Coin /></el-icon>
        <span>产品管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/mainbox/productlist">产品列表</el-menu-item>
        <el-menu-item index="/mainbox/productadd">产品添加</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="5">
      <template #title>
        <el-icon><ChatDotSquare /></el-icon>
        <span>新闻管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/mainbox/newslist">新闻列表</el-menu-item>
        <el-menu-item index="/mainbox/newsadd">新闻添加</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>

defineProps({
  isCollapse: {
    type: Boolean,
    defautl: false
  }
})
</script>

<style lang="less">
.el-menu{
  height: 100%;
}
</style>