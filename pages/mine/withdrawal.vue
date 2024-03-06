<template>
  <view class="with_drawal">
    <view class="module_a">
      <view class="left">提现账号</view>
      <view class="right" @click="chooseAccount"
        >支付宝（{{ curObj.username }}）<uv-icon name="arrow-right"></uv-icon
      ></view>
    </view>
    <view class="module_b">
      <view class="top"> 提现金额 </view>
      <view class="bom">
        <uv-input border="bottom" height="80" fontSize="40" v-model="amount">
          <template v-slot:prefix>
            <uv-text
              text="￥"
              size="20"
              bold
              margin="0 3px 0 0"
              type="tips"
            ></uv-text>
          </template>
        </uv-input>
      </view>
    </view>
    <view class="module_c">
      <view @click="getPurse">全部提现</view>
      <view>提现手续费+税点=6%</view>
    </view>
    <bottomTool title="提现" @click="pullMoney" />
  </view>
</template>

<script>
import { getPurseApi, selectAccountApi, pullMoneyApi } from '@/api/purse'
export default {
  data() {
    return {
      amount: '',
      curObj: {}
    }
  },
  onLoad(options) {
    if (options.index) {
      console.log(111)
      this.selectAccount(options.index)
    } else {
      console.log(11)
      this.selectAccount(0)
    }
  },
  methods: {
    /** 提现 */
    pullMoney() {
      const { amount } = this
      if (!amount) {
        uni.showToast({
          title: '请输入提现金额',
          icon: 'none'
        })
        return
      }
      const { curObj } = this
      let parmas = {
        userId: uni.getStorageSync('userInfo').userUid,
        money: amount,
        type: 2,
        toUserId: curObj.id,
        payType: 1
      }
      pullMoneyApi(parmas).then((res) => {
        if (res.data) {
          console.log(res)
        } else {
          uni.showModal({
            title: '提示',
            content: res.msg,
            showCancel: false
          })
        }
      })
    },
    /** 查询账户 */
    selectAccount(index) {
      const userId = uni.getStorageSync('userInfo').userUid
      selectAccountApi({ userId: userId }).then((res) => {
        console.log(index)
        this.curObj = res.data[index]
      })
    },
    /** 选择账户 */
    chooseAccount() {
      uni.navigateTo({
        url: '/pages/mine/account'
      })
    },
    /** 查询用户钱包 */
    getPurse() {
      const userId = uni.getStorageSync('userInfo').userUid
      getPurseApi({ userId: userId })
        .then((res) => {
          console.log(res)
          this.amount = res.data.amount
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.with_drawal {
  padding: 32rpx 24rpx;
}
.module_a {
  display: flex;
  justify-content: space-between;
  .left {
    font-size: 30rpx;
    font-weight: bold;
  }
  .right {
    display: flex;
  }
}
.module_b {
  margin-top: 32rpx;
  .top {
    font-size: 30rpx;
    font-weight: bold;
  }
  .bom {
    margin-top: 32rpx;
  }
}
.module_c {
  margin-top: 32rpx;
  display: flex;
  justify-content: space-between;
  font-size: 28rpx;
  color: #999;
  & > view:nth-child(2) {
    color: #ff5555;
  }
  & > view:nth-child(1) {
    color: #067df4;
  }
}
</style>
