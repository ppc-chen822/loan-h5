<template>
  <view class="team_page">
    <view
      class="box"
      v-for="(item, index) in list"
      :key="index"
      @click="goOrder(item)"
    >
      <view>{{ item.nickname }}</view>
      <view>{{ item.phone || '--' }}</view>
    </view>
    <empty v-if="list.length == 0" />
  </view>
</template>

<script>
import { getTeamsApi } from '@/api/mine.js'
export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.getTeams()
  },
  methods: {
    /** 去订单 */
    goOrder({ userUid }) {
      console.log(userUid)
      uni.navigateTo({
        url: `/pages/order/order?userId=${userUid}`
      })
    },
    /** 获取团队列表 */
    getTeams() {
      const userId = uni.getStorageSync('userInfo').userUid
      getTeamsApi(userId)
        .then((res) => {
          console.log(res)
          this.list = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.team_page {
  padding: 32rpx 24rpx;
}
.box {
  background-color: #ffff;
  border-radius: 16rpx;
  padding: 48rpx 24rpx;
  margin-bottom: 24rpx;
  display: flex;
  justify-content: space-between;
  font-size: 28rpx;
  color: #333333;
  align-items: center;
}
</style>
<style>
page {
  background-color: #f5f5f5;
}
</style>
