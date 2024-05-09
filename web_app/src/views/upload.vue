<template>
  <div 
  class="content"
  :style="{'display': uploadOptions.display }"
  >
    <div class="croper_box">
      <div class="cropperBox">
        <vueCropper
          ref="cropper"
          :img="uploadOptions.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :autoCrop="true"
          :autoCropWidth="200"
          :autoCropHeight="200"
          :fixedNumber = '[1,1]'
          :fixed="true"
          @real-time="realTime"
        >
        </vueCropper>
      </div>
      <div class="p">
            <img :src="imgsrc" width="100" height="100">
      </div>
      <div class="btnbox">
        <!-- <el-button @click="turnRight" type="primary">点我</el-button> -->
        <el-button @click="cancel" type="">取消</el-button>
        <el-button 
          @click="confirm" 
          type="primary"
          v-loading.fullscreen.lock="fullscreenLoading"
        >确定上传</el-button>
      </div>
    </div>
  </div>
    
</template>

<script lang="ts" setup>
// https://github.com/xyxiao001/vue-cropper
// vue-cropper的git位置
import 'vue-cropper/dist/index.css'
// import { VueCropper }  from "vue-cropper";
import { reactive,ref, defineProps } from 'vue'
import { useLocalStore } from '@/stores/useLocalStore'
import axios from 'axios';
import { ElMessage } from 'element-plus';
const cropper = ref();
const imgsrc = ref();
let newAvatar:Blob;

const props = defineProps({
  uploadOptions:{
    default:{
      display: 'none',
      img: '../assets/images/20230331152308.png'
    }
  }
})
const option = reactive({
  // img:require('../assets/images/20230331152308.png'),
  size:1,
  outputType:'png',
})
// vueCropper向右旋转图片
const turnRight = ()=>{
  cropper.value.rotateRight();
}

// vueCropper实时预览函数
const realTime = ()=>{
  cropper.value.getCropBlob((data:any) => {
    imgsrc.value = URL.createObjectURL(data);
    newAvatar = data;
})
}
const severurl = 'http://localhost:9000/';
const fullscreenLoading = ref(false);
const store = useLocalStore();
// 提交上传图片
const confirm = ()=>{
  if(!newAvatar) return;
  const params = new FormData();
  if(store.userInfo.avatar)
  params.append('avatar',store.userInfo.avatar);
  
  params.append('file',newAvatar);

  axios({
    method:"post",
    url:"adminapi/user/uploadAvatar",
    data: params,
    headers:{
        "Content-Type":"multipart/form-data"
    },
    // 获取上传进度
    // onUploadProgress:(e)=>{
    //   let num = Math.round(e.loaded * 100 / e.total!)
    //   console.log(num);
    // }
  }).then(res=>{
    if(res.status == 200 && res.data.state == 1){
      var { id,name,info,age,sex,avatar,username, pone, usertype } = res.data.data;
      store.changeUserInfo({
        id,name,info,age,sex,
        username, pone, usertype,
        avatar: avatar
      })
      // props.uploadOptions.display = 'none';
      ElMessage.success('更换头像成功！')
      cancel();
    }
  }).catch(err=>{
    ElMessage.error('更换头像失败');
    cancel();
    throw err;
  })
}
// 提交遮罩层
// 取消上传头像
const emit = defineEmits(['clearAvaFile']);
const cancel = () => {
  props.uploadOptions.display = 'none';
  emit('clearAvaFile');
}
</script>

<style scoped lang="less">
  .content{
    // display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: rgba(0,0,0,.5);
    overflow: hidden;
    .croper_box{
      background: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      overflow: hidden;
      padding: 20px;
      width: 690px;
    }
    .cropperBox{
      height: 500px;
      width: 500px;
      float: left;
    }
    .btnbox{
      clear: both;
      padding-top: 12px;
      display: flex;
      justify-content: end;
    }
  
    .p{
      border: 1px solid #eee;
      margin-left: 50px;
      width: 100px;
      height: 100px;
      position: relative;
      float: left;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>