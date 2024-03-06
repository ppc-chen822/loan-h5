<template>
  <view class="add_account">
    <uv-form
      labelPosition="left"
      :model="formData"
      :rules="rules"
      labelWidth="200rpx"
      ref="form"
    >
      <uv-form-item label="支付宝姓名：" required prop="username" borderBottom>
        <uv-input
          v-model="formData.username"
          placeholder="请输入支付宝姓名"
          border="none"
        >
        </uv-input>
      </uv-form-item>
      <uv-form-item
        label="支付宝账号："
        required
        prop="bankaccount"
        borderBottom
      >
        <uv-input
          v-model="formData.bankaccount"
          placeholder="请输入支付宝账号"
          border="none"
        >
        </uv-input>
      </uv-form-item>
    </uv-form>
    <bottomTool @click="bindAccount" title="绑定" />
  </view>
</template>

<script>
import { addAccountApi } from '@/api/purse.js'
export default {
  data() {
    return {
      formData: {
        username: '',
        bankaccount: '',
        userId: uni.getStorageSync('userInfo').userUid
      },
      rules: {
        username: {
          required: true,
          message: '支付宝账户名称必填',
          trigger: ['blur', 'change']
        },
        bankaccount: [
          {
            required: true,
            message: '支付宝账户必填',
            trigger: ['change', 'blur']
          },
          {
            validator: (rule, value, callback) => {
              return uni.$u.test.mobile(value)
            },
            message: '请输入正确支付宝账号',
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  },
  methods: {
    bindAccount() {
      this.$refs.form.validate().then((res) => {
        this.bindAccountFun()
      })
    },
    bindAccountFun() {
      const { formData } = this
      addAccountApi(formData).then((res) => {
        uni.$u.toast('绑定成功')
        uni.navigateBack({
          delta: 1
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.add_account {
  padding: 32rpx 48rpx;
}
</style>
