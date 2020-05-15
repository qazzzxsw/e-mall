<template>
  <!--公共组件： footer组件 -->
  <div class="footer-container">
    <div class="footer-menu">
      <router-link to tag="a" target="_blank">关于我们</router-link>
      <span>|</span>
      <router-link to tag="a" target="_blank">人才招聘</router-link>
      <span>|</span>
      <router-link to tag="a" target="_blank">联系我们</router-link>
      <span>|</span>
      <router-link to tag="a" target="_blank">ICP证书</router-link>
    </div>
    <p>Copyright@2020 yqp-crrc.com All Rights Reserved 中国中车绿色循环经济交易电商平台</p>
    <p>中车哈尔滨车辆有限公司 增值电信业务经营许可证黑B2-20140039 黑ICP备14000388号</p>
  </div>
</template>
<script>
export default {
  computed: {
    ZCG_URL () {
      return this.$store.state.app.windowG.ZCG_URL
    }
  }
}
</script>
<style lang="scss" scoped>
.footer-container {
  height: 150px;
  box-sizing: border-box;
  padding: 30px 0 26px 0;
  line-height: 32px;
  text-align: center;
  font-size: 14px;
  background: #f6f6f6;
  .footer-menu {
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    margin-bottom: 25px;
    span {
      color: #979797;
      margin: 0 58px;
    }
  }
  p {
    height: 20px;
    line-height: 20px;
    color: #999;
    font-size: 14px;
    margin-bottom: 7px;
  }
  p:last-child {
    margin-bottom: 0;
  }
}
</style>