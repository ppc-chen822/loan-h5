<template>
  <view class="share_team" id="bill">
    <view class="top_bg"></view>
    <view class="box" ref="bill">
      <uv-image
        width="150rpx"
        height="150rpx"
        :src="avater"
        radius="10rpx"
      ></uv-image>
      <view class="i_name">{{ userInfo.nickname || '--' }}</view>
      <view class="id_name">ID:{{ userInfo.userUid || '--' }}</view>
      <view>邀请码：{{ userInfo.userUid || '--' }}</view>
      <view class="qr_code">
        <uv-qrcode
          size="452rpx"
          ref="qrcode"
          :value="QrUrl"
          :options="options2"
        ></uv-qrcode>
      </view>
    </view>
    <bottomTool @click="shareNow" title="立即分享" />
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
      userInfo: uni.getStorageInfoSync('userInfo').data,
      avater: require('@/static/avater.png'),
      QrUrl: ''
    }
  },
  mounted() {
    const myCommunicationNumber =
      uni.getStorageSync('userInfo').myCommunicationNumber
    this.QrUrl = `http://tax.huokexinxi.com/#/pages/home/home?reCommunicationNumber=${myCommunicationNumber}`
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
    }
  }
}
</script>

<style lang="scss" scoped>
.top_bg {
  width: 100%;
  height: 500rpx;
  background-color: #007ef7;
  border-radius: 0 0 50% 50%;
}
.box {
  margin-top: -380rpx !important;
  width: 650rpx;
  padding: 64rpx 32rpx 64rpx 32rpx;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 24rpx;
  font-size: 32rpx;
  .i_name {
    margin-top: 24rpx;
  }
  .i_name,
  .id_name {
    margin-bottom: 24rpx;
  }
  .qr_code {
    margin-top: 24rpx;
  }
}
</style>
<style>
page {
  background-color: #f5f5f5;
}
</style>
