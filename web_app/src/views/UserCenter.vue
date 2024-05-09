<template>
  <!-- 上传头像组件 -->
  <upload :uploadOptions="uploadOptions" @clearAvaFile='clearAvaFile' />
  <div class="wrap">
    <!-- <Upload/> -->
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card class="avatarBox">
          <!-- <el-avatar :size="100" :src="">
            <div class="replace">
              <span>更换头像</span>
            </div>
           </el-avatar> -->
          <div class="avatar">
            <img :src="userAvatar" alt="用户头像">
            <div class="replace" @click="changeAvatar">
              <Camera style="width: 30px;height:30px;"></Camera>
              <span>更换头像</span>
              <form ref="resetFrom" action="javascript:voie(0)">
                <input ref="avaFile" @change="avaFileChange" type="file"
                  accept="image/jpeg,image/jpg,image/gif,image/png" style="height: 0;width: 0;visibility: hidden;" />
              </form>
            </div>
          </div>
          <!-- <h4 class="name">{{  }}</h4> -->
          <!-- <div class="txt">{{ store.userInfo.name }}</div> -->
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card header="基本信息">
          <el-form ref="userRuleFormRef" :model="userRuleForm" :rules="userRules" label-width="120px"
            class="demo-ruleForm" status-icon label-position="left">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="userRuleForm.name" />
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="userRuleForm.sex" placeholder="请选择">
                <el-option v-for="i in sexOptions" :label="i.label" :value="i.value" :key="i.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="个人简介" prop="info">
              <el-input type="textarea" v-model="userRuleForm.info" />
            </el-form-item>
            <!-- <el-form-item label="头像" prop="avatar">
              <el-upload
                class="avatar-uploader"
                :class="{'redy':uploadUrl?true:false}"
                action="''"
                :show-file-list="false"
                :auto-upload = "false"
                :on-change="handleChange"
              >
                <img v-if="userRuleForm.avatar" :src="uploadUrl? uploadUrl : userRuleForm.avatar" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                <span class="uploadDel">
                  <el-icon size="26" @click="delEmage($event)"><Delete /></el-icon>
                </span>
              </el-upload>
            </el-form-item> -->
            <el-form-item>
              <el-button type="primary" @click="submitForm">提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <!-- <img src="../assets/images/default.jpg" alt=""> -->
</template>

<script lang="ts" setup>
import axios from 'axios';
import { reactive, ref, computed } from 'vue';
import { useLocalStore } from '@/stores/useLocalStore'
import upload from './upload.vue'
import { ElMessage, type FormInstance, type FormRules, type UploadProps } from 'element-plus';
import defaultImg from '@/assets/images/default.jpg'

let BASS_URL = 'http://localhost:9000/'

const store = useLocalStore();
let uploadUrl = ref();
const { name, sex, info, avatar } = store.userInfo;
const userAvatar = computed(() =>
  store.userInfo.avatar ? BASS_URL + store.userInfo.avatar : defaultImg
)
let userRuleFormRef = ref<FormInstance>();
let avaFile = ref();
let userRuleForm = reactive({
  name,
  sex,
  info,
  avatar,
  file: {}
});
let userRules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  sex: { required: true, message: 'Please input Activity name', trigger: 'blur' },
  info: { required: true, message: 'ok?', trigger: 'blur' },
  avatar: { required: true, message: 'ok?', trigger: 'blur' },
})
const sexOptions = [{
  label: '未知',
  value: 0
}, {
  label: '男',
  value: 1
}, {
  label: '女',
  value: 2
}]
// 提交表单
const submitForm = () => {
  userRuleFormRef.value?.validate((valid, fields) => {
    if (valid) {
      const params = new FormData();
      for (let i in userRuleForm) {
        // params.append(i, userRuleForm[i as keyof typeof userRuleForm])
        console.log(i)
      }

      // axios.post('/adminapi/user/upload',params,{
      //   headers:{
      //     "Content-Type":"multipart/form-data"
      //     }
      // }).then(res=>{
      //   console.log(res);

      // })
    }
  });
}
// 选择将要上传的文件后触发的事件
const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  if (uploadFile.status == 'ready') {
    uploadUrl.value = URL.createObjectURL(uploadFile.raw!);
    userRuleForm.file = uploadFile.raw!;
  }
}
// 取消已选文件/图片
const delEmage = (e: MouseEvent) => {
  e.stopPropagation();
  uploadUrl.value = '';
  userRuleForm.file = '';
}

let uploadOptions = reactive({
  display: 'block',
  // display: 'none',
  img: ''
})
const avaFileChange = (data: any) => {
  let file = avaFile.value.files[0];
  if (!file) return;
  let { name } = file;
  // debugger
  let fileType = name.slice(name.length - 3);
  if (fileType == 'jpeg' || fileType == 'png' || fileType == 'gif' || fileType == 'jpg' || fileType == 'png') {
    uploadOptions.display = 'block',
      uploadOptions.img = URL.createObjectURL(file);
    console.log(uploadOptions.img);

  } else {
    ElMessage.error('用户头像不支持该类型文件，请重新选择')
  }

}

const changeAvatar = () => {
  avaFile.value.click();
}

const resetFrom = ref();
const clearAvaFile = () => {
  console.log('呵呵')
  resetFrom.value.reset();
  // avaFile.value = '';
}
</script>
<style scoped lang="less">
.avatarBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .avatar {
    position: relative;
    width: 100px;
    height: 100px;
    border: 1px solid @c;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    .replace {
      display: none;
      position: absolute;
      left: 1;
      top: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      cursor: pointer;
      font-size: 18px;
      color: #fff;
      background-color: rgba(73, 73, 73, 0.6);
    }

    &:hover .replace {
      @flex-c();
    }
  }
}
</style>