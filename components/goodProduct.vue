<template>
  <view class="good_product">
    <!-- <view class="tab">
      <view
        class="tab_btn"
        :class="index == curNow ? 'active' : ''"
        v-for="(item, index) in tabsList"
        :key="index"
        @click="sectionChange(index)"
        >{{ item.name }}</view
      >
    </view> -->
    <view class="card_list">
      <view class="card_item" v-for="(item, index) in list" :key="index">
        <view class="top">
          <view class="right">
            <u-image :src="item.logo" width="56rpx" height="56rpx"></u-image>
            <view>{{ item.name }}</view>
          </view>
          <!-- <view class="left" @click="goDetail(item)">立即申请</view> -->
          <view class="left" @click="goDetail(item)">
            <u-icon name="arrow-right" top="8" color="#222" bold></u-icon>
          </view>
        </view>
        <view class="mid">
          <view>
            <view class="num"
              >{{ item.maxLoanAmount || '--' }}<text>万</text></view
            >
            <view class="label">最高额度</view>
          </view>
          <view>
            <view class="num">{{ item.yearRate || '--' }}<text>起</text></view>
            <view class="label">年华利率</view>
          </view>
          <view>
            <view class="num"
              >{{ item.loanLimitList || '--' }}<text>个月</text></view
            >
            <view class="label">贷款期限</view>
          </view>
        </view>
        <view class="bom" v-if="false">
          <u-collapse
            @change="change"
            @close="close"
            @open="open"
            :accordion="true"
            :border="false"
          >
            <u-collapse-item title="准入规则">
              <text class="collapse_content"
                >涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川</text
              >
            </u-collapse-item>
          </u-collapse>
        </view>
      </view>
    </view>
    <empty v-if="list.length == 0" text="暂无数据" iconSize="70" mode="data" />
  </view>
</template>

<script>
import { getProductApi } from '@/api/common.js'
export default {
  data() {
    return {
      titleIcon: require('@/static/a2.png'),
      curNow: 0,
      tabsList: [{ name: '符合' }, { name: '不符合' }, { name: '未判断' }],
      list: []
    }
  },
  onLoad(options) {
    console.log(options.deviceId)
  },
  mounted() {
    this.getProduct()
  },
  methods: {
    // 详情
    goDetail({ id, name, mode }) {
      uni.navigateTo({
        url: `/pages/apply/apply?id=${id}&name=${name}&mode=${mode}`
      })
    },
    sectionChange(index) {
      console.log(index)
      this.curNow = index
    },
    // 查询产品
    getProduct() {
      uni.showLoading({
        title: '加载中'
      })
      let deviceId = uni.getStorageSync('deviceId')
      getProductApi(deviceId)
        .then((res) => {
          console.log(res)
          this.list = res
          uni.hideLoading({})
        })
        .then((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.good_product {
  background-color: #f8f8f8;
}
.active {
  background-color: #2386ee !important;
  color: #fff;
}
.tab {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100rpx;
  background-color: #fff;
  .tab_btn {
    width: 210rpx;
    height: 72rpx;
    text-align: center;
    line-height: 72rpx;
    font-size: 28rpx;
    background-color: #f4f5f7;
    border-radius: 10rpx;
  }
}
.card_list {
  padding: 24rpx 32rpx;
  .card_item {
    background-color: #fff;
    margin-bottom: 24rpx;
    border-radius: 10rpx;
    padding: 32rpx 32rpx 32rpx 32rpx;
  }
}
.top {
  display: flex;
  justify-content: space-between;
  align-content: center;
  .right {
    display: flex;
    align-items: center;
    & view:last-child {
      font-size: 30rpx;
      color: #333;
      font-weight: 700;
      margin-left: 20rpx;
    }
  }
  .left {
    // width: 168rpx;
    // height: 60rpx;
    // color: #2485ee;
    // line-height: 60rpx;
    // text-align: center;
    // font-size: 26rpx;
    // border-radius: 50rpx;
    // border: 1rpx solid #2485ee;
  }
}
.mid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32rpx;
  & > view {
    // text-align: center;
    .num {
      font-size: 40rpx;
      font-size: 700;
      color: #e49043;
      text {
        font-size: 28rpx;
      }
    }
    .label {
      margin-top: 8rpx;
      font-size: 20rpx;
      color: #9999;
    }
  }
  & > view:first-child {
    flex: 0.8;
  }
  & > :nth-child(2) {
    flex: 1;
  }
  & > view:last-child {
    flex: 0.8;
  }
}
.bom {
  // padding: 24rpx 0;
  margin-top: 12rpx;
  border-top: 1rpx solid #f2f2f2;
}

/deep/.u-cell__body {
  padding: 24rpx 0 !important;
}
/deep/ .u-cell__title-text {
  font-size: 26rpx;
  color: #999;
}
.collapse_content {
  background-color: #f8f8f8;
  padding: 16rpx 24rpx;
  box-sizing: border-box;
  font-size: 24rpx;
  color: #333;
  margin-bottom: 32rpx;
  border-radius: 10rpx;
}
/deep/ .u-collapse-item__content__text {
  padding: 0;
}
// /deep/ .u-collapse-item__content {
//   padding-bottom: 32rpx;
//   box-sizing: border-box;
// }
</style>
