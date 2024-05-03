import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
export const useLocalStore = defineStore('useLocalStore',{
    state: () => ({
      ifOpen: false,
      ifOpenAside: false,//侧边栏是否展开
      pageTitle: '',//mainbox的 页头title
    }),
    getters: {
      
    },
    actions: {
      changeOpen(vlue: boolean){
        this.ifOpen = vlue;
      },
      togleOpenAside(){
        this.ifOpenAside = !this.ifOpenAside
      },
      setPageTitle(value:string){
        this.pageTitle = value;
      }
    },
    persist: [
      {
        paths: ['ifOpen','ifOpenAside'],
        storage: localStorage
      }
    ],
  });