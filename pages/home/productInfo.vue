<template>
  <view class="info_pages">
    <view class="info_top">
      <view class="i_top">
        <view> 最高 </view>
        <view>{{ maxLoanAmount }}万</view>
      </view>
      <view class="i_bottom">
        <view>
          <view class="title"> 年化利率</view>
          <view class="value">{{ yearRate || '--' }}</view>
        </view>
        <view>
          <view class="title"> 还款方式</view>
          <view class="value">{{ repaymentMethod }}</view>
        </view>
        <view>
          <view class="title"> 还款期数</view>
          <view class="value">{{ loanLimitList }}期</view>
        </view>
      </view>
    </view>
    <template>
      <uv-vtabs
        :chain="chain"
        :list="list"
        :height="height"
        hdHeight="100rpx"
        @change="change"
      >
        <template v-for="(item, index) in list">
          <uv-vtabs-item :key="index">
            <view
              class="item"
              v-for="(item2, index2) in item.childrens"
              :key="index2"
            >
              <view class="item_title">
                <view class="line"></view>
                <view class="text">{{ item2.name }}</view>
              </view>
              <view
                class="item_content"
                :style="
                  index + 1 === list.length ? 'padding-bottom: 100rpx' : ''
                "
              >
                <view class="text" v-if="areaArr.length > 0 && index === 0"
                  >{{ areaArr[0].name || '--' }}...</view
                >
                <view v-else class="text">{{ item2.desc || '--' }}</view>
                <view class="btn_area" v-if="index == 0" @click="allArea">
                  全部区域>></view
                >
              </view>
            </view>
          </uv-vtabs-item>
        </template>
      </uv-vtabs>
    </template>

    <view class="product_code" @click="qrCode">产品推荐码</view>
    <uv-popup ref="popup" mode="center" closeable round="24rpx">
      <view class="area">
        <view class="title">可做区域</view>
        <view class="p_city" v-for="(item, index) in areaArr" :key="index">
          <view class="p_name">{{ item.name }}</view>
          <view class="p_child">
            <template v-for="(item1, index1) in item.children">
              <view class="c_city" :key="index1">
                {{ item1.name }}
              </view>
            </template>
          </view>
        </view>
      </view>
    </uv-popup>
    <uv-popup
      ref="imagePopup"
      mode="center"
      :safeAreaInsetBottom="false"
      closeable
      round="24rpx"
    >
      <view class="image">
        <uv-image :src="qrcode" width="600rpx" height="800rpx"></uv-image>
      </view>
    </uv-popup>
  </view>
</template>

<script>
import { getProductInfoApi } from '@/api/home.js'
export default {
  data() {
    return {
      location: '',
      list: [],
      areaArr: [],
      maxLoanAmount: '',
      yearRate: '',
      loanLimitList: '',
      repaymentMethod: '',
      qrcode: '',
      chain: true
    }
  },
  computed: {
    height() {
      return uni.getSystemInfoSync().windowHeight - uni.upx2px(100)
    }
  },
  onLoad(options) {
    this.getProductInfo(options.id)
    uni.setNavigationBarTitle({
      title: `${options.name}`
    })
  },
  onReady() {},
  mounted() {},
  methods: {
    qrCode() {
      this.$refs.imagePopup.open()
    },
    /** 选择区域 */
    allArea() {
      this.$refs.popup.open()
    },
    processArray(data) {
      let result = []

      for (let i = 0; i < data.length; i++) {
        let province = data[i][0]
        let city = data[i][1]

        // 检查省份是否已存在于结果中
        let provinceIndex = result.findIndex((item) => item.name === province)
        if (provinceIndex === -1) {
          // 如果省份不存在，则添加
          result.push({ name: province, children: [] })
          provinceIndex = result.length - 1
        }

        // 将城市添加到对应的省份中
        result[provinceIndex].children.push({ name: city })
      }

      return result
    },
    /** 获取产品数据 */
    getProductInfo(id) {
      const userId = uni.getStorageSync('userInfo').userUid
      getProductInfoApi(id, userId)
        .then((res) => {
          this.list = res.data.data
          this.maxLoanAmount = res.data.maxLoanAmount
          this.loanLimitList = res.data.loanLimitList
          this.repaymentMethod = res.data.repaymentMethod
          this.qrcode = res.data.qrCode
          this.yearRate = res.data.yearRate
          if (res.data.data.length > 0) {
            const areaArr = JSON.parse(res.data.data[0].childrens[0].desc)
            this.areaArr = this.processArray(areaArr)
            console.log(this.areaArr)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    change(index) {
      console.log('选项改变：', index)
    }
  }
}
</script>
<style scoped lang="scss">
.info_pages {
  position: relative;
}
.info_top {
  margin-top: 32rpx;
  background-color: #fff;
}
.i_top {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & view:first-child {
    font-size: 36rpx;
    font-weight: bold;
  }
  & view:last-child {
    font-size: 48rpx;
    font-weight: bold;
    color: #d71c1c;
  }
}
.i_bottom {
  display: flex;
  justify-content: space-around;
  margin: 32rpx 0;
  .value {
    margin-top: 12rpx;
    text-align: center;
    color: #5fb9e0;
  }
}
.item {
  padding: 24rpx;
}
.item_title {
  display: flex;
  align-items: center;
  .line {
    width: 10rpx;
    height: 40rpx;
    border-radius: 5rpx;
    background-color: #d71c1c;
    margin-right: 24rpx;
  }
}
.item_content {
  margin-top: 24rpx;
  .text {
    word-break: break-all;
  }
}
.btn_area {
  margin-top: 12rpx;
  width: 200rpx;
  line-height: 50rpx;
  text-align: center;
  font-size: 28rpx;
  border-radius: 12rpx;
  color: #d71c1c;
  border: 1rpx solid #d71c1c;
}
.area {
  width: 650rpx;
  max-height: 700rpx;
  overflow-y: auto;
  padding: 32rpx;
  .title {
    font-size: 36rpx;
    font-weight: 600;
    text-align: center;
  }
  .p_name {
    padding: 20rpx 0;
    border-bottom: 1rpx solid #e9e9e9;
    color: #000;
    font-weight: bold;
  }
  .p_child {
    display: flex;
    flex-wrap: wrap;
  }
  .c_city {
    padding: 20rpx 12rpx;
    font-size: 30rpx;
    color: #000;
  }
}
.product_code {
  position: fixed;
  bottom: 12rpx;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 40rpx;
  color: #fff;
  font-size: 36rpx;
  text-align: center;
  line-height: 80rpx;
  width: 700rpx;
  height: 80rpx;
  background-color: #1777ff;
}
</style>
