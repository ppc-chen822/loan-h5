<template>
  <view class="report_content">
    <!-- <u-sticky :bgColor="curTab == 1 ? '#2c5fdf' : '#fff'" v-if="isBoss">
      <view class="con_tabs">
        <u-tabs
          :list="tabsList"
          @click="tabClick"
          lineWidth="30"
          lineHeight="4"
          :inactive-style="
            curTab == 1
              ? { color: '#93B8FF', fontWeight: 'bold' }
              : { color: '#222', fontWeight: 'bold' }
          "
          :activeStyle="
            curTab == 1
              ? { color: '#fff', fontWeight: 'bold' }
              : { color: '#2c5fdf', fontWeight: 'bold' }
          "
          :lineColor="curTab == 1 ? '#fff' : '#2c5fdf'"
          :scrollable="false"
        />
      </view>
    </u-sticky> -->
    <!-- <firmInfo
      v-if="curTab == 1 && Object.values(firmContent).length !== 0"
      :dataObj="firmContent"
    /> -->
    <!-- <market
      v-if="curTab == 2 && Object.values(marketContent).length !== 0"
      :dataObj="marketContent"
    /> -->
    <product :deviceId="deviceId" />
    <!-- <product v-if="curTab == 3" :deviceId="deviceId" /> -->
  </view>
</template>

<script>
import { getAuthorizeUrlApi, getFirmDataApi } from '@/api/common.js'
import firmInfo from '../firmInfo.vue'
import market from '../market.vue'
import product from '../product.vue'
export default {
  components: {
    firmInfo,
    product,
    market
  },
  onLoad(options) {
    if (options) {
      this.deviceId = options.deviceId
      uni.setStorageSync('deviceId', options.deviceId)
      if (options.userId) {
        this.getAuthorizeUrl(options.userId)
      } else {
        this.getFirmData(options.deviceId)
        // this.curTab = 3
        // this.tabsList = [
        //   {
        //     name: '准入产品',
        //     key: 3
        //   },
        //   {
        //     name: '企业信息',
        //     key: 1
        //   },
        //   {
        //     name: '营销数据',
        //     key: 2
        //   }
        // ]
      }
    }
  },
  data() {
    return {
      isBoss: false,
      curTab: 1,
      tabsList: [
        {
          name: '企业信息',
          key: 1
        },
        {
          name: '营销数据',
          key: 2
        },
        {
          name: '准入产品',
          key: 3
        }
      ],
      firmContent: {},
      marketContent: {},
      deviceId: ''
    }
  },
  mounted() {
    this.getAuthorizeUrl()
  },
  methods: {
    tabClick(e) {
      this.curTab = e.key
    },
    /**
     * 获取企业数据
     */
    getFirmData(devid) {
      uni.showLoading({
        title: '加载中',
        mask: true
      })
      getFirmDataApi(devid)
        .then((res) => {
          this.isBoss = true
          this.firmContent = {
            baseinfoVo: res.baseinfoVo || {},
            basic: res.enterprise.basic,
            lastCorporateChange: res.lastCorporateChange,
            evaluationResult: res.evaluationResult,
            partners: res.enterprise.partners,
            enterpriseInfoPrompt: res.enterpriseInfoPrompt,
            yshdInfos: res.yshdInfos,
            customertList: res.customertList,
            supplierList: res.supplierList,
            inspection: res.inspection || [],
            coreTaxFinanceIndex: res.coreTaxFinanceIndex || {}
          }
          this.marketContent = {
            enterpriseInfoPrompt: res.enterpriseInfoPrompt,
            taxDeclareAmountByYear: res.taxDeclareAmountByYear || [],
            taxDeclareSjjeByYear: res.taxDeclareSjjeByYear || [],
            taxPayAmountByYear: res.taxPayAmountByYear || [],
            taxAnalysisList: res.taxAnalysisList || [],
            coreTaxFinanceIndex: res.coreTaxFinanceIndex || {},
            salesYearList: res.salesYearList,
            salesTypes: res.salesTypes,
            customerYear: res.customerYear,
            basicStatistics: res.basicStatistics[0],
            invoiceInfoPrompt: res.invoiceInfoPrompt,
            tax_bill_info: res.tax_bill_info,
            baseinfoVo: res.baseinfoVo || {},
            evaluationResult: res.evaluationResult || '--',
            monthTotal: res.monthTotal
          }
          uni.hideLoading()
        })
        .catch((err) => {
          console.log(err)
          uni.hideLoading()
        })
    },
    /**
     * 获取授权页面地址
     */
    getAuthorizeUrl(id) {
      if (!id) {
        uni.showLoading({
          title: '加载中',
          mask: true
        })
        return
      }
      const deviceId = this.deviceId
      const userId = id
      getAuthorizeUrlApi(deviceId, userId)
        .then((res) => {
          if (res.baseUrl) {
            window.location.href = res.baseUrl
          } else {
            this.getFirmData(deviceId)
          }
        })
        .catch((err) => {
          uni.$u.toast('授权失败')
        })
    }
  }
}
</script>
<style>
page {
  background-color: #f8f8f8;
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica,
    Segoe UI, Arial, Roboto, PingFang SC, miui, Hiragino Sans GB,
    Microsoft Yahei, sans-serif;
}
</style>
<style lang="scss" scoped>
.con_top {
  padding: 48rpx 28rpx 0 28rpx;
  width: 100%;
  position: relative;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  .title {
    font-size: 44rpx;
    font-weight: bold;
  }
  .eval {
    margin-top: 24rpx;
    width: 284rpx;
    height: 32rpx;
    font-size: 24rpx;
    text-align: center;
    line-height: 32rpx;
    padding: 12rpx;
    color: #894a00;
    background-image: -webkit-linear-gradient(top, #ffee9e 0%, #ffcf49 100%);
    background-image: linear-gradient(180deg, #ffee9e 0%, #ffcf49 100%);
    border-radius: 8rpx;
  }
  .label {
    position: absolute;
    top: 0;
    right: 0;
    width: 80rpx;
    height: 48rpx;
    color: rgb(18, 202, 103);
    background-color: rgb(208, 250, 209);
    border-radius: 0 20rpx;
    font-size: 26rpx;
    text-align: center;
    line-height: 48rpx;
  }
}
.module {
  background-color: #fff;
  margin-top: 24rpx;
  .title {
    padding: 30rpx 30rpx 0 30rpx;
    display: flex;
    justify-content: space-between;
  }
  .title_text {
    font-size: 28rpx;
    font-weight: bold;
  }
  .title_unit {
    font-size: 24rpx;
    color: #999;
  }
}
/deep/ .u-sticky {
  top: 0 !important;
}
</style>
