<template>
  <!-- <div  class="lodding"></div> -->
  <div v-loading="lodding">
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router'
import { useLoginStore } from './stores/loginStore';
import { storeToRefs } from 'pinia';
const loginStroe = useLoginStore();
const { lodding } = storeToRefs(loginStroe);
</script>

<style scoped>
  .lodding{
    width: 100%;
    height: 100%;
    background-color: rgba(000, 000, 000, .4);
    position: fixed;
    z-index: 9999;
  }
</style>
