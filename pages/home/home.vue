<template>
  <view class="home_content">
    <view class="h_banner">
      <uv-swiper
        :list="list"
        keyName="image"
        height="460rpx"
        radius="0"
      ></uv-swiper>
      <view class="top_btn" @click="goTax"> 授权数据码 </view>
    </view>
    <view class="h_tab">
      <uv-tabs
        :list="tabsList"
        :scrollable="false"
        lineWidth="30"
        @click="tabChange"
      />
    </view>
    <view class="h_box">
      <view class="card_list">
        <view class="card_item" v-for="(item, index) in dataList" :key="index">
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
              <view class="num"
                >{{ item.yearRate || '--' }}<text>起</text></view
              >
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
    </view>
    <bindMobile
      ref="bindMobile"
      :myCommunicationNumber="myCommunicationNumber"
    />
    <empty v-if="dataList.length == 0" />
  </view>
</template>

<script>
import { getProductApi, userInfoApi } from '@/api/home.js'
import bindMobile from './bindMobile.vue'
export default {
  components: {
    bindMobile
  },
  data() {
    return {
      myCommunicationNumber: '',
      dataList: [],
      list: [
        {
          image: require('@/static/home_banner.png')
        }
      ],
      tabsList: [
        {
          value: 1,
          name: '金税贷'
        },
        {
          value: 2,
          name: '发票贷'
        },
        {
          value: 3,
          name: '中标贷'
        }
      ]
    }
  },
  onLoad(options) {
    if (options.myCommunicationNumber) {
      this.myCommunicationNumber = options.myCommunicationNumber
    }
    this.checkWeChatCode()
    this.getProduct(1)
  },
  methods: {
    /** 微信授权获取code */
    getWeChatCode() {
      const local = encodeURIComponent(
        'http://tax.huokexinxi.com/#/pages/home/home'
      )
      const appid = 'wx1bba4883b383a0b2'
      //通过微信官方接口获取code之后，会重新刷新设置的回调地址【redirect_uri】
      window.location.href =
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
        appid +
        '&redirect_uri=' +
        local +
        '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
    },
    /**提取code [方法] */
    getUrlCode(name) {
      return (
        decodeURIComponent(
          (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(
            location.href
          ) || [, ''])[1].replace(/\+/g, '%20')
        ) || null
      )
    },
    /** 检查浏览器地址栏中微信接口返回的code */
    checkWeChatCode() {
      const code = this.getUrlCode('code')
      console.log(code)
      if (code) {
        this.getUserInfo(code)
      } else {
        this.getWeChatCode()
      }
    },
    /** 登录 */
    getUserInfo(code) {
      userInfoApi({ code }).then((res) => {
        if (res.data.status == 2) {
          this.$refs.bindMobile.open()
          this.$refs.bindMobile.formData.openId = res.data.data.openId
        }
        if (res.data.status == 1) {
          console.log(res.data.data)
          uni.setStorageSync('userInfo', res.data.data)
        }
      })
    },

    /** 税票采集 */
    goTax() {
      uni.navigateTo({
        url: '/pages/home/taxReceipt'
      })
    },
    /** 切换tab */
    tabChange({ value }) {
      this.getProduct(value)
    },
    /** 查询产品 */
    getProduct(value) {
      getProductApi(value)
        .then((res) => {
          console.log(res)
          this.dataList = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.h_banner {
  position: relative;
  .top_btn {
    position: absolute;
    bottom: 76rpx;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    line-height: 68rpx;
    font-size: 28rpx;
    width: 230rpx;
    height: 68rpx;
    background: #ffffff;
    border-radius: 34rpx 34rpx 34rpx 34rpx;
    color: #2b51fa;
    font-weight: 600;
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
.h_tab {
  background-color: #fff;
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
</style>
<style>
page {
  background-color: #f5f5f5;
}
</style>
