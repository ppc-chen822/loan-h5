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
        <uv-form-item label="企业名称" prop="copyName" borderBottom>
          <uv-input
            v-model="formData.copyName"
            placeholder="请输入企业名称"
            border="none"
          >
          </uv-input>
        </uv-form-item>
        <uv-form-item v-if="mode == 'H5'" label="姓名" prop="name" borderBottom>
          <uv-input
            v-model="formData.name"
            placeholder="请输入申请人姓名"
            border="none"
          >
          </uv-input>
        </uv-form-item>
        <uv-form-item
          v-if="mode == 'H5'"
          label="身份证"
          prop="idCard"
          borderBottom
        >
          <uv-input
            v-model="formData.idCard"
            placeholder="请输入申请人身份证号"
            border="none"
          >
          </uv-input>
        </uv-form-item>
        <uv-form-item label="手机号" prop="phone" borderBottom>
          <uv-input
            v-model="formData.phone"
            placeholder="请输入申请人手机号"
            border="none"
          >
          </uv-input>
        </uv-form-item>
      </uv-form>
    </view>
    <bottom-tool title="提交申请" @click="submit" />
  </view>
</template>

<script>
import { applyProductApi, getCompanyByIdApi } from '@/api/common.js'
import bottomTool from '@/components/bottomTool/bottomTool.vue'
export default {
  components: { bottomTool },
  data() {
    return {
      mode: '',
      formData: {
        copyName: '',
        name: '',
        idCard: '',
        phone: '',
        productId: ''
      },
      title: '',
      rules: {
        phone: [
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
        ],
        idCard: [
          {
            message: '请输入正确身份证号',
            trigger: ['change', 'blur']
          },
          {
            validator: (rule, value, callback) => {
              return uni.$u.test.idCard(value)
            },
            message: '请输入正确身份证号',
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  },
  onLoad(options) {
    if (options) {
      this.mode = options.mode
      this.formData.productId = options.id
      this.title = options.name
    }
  },
  onReady() {
    uni.setNavigationBarTitle({
      title: `${this.title}`
    })
  },
  mounted() {
    this.getCompanyById()
  },
  methods: {
    // 回填信息
    getCompanyById() {
      const deviceId = uni.getStorageSync('deviceId')
      getCompanyByIdApi(deviceId)
        .then((res) => {
          const { companyName, phone, name, identity } = res
          this.formData.copyName = companyName
          this.formData.phone = phone
          this.formData.idCard = identity
          this.formData.name = name
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 立即注册
    submit() {
      this.$refs.formData.validate().then((res) => {
        this.applyProduct()
      })
    },
    /**申请产品 */
    applyProduct() {
      const { formData } = this
      const deviceId = uni.getStorageSync('deviceId')
      applyProductApi(deviceId, formData)
        .then((res) => {
					if(res.data && res.data.includes('http')){
						window.location.href = res.data
					}else{
						uni.navigateTo({
							url:`/pages/order/orderDetail?id=${res.data}`
						})
					}
        })
        .catch((err) => {
          console.log(err)
        })
    }
    /**  */
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
