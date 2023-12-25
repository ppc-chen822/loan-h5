<template>
  <view class="apply">
    <view class="ap_top"> </view>
    <view class="apply_form">
      <uv-form
        labelWidth="200rpx"
        labelPosition="left"
        :model="formData"
        labelAlign="center"
        :rules="rules"
        ref="formData"
      >
        <uv-form-item label="手机号" prop="user_mail" borderBottom>
          <uv-input
            v-model="formData.user_mail"
            placeholder="请输入申请人手机号"
            border="none"
          >
          </uv-input>
        </uv-form-item>
        <uv-form-item label="验证码" prop="vCode" borderBottom>
          <uv-input
            v-model="formData.vCode"
            border="none"
            placeholder="获取验证码"
          >
            <template slot="suffix">
              <uv-code
                ref="uCode"
                changeText="X秒重新获取"
                @change="codeChange"
                seconds="120"
              ></uv-code>
              <uv-button
                @click="getSmsCode"
                :text="tips"
                type="primary"
                size="mini"
              ></uv-button>
            </template>
          </uv-input>
        </uv-form-item>
      </uv-form>
    </view>
    <bottom-tool title="注册" @click="submit" />
  </view>
</template>

<script>
import { smsCodeApi, registApi } from '@/api/common.js'
import bottomTool from '@/components/bottomTool/bottomTool.vue'
export default {
  components: { bottomTool },
  data() {
    return {
      tips: '',
      mode: '',
      formData: {
        reCommunicationNumber: '1212',
        vCode: '',
        user_mail: '', //手机号
        user_sex: 1
      },
      rules: {
        user_mail: [
          {
            required: true,
            message: '请输入正确手机号',
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
  onLoad(options) {
    console.log(options)
    if (options) {
      // this.formData.reCommunicationNumber = options.reCommunicationNumber
    }
  },
  methods: {
    codeChange(text) {
      console.log(text)
      this.tips = text
    },
    // 发送短信
    getSmsCode() {
      const { user_mail } = this.formData
      const isTel = uni.$u.test.mobile(user_mail)
      if (!isTel) {
        uni.$u.toast('请输入正确手机号')
      } else if (!this.$refs.uCode.canGetCode) {
        uni.$u.toast('倒计时结束后再发送')
      } else {
        this.smsCode()
      }
    },
    smsCode() {
      const { user_mail } = this.formData
      let params = {
        phone: user_mail
      }
      smsCodeApi(params)
        .then((res) => {
          console.log(res)
        })
        .then((res) => {
          console.log(res)
        })
    },
    // 立即注册
    submit() {
      this.$refs.formData.validate().then((res) => {
        this.registNum()
      })
    },
    /** 注册账号  */
    registNum() {
      const { formData } = this
      let params = {
        actionId: 7,
        device: 0,
        doInput: true,
        jobDispatchId: 1,
        processorId: 1008,
        newData: {
          ...formData
        }
      }
      console.log(params)
      registApi(params)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.apply {
}
.ap_top {
  width: 100%;
  background-color: $mainColor;
  font-family: $fontFamily;
  height: 600rpx;
}
.apply_form {
  margin-top: 52rpx;
  padding: 0 28rpx;
  padding-bottom: 200rpx;
}
/deep/ .uv-form-item {
  padding: 12rpx 0;
  .uv-form-item__body__left {
    span {
      display: inline-block;
      width: 4em;
      text-align: justify;
      text-align-last: justify;
    }
  }
}
</style>
