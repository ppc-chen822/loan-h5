<template>
  <view class="load_more">
    <view class="btn" @click="handleToggle">
      <view class="text">{{ isExpanded ? '收起' : '展开' }}</view>
      <u-icon :name="isExpanded ? 'arrow-up' : 'arrow-down'" size="10"></u-icon>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isExpanded: false
    }
  },
  methods: {
    // 展开收起
    handleToggle() {
      this.isExpanded = !this.isExpanded
      this.$emit('toggle', this.isExpanded)
    }
  }
}
</script>

<style lang="scss" scoped>
.load_more {
  display: flex;
  justify-content: center;
}
.btn {
  display: flex;
  justify-content: center;
  line-height: 48rpx;
  width: 128rpx;
  height: 48rpx;
  background: #e7f1fd;
  border-radius: 10rpx;
  color: #2485ee;
  font-size: 24rpx;
  .text {
    margin-right: 6rpx;
  }
}
</style>
