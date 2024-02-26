<template>
  <view class="home_content">
    <view class="h_banner">
      <uv-swiper
        :list="list"
        keyName="image"
        height="460rpx"
        radius="0"
      ></uv-swiper>
      <view class="top_btn"> 授权数据码 </view>
    </view>
    <view class="h_tab"></view>
    <view class="h_box"> </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          image: require('@/static/home_banner.png')
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.h_banner {
  position: relative;
  .top_btn {
    position: absolute;
    bottom: 76rpx;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    line-height: 68rpx;
    font-size: 28rpx;
    width: 230rpx;
    height: 68rpx;
    background: #ffffff;
    border-radius: 34rpx 34rpx 34rpx 34rpx;
    color: #2b51fa;
    font-weight: 600;
  }
}
</style>
<style>
page {
  background-color: #f5f5f5;
}
</style>
