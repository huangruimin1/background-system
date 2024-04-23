<template>
  <div class="login-body">
    <div class="login-form">
      <el-form ref="loginFormRef" style="max-width: 600px" :model="loginForm" status-icon :rules="rules"
        label-width="auto" class="demo-loginForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" type="text" autocomplete="off" clearable />
        </el-form-item>
        <el-form-item label="密 码" prop="password">
          <el-input v-model="loginForm.password" type="password" autocomplete="off" clearable />
        </el-form-item>

        <el-form-item label="验证码" prop="validateCode">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-input ref="verCodeInput" maxlength="4" v-model="loginForm.validateCode" type="text" autocomplete="off" clearable />
            </el-col>
            <el-col :span="8">
              <div ref="$svg" v-html="src.img" class="verlidateCode" @click="getCode" title="看不清楚,点击跟换"> </div>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(loginFormRef)">
            登录
          </el-button>
          <el-button @click="getCode">获取验证码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUpdated, reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'

import axios from 'axios'
import { useRouter } from 'vue-router';

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

const loginForm = reactive({
  username: 'admin',
  password: '123456',
  validateCode: ''
})

const rules = reactive<FormRules<typeof loginForm>>({
  username: [{ validator: validateUserName, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
})
const rutor = useRouter();
const submitForm = (formEl: FormInstance | undefined) => {
  ElMessage({
      message: '123465',
      type: 'success'
    })
  if (!formEl) return
  formEl.validate((valid) => {
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
    
  }else{
    
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
  const result = await axios.post('/adminapi/user/getcode',loginForm);
  if(result.status == 200 && result.data.state == 1){
    
  }else{
    
  }
  src.img = result.data.img
  sessionStorage.setItem('svgImg',src.img)
  nextTick(()=>{
    resizeSVG()
  })
  verCodeInput.value.clear();
}

const verCodeInput = ref();

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
}

</style>
