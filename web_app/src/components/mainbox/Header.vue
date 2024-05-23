<template>
  <div class="header">
    <div class="left">
      <el-icon><Menu /></el-icon>
      企业后台管理系统
    </div>
    <div class="right">
      <span class="span">
        <span style="color: rgb(167 150 99);margin-right: 2px;">
          {{ store.userInfo.name }}
        </span>
      </span>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon class="el-icon--right">
            <!-- <el-icon :size="20">
              <UserFilled />
            </el-icon> -->
            <img class="user-avatar" :src="store.userInfo.avatar" alt="">
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
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router'
  import { useLocalStore } from '@/stores/useLocalStore'
  const router = useRouter();
  const goLogin = () => {
    router.push('/login')
  }

  const store = useLocalStore();
  onMounted(() => {
    
  })
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
  .user-avatar{
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 2px solid #fff;
  }
}
</style>