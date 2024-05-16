import axios from 'axios'
// 请求拦截器
axios.defaults.baseURL = "/api"
// axios.defaults.baseURL = "http://127.0.0.1:5173"
axios.defaults.withCredentials = true;//携带cookie,默认不携带
axios.interceptors.request.use(
  function (config) {
      // 在发送请求之前做些什么
    //   alert('发送请求')
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
      // 可以对响应数据进行任意操作
      console.log(response)
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
      
      // alert("身份过期")
      if(error.response && error.response.status == 401){
        alert('身份过期，请重新登录！！')
        window.location.href='/login'
      }
      console.log(error)
      // 对响应错误做点什么
      // return Promise.reject(error);
    }
  );