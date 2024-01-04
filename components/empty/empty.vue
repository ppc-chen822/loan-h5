<template>
  <view class="empty-content" :class="{ isFull: isFull }">
    <u-empty
      :mode="mode"
      :text="text"
      :icon="icon"
      :iconSize="iconSize"
      :height="height"
      :width="width"
      :text-size="textSize"
    />
    <view class="btn-con" v-if="btnText">
      <u-button
        :text="btnText"
        :color="btnColor"
        size="small"
        type="primary"
        @click="emptyClick"
      />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'data'
    },
    // car	购物车为空
    // page	页面不存在
    // search	没有搜索结果
    // address	没有收货地址
    // wifi	没有WiFi
    // order	订单为空
    // coupon	没有优惠券
    // favor	无收藏
    // permission	无权限
    // history	无历史记录
    // news	无新闻列表
    // message	消息列表为空
    // list	列表为空(通用)
    // data	数据为空(默认，通用)
    text: {
      type: String,
      default: ''
    },
    textSize: {
      type: String,
      default: ''
    },
    isFull: {
      type: Boolean,
      default: true
    },
    iconSize: {
      type: String | Number,
      default: '90'
    },
    btnText: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    btnColor: {
      type: String,
      default: '#f45249'
    },
    width: {
      type: String,
      default: '60'
    },
    height: {
      type: String,
      default: '60'
    }
  },
  methods: {
    emptyClick() {
      this.$emit('emptyClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.empty-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 32rpx;
  .btn-con {
    width: 30%;
    margin-top: 50rpx;
  }
}
.isFull {
  height: 70vh;
}
</style>
