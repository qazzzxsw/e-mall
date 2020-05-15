<template>
  <!-- Header组件 -->
  <div id="headPosition" class="header-container">
    <!-- *************top bar************** -->
    <el-row v-if="isShowGrayBar" class="bar-wrapper-gray">
      <el-row class="top-bar bar">
        <el-col :span="3">您好！欢迎来到<b class="company">宜企拍</b>!</el-col>
        <el-col :span="5">
          <b style="font-weight:normal"><a></a></b>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>
