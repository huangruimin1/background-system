import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', () => {

  // 判断是否已经登录过(循环导航只需执行一次)
  const ifSingin = ref(false);

  const token = computed(() => ref(localStorage.getItem('token')));
  const lodding = ref(false);//是否是axios网络请求中状态

  const settoken = (value: string) => {
    localStorage.setItem('token', value)
  }

  return { lodding, ifSingin, token, settoken }
})
