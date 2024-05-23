<template>
  <div class="continer">
    <el-card shadow="always">
      <el-row>
        <el-col :span="2">
          <el-avatar :size="50" :src="store.userInfo.avatar" />
        </el-col>
        <el-col :span="22">
          <div class="right">
            欢迎 {{ store.userInfo.name }} 回来！
            <div class="time">
             现在是北京时间： {{ time }}
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card shadow="always" header="公司产品">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 text="2xl" justify="center">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
  import { useLocalStore } from '@/stores/useLocalStore';
import { onBeforeUnmount, onMounted, ref } from 'vue';
  const store = useLocalStore();

  // 随便整个现在时间玩玩
  let timer = 0;
  const date = ()=>{
      const d = new Date();
      let year = d.getFullYear();
      let month = d.getMonth();
      let day = d.getDay() + 1;
      let hours = d.getHours();
      let minute = d.getMinutes();
      let second = d.getSeconds();
      let str = year + '年' +month+ '月'+ day +'日'+' '+hours+'时'+minute+'分'+second+'秒';
      return str;
    }
    let time = ref();
    onMounted(()=>{
      timer = setInterval(()=>{
        time.value = date()
      },1000)
    })
    onBeforeUnmount(()=>{
      console.log('进来了吗')
      clearInterval(timer)
    })
</script>
<style scoped>
.el-card {
  margin: 12px 0;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.right{
  display: flex;
  align-items: left;
  justify-content: center;
  height: 100%;
  flex-direction: column;
}
.time{
  margin-top: 2px;
}
</style>