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
        <view class="info">中山道格拉斯家具有限公司</view>
      </view>
      <view class="t_text">
        <view class="label">企业名称：</view>
        <view class="info">中山道格拉斯家具有限公司</view>
      </view>
      <view class="t_text">
        <view class="label">企业名称：</view>
        <view class="info">中山道格拉斯家具有限公司</view>
      </view>
    </view>
    <view class="o_step">
      <view class="t_title">
        <view class="line"></view>
        <view>客户信息</view>
      </view>
      <uv-steps
        current="1"
        direction="column"
        :activeIcon="iconA"
        :inactiveIcon="iconB"
      >
        <uv-steps-item title="已下单" desc="10:30"></uv-steps-item>
        <uv-steps-item title="已出库" desc="10:35"></uv-steps-item>
        <uv-steps-item title="运输中" desc="11:40"></uv-steps-item>
      </uv-steps>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      iconA: require('@/static/in.png'),
      iconB: require('@/static/out.png')
    }
  },
  methods: {}
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
</style>
<style>
page {
  background-color: #f4f4f4;
}
</style>
