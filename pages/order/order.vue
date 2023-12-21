<template>
  <view class="order">
    <uv-sticky bgColor="#fff">
      <view class="top">
        <uv-search
          searchIcon="search"
          placeholder="请输入搜索内容"
          v-model="queryObj.keyword"
        ></uv-search>
        <uv-tabs :list="tabsList" :scrollable="false" />
      </view>
    </uv-sticky>
    <view class="order_card">
      <view class="card_item">
        <view class="c_top">
          <uv-image
            src="https://cdn.uviewui.com/uview/album/1.jpg"
            width="48rpx"
            height="48rpx"
          ></uv-image>
          <view class="c_title">平安新微贷</view>
        </view>
        <view class="c_mid">
          <view class="m_left">
            <view>中山道格拉斯家具有限公司</view>
            <view>申请时间：2023-09-09 09:47:16</view>
          </view>
          <view class="m_right">
            <view class="tips">审批中</view>
            <uv-icon name="arrow-right" color="#999999" top="2rpx" size="10" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabsList: [
        {
          name: '申请中'
        },
        {
          name: '已拒绝'
        },
        {
          name: '待提现'
        },
        {
          name: '已放款'
        }
      ],
      queryObj: {
        page: 1,
        limit: 10,
        keyword: ''
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.top {
  padding: 32rpx 28rpx 0 28rpx;
}
.order_card {
  padding: 20rpx 32rpx;
}
.card_item {
  background-color: #fff;
  padding: 24rpx;
  border-radius: 12rpx;
  .c_top {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e9e9e9;
    padding-bottom: 20rpx;
    .c_title {
      font-size: 28rpx;
      font-weight: 400;
      color: #333333;
      margin-left: 20rpx;
    }
  }
  .c_mid {
    margin-top: 24rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .m_left {
      view {
        font-size: 24rpx;
        font-weight: 400;
        color: #666666;
      }
      & view:first-child {
        margin-bottom: 12rpx;
      }
    }
    .m_right {
      display: flex;
      align-items: center;
      font-size: 24rpx;
      font-weight: 400;
      color: #e4df3a;
      .tips {
        margin-right: 5rpx;
      }
    }
  }
}
</style>
<style>
page {
  background-color: #f4f4f4;
}
</style>
