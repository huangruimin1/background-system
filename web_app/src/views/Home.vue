<template>
  <div class="continer">
    <el-card shadow="always">
      <el-row>
        <el-col :span="8">
          <el-avatar :size="50" />
        </el-col>
        <el-col :span="16">
          欢迎回来
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
</style>