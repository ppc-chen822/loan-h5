<template>
  <view class="apply">
    <view class="ap_top">
      <view class="bg_logo">
        <uv-image :src="iconA" width="188rpx" height="204rpx"></uv-image>
      </view>
      <view class="logo">
        <uv-image :src="iconB" width="304rpx" height="64rpx"></uv-image>
      </view>
      <view class="step">
        <view>
          <view class="circle">1</view>
          <view class="text">企业信息</view>
        </view>
        <view class="line"></view>
        <view>
          <view class="circle">2</view>
          <view class="text">数据采集</view>
        </view>
        <view class="line"></view>
        <view>
          <view class="circle">3</view>
          <view class="text">查看报告</view>
        </view>
      </view>
    </view>
    <view class="apply_form">
      <view class="title">企业信息</view>
      <uv-form
        labelWidth="200rpx"
        labelPosition="left"
        :model="formData"
        labelAlign="center"
        :rules="rules"
        ref="formData"
      >
        <uv-form-item label="企业名称" prop="companyName" borderBottom>
          <uv-input
            v-model="formData.companyName"
            placeholder="请输入企业名称"
            border="none"
            @input="getCompany(userId)"
          >
          </uv-input>
        </uv-form-item>
        <uv-form-item label="企业税号" prop="taxCode" borderBottom>
          <uv-input
            v-model="formData.taxCode"
            placeholder="请输入企业税号"
            border="none"
          >
          </uv-input>
        </uv-form-item>
        <uv-form-item label="法人姓名" prop="name" borderBottom>
          <uv-input
            v-model="formData.name"
            placeholder="请输入法人姓名"
            border="none"
          >
          </uv-input>
        </uv-form-item>
        <uv-form-item label="身份证号" prop="identity" borderBottom>
          <uv-input
            v-model="formData.identity"
            placeholder="请输入身份证号"
            border="none"
          >
          </uv-input>
        </uv-form-item>
        <uv-form-item label="手机号码" prop="mobile" borderBottom>
          <uv-input
            v-model="formData.mobile"
            placeholder="请输入手机号码"
            border="none"
          >
          </uv-input>
        </uv-form-item>
      </uv-form>
      <uv-button
        :loading="loading"
        color="linear-gradient(45deg, #2485ee, #469fff)"
        @click="submit"
        :custom-style="customStyle"
        loadingText="提交中..."
        >下一步</uv-button
      >
      <view class="com_pop" v-if="list.length > 0 && compop">
        <view
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="infoSet(item)"
        >
          <view class="text_title">
            {{ item.name }}
          </view>
          <view class="text_num"> 税号：{{ item.credit_no }} </view>
        </view>
      </view>
    </view>
    <view class="bottom_text" @click="goNext">税局维护查询 >></view>
  </view>
</template>

<script>
import { matchOrderApi, getCompanyApi } from '@/api/common.js'
import { debounce } from '@/utils.js'
export default {
  data() {
    return {
      loading: false,
      compop: false,
      list: [],
      userId: '',
      isActive: false,
      iconA: require('@/static/code-bglogo.aa9fa0e.png'),
      iconB: require('@/static/logo.87d0aa1.png'),
      mode: '',
      formData: {
        companyName: '',
        name: '',
        identity: '',
        mobile: '',
        taxCode: ''
      },
      title: '',
      rules: {
        taxCode: {
          required: true,
          message: '请输入企业税号',
          trigger: ['change', 'blur']
        },
        companyName: {
          required: true,
          message: '请输入企业名称',
          trigger: ['change', 'blur']
        },
        name: {
          required: true,
          message: '请输入法人姓名',
          trigger: ['change', 'blur']
        },
        mobile: [
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
        identity: [
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
      this.userId = options.userId
    }
  },
  computed: {
    customStyle() {
      return {
        height: '80rpx',
        marginTop: '32rpx',
        borderRadius: '5.8vw' //圆角
      }
    }
  },
  methods: {
    /** 回填信息*/
    infoSet(item) {
      const { name, oper_name, credit_no } = item
      this.formData.companyName = name
      this.formData.taxCode = credit_no
      this.formData.name = oper_name
      this.compop = false
    },
    /** 跳转税局 */
    goNext() {
      window.location.href =
        'https://bank-marking-sale.daqiangui.com/loan/taxStatus'
    },
    /** 查询公司信息 */
    getCompany: debounce(function () {
      const { companyName } = this.formData
      let params = {
        companyName: companyName
      }
      getCompanyApi(params)
        .then((res) => {
          if (res.data.items) {
            this.list = res.data.items
          } else {
            this.compop = false
            this.list = []
          }
          this.compop = true
        })
        .catch((err) => {
          console.log(err)
        })
    }, 500),
    // 	function(){

    // 	}

    // 立即注册
    submit() {
      this.$refs.formData.validate().then((res) => {
        this.matchOrder()
      })
    },
    /**申请产品 */
    matchOrder() {
      const { formData, userId } = this
      this.loading = true
      matchOrderApi(userId, formData)
        .then((res) => {
          setTimeout(() => {
            this.loading = false
            window.location.href = res.data.baseUrl
          }, 500)
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
.com_pop {
  position: absolute;
  top: 218rpx;
  right: 24rpx;
  background-color: #fff;
  width: 600rpx;
  max-height: 600rpx;
  overflow-y: auto;
  box-shadow: 0rpx 0rpx 6rpx 1rpx rgba(0, 0, 0, 0.4);
  border-radius: 20rpx;
  font-size: 28rpx;
  padding: 12rpx 20rpx;
  .item {
    margin-bottom: 20rpx;
  }
  .text_title {
    color: #2386ee;
    font-size: 30rpx;
  }
  .text_num {
    margin-top: 12rpx;
    color: #999;
  }
}
.bottom_text {
  font-size: 3.73333vw;
  font-weight: 500;
  color: #2485ee;
  line-height: 5.33333vw;
  text-align: center;
}

.btn_active {
  background: #2b8bf2 !important;
}

.btn {
  height: 11.73333vw;
  margin-top: 8vw;
  line-height: 11.73333vw;
  font-size: 4vw;
  background: linear-gradient(45deg, #2485ee, #469fff);
  // background: #2b8bf2 !important;
  border-radius: 5.86667vw;
  // opacity: 0.4;
  color: #fff;
  display: flex;
  justify-content: center;
  margin: 0 32rpx;
  margin-top: 32rpx;
}

.ap_top {
  position: relative;
  height: 78.13333vw;
  background: linear-gradient(180deg, #2586ee, hsla(0, 0%, 100%, 0));

  .bg_logo {
    position: absolute;
    z-index: 0;
    width: 25.06667vw;
    top: 6.4vw;
    right: 6.93333vw;
  }

  .logo {
    width: 40.53333vw;
    padding-top: 8.8vw;
    margin-left: 6.93333vw;
  }

  .step {
    display: flex;
    align-items: center;
    margin: 0 6.93333vw;
    position: relative;
    z-index: 2;
    color: #fff;
    padding-top: 6.4vw;
    margin-bottom: 6.4vw;

    .line {
      margin-right: 1.06667vw;
      height: 2.13333vw;
      width: 46rpx;
      display: block;
      margin: 0 5rpx;
      margin-bottom: 10rpx;
      border-bottom: 1px dotted #fff;
    }

    & > view {
      display: flex;
      align-items: center;

      .circle {
        margin-top: 0;
        width: 4.26667vw;
        border-radius: 100px;
        color: #2386ee;
        display: block;
        margin-right: 1.6vw;
        text-align: center;
        line-height: 4.8vw;
        height: 4.26667vw;
        background: #fff;
        font-size: 2.66667vw;
        font-weight: 600;
      }

      .text {
      }
    }
  }
}

.apply_form {
  position: relative;
  margin-top: 52rpx;
  padding-bottom: 200rpx;
  background-color: #fff;
  margin: 0 32rpx;
  margin-top: -330rpx;
  border-radius: 2.66667vw;

  .title {
    color: #333;
    font-weight: bold;
    font-size: 36rpx;
    margin-left: 32rpx;
    padding: 4.26667vw 0;
  }
}

/deep/ .uv-form-item {
  padding: 12rpx 0;

  .uv-form-item__body__left {
    span {
      display: inline-block;
      text-align: justify;
      text-align-last: justify;
    }
  }
}
</style>
