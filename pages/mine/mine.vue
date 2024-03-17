<template>
  <view class="mine_page">
    <view class="mine_top">
      <view class="t_left">
        <uv-image
          width="150rpx"
          height="150rpx"
          :src="avater"
          radius="10rpx"
        ></uv-image>
        <view class="info">
          <view class="i_name">{{ userInfo.nickname || '--' }}</view>
          <view class="id_name">ID:{{ userInfo.userUid || '--' }}</view>
        </view>
      </view>
      <view class="t_right" @click="shareTeam">
        <!-- <uv-icon name="scan" size="40rpx"></uv-icon> -->
        <uv-icon name="arrow-right" size="40rpx"></uv-icon>
      </view>
    </view>
    <view class="module">
      <uv-cell-group>
        <uv-cell
          v-for="(item, index) in menuList"
          :key="index"
          isLink
          :title="item.name"
          @click="goPage(item)"
        >
          <!-- 自定义左侧图标 -->
          <template v-slot:icon>
            <uv-icon size="50rpx" :name="item.icon" color=""></uv-icon>
          </template>
        </uv-cell>
      </uv-cell-group>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: uni.getStorageSync('userInfo'),
      avater: require('@/static/avater.png'),
      menuList: []
    }
  },
	mounted() {
		this.init()
	},
  methods: {
		/** 初始化 */
		init(){
			const userInfo = uni.getStorageSync('userInfo')
			this.menuList =[
				{
				  icon: 'red-packet',
				  name: '我的钱包',
				  border: true,
				  navigate: '/pages/mine/purse'
				},
				{
				  icon: 'file-text',
				  name: '订单管理',
				  border: true,
				  navigate: `/pages/order/order?userId=${userInfo.userUid}`
				},
				{
				  icon: 'server-man',
				  name: '我的团队',
				  border: true,
				  navigate: '/pages/mine/team'
				},
				{
				  icon: 'share',
				  name: '分享团队',
				  border: true,
				  navigate: '/pages/mine/shareTeam'
				}
			]
		},
    /** 跳转界面 */
    goPage({ navigate }) {
      uni.navigateTo({ url: navigate })
    },
    shareTeam() {
      uni.navigateTo({ url: '/pages/mine/shareTeam' })
    }
  }
}
</script>

<style lang="scss" scoped>
.mine_top {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32rpx 24rpx;
  .t_left {
    display: flex;
    align-items: center;
    .info {
      margin-left: 20rpx;
      .i_name {
        font-size: 32rpx;
        font-weight: 600;
      }
      .id_name {
        font-size: 24rpx;
        color: #999;
      }
    }
  }
  .t_right {
    display: flex;
    align-items: center;
  }
}
.module {
  margin-top: 24rpx;
  background-color: #fff;
}
</style>
<style>
page {
  background-color: #f5f5f5;
}
</style>
