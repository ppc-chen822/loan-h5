<template>
  <view class="bottom-tool-content">
    <view class="bottom-tool-inner">
      <view class="bottom-tool-slot">
        <slot />
      </view>
      <u-button
        :text="title"
        :shape="shape"
        :color="color"
        :disabled="disabled"
        @click="clickHandle"
      />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    shape: {
      type: String,
      default: 'circle'
    },
    color: {
      type: String,
      default: '#0065eb'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    clickHandle() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-tool-content {
  position: fixed;
  background-color: #fff;
  bottom: 0;
  left: 0;
  width: 100%;
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.1);
  .bottom-tool-inner {
    padding: 28rpx 48rpx;
    .bottom-tool-slot {
      padding: 0 10rpx;
    }
  }
}
</style>
