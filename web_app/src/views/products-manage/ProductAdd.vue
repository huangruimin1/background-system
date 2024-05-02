<template>
  添加产品
  <el-button @click = 'getMsg'>点击获取值</el-button>
</template>

<script setup lang="ts">
import { useLocalStore } from '@/stores/useLocalStore'

  const localStore = useLocalStore();
  const getMsg = () => {
    localStore.changeOpen(!localStore.ifOpen);
  }
</script>

<style scoped lang="less">


</style>
@/stores/useLocalStore