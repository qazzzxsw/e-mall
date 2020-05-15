<template>
  <!-- ***********登录********** -->
  <div id="login" class="login-container" @keyup.enter="login">
    <div class="login-box">
      <div class="login">
        <div class="login-img">
          <img src="@/assets/login_images/bg_small.png" />
        </div>
        <div class="login-con">
          <el-divider content-position="center">登录</el-divider>
          <div class="welcome">欢迎来到宜企拍</div>
          <div class="top-err-tips">{{ topErrTips }}</div>
          <el-form ref="form" :model="form" :rules="rules">
            <el-form-item prop="loginId">
              <el-input
                v-model="form.loginId"
                type="text"
                placeholder="用户名/已验证邮箱/已验证手机"
              />
            </el-form-item>
            <el-form-item prop="password" class="password">
              <el-input
                v-model="form.password"
                :type="pwdType"
                placeholder="请输入密码"
                show-password
              />
            </el-form-item>
            <el-form-item
              v-if="isEmailAccount()"
              class="verification-code-email"
              prop="authCode"
              style="margin-bottom:0;"
            >
              <el-input
                v-mode="form.authCode"
                :class="{ 'auth-code-disabled': authCodeTips !== '获取验证码' }"
                type="text"
                placeholder="请输入验证码"
              >
                <el-button
                  slot="append"
                  :disabled="authCodeTips !== '获取验证码'"
                  size="small"
                  @click="openPhoneFillModal"
                  >{{ authCodeTips }}</el-button
                >
              </el-input>
            </el-form-item>
            <el-form-item
              v-else
              class="verification-code"
              prop="authCode"
              style="margin-bottom:0;"
            >
              <el-input
                v-model="form.authCode"
                type="text"
                placeholder="请输入验证码"
              >
                <img
                  slot="append"
                  :src="authCodeSrc"
                  style="width:80px;height:30px;"
                  @click="getAuthCode"
                />
              </el-input>
            </el-form-item>
          </el-form>
          <div class="action">
            <el-button class="login-btn" @click="login">登录</el-button>
            <el-row class="other-action">
              <router-link to="/register">
                还没有账号，
                <span>立即注册</span>
              </router-link>
              <router-link to="resetPassword">
                <span>忘记密码</span>
              </router-link>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <!-- ************Footer********** -->
    <v-footer-group style="margin-top:0;background:#F6F6F6;"></v-footer-group>
    <!-- 平台绑定的手机号 -->
    <el-dialog :visible.sync="isShowFillPhone" title width="460px">
      <el-form
        id="fillphone"
        ref="phoneForm"
        :model="phoneForm"
        label-width="80px"
        @submit.native.prevent
      >
        <el-form-item prop="phone" label="手机号" :rules="rules.phone">
          <el-input
            v-model="phoneForm.phone"
            type="text"
            placeholder="请输入平台绑定的手机号"
          >
            <span slot="append" @click="sendPhoneCode">获取验证码</span>
          </el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
//components
import vFooterGroup from "@/components/FooterGroup";
//utils
import drawCode from "@/utils/drawCode";
//Mixins
export default {
  name: "login",
  components: { vFooterGroup },
  //混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。
  //当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。
  data() {
    const checkEmial = (rule, value, callback) => {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (value.indexOf("@") !== -1) {
        reg.test(value) ? callback() : callback("请输入合法的邮箱");
      } else {
        callback();
      }
    };
    const checkAuthCode = (rule, value, callback) => {
      const reg = this.isEmailAccount()
        ? /^[a-zA-Z0-9]{6}$/
        : /^[a-zA-Z0-9]{4}$/;
      reg.test(value) ? callback() : callback("验证码格式有误");
    };
    const checkTel = (rule, value, callback) => {};
    return {
      form: {
        loginId: "",
        password: "",
        authCode: ""
      },
      phoneForm: {
        phone: ""
      },
      //表单校验规则
      rules: {
        loginId: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: checkEmial, trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        authCode: [
          { required: false, message: "请输入验证码", trigger: "blur" },
          { validator: checkAuthCode, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入平台绑定的手机号码" },
          {
            pattern: /^(1)\d{10}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          },
          { validator: checkTel, trigger: "blur" }
        ]
      },
      authCodeSrc: "",
      pwdType: "password",
      sessionFlag: new Date().getTime(),
      topErrTips: "",
      authCodeTips: "获取验证码",
      isShowFillPhone: false,
      authCodeTimer: null
    };
  },
  mounted() {},
  methods: {
    login() {},
    getAuthCode() {},
    // 验证邮箱格式
    isEmailAccount() {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      return reg.test(this.form.loginId);
    },
    openPhoneFillModal() {
      this.isshowFillPhone = true;
    },
    //发送手机验证码
    sendPhoneCode() {
      this.$refs["phoneForm"].validate(valid => {
        if (valid) {
          this.isshowFillPhone = false;
        }
      });
    },
    //手机验证码倒计时
    setPhoneCodeTimer() {
      let time = 59;
      this.authCodeTips = `${time}s`;
      this.authCodeTimer = setInterval(() => {
        time--;
        this.authCodeTips = `${time}s`;
        if (time <= 0) {
          clearInterval(this.authCodeTimer);
          this.authCodeTips = "获取验证码";
        }
      }, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
.login-container {
  // height: calc(100% - 260px); // 两边有空格
  height: 530px;
  width: 100%;
  position: absolute;
  top: 110px;
  left: 0;
  background-color: #fff;
  .login-box {
    height: 100%;
    background: url("../../assets/login_images/bg_big.png") no-repeat center
      center;
    background-size: cover;
    display: block;
    position: relative;
    padding-bottom: 150px;
    .login {
      width: 72%;
      height: 80%;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      // Img
      .login-img {
        height: 100%;
        width: 70%;
        float: left;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      // Content
      .login-con {
        height: 100%;
        width: 30%;
        float: right;
        background: #fff;
        box-sizing: border-box;
        padding: 1% 2% 0;
        overflow: hidden;
        position: relative;
        .el-divider {
          background: #d8d8d8;
          .el-divider__text {
            font-size: 24px;
            font-weight: bold;
          }
        }
        .welcome {
          height: 32px;
          line-height: 32px;
          font-weight: 400;
          font-size: 14px;
          text-align: center;
        }
        .top-err-tips {
          color: #d31618;
          font-size: 12px;
          text-align: center;
          height: 24px;
          line-height: 24px;
        }
        /deep/ .el-form {
          .el-form-item {
            margin-bottom: 20px;
            .el-form-item__content {
              .el-input__inner {
                height: 46px;
                border-radius: 0;
                border: 1px solid #d1d1d1;
              }
              .el-input__inner::placeholder {
                color: #d0d0d0;
                font-size: 12px;
              }
              .el-form-item__error {
                left: auto;
                right: 0;
                color: #d31618;
              }
              // .common-code {
              //   background: none;
              //   border-color: #D1D1D1;
              //   border-radius: 0;
              //   img {
              //     cursor: pointer;
              //   }
              // }
              // .email-code {
              //   // border-radius: 0;
              //   // width: 100%;
              //   // height: 100%;
              //   // padding: 0 10px;
              //   font-size: 12px;
              //   // cursor: pointer;
              //   // border: 0;
              //   // background: #F5F7FA;
              // }
            }
          }
          .verification-code-email {
            .el-form-item__content .el-input__inner {
              border-right: 0;
            }
            .el-input-group__append {
              width: 96px;
              background: none;
              border-radius: 0;
              font-size: 12px;
              background: #d31618;
              color: #fff;
              border: 1px solid #d31618;
              text-align: center;
              button {
                border: 0;
              }
            }
            .auth-code-disabled {
              .el-input-group__append {
                color: #fff;
                background: #d8d8d8;
                border: 1px solid #d8d8d8;
                cursor: not-allowed;
                .el-button:hover {
                  color: #fff;
                  cursor: not-allowed;
                }
              }
              .is-disabled {
                background: #d8d8d8;
              }
            }
          }
          .verification-code {
            .el-input-group__append {
              background: none;
              border-radius: 0;
              padding: 0;
              height: 38px;
              img {
                cursor: pointer;
                height: 100%;
              }
            }
          }
          .el-form-item.verification-code {
            .el-input__inner {
              border-right: 0;
            }
          }
          .el-form-item.is-error {
            .el-input__inner {
              border-color: #d31618;
            }
            .el-input-group__append {
              border-color: #d31618;
            }
          }
          .verification-code-email.is-error .auth-code-disabled {
            .el-input-group__append {
              border: 1px solid #d8d8d8;
            }
          }
        }
        .action {
          height: 76px;
          width: 86.5%;
          position: absolute;
          bottom: 3%;
          /deep/ .login-btn.el-button {
            height: 46px;
            background: #d31618;
            outline: 0;
            cursor: pointer;
            width: 100%;
            color: #fff;
            border-radius: 0;
            border: 1px solid #d31618;
          }
          .other-action {
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            color: #1d1d1d;
            font-weight: bold;
            span {
              color: #d31618;
            }
            a:first-child {
              float: left;
            }
            a:last-child {
              float: right;
            }
          }
        }
      }
    }
  }
}
#fillPhone {
  /deep/.el-form-item {
    position: relative;
    margin-bottom: 15px;
    /deep/ .el-form-item__label {
      position: absolute;
      // left: 80px;
      z-index: 9999;
    }
    /deep/ .el-form-item__content {
      margin-left: 0 !important;
      .el-input {
        input {
          padding-left: 80px;
        }
        .el-input-group__append {
          background: #d31618;
          border-color: #d31618;
          color: #fff;
          button {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
