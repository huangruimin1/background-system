import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

import axios from 'axios'
const app = createApp(App)

// 请求拦截器
axios.interceptors.request.use(
    function (config) {
      // 在发送请求之前做些什么
    //   alert('发送请求')
    //   console.log('请求被拦截:', config);
      // 可以在这里添加token等
      //
      // 可以返回config或者返回一个新的config对象
      const token = localStorage.getItem('token');
      config.headers.Authorization = `Bearer ` + token;
      return config;
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );
   
  // 响应拦截器
  axios.interceptors.response.use(
    function (response) {
      // 对响应数据做点什么
    //   alert('收到请求')
    //   console.log('响应被拦截:', response);
      // 可以对响应数据进行任意操作
      if(response.status === 4000){
        alert("身份过期")
      }
      const token = response.headers.authorization;
      if(token){
        localStorage.setItem('token',token);
      }
      return response;
    },
    function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    }
  );


// app.use(axios)
app.use(createPinia())
app.use(router)

app.mount('#app')
