<template>
  <view class="bind_mobile">
    <uv-popup ref="popup" mode="center" round="24rpx">
      <view class="box">
        <view class="title">手机号绑定</view>
        <view class="formData">
          <u-form
            labelPosition="left"
            labelWidth="200rpx"
            :model="formData"
            :rules="rules"
            ref="formData"
            :labelStyle="labelStyle"
            errorType="toast"
          >
            <u-form-item prop="phone" borderBottom>
              <u-input
                v-model="formData.phone"
                border="none"
                placeholder="请输入手机号"
                :customStyle="{ height: '80rpx' }"
              >
                <template slot="suffix">
                  <u-code
                    ref="uCode"
                    changeText="X秒重新获取"
                    @change="codeChange"
                    seconds="120"
                  ></u-code>
                  <u-button
                    @click="judgSmsCode"
                    :text="tips"
                    shape="circle"
                    type="primary"
                  ></u-button>
                </template>
              </u-input>
            </u-form-item>
            <u-form-item prop="code" borderBottom>
              <u-input
                v-model="formData.code"
                placeholder="请输入短信验证码"
                :inputAlign="inputStyle.inputAlign"
                :border="inputStyle.border"
                :confirmType="inputStyle.confirmType"
              />
            </u-form-item>
            <u-form-item prop="reCommunicationNumber" borderBottom>
              <u-input
                v-model="formData.reCommunicationNumber"
                placeholder="请输入推荐人邀请码（选填）"
                :inputAlign="inputStyle.inputAlign"
                :border="inputStyle.border"
                :confirmType="inputStyle.confirmType"
              />
            </u-form-item>
          </u-form>
        </view>
        <view class="btn_tools" @click="bindMobile"> 绑定 </view>
      </view>
    </uv-popup>
  </view>
</template>

<script>
import { bindPhoneApi } from '@/api/home.js'
import { smsCodeApi } from '@/api/common'
export default {
  props: {
    myCommunicationNumber: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tips: '获取验证码',
      formData: {
        code: '',
        phone: '',
        reCommunicationNumber: '',
        openId: ''
      },
      labelStyle: {
        color: '#222222',
        fontSize: '28rpx',
        fontWeight: 'bold'
      },
      inputStyle: {
        inputAlign: 'left',
        border: 'none',
        confirmType: 'next'
      },
      rules: {
        code: {
          required: true,
          message: '验证码必填',
          trigger: ['blur', 'change']
        },
        phone: [
          {
            required: true,
            message: '手机号必填',
            trigger: ['change', 'blur']
          },
          {
            validator: (rule, value, callback) => {
              return uni.$u.test.mobile(value)
            },
            message: '请输入正确手机号',
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  },
  onReady() {
    //onReady 为uni-app支持的生命周期之一
    this.$refs.formData.setRules(this.rules)
  },
  mounted() {
    this.formData.reCommunicationNumber = this.myCommunicationNumber
  },
  methods: {
    open() {
      this.$refs.popup.open()
    },
    codeChange(text) {
      this.tips = text
    },
    bindMobile() {
      this.$refs.formData.validate().then((res) => {
        this.bindMobileFun()
      })
    },
    /** 手机号注册 */
    bindMobileFun() {
      const { formData } = this
      bindPhoneApi(formData).then((res) => {
        console.log(res)
        this.$refs.popup.close()
        uni.setStorageSync('userInfo', res.data)
        uni.$u.toast('绑定成功')
      })
    },
    /* 获取短信验证码判断 */
    judgSmsCode() {
      const { phone } = this.formData
      const isTel = uni.$u.test.mobile(phone)
      if (!phone || !isTel) {
        uni.$u.toast('请输入正确手机号')
      } else if (!this.$refs.uCode.canGetCode) {
        uni.$u.toast('倒计时结束后再发送')
      } else {
        this.getSmsCode()
      }
    },
    /** 获取短信验证码【回调】 */
    getSmsCode() {
      const { phone } = this.formData
      smsCodeApi({ phone })
        .then((res) => {
          if (res) {
            uni.$u.toast('发送成功')
            if (this.$refs.uCode.canGetCode) {
              this.$refs.uCode.start()
              console.log(this.$refs.uCode)
            } else {
              uni.$u.toast('倒计时结束后再发送')
            }
          }
        })
        .catch((err) => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  padding: 32rpx 64rpx 12rpx 64rpx;
}
.title {
  font-size: 32rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 32rpx;
}
.btn_tools {
  margin: 32rpx auto;
  width: 600rpx;
  height: 80rpx;
  border-radius: 40rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: #0065eb;
}
</style>
