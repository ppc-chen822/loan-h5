<template>
  <view class="order_detail">
    <uv-navbar
      title="个人中心"
      bgColor="#0065eb"
      placeholder
      :titleStyle="{ color: '#fff' }"
      leftIconColor="#fff"
      autoBack
    ></uv-navbar>
    <view class="o_top">
      <view class="t_title">
        <view class="line"></view>
        <view>客户信息</view>
      </view>
      <view class="t_text">
        <view class="label">企业名称：</view>
        <view class="info">{{ content.companyName || '--' }}</view>
      </view>
      <view class="t_text">
        <view class="label">客户名称：</view>
        <view class="info">{{ content.name || '--' }}</view>
      </view>
      <view class="t_text">
        <view class="label">手机号码：</view>
        <view class="info">{{ content.phone || '--' }}</view>
      </view>
    </view>
    <view class="o_step">
      <view class="t_title">
        <view class="line"></view>
        <view>客户信息</view>
      </view>
      <uv-steps direction="column" :activeIcon="iconA" :inactiveIcon="iconA">
        <uv-steps-item title="申请" :desc="content.createTime"></uv-steps-item>
        <uv-steps-item
          v-if="[2, 3, 4, 5].includes(content.status)"
          title="审批"
          :desc="content.approvalTime"
        ></uv-steps-item>
        <uv-steps-item
          v-if="content.status == 3"
          title="审批拒绝"
          :desc="content.reason"
        ></uv-steps-item>
        <uv-steps-item
          v-if="[4, 5].includes(content.status)"
          :title="`授信${content.creditAmount}万`"
          :desc="content.createTime"
        ></uv-steps-item>
        <uv-steps-item
          v-if="content.loanAmount"
          :title="`放款${(content.loanAmount / 10000).toFixed(2)}万`"
          :desc="content.createTime"
        ></uv-steps-item>
        <uv-steps-item
          v-if="content.status == 5"
          :title="`佣金${content.commission}元`"
          :desc="content.commissionTime"
        ></uv-steps-item>
      </uv-steps>
      <view class="appeal" v-if="content.status == 3">
        <upload ref="upload1" :iconUrl="iconC" />
        <upload ref="upload2" :iconUrl="iconD" />
      </view>
      <view
        class="btn"
        v-if="content.status == 3"
        @click="updatePro(content.id)"
      >
        申诉
      </view>
    </view>
  </view>
</template>

<script>
import { getProDetailApi, updateOrderApi } from '@/api/common'
export default {
  data() {
    return {
      fileListH: [],
      iconA: require('@/static/in.png'),
      iconB: require('@/static/out.png'),
      iconC: require('@/static/img01.png'),
      iconD: require('@/static/img02.png'),
      content: {}
    }
  },
  onLoad(options) {
    if (options.id) {
      this.getProDetail(options.id)
    }
  },
  methods: {
    /** 获取订单详情 */
    getProDetail(id) {
      getProDetailApi(id)
        .then((res) => {
          console.log(res)
          this.content = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    /** 更新订单 */
    updatePro(id) {
      const AudArr = this.$refs.upload1.fileList
      const witArr = this.$refs.upload2.fileList
      if (!AudArr.length > 0) {
        uni.$u.toast('请上传核额图')
        return
      }
      if (!witArr.length > 0) {
        uni.$u.toast('请上传到账图')
        return
      }

      let params = {
        auditImg: AudArr[0].imgUrl,
        withdrawalImg: witArr[0].imgUrl
      }
      updateOrderApi(id, params)
        .then((res) => {
          uni.showToast({
            title: '申诉成功',
            icon: 'success'
          })
          setTimeout(() => {
            uni.navigateBack({ delta: 1 })
          }, 1500)
        })
        .then((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.order_detail {
  padding: 32rpx 28rpx;
}
.o_top {
  background-color: #fff;
  padding: 28rpx 24rpx;
  border-radius: 12rpx;
  .t_text {
    display: flex;
    font-size: 24rpx;
    margin-bottom: 20rpx;
    .label {
      color: #666666;
    }
    .info {
      color: #333333;
    }
  }
  & > view:last-child {
    margin-bottom: 0;
  }
}
.t_title {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
  .line {
    width: 6rpx;
    height: 24rpx;
    background: #788ed9;
  }
  & > view:last-child {
    font-size: 28rpx;
    font-weight: 600;
    color: #333333;
    margin-left: 20rpx;
  }
}
.o_step {
  margin-top: 20rpx;
  background-color: #fff;
  padding: 20rpx 24rpx;
}
/deep/ .uv-steps-item {
  padding-bottom: 40rpx;
}
.appeal {
  margin: 0 auto;
  width: 50%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 48rpx;
}
.btn {
  margin: 0 auto;
  text-align: center;
  line-height: 76rpx;
  width: 250rpx;
  height: 76rpx;
  background: #ffffff;
  border-radius: 42rpx 42rpx 42rpx 42rpx;
  opacity: 1;
  border: 2rpx solid #e6ecf5;
}
</style>
<style>
page {
  background-color: #f4f4f4;
}
</style>
