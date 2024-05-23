<template>
  <div class="login-body">
    <div class="login-form">
      <el-form ref="loginFormRef" style="max-width: 600px" :model="loginForm" status-icon :rules="rules"
        label-width="auto" class="demo-loginForm" hide-required-asterisk>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" type="text" autocomplete="off" clearable />
        </el-form-item>
        <el-form-item label="密 码" prop="password">
          <el-input v-model="loginForm.password" type="password" autocomplete="off" clearable />
        </el-form-item>
              
        <el-form-item label="验证码" prop="validateCode">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-input ref="verCodeInput"
              maxlength="4" 
              v-model="loginForm.validateCode" 
              type="text" 
              autocomplete="off" c
              learable 
              />
            </el-col>
            <el-col :span="8">
              <div ref="$svg" v-html="src.img" class="verlidateCode" @click="getCode" title="看不清楚,点击跟换"> </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 150px;" type="primary" @click="submitForm(loginFormRef)">
            登  录
          </el-button>
          <el-button @click="">忘记密码</el-button>
          <el-button @click="">注册新用户</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, watch } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'

import axios from 'axios'
import { useRouter } from 'vue-router';
import { useLocalStore } from '@/stores/useLocalStore';

const loginFormRef = ref<FormInstance>()

const validateUserName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    if(value.length < 4){
      callback(new Error('用户名不能小于4位数'))
    }else if(value.length > 20){
      callback('用户名最长是20位')
    }
    
    callback()
  }
}
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else {
    callback()
  }
}

const vaCodeConplate = ref(false);//用于验证码错误时候，elui弹出错误提示
const verCodeChange = () => {
  vaCodeConplate.value = true;
}
const validateCode = (rule: any, value: any, callback: any) => {
  if(!vaCodeConplate.value){
    callback(new Error('验证码不正确'))
  }else{
    callback()
  }
}

const loginForm = reactive({
  username: 'admin',
  password: '123456',
  validateCode: '9999'
})

const rules = reactive<FormRules<typeof loginForm>>({
  username: [{ validator: validateUserName, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
  validateCode:[{ required: true, message: '验证码不能为空', trigger: 'blur' },
  { validator: validateCode, trigger: 'blur' },
  { min:4, max:4, message:'验证码必须有四位', trigger: 'blur' }]
})
const rout = useRouter();
const submitForm = (formEl: FormInstance | undefined) => {
  
  if (!formEl) return
  formEl.validate((valid) => {
    // rout.push('/mainbox')
    if (valid) {
      logining();
      
      // rutor.push('/mainbox')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

  let src = reactive({
    img:''
  })
  const $svg = ref();
  const logining = async ()=>{
  let res = await axios.post('/adminapi/user/login',loginForm);
  if(res.status == 200 && res.data.state == 1){
    ElMessage({
      message: '登录成功',
      type: 'success'
    })

    setUserInfo(res.data.data)
    rout.push('/mainbox/Home')
  }else if(res.status == 211){
    // 验证码不正确
    vaCodeConplate.value = false;
    loginFormRef.value && loginFormRef.value.validate();
  }
}

const resizeSVG = () => {
  var div = $svg.value.querySelector('svg')
  if(div){
      // div.setAttribute('width',500)
      div.setAttribute('height',40)
  }
}

const token = localStorage.getItem('token')
const getCode = async () => {
  const result = await axios.post('/adminapi/user/getcode');
  src.img = result.data.img
  sessionStorage.setItem('svgImg',src.img)
  nextTick(()=>{
    resizeSVG()
  })
  verCodeInput.value.clear();
}

const verCodeInput = ref();

watch(()=>loginForm.validateCode,()=>{
  vaCodeConplate.value = true;
})

onMounted(() => {
  let svg = sessionStorage.getItem('svgImg');
  if(svg){
    src.img = svg;
    nextTick(()=>{
      resizeSVG()
    })
    return;
  }
  getCode();
})

// 将登录信息写入本地存储
import { type UserInfo } from '@/types/index';

const setUserInfo = (val:UserInfo) => {
  const localStore = useLocalStore();
  localStore.changeUserInfo(val)
}

</script>

<style scoped lang="less">
.login-body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #e9fff4, #ceffbe, #97ff95, #7bec55, #9aef65);
}

.login-form {
  width: 550px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 8px 7px 20px 6px rgba(179 175 175 / 50%);
}
.verlidateCode{
  position: relative;
  top: -4px;
  left: -20px;
  cursor: pointer;
  height: 32px;
}

</style>
