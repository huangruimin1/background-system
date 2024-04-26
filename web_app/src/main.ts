import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())

import axios from 'axios'

// import { useLoginStore } from './stores/loginStore';
// const linginStore = useLoginStore();
// const { lodding } = storeToRefs(linginStore);
// import { useRouter } from 'vue-router'
// const theRouter = useRouter();


  
  console.log('进入userouter之前')
  app.use(router)
  console.log('进入app.mount之前')
  app.mount('#app')

  // 请求拦截器
axios.defaults.baseURL = "/api"
// axios.defaults.baseURL = "http://127.0.0.1:5173"
axios.defaults.withCredentials = true;//携带cookie,默认不携带
axios.interceptors.request.use(
  function (config) {
      // 在发送请求之前做些什么
    //   alert('发送请求')
    //   console.log('请求被拦截:', config);
      // 可以在这里添加token等
      //
      // 可以返回config或者返回一个新的config对象
      // 
      // config.withCredentials = true;
      // lodding.value = true;
      const token = localStorage.getItem('token');
      config.headers['Authorization'] = `Bearer ` + token;
      return config;
    },
    function (error) {
      // 对请求错误做些什么
      // lodding.value = false;
      return Promise.reject(error);
    }
  );
   
  // 响应拦截器
  axios.interceptors.response.use(
    function (response) {
      // lodding.value = false;
      // 对响应数据做点什么
    //   alert('收到请求')
    //   console.log('响应被拦截:', response);
      // 可以对响应数据进行任意操作
      if(response.status === 401){
        alert("身份过期")
        // theRouter.push('/login');
      }
      const token = response.headers.authorization;
      if(token){
        localStorage.setItem('token',token);
      }
      return response;
    },
    function (error) {
      // 对响应错误做点什么
      // return Promise.reject(error);
    }
  );