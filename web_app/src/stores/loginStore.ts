import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', () => {

  const ifSingin = ref(false);

  const token = computed(() => ref(localStorage.getItem('token')));
  const lodding = ref(false);

  const settoken = (value: string) => {
    localStorage.setItem('token', value)
  }

  return { lodding, ifSingin, token, settoken }
})
