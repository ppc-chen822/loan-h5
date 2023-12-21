<template>
  <view class="com_title" :class="isBorder ? 'border' : ''">
    <view class="title_left">
      <u-image :src="icon" width="36rpx" height="36rpx"></u-image>
      <view class="text">{{ title }}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    isBorder: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.com_title {
  background-color: #fff;
  padding: 32rpx;
}
.border {
  border-bottom: 1rpx solid #eeeeee;
}
.title_left {
  display: flex;
  align-items: center;
  font-size: 32rpx;
  font-weight: bold;
  .text {
    margin-left: 12rpx;
  }
}
</style>
