<template>
  <div class="header">
    <div class="left">
      <el-icon><Menu /></el-icon>
      企业后台管理系统
    </div>
    <div class="right">
      <span class="span">
        欢迎某某某回来!
      </span>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon class="el-icon--right">
            <el-icon :size="20">
              <UserFilled />
            </el-icon>
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item @click="goLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  const router = useRouter();
  const goLogin = () => {
    router.push('/login')
  }
</script>

<style lang="less">
.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left{
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  .right {
    .span {
      font-size: 16px;
      color: #000;
    }
  }
}
</style>