<template>
  <view class="title">
    <view class="title_text">{{ title }}</view>
    <view class="title_unit"> {{ unit }} </view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.title {
  padding: 30rpx 30rpx 0 30rpx;
  display: flex;
  justify-content: space-between;
}
.title_text {
  font-size: 28rpx;
  font-weight: bold;
}
.title_unit {
  font-size: 24rpx;
  color: #999;
}
</style>
