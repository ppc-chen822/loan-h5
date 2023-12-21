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
        ref="form"
      >
        <uv-form-item label="企业名称" prop="copyName" borderBottom>
          <uv-input
            v-model="formData.copyName"
            placeholder="请输入企业名称"
            border="none"
          >
          </uv-input>
        </uv-form-item>
        <uv-form-item label="姓名" prop="name" borderBottom>
          <uv-input
            v-model="formData.name"
            placeholder="请输入申请人姓名"
            border="none"
          >
          </uv-input>
        </uv-form-item>
        <uv-form-item label="身份证" prop="idCard" borderBottom>
          <uv-input
            v-model="formData.idCard"
            placeholder="请输入申请人身份证号"
            border="none"
          >
          </uv-input>
        </uv-form-item>
        <uv-form-item label="手机号" prop="tel" borderBottom>
          <uv-input
            v-model="formData.tel"
            placeholder="请输入申请人手机号"
            border="none"
          >
          </uv-input>
        </uv-form-item>
      </uv-form>
    </view>
    <bottom-tool title="提交申请" />
  </view>
</template>

<script>
import bottomTool from '@/components/bottomTool/bottomTool.vue'
export default {
  components: { bottomTool },
  data() {
    return {
      formData: {
        copyName: '',
        name: '',
        idCard: '',
        tel: ''
      },
      rules: {}
    }
  },
  methods: {}
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
