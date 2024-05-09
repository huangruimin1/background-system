import { defineStore } from 'pinia'
import { type UserInfo } from '@/types/index';

export const useLocalStore = defineStore('useLocalStore', {
  state: () => ({
    ifOpen: false,
    ifOpenAside: false,//侧边栏是否展开
    pageTitle: '',//mainbox的 页头title
    userInfo : {
      avatar: '',
      name: '',
      username: '',
      pone: '',
      usertype: 0,
      sex: 0,
      info: '',
    }
  }),
  getters: {

  },
  actions: {
    changeOpen(vlue: boolean) {
      this.ifOpen = vlue;
    },
    togleOpenAside() {
      this.ifOpenAside = !this.ifOpenAside
    },
    setPageTitle(value: string) {
      this.pageTitle = value;
    },
    changeUserInfo(value: UserInfo) {
      this.userInfo = {
        ...this.userInfo,
        ...value
      }
    },
  },
  persist: [
    {
      paths: ['ifOpen', 'ifOpenAside', 'userInfo'],
      storage: localStorage
    }
  ],
});