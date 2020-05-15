<template>
  <!-- 公共组件：footerGroup 底部信息 -->
  <div id="footerGroup" class="footer-group-container">
    <el-row class="panel-group">
      <!-- 联系方式 -->
      <el-col :span="6">
        <p>
          <img src="@/assets/homePage_images/QRcode.jpeg" style="width:120px;height:120px;" />
        </p>
        <p>客服热线：400-017-1616</p>
        <p>投诉专线：0451-51979333</p>
        <p>周一到周五：9:00-16:00</p>
      </el-col>
      <!-- 交易规则 -->
      <el-col :span="5">
        <h3>交易规则</h3>
        <p>
          <router-link
            :to="'/common/userManual?titleF1=jygz&titleF2=ptjygz'"
            tag="a"
            target="_blank"
          >平台交易规则</router-link>
        </p>
        <p>
          <router-link
            :to="'/common/userManual?titleF1=jygz&titleF2=ptjygz'"
            tag="a"
            target="_blank"
          >会员管理规则</router-link>
        </p>
        <p>
          <router-link
            :to="'/common/userManual?titleF1=jygz&titleF2=ptjygz'"
            tag="a"
            target="_blank"
          >竞买交易规则</router-link>
        </p>
      </el-col>
      <!-- 操作指南 -->
      <el-col :span="5">
        <h3>操作指南</h3>
        <p>
          <router-link
            :to="'/common/userManual?titleF1=jygz&titleF2=ptjygz'"
            tag="a"
            target="_blank"
          >注册流程</router-link>
        </p>
        <p>
          <router-link
            :to="'/common/userManual?titleF1=jygz&titleF2=ptjygz'"
            tag="a"
            target="_blank"
          >竞价交易操作</router-link>
        </p>
      </el-col>
      <!-- 交易指南 -->
      <el-col :span="4">
        <h3>交易指南</h3>
        <p>
          <router-link
            :to="'/common/userManual?titleF1=jygz&titleF2=ptjygz'"
            tag="a"
            target="_blank"
          >交易范围与模式</router-link>
        </p>
        <p>
          <router-link
            :to="'/common/userManual?titleF1=jygz&titleF2=ptjygz'"
            tag="a"
            target="_blank"
          >用户注册资料</router-link>
        </p>
        <p>
          <router-link
            :to="'/common/userManual?titleF1=jygz&titleF2=ptjygz'"
            tag="a"
            target="_blank"
          >服务费收取标准</router-link>
        </p>
        <p>
          <router-link
            :to="'/common/userManual?titleF1=jygz&titleF2=ptjygz'"
            tag="a"
            target="_blank"
          >竞价保证金收取与退还</router-link>
        </p>
        <p>
          <router-link
            :to="'/common/userManual?titleF1=jygz&titleF2=ptjygz'"
            tag="a"
            target="_blank"
          >收款账号</router-link>
        </p>
      </el-col>
      <!-- 常见问题-->
      <el-col :span="4">
        <h3>常见问题</h3>
        <p>
          <router-link
            :to="'/common/userManual?titleF1=jygz&titleF2=ptjygz'"
            tag="a"
            target="_blank"
          >加宜企拍微信好友</router-link>
        </p>
        <p>
          <router-link
            :to="'/common/userManual?titleF1=jygz&titleF2=ptjygz'"
            tag="a"
            target="_blank"
          >忘记/更改密码</router-link>
        </p>
        <p>
          <router-link
            :to="'/common/userManual?titleF1=jygz&titleF2=ptjygz'"
            tag="a"
            target="_blank"
          >会员信息修改</router-link>
        </p>
        <p>
          <router-link
            :to="'/common/userManual?titleF1=jygz&titleF2=ptjygz'"
            tag="a"
            target="_blank"
          >如何制作电子合同章</router-link>
        </p>
      </el-col>
    </el-row>
    <v-footer
      :style="{'border-top':'2px solid rgba(151,151,151,0.3)','background':isLogin?'#F6F6F6':'E3E4E4'}"
    ></v-footer>
  </div>
</template>
<script>
import vFooter from './Footer'
export default {
  name: 'FooterGroup',
  components: {
    vFooter
  },
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.footer-group-container {
  background: #e3e4e4;
  border-top: 1px solid #e4e4e4;
  margin-top: 20px;
  .panel-group {
    margin: 30px auto 20px;
    width: $containerWidth;
    line-height: 28px;
    font-size: 14px;
    color: #666;
    text-align: left;
    .el-col {
      padding-left: 40px;
    }
    h3 {
      font-size: 16px;
      margin: 0;
      text-align: left;
    }
    p {
      font-size: 12px;
      text-align: left;
      a {
        color: #666;
      }
    }
  }
}
</style>