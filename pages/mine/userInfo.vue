<template>
  <view class="bigbox">
    <view class="contentBox">
      <view class="module1">
        <u-cell-group :border="false">
          <u-cell
            :border="true"
            title="头像"
            :titleStyle="titleStyle"
            :isLink="true"
            @click="editAvatar"
          >
            <u-image
              slot="right-icon"
              shape="circle"
              width="60rpx"
              height="60rpx"
            ></u-image>
          </u-cell>
        </u-cell-group>
        <view v-if="userInfo.acctType == 10">
          <u-cell-group :border="false">
            <u-cell :border="true" title="用户姓名" :titleStyle="titleStyle">
              <view slot="value" class="info-value">{{
                userInfo.userName
              }}</view>
            </u-cell>
            <u-cell :border="false" title="性别" :titleStyle="titleStyle">
              <view slot="value" class="info-value">{{
                userInfo.userSex == 1 ? '男' : '女'
              }}</view>
            </u-cell>
          </u-cell-group>
        </view>
        <view v-if="userInfo.acctType == 20">
          <u-cell-group :border="false">
            <u-cell :border="true" title="公司名称" :titleStyle="titleStyle">
              <view slot="value" class="info-value">{{
                userInfo.corpName
              }}</view>
            </u-cell>
            <u-cell :border="false" title="联系人" :titleStyle="titleStyle">
              <view slot="value" class="info-value">{{
                userInfo.legalName
              }}</view>
            </u-cell>
          </u-cell-group>
        </view>
      </view>
      <view class="module2">
        <u-cell-group :border="false">
          <!-- <u-cell
            v-if="userInfo.acctType == 10"
            :border="true"
            title="实名认证"
            :isLink="true"
            :titleStyle="titleStyle"
            :value="userInfo.legalName"
          /> -->
          <u-cell
            v-for="item in navList"
            :key="item.name"
            :value="item.value"
            :title="item.name"
            :border="item.border"
            :isLink="true"
            :titleStyle="titleStyle"
            :name="item.navigate"
            @click="clickCell(item)"
          >
          </u-cell>
        </u-cell-group>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      titleStyle: {
        fontSize: '28rpx',
        fontWeight: 'bold',
        lineHeight: '70rpx',
        color: '#222',
        fontFamily: 'PingFang SC'
      },
      navList: [
        {
          name: '昵称',
          border: true,
          value: '着急的缘分'
        },
        {
          name: '联系方式',
          border: true,
          navigate: '/pagesMy/setting/phone'
        },
        {
          name: '地址信息',
          border: true,
          navigate: '/pagesMy/address/myAddress'
        },
        {
          name: '修改密码',
          border: false,
          navigate: '/pagesMy/modifyPwd'
        }
      ]
    }
  }
}
</script>

<style>
page {
  background: #f5f5f5;
}
</style>
<style lang="scss" scoped>
.contentBox {
  border-radius: 10rpx;
  padding: 28rpx 32rpx;
}

.module1,
.module2 {
  background: #fff;
  border-radius: 20rpx;
  padding: 0rpx 28rpx;
}

.info-value {
  font-size: 32rpx;
}

.module2 {
  margin-top: 32rpx;
}
</style>
