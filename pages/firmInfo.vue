<template>
  <view class="form_data">
    <!-- <com-title title="企业概况" :icon="titleIcon" /> -->
    <view class="top" v-if="true">
      <view class="title"
        >{{ dataObj.baseinfoVo.nsrmc }}
        <view class="tips">产品方案</view>
      </view>
      <view class="module_text">
        <view><text>成立日期：</text>{{ dataObj.basic.startDate }}</view>
        <view
          ><text>纳税人资格：</text
          >{{ nsrzgFun(dataObj.baseinfoVo.nsrzg) }}</view
        >
      </view>
      <view class="module_text">
        <view><text>法人姓名：</text>{{ dataObj.basic.operName }}</view>
        <view><text>纳税信用等级：</text>{{ dataObj.evaluationResult }}</view>
      </view>
      <view class="module_text">
        <view><text>行业分类：</text>{{ dataObj.baseinfoVo.hymc }}</view>
      </view>
      <view class="module_text">
        <view><text>企业类型：</text>{{ dataObj.basic.econKind }}</view>
      </view>
      <view class="more_text">
        <view
          ><text>经营范围：</text>{{ scope }}
          <view class="all" @click="all">{{ isAll ? '收起' : '全部' }}</view>
        </view>
      </view>
    </view>
    <view class="bu_cell">
      <view class="title"> 股东信息 </view>
      <tableInfo :th="th" :td="td" />
    </view>
    <view class="bu_cell">
      <view class="title"> 信贷查询记录 </view>
      <view class="empty" v-if="dataObj.yshdInfos.length == 0"
        >该企业无信贷查询记录~</view
      >
      <view v-else>
        <tableInfoScoll :th="Tth" :td="Ttd" />
      </view>
    </view>
    <view class="bu_cell">
      <view class="title"> 工商变更 </view>
      <view
        class="empty"
        v-if="dataObj.enterpriseInfoPrompt.cntOperChange3yr == 0"
        >该企业无法人、股东、注册资本相关变更～</view
      >
      <view class="table_lr" v-else>
        <table
          class="table"
          width="100%"
          cellspacing="0"
          bordercolor="#efefef"
          cellpadding="10"
          frame="solid"
          rules="solid"
        >
          <tr>
            <td style="width: 30%">最近一次法人变更</td>
            <td style="width: 20%">
              {{ dataObj.lastCorporateChange }}
            </td>
            <td style="width: 30%">法人/股东变更</td>
            <td style="width: 20%">
              {{
                dataObj.enterpriseInfoPrompt.cntOperChange3yr == 0 ? '否' : '是'
              }}
            </td>
          </tr>
        </table>
      </view>
    </view>
    <view class="bu_cell">
      <view class="title"> 工商司法提示 </view>
      <view class="table_lr">
        <table
          class="table"
          width="100%"
          cellspacing="0"
          bordercolor="#efefef"
          cellpadding="10"
          frame="solid"
          rules="solid"
        >
          <tr>
            <td style="width: 30%">失信被执行人数</td>
            <td style="width: 20%">
              {{ dataObj.enterpriseInfoPrompt.disruptCount }}
            </td>
            <td style="width: 30%">企业成立距今月份数</td>
            <td style="width: 20%">
              {{ dataObj.enterpriseInfoPrompt.cpOperMonth }}
            </td>
          </tr>
          <tr>
            <td style="width: 30%">法院公告条数</td>
            <td style="width: 20%">
              {{ dataObj.enterpriseInfoPrompt.courtInfoCount }}
            </td>
            <td style="width: 30%">被执行条数</td>
            <td style="width: 20%">
              {{ dataObj.enterpriseInfoPrompt.undertakerCount }}
            </td>
          </tr>
          <tr>
            <td style="width: 30%">企业限制高消费条数</td>
            <td style="width: 20%">
              {{ dataObj.enterpriseInfoPrompt.companyConsumLimited }}
            </td>
            <td style="width: 30%">法定代表人限制高消费记录</td>
            <td style="width: 20%">
              {{ dataObj.enterpriseInfoPrompt.applierConsumLimited }}
            </td>
          </tr>
        </table>
      </view>
    </view>
    <subTitle title="违法违章信息" unit="单位：万元" />
    <table-info :th="nineTh" :td="nineTd" />
    <subTitle title="欠税信息" unit="单位：万元" />
    <table-info :th="oneTh" :td="tenTd" :trBorder="true" :tdBorder="false" />
    <view class="card_client">
      <view class="title">
        <u-image :src="icA" width="56rpx" height="20rpx" mode=""></u-image>
        <view class="t_text">累计前十大客户列表</view>
        <u-image :src="icB" width="56rpx" height="20rpx" mode=""></u-image>
      </view>
      <table-info :th="thirTh" :td="thirTd" tbgColor="#e7f6ff" paddingNo />
      <!--  -->
      <view class="title">
        <u-image :src="icA" width="56rpx" height="20rpx" mode=""></u-image>
        <view class="t_text">累计前十大供应商列表</view>
        <u-image :src="icB" width="56rpx" height="20rpx" mode=""></u-image>
      </view>
      <table-info :th="forthTh" :td="forthTd" tbgColor="#e7f6ff" paddingNo />
    </view>
    <template v-if="false">
      <u-cell-group :border="false">
        <u-cell
          v-for="(item, index) in formData"
          :key="index"
          :title="item.name"
          :value="item.value || '--'"
        >
        </u-cell>
      </u-cell-group>
      <view v-if="isShow">
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
        <table-info
          :th="oneTh"
          :td="oneTd"
          :trBorder="true"
          :tdBorder="false"
        />
      </view>
    </template>
  </view>
</template>

<script>
import subTitle from '../components/subTitle.vue'
import comTitle from '@/components/comTitle.vue'
import loadMore from '@/components/loadMore.vue'
import tableInfoScoll from '@/components/tableInfoScoll.vue'
import tableInfo from '@/components/tableInfo.vue'
export default {
  components: { comTitle, loadMore, tableInfo, tableInfoScoll, subTitle },
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
      icA: require('@/static/ic01.png'),
      icB: require('@/static/ic02.png'),
      isAll: false,
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
      tenTd: [],
      nineTh: [
        {
          prop: 'illegal_fact',
          name: '违法事实'
        },
        {
          prop: 'start_at',
          name: '案件时间'
        },
        {
          prop: 'clzt',
          name: '案件状态'
        }
      ],
      nineTd: [],
      thirTd: [],
      thirTh: [
        {
          width: '15%',
          prop: 'index',
          name: '序号'
        },
        {
          width: '40%',
          prop: 'buyerName',
          name: '客户名称'
        },
        {
          width: '30%',
          prop: 'totalAmount',
          name: '交易额（万元）'
        },
        {
          width: '15%',
          prop: 'rate',
          name: '占比'
        }
      ],
      forthTd: [],
      forthTh: [
        {
          width: '15%',
          prop: 'index',
          name: '序号'
        },
        {
          width: '40%',
          prop: 'salerName',
          name: '供应商名称'
        },
        {
          width: '30%',
          prop: 'totalAmount',
          name: '交易额（万元）'
        },
        {
          width: '15%',
          prop: 'rate',
          name: '占比'
        }
      ],
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
        },
        {
          name: '股东类型',
          prop: 'stock_type'
        }
      ],
      td: []
    }
  },
  computed: {
    scope() {
      const { isAll, dataObj } = this
      if (isAll) {
        {
          dataObj.basic.scope
        }
        return dataObj.basic.scope
      } else {
        return `${dataObj.basic.scope.slice(0, 45)}...`
      }
    }
  },
  mounted() {
    this.initOneData()
    this.initThirData()
    this.initTenData()
    this.tdOneData()
    this.init()
  },
  methods: {
    // 纳税信息提示
    initTenData() {
      const dataObj = this.dataObj.coreTaxFinanceIndex
      this.tenTd = [
        {
          name: '近12月滞纳金次数',
          value: dataObj.znjTimesRec12Mon
        },
        {
          name: '近12月税收违法违章条数',
          value: dataObj.inspectionTimesRec12Mon
        }
      ]
    },
    // 违法违章
    tdOneData() {
      const inspection = this.dataObj.inspection
      if (inspection.length > 0) {
        this.nineTd = inspection.map((item) => {
          return {
            illegal_fact: item.illegal_fact,
            start_at: item.start_at,
            clzt: item.clzt
          }
        })
      }
    },
    // 十大客户
    initThirData() {
      const customertList = this.dataObj.customertList
      this.thirTd = customertList.map((item, index) => {
        return {
          buyerName: item.buyerName,
          index: `No.${index + 1}`,
          totalAmount: item.totalAmount,
          rate: item.rate.toFixed() + '%'
        }
      })
      const supplierList = this.dataObj.supplierList
      this.forthTd = supplierList.map((item, index) => {
        return {
          salerName: item.salerName,
          index: `No.${index + 1}`,
          totalAmount: item.totalAmount,
          rate: item.rate.toFixed() + '%'
        }
      })
    },
    //显示全部
    all() {
      const { isAll } = this
      this.isAll = !isAll
    },
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
          stockRate: res.stockRate * 100 + '%',
          stock_type: res.stock_type
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
.top {
  background: #2c5fdf;
  padding: 48rpx 30rpx;
  .title {
    font-weight: bold;
    font-size: 32rpx;
    color: #ffffff;
    display: flex;
    align-items: center;
    .tips {
      margin-left: 12rpx;
      font-size: 20rpx;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      width: 96rpx;
      height: 28rpx;
      line-height: 28rpx;
      border-radius: 4rpx 4rpx 4rpx 4rpx;
      border: 1rpx solid #ffffff;
    }
  }
}
.all {
  position: absolute;
  bottom: 0rpx;
  right: 60rpx;
  border-bottom: 1rpx solid #fff;
}
.more_text {
  position: relative;
  display: flex;
  font-size: 24rpx;
  margin-top: 32rpx;
  text {
    color: #93b8ff;
  }
  > view {
    color: #fff;
    min-width: 50%;
  }
}
.module_text {
  display: flex;
  font-size: 24rpx;
  margin-top: 32rpx;
  text {
    color: #93b8ff;
  }
  view {
    color: #fff;
    min-width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.module {
  background-color: #fff;
  margin-top: 24rpx;
}
.bu_cell {
  margin-top: 40rpx;
  .title {
    display: inline-block;
    font-size: 26rpx;
    color: #333333;
    padding-bottom: 8rpx;
    margin-left: 30rpx;
    border-bottom: 4rpx solid #2c5fdf;
  }
  .empty {
    padding: 30rpx 30rpx;
    font-size: 26rpx;
    color: #999999;
    text-align: center;
  }
}
.table_lr {
  padding: 20rpx;
  width: 100%;
  box-sizing: border-box;
  td {
    font-size: 24rpx;
    font-family: PingFang SC, PingFang SC;
    font-weight: 400;
    color: #666e7b;
    text-align: center;
    padding: 20rpx;
  }
  & td:nth-child(odd) {
    background-color: #e7f6ff;
  }
}
.card_client {
  margin: 28rpx 20rpx 40rpx 20rpx;
  background-color: #e7f6ff;
  border-radius: 12rpx;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40rpx 0;
    .t_text {
      margin: 0 16rpx;
      font-size: 32rpx;
      font-weight: 600;
      color: #2c5fdf;
    }
  }
}
.table {
  border: 1rpx solid #efefef;
  border-collapse: collapse;
}
td {
  border: 1rpx solid #efefef;
}
.form_data {
  // margin-top: 24rpx;
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
