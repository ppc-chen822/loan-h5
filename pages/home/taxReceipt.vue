<template>
  <view class="apply" id="bill">
    <view class="ap_top">
      <view class="bg_logo">
        <uv-image :src="iconA" width="188rpx" height="204rpx"></uv-image>
      </view>
      <view class="logo">
        <uv-image :src="iconB" width="304rpx" height="64rpx"></uv-image>
      </view>
      <view class="step">
        <view>
          <view class="circle">1</view>
          <view class="text">企业信息</view>
        </view>
        <view class="line"></view>
        <view>
          <view class="circle">2</view>
          <view class="text">数据采集</view>
        </view>
        <view class="line"></view>
        <view>
          <view class="circle">3</view>
          <view class="text">查看报告</view>
        </view>
      </view>
    </view>
    <view class="apply_form">
      <view class="qr_code">
        <uv-qrcode
          size="452rpx"
          ref="qrcode"
          :value="QrUrl"
          :options="options2"
        ></uv-qrcode>
      </view>
      <view class="btns">
        <view class="" @click="shareNow">立即分享</view>
        <uv-line
          direction="col"
          length="50%"
          color="#fff"
          :hairline="false"
        ></uv-line>
        <view class="" @click="copyUrl">复制连接</view>
      </view>
    </view>
    <view class="bottom_text" @click="goNext">
      <view>
        <view class="text">税局维护查询</view>
        <uv-image :src="iconC" width="108rpx" height="84rpx"></uv-image>
      </view>
    </view>
    <uv-popup ref="popup" mode="center" closeable round="24rpx">
      <view class="image">
        <uv-image
          :src="canvasImageUrl"
          width="600rpx"
          height="800rpx"
        ></uv-image>
      </view>
    </uv-popup>
  </view>
</template>

<script>
import html2canvas from 'html2canvas'
export default {
  data() {
    return {
      canvasImageUrl: '',
      loading: false,
      compop: false,
      list: [],
      userId: '',
      isActive: false,
      iconA: require('@/static/code-bglogo.aa9fa0e.png'),
      iconB: require('@/static/logo.87d0aa1.png'),
      iconC: require('@/static/t1.png'),
      mode: '',
      QrUrl: '',
      title: ''
    }
  },
  mounted() {
    const userId = uni.getStorageSync('userInfo').userUid
    console.log(userId)
    this.QrUrl = `http://tax.huokexinxi.com/#/pages/accredit/accredit?userId=${userId}`
  },
  computed: {
    options2() {
      return {
        data: this.QrUrl,
        useDynamicSize: false,
        errorCorrectLevel: 'Q',
        areaColor: '#Fff',
        backgroundColor: '#fff'
        // 指定二维码前景，一般可在中间放logo
      }
    }
  },
  methods: {
    shareNow() {
      this.htmlToCanvas()
    },
    htmlToCanvas() {
      uni.showLoading({
        title: '加载中..'
      })
      const shareContent = document.getElementById('bill')
      html2canvas(shareContent, {
        useCORS: true // 解决图片跨域问题
      })
        .then((canvas) => {
          // 将canvas转成base64图片格式
          uni.hideLoading()
          let imageUrl = canvas.toDataURL('image/png')
          this.canvasImageUrl = imageUrl
          console.log(imageUrl)
          this.$refs.popup.open()
        })
        .catch((e) => console.log(e))
    },
    /** 复制链接 */
    copyUrl() {
      uni.setClipboardData({
        data: this.QrUrl,
        success: function () {
          console.log('success')
        }
      })
    },
    /** 跳转税局 */
    goNext() {
      window.location.href =
        'https://bank-marking-sale.daqiangui.com/loan/taxStatus'
    }
  }
}
</script>

<style lang="scss" scoped>
.apply {
}
.com_pop {
  position: absolute;
  top: 218rpx;
  right: 24rpx;
  background-color: #fff;
  width: 600rpx;
  max-height: 600rpx;
  overflow-y: auto;
  box-shadow: 0rpx 0rpx 6rpx 1rpx rgba(0, 0, 0, 0.4);
  border-radius: 20rpx;
  font-size: 28rpx;
  padding: 12rpx 20rpx;
  .item {
    margin-bottom: 20rpx;
  }
  .text_title {
    color: #2386ee;
    font-size: 30rpx;
  }
  .text_num {
    margin-top: 12rpx;
    color: #999;
  }
}
.bottom_text {
  margin: 24rpx auto;
  width: 690rpx;
  height: 180rpx;
  background: #ffffff;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  padding: 16rpx;
  .text {
    margin-right: 94rpx;
  }
  & > view {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 658rpx;
    height: 148rpx;
    background: #ffeadc;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    font-family: PingFang SC, PingFang SC;
    font-weight: 400;
    font-size: 32rpx;
    color: #e0842f;
    line-height: 36rpx;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
}

.btn_active {
  background: #2b8bf2 !important;
}

.btn {
  height: 11.73333vw;
  margin-top: 8vw;
  line-height: 11.73333vw;
  font-size: 4vw;
  background: linear-gradient(45deg, #2485ee, #469fff);
  // background: #2b8bf2 !important;
  border-radius: 5.86667vw;
  // opacity: 0.4;
  color: #fff;
  display: flex;
  justify-content: center;
  margin: 0 32rpx;
  margin-top: 32rpx;
}

.ap_top {
  height: 78.13333vw;
  background: linear-gradient(180deg, #2586ee, hsla(0, 0%, 100%, 0));

  .bg_logo {
    position: absolute;
    z-index: 0;
    width: 25.06667vw;
    top: 6.4vw;
    right: 6.93333vw;
  }

  .logo {
    width: 40.53333vw;
    padding-top: 8.8vw;
    margin-left: 6.93333vw;
  }

  .step {
    display: flex;
    align-items: center;
    margin: 0 6.93333vw;
    position: relative;
    z-index: 2;
    color: #fff;
    padding-top: 6.4vw;
    margin-bottom: 6.4vw;

    .line {
      margin-right: 1.06667vw;
      height: 2.13333vw;
      width: 46rpx;
      display: block;
      margin: 0 5rpx;
      margin-bottom: 10rpx;
      border-bottom: 1px dotted #fff;
    }

    & > view {
      display: flex;
      align-items: center;

      .circle {
        margin-top: 0;
        width: 4.26667vw;
        border-radius: 100px;
        color: #2386ee;
        display: block;
        margin-right: 1.6vw;
        text-align: center;
        line-height: 4.8vw;
        height: 4.26667vw;
        background: #fff;
        font-size: 2.66667vw;
        font-weight: 600;
      }

      .text {
      }
    }
  }
}

.apply_form {
  width: 690rpx;
  height: 780rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin: 0 32rpx;
  margin-top: -330rpx;
  border-radius: 2.66667vw;
  overflow: hidden;
  .qr_code {
    width: 452rpx;
    height: 452rpx;
  }
  .btns {
    margin-top: 72rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fff;
    line-height: 80rpx;
    width: 572rpx;
    height: 80rpx;
    background: linear-gradient(89deg, #ff7a3f 0%, #ff9f3d 100%);
    border-radius: 44rpx 44rpx 44rpx 44rpx;
  }
}

/deep/ .uv-form-item {
  padding: 12rpx 0;

  .uv-form-item__body__left {
    span {
      display: inline-block;
      text-align: justify;
      text-align-last: justify;
    }
  }
}
</style>
<style>
page {
  background-color: #f5f5f5;
}
</style>
