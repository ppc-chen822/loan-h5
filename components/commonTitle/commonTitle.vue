<template>
  <view class="item_title">
    <view class="t_right">
      <view class="line"></view>
      <view class="title">
        {{ title }}
      </view>
    </view>
    <view v-if="isMore" class="more" @click="goMore">
      <view class="text">更多</view>
      <u-icon
        name="arrow-right"
        :size="curTheme == 'older' ? '16' : '12'"
        color="#8B8D97"
      ></u-icon>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    lineColor: {
      type: String,
      default: 'red'
    },
    size: {
      type: String,
      default: '32rpx'
    },
    isMore: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      curTheme: uni.getStorageSync('theme') || 'nature'
    }
  },
  methods: {
    goMore() {
      uni.navigateTo({
        url: this.url
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.item_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 32rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: #222222;
  line-height: 30rpx;
  margin-bottom: 32rpx;

  .t_right {
    display: flex;

    .line {
      border-radius: 5rpx;
      margin-right: 8rpx;
      width: 6rpx;
      height: 26rpx;
      background-image: linear-gradient(90deg, #fc7f7a 0%, #f65d58 100%);
    }

    .title {
      font-size: 28rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: bold;
      color: #161b31;
    }
  }

  .more {
    display: flex;

    .text {
      font-size: 24rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      color: #8b8d97;
    }
  }
}
</style>
