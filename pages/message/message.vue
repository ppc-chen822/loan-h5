<template>
  <view class="message_page">
    <view class="m_search">
      <uv-search
        placeholder="请输入企业名称进行搜索"
        v-model="keyword"
        shape="square"
        height="68rpx"
        :actionStyle="actionStyle"
        borderColor="#2B51FA"
        bgColor="#fff"
      ></uv-search>
    </view>
    <view class="message_card">
      <view class="m_card">
        <view class="card_item">
          <view class="card_left">
            <view class="card_text">公司名称： </view>
            <view class="card_value">金寨县豪缘纺织有限公司</view>
          </view>
          <view class="card_dot"></view>
        </view>
        <view class="card_item">
          <view class="card_left">
            <view class="card_text">订单状态：</view>
            <view class="card_value">匹配成功</view>
          </view>
          <u-icon name="arrow-right" size="32rpx" bold color="#333333"></u-icon>
        </view>
        <view class="card_item">
          <view class="card_left">
            <view class="card_text">更新时间：</view>
            <view class="card_value">匹配成功</view>
          </view>
          <view class="card_last">准入12家</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      actionStyle: {
        textAlign: 'center',
        lineHeight: '68rpx',
        color: '#fff',
        width: '132rpx',
        height: '68rpx',
        background: ' #2B51FA',
        borderRadius: '12rpx 12rpx 12rpx 12rpx'
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.message_page {
  .m_search {
    padding: 32rpx 28rpx;
    background: #fff;
  }
  .message_card {
    padding: 24rpx 30rpx;
  }
  .m_card {
    padding: 24rpx 28rpx 24rpx 20rpx;
    border-radius: 16rpx;
    background: #fff;
    .card_item {
      margin-bottom: 20rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    & > .card_item:last-child {
      margin-bottom: 0rpx;
    }
    .card_left {
      display: flex;
      align-items: center;
      font-family: PingFang SC, PingFang SC;
      font-weight: 400;
      font-size: 28rpx;
      .card_text {
        color: #999999;
      }
      .card_value {
        color: #333333;
      }
    }
    .card_dot {
      width: 20rpx;
      height: 20rpx;
      background-color: #0ed6a7;
      border-radius: 50%;
    }
  }
  .card_last {
    font-size: 28rpx;
    color: #44d7b6;
  }
}
</style>
<style>
page {
  background-color: #f5f5f5;
}
</style>
