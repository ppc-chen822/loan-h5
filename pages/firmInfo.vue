<template>
  <view class="form_data">
    <com-title title="企业概况" :icon="titleIcon" />
    <u-cell-group :border="false">
      <u-cell
        v-for="(item, index) in formData"
        :key="index"
        :title="item.name"
        :value="item.value || '--'"
      >
        <!-- <view
          slot="value"
          v-if="!item.value && item.name == '股东名称'"
          class="u-slot-title"
        >
          <tableInfo :th="th" :td="td" />
        </view> -->
      </u-cell>
    </u-cell-group>
    <view v-if="isShow">
      <view class="bu_cell">
        <view class="title"> 股东信息 </view>
        <tableInfo :th="th" :td="td" />
      </view>
      <view class="bu_cell">
        <view class="title"> 信贷查询记录 </view>
        <view class="empty" v-if="dataObj.yshdInfos.length == 0">无记录</view>
        <view v-else>
          <tableInfoScoll :th="Tth" :td="Ttd" />
        </view>
      </view>
    </view>
    <view class="load_more_com">
      <load-more @toggle="toggle" />
    </view>
    <view class="module">
      <com-title title="工商司法提示" :icon="titleIcon" />
      <table-info :th="oneTh" :td="oneTd" :trBorder="true" :tdBorder="false" />
    </view>
  </view>
</template>

<script>
import comTitle from '@/components/comTitle.vue'
import loadMore from '@/components/loadMore.vue'
import tableInfoScoll from '@/components/tableInfoScoll.vue'
import tableInfo from '@/components/tableInfo.vue'
export default {
  components: { comTitle, loadMore, tableInfo, tableInfoScoll },
  props: {
    dataObj: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      Ttd: [
        {
          dsfjgmc: '天津金城银行',
          slzt: '银行审核通过',
          sqrq: '2023-11-29',
          dkye: null,
          dkje: null,
          jrcpmc: '金企贷',
          sxed: '500008',
          yyms: null
        },
        {
          dsfjgmc: '天津金城银行',
          slzt: '银行审核通过',
          sqrq: '2023-11-29',
          dkye: null,
          dkje: null,
          jrcpmc: '金企贷',
          sxed: '500008',
          yyms: null
        }
      ],
      Tth: [
        {
          name: '银行名称',
          prop: 'dsfjgmc'
        },
        {
          name: '状态',
          prop: 'slzt'
        },
        {
          name: '申请日期',
          prop: 'sqrq'
        },
        {
          name: '贷款金额',
          prop: 'dkje'
        },
        {
          name: '贷款余额',
          prop: 'dkye'
        },
        {
          name: '产品名称',
          prop: 'jrcpmc'
        },
        {
          name: '授信额度',
          prop: 'sxed'
        },
        {
          name: '授信失败原因',
          prop: 'yyms'
        }
      ],
      oneTh: [
        {
          prop: 'name',
          name: '指标名称'
        },
        {
          prop: 'value',
          name: '结果'
        }
      ],
      oneTd: [],
      isShow: false,
      titleIcon: require('@/static/a1.png'),
      formDataArr: [],
      formData: [],
      th: [
        {
          name: '股东名称',
          prop: 'name'
        },
        {
          name: '认缴出资额',
          prop: 'totalShouldCapi'
        },
        {
          name: '参股比例',
          prop: 'stockRate'
        }
      ],
      td: []
    }
  },
  mounted() {
    this.initOneData()
    this.init()
  },
  methods: {
    // 工商司法提示
    initOneData() {
      const { dataObj } = this
      this.oneTd = [
        {
          name: '企业成立距今月份数',
          value: dataObj.enterpriseInfoPrompt.cpOperMonth
        },
        {
          name: '企业失信被执行人条数',
          value: dataObj.enterpriseInfoPrompt.disruptCount
        },
        {
          name: '企业被执行人条数',
          value: dataObj.enterpriseInfoPrompt.undertakerCount
        },
        {
          name: '企业法院公告条数',
          value: dataObj.enterpriseInfoPrompt.courtInfoCount
        },
        {
          name: '企业限制高消费条数',
          value: dataObj.enterpriseInfoPrompt.companyConsumLimited
        },
        {
          name: '法定代表人限制高消费记录',
          value: dataObj.enterpriseInfoPrompt.applierConsumLimited
        }
      ]
    },
    // table 数据处理
    dataHandle() {
      const partners = this.dataObj.partners
      this.td = partners.map((res) => {
        return {
          name: res.name,
          totalShouldCapi: res.totalShouldCapi,
          stockRate: res.stockRate * 100 + '%'
        }
      })
    },
    // 初始化数据
    init() {
      const { dataObj } = this
      this.dataHandle()
      this.formDataArr = [
        {
          name: '企业名称',
          value: dataObj.baseinfoVo.nsrmc
        },
        {
          name: '税号',
          value: dataObj.baseinfoVo.nsrsbh
        },
        {
          name: '成立时间',
          value: dataObj.basic.startDate
        },
        {
          name: '纳税人种类',
          value: this.nsrzgFun(dataObj.baseinfoVo.nsrzg)
        },
        {
          name: '企业类型',
          value: dataObj.basic.econKind
        },
        {
          name: '经营状态',
          value: dataObj.basic.status
        },
        {
          name: '法人姓名',
          value: dataObj.basic.operName
        },
        {
          name: '最近一次法人变更',
          value: dataObj.lastCorporateChange
        },
        {
          name: '纳税信用等级',
          value: dataObj.evaluationResult
        },
        {
          name: '所属行业',
          value: dataObj.baseinfoVo.hymc
        },
        {
          name: '经营范围',
          value: dataObj.basic.scope
        },
        {
          name: '注册类型',
          value: dataObj.basic.domains
        },
        {
          name: '注册区域',
          value: dataObj.baseinfoVo.zcdz
        },
        {
          name: '注册资本',
          value: dataObj.basic.registCapi
        },

        {
          name: '法人是否占股',
          value:
            dataObj.enterpriseInfoPrompt.applierStockRate == 0 ? '否' : '是'
        },
        {
          name: '法人/股东是否变更',
          value:
            dataObj.enterpriseInfoPrompt.cntOperChange3yr == 0 ? '否' : '是'
        }
      ]
      this.Ttd = dataObj.yshdInfos
      if (this.formDataArr.length > 6) {
        this.formData = this.formDataArr.slice(0, 6)
      } else {
        this.formData = this.formDataArr
      }
    },
    //展开收收起
    toggle(e) {
      const { formDataArr } = this
      this.isShow = !this.isShow
      e
        ? (this.formData = formDataArr)
        : (this.formData = formDataArr.slice(0, 6))
    },
    /**
     *纳税人资格类型
     */
    nsrzgFun(value) {
      let data = ''
      switch (value) {
        case '1':
          data = '增值税一般纳税人'
          break
        case '2':
          data = '增值税小规模纳税人'
          break
        case '3':
          data = '其他'
          break
        default:
          break
      }
      return data
    }
  }
}
</script>

<style lang="scss" scoped>
.module {
  background-color: #fff;
  margin-top: 24rpx;
}
.bu_cell {
  border-bottom: 1rpx solid #e5e5e5;
  .title {
    padding: 20rpx 30rpx;
    font-size: 26rpx;
    color: #959595;
  }
  .empty {
    padding: 0rpx 30rpx 20rpx 30rpx;
    font-size: 26rpx;
    color: #2e2e2e;
    text-align: center;
  }
}
.form_data {
  margin-top: 24rpx;
  background-color: #fff;
  padding-bottom: 32rpx;
}
/deep/ .u-cell__title {
  .u-cell__title-text {
    font-size: 26rpx !important;
    color: #959595 !important;
  }
}
/deep/ .u-cell__value {
  font-size: 26rpx !important;
  color: #2e2e2e !important;
  flex: 2;
}
/deep/ .u-cell-group__wrapper {
  padding: 0 28rpx;
}
/deep/ .u-cell__body {
  padding-left: 0;
  padding-right: 0;
}
.load_more_com {
  margin-top: 32rpx;
}
</style>
