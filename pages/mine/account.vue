<template>
  <view class="m_account">
    <view
      class="a_card"
      v-for="(item, index) in list"
      :key="index"
      @click="chooseThis(index)"
    >
      <view class="c_top">
        <view>支付宝</view>
        <view @click="delAccount(item)">解除绑定</view>
      </view>
      <view class="c_mid"
        >名称：{{ item.username }}-{{ item.bankaccount }}</view
      >
    </view>
    <view class="add_account" @click="addAccount">
      <uv-icon name="plus" color="#3c72e7"></uv-icon>
      添加账户</view
    >
  </view>
</template>

<script>
import { selectAccountApi, delAccountApi } from '@/api/purse'
export default {
  data() {
    return {
      list: []
    }
  },
  onShow() {
    this.selectAccount()
  },
  methods: {
    /** 选择这个 */
    chooseThis(index) {
      uni.navigateTo({ url: `/pages/mine/withdrawal?index=${index}` })
    },
    /** 解除绑定 */
    delAccount({ id }) {
      delAccountApi({ id }).then((res) => {
        console.log(res)
        this.selectAccount()
      })
    },
    /**添加账户 */
    addAccount() {
      uni.navigateTo({
        url: '/pages/mine/addAccount'
      })
    },
    /** 查询账户 */
    selectAccount() {
      const userId = uni.getStorageSync('userInfo').userUid
      selectAccountApi({ userId: userId }).then((res) => {
        this.list = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.m_account {
  padding: 32rpx 28rpx;
}
.a_card {
  margin: 0 auto;
  width: 690rpx;
  height: 228rpx;
  background-image: linear-gradient(#5da6d8, #4167b9);
  border-radius: 12rpx;
  margin-bottom: 24rpx;
}
.c_top {
  display: flex;
  justify-content: space-between;
  color: #fff;
  padding: 24rpx 32rpx;
}
.c_mid {
  margin-top: 12rpx;
  text-align: center;
  color: #fff;
}
.add_account {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 690rpx;
  height: 88rpx;
  background-color: #f5f5f5;
  border-radius: 12rpx;
  line-height: 88rpx;
  text-align: center;
  color: #3c72e7;
  margin-top: 32rpx;
}
</style>
