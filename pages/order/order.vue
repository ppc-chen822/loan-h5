<template>
  <view class="order">
    <uv-sticky bgColor="#fff">
      <view class="top">
        <uv-search
          searchIcon="search"
          placeholder="请输入搜索内容"
          v-model="company"
          @search="getProList"
          @clear="getProList"
        ></uv-search>
        <uv-tabs :list="tabsList" :scrollable="false" @click="tabSwitch" />
      </view>
    </uv-sticky>
    <view class="order_card">
      <view
        class="card_item"
        v-for="(item, index) in list"
        :key="index"
        @click="goDetail(item)"
      >
        <view class="c_top">
          <uv-image
            src="https://cdn.uviewui.com/uview/album/1.jpg"
            width="48rpx"
            height="48rpx"
          ></uv-image>
          <view class="c_title">{{ item.productName || '--' }}</view>
        </view>
        <view class="c_mid">
          <view class="m_left">
            <view>{{ item.companyName || '--' }}</view>
            <view>申请时间：{{ item.updateTime || '--' }}</view>
          </view>
          <view class="m_right">
            <view class="tips" :style="{ color: color(item.status).color }">{{
              color(item.status).text
            }}</view>
            <uv-icon name="arrow-right" color="#999999" top="2rpx" size="10" />
          </view>
        </view>
      </view>
    </view>
    <empty v-if="list.length == 0" text="暂无数据" iconSize="70" mode="data" />
  </view>
</template>

<script>
import { getProListApi } from '@/api/common.js'
export default {
  data() {
    return {
      tabsList: [
        {
          name: '申请中'
        },
        {
          name: '已拒绝'
        },
        {
          name: '待提款'
        },
        {
          name: '已放款'
        }
      ],
      company: '',
      type: 1,
      list: []
    }
  },
  mounted() {
    this.getProList()
  },
  methods: {
    /** 状态颜色 */
    color(status) {
      switch (status) {
        case 1:
          return {
            color: '#999999',
            text: '申请中'
          }
        case 4:
          return {
            color: '#37D65C',
            text: '授信通过'
          }
        case 3:
          return {
            color: '#D63737',
            text: '审批拒绝'
          }
        case 5:
          return {
            color: '#11BBE8',
            text: '放款成功'
          }
        default:
          break
      }
    },
    /** 详情 */
    goDetail({ id, status }) {
      if (status != 0) {
        uni.navigateTo({
          url: '/pages/order/orderDetail?id=' + id
        })
      }
    },
    /** 切换tab */
    tabSwitch({ index }) {
      switch (index) {
        case 0:
          this.type = 1
          break
        case 1:
          this.type = 3
          break
        case 2:
          this.type = 4
          break
        case 3:
          this.type = 5
          break
        default:
          break
      }
      this.getProList()
    },
    /**查询订单列表 */
    getProList() {
      const { type, company } = this
      getProListApi(type, company)
        .then((res) => {
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
.top {
  padding: 32rpx 28rpx 0 28rpx;
}
.order_card {
  padding: 20rpx 32rpx;
}
.card_item {
  background-color: #fff;
  padding: 24rpx;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  .c_top {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e9e9e9;
    padding-bottom: 20rpx;
    .c_title {
      font-size: 28rpx;
      font-weight: 400;
      color: #333333;
      margin-left: 20rpx;
    }
  }
  .c_mid {
    margin-top: 24rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .m_left {
      view {
        font-size: 24rpx;
        font-weight: 400;
        color: #666666;
      }
      & view:first-child {
        margin-bottom: 12rpx;
      }
    }
    .m_right {
      display: flex;
      align-items: center;
      font-size: 24rpx;
      font-weight: 400;
      color: #999;
      .tips {
        margin-right: 5rpx;
      }
    }
  }
}
</style>
<style>
page {
  background-color: #f4f4f4;
}
</style>
