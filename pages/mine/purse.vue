<template>
  <view class="purse_page">
    <view class="p_top">
      <view class="t_title">余额</view>
      <view class="t_amount">{{ amount }}</view>
      <view class="t_bottom">
        <view class="left">
          <view>{{ todayCommission }}</view>
          <view>今日佣金</view>
        </view>
        <view class="btn" @click="goWithdraw">立即提现</view>
        <view class="right">
          <view>{{ totalCommission }}</view>
          <view>累计佣金</view>
        </view>
      </view>
    </view>
    <view class="t_tabs">
      <uv-tabs
        :list="tabsList"
        :scrollable="false"
        @click="tabSwitch"
        customStyle="backgroundColor: '#458DF7'"
        lineColor="#fff"
        lineWidth="30"
        inactiveStyle="color:#fff"
        activeStyle="color:#fff;font-weight:bold"
      />
    </view>
    <view class="p_card" v-for="(item, index) in list" :key="index">
      <view class="c_left">
        <view>{{ item.descs }}</view>
        <view>{{ item.time }}</view>
      </view>
      <view class="c_right">
        <view>{{ item.changeType == 1 ? '+' : '-' }}{{ item.money }}</view>
        <view>余额：{{ item.currentBalance }}</view>
      </view>
    </view>
    <empty v-if="list.length == 0" />
  </view>
</template>

<script>
import { getCustAccountApi, getCommissionApi, getPurseApi } from '@/api/purse'
export default {
  data() {
    return {
      tabsList: [
        {
          value: 1,
          name: '进账记录'
        },
        {
          value: 2,
          name: '出账记录'
        }
      ],
      list: [],
      todayCommission: '',
      totalCommission: '',
      amount: ''
    }
  },
  onShow() {
    this.getCustAccount()
    this.getCommission()
    this.getPurse()
  },
  methods: {
    /** 切换tabs */
    tabSwitch({ value }) {
      this.getCustAccount(value)
    },
    /** 立即提现 */
    goWithdraw() {
      uni.navigateTo({
        url: '/pages/mine/withdrawal'
      })
    },
    /**用户收支记录 */
    getCustAccount(value) {
      let params = {
        type: 1,
        userId: uni.getStorageSync('userInfo').userUid,
        changeType: value
      }
      getCustAccountApi(params).then((res) => {
        console.log(res)
        this.list = res.data
      })
    },
    /** 查询用户佣金 */
    getCommission() {
      getCommissionApi().then((res) => {
        this.todayCommission = res.data.todayCommission
        this.totalCommission = res.data.totalCommission
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
.p_top {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #458df7;
  box-sizing: border-box;
  .t_title {
    font-weight: 400;
    font-size: 28rpx;
    color: #ffffff;
    margin: 24rpx 0;
  }
  .t_amount {
    font-family: OPPOSans, OPPOSans;
    font-weight: bold;
    font-size: 64rpx;
    color: #ffffff;
  }
  .t_bottom {
    margin-top: 30rpx;
    margin-bottom: 16rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    .left,
    .right {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 24rpx;
      color: #ffffff;
    }
    .btn {
      width: 168rpx;
      height: 68rpx;
      line-height: 68rpx;
      background-color: #fff;
      border-radius: 34rpx;
      font-family: D-DIN Exp, D-DIN Exp;
      font-weight: 400;
      font-size: 24rpx;
      color: #458df7;
      text-align: center;
    }
  }
}
.t_tabs {
  background-color: #458df7;
}
.p_card {
  background-color: #fff;
  border-radius: 12rpx;
  margin: 16rpx;
  padding: 24rpx;
  display: flex;
  justify-content: space-between;
  .c_left {
    & view:first-child {
      font-weight: bold;
      margin-bottom: 12rpx;
    }
  }
  .c_right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    & view:first-child {
      font-weight: bold;
      margin-bottom: 12rpx;
    }
  }
}
</style>
<style>
page {
  background-color: #f5f5f5;
}
</style>
