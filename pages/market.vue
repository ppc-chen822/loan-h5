<template>
  <view class="market_info">
    <view class="module">
      <com-title title="纳税信息总览" :icon="titleIconB" />

      <!-- <subTitle title="每年应税销售收入情况" unit="单位：万元" />
      <table-info :th="twoTh" :td="twoTd" /> -->
      <!--  -->
      <subTitle title="近三年每月应税销售收入" unit="单位：万元" />
      <table-info :th="threeTh" :td="threeTd" :isMore="true" :isTitle="true" />
      <!--  -->
      <!-- <subTitle title="近三年每月应税销售收入趋势图" unit="单位：万元" /> -->
      <!-- <lineChart v-if="oneLine.length > 0" :chartData="oneLine" /> -->
      <!--  -->
      <!-- <subTitle title="每年应纳税额合计" unit="单位：万元" />
      <table-info :th="fourTh" :td="fourTd" /> -->
      <!--  -->
      <subTitle title="近三年每月应纳税额" unit="单位：万元" />
      <table-info :th="fiveTh" :td="fiveTd" :isMore="true" :isTitle="true" />
      <!--  -->
      <!-- <subTitle title="每年实缴税额合计" unit="单位：万元" />
      <table-info :th="sixTh" :td="sixTd" :isMore="true" :isTitle="true" /> -->
      <!--  -->
      <subTitle title="近三年每月实缴税额" unit="单位：万元" />
      <table-info :th="sevenTh" :td="sevenTd" :isMore="true" :isTitle="true" />
      <!--  -->
      <subTitle title="各税种申报信息" unit="单位：万元" />
      <tableInfoDou :th="eightTh" :td="eightTd" :isTitle="true" />
      <!--  -->
      <subTitle title="税收违法违章信息" unit="单位：万元" />
      <table-info :th="nineTh" :td="nineTd" />
    </view>
    <view class="module">
      <com-title title="纳税信息提示" :icon="titleIconA" />
      <table-info :th="oneTh" :td="tenTd" :trBorder="true" :tdBorder="false" />
    </view>
    <view class="module">
      <!-- <com-title title="开票收入总览" :icon="titleIconA" />
      <table-info :th="eleTh" :td="eleTd" /> -->
      <!--  -->
      <subTitle title="近三年每月开票收入" unit="单位：万元" />
      <table-info :th="twelTh" :td="twelTd" :isMore="true" :isTitle="true" />
      <!--  -->
      <!-- <subTitle title="近三年每月开票收入趋势图" unit="单位：万元" /> -->
      <!-- <lineChart v-if="oneLine.length > 0" :chartData="twoLine" /> -->
      <!--  -->
      <subTitle title="每年开票张数情况" />
      <table-info :th="sixTTh" :td="sixTTd" />
      <!--  -->
      <subTitle title="每月开票张数情况" />
      <table-info :th="sevenTTh" :td="sevenTTd" />
      <!--  -->
      <subTitle title="近1年红冲废票情况" unit="单位：万元" />
      <table-info :th="redTh" :td="redTd" />
      <!--  -->
      <subTitle title="累计前十大客户列表" />
      <table-info :th="thirTh" :td="thirTd" />
      <!--  -->
      <subTitle title="累计前十大供应商列表" />
      <table-info :th="forthTh" :td="forthTd" />
      <!--  -->
    </view>
    <view class="module">
      <com-title title="开票信息" :icon="titleIconA" />
      <table-info :th="oneTh" :td="fiftTd" :trBorder="true" :tdBorder="false" />
    </view>
  </view>
</template>

<script>
import comTitle from '@/components/comTitle.vue'
import lineChart from '@/components/lineChart.vue'
import tableInfo from '@/components/tableInfo.vue'
import subTitle from '../components/subTitle.vue'
import tableInfoDou from '@/components/tableInfoDou.vue'
export default {
  components: { lineChart, tableInfo, comTitle, subTitle, tableInfoDou },
  props: {
    dataObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      titleIconA: require('@/static/a1.png'),
      titleIconB: require('@/static/a3.png'),
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
      twoTh: [],
      twoTd: [],
      threeTh: [],
      threeTd: [],
      fourTh: [],
      fourTd: [],
      fiveTh: [],
      fiveTd: [],
      sixTh: [],
      sixTd: [],
      sevenTh: [],
      sevenTd: [],
      eightTh: [],
      eightTd: [],
      oneLine: [],
      twoLine: [],
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
      eleTh: [],
      eleTd: [],
      twelTh: [],
      twelTd: [],
      thirTd: [],
      thirTh: [
        {
          prop: 'index',
          name: '序号'
        },
        {
          prop: 'buyerName',
          name: '客户名称'
        },
        {
          prop: 'totalAmount',
          name: '交易额（万元）'
        },
        {
          prop: 'rate',
          name: '占比'
        }
      ],
      forthTd: [],
      forthTh: [
        {
          prop: 'index',
          name: '序号'
        },
        {
          prop: 'salerName',
          name: '供应商名称'
        },
        {
          prop: 'totalAmount',
          name: '交易额（万元）'
        },
        {
          prop: 'rate',
          name: '占比'
        }
      ],
      fiftTd: [],
      sixTTh: [],
      sixTTd: [],
      sevenTTh: [
        {
          prop: 'yearMonth',
          name: '月份'
        },
        {
          prop: 'normalCount',
          name: '张数'
        }
      ],
      sevenTTd: [],
      redTh: [
        {
          prop: 'yearMonth',
          name: '时间'
        },
        {
          prop: 'negativeCount',
          name: '红冲发票张数'
        },
        {
          prop: 'normalAmount',
          name: '红冲发票金额（万元）'
        },
        {
          prop: 'voidedCount',
          name: '作废发票张数'
        },
        {
          prop: 'voidedAmount',
          name: '作废发票金额（万元）'
        }
      ],
      redTd: []
    }
  },
  mounted() {
    this.initTenData()
    this.initTwoData()
    this.initThreeData()
    this.initOneLine()
    this.initFourData()
    this.initFiveData()
    this.initEightData()
    this.tdOneData()
    this.initEleData()
    this.initTwelData()
    this.initThirData()
    this.initTaskData()
    this.initTaskYear()
    this.initTaskMonth()
    this.initSixData()
    this.initSevenData()
  },
  methods: {
    // 每月开票张数情况
    initTaskMonth() {
      const salesTypes = this.dataObj.salesTypes
      this.sevenTTd = salesTypes.map((item) => {
        return {
          yearMonth: item.yearMonth,
          normalCount: item.normalCount
        }
      })
      this.redTd = salesTypes.map((item) => {
        return {
          yearMonth: item.yearMonth,
          negativeCount: item.negativeCount,
          normalAmount: item.normalAmount,
          voidedCount: item.voidedCount,
          voidedAmount: item.voidedAmount
        }
      })
    },

    // 每年开票张数情况
    initTaskYear() {
      const customerYear = this.dataObj.customerYear
      if (customerYear.length > 0) {
        const Th = customerYear.map((item) => {
          return {
            prop: item.yearName,
            name: item.yearName
          }
        })
        Th.unshift({ prop: 'title', name: '年份' })
        this.sixTTh = Th
        this.sixTTd = [
          customerYear.reduce((result, obj) => {
            result[obj.yearName] = obj.totalSalesCount
            return result
          }, {})
        ]
        this.sixTTd[0].title = '开票张数'
      }
    },
    // 开票信息提示
    initTaskData() {
      const dataObj = this.dataObj.basicStatistics
      const daObj = this.dataObj.invoiceInfoPrompt
      const dObj = this.dataObj.tax_bill_info.sales_analysis
      this.fiftTd = [
        {
          name: '最晚一次开票距今天数',
          value: daObj.latestInvoiceDay
        },
        {
          name: '最早一次开票距今月份数',
          value: daObj.salesMaxMonths
        },
        {
          name: '近3月开票金额合计（万元）',
          value: dataObj.totalAmountFor3
        },
        {
          name: '近6月开票金额合计（万元）',
          value: dObj.sales_amt_sum_6mon
        },
        {
          name: '近12个月开票金额合计（万元）',
          value: dataObj.totalAmountFor12
        },
        {
          name: '近12个月未开票月份数',
          value: daObj.noSalesRec12Mon
        },
        {
          name: '近12个月开票金额同比',
          value: dObj.sales_amt_tb2_12mon
        },
        {
          name: '近12个月无效开票月份',
          value: daObj.voidSalesCount12Month
        },
        {
          name: '近12个月开票最大间隔天数',
          value: daObj.salesGapDaysMax12mon
        },
        {
          name: '近12个月客户数量',
          value: daObj.totalCustomerRec12Mon
        },
        {
          name: '近12个月发票冲红作废占比',
          value: daObj.voidNegativeRate12Mon
        },
        {
          name: '近12个月最大月开票金额占比',
          value: daObj.max12MonthAmountRate
        },
        {
          name: '近12月前十大客户开票金额占比',
          value: daObj.custMax10AmtRatio12mon
        },
        {
          name: '近12月前十大供应商开票金额占比',
          value: daObj.supplierMax10AmtRatio12mon
        }
      ]
    },
    // 十大客户
    initThirData() {
      const customertList = this.dataObj.customertList
      this.thirTd = customertList.map((item, index) => {
        return {
          buyerName: item.buyerName,
          index: index + 1,
          totalAmount: item.totalAmount,
          rate: item.rate.toFixed() + '%'
        }
      })
      const supplierList = this.dataObj.supplierList
      this.forthTd = supplierList.map((item, index) => {
        return {
          salerName: item.salerName,
          index: index + 1,
          totalAmount: item.totalAmount,
          rate: item.rate.toFixed() + '%'
        }
      })
    },
    //近三年每月应税销售收入
    initTwelData() {
      const salesYearList = this.dataObj.salesYearList
      console.log(salesYearList.length, salesYearList)
      const Th = salesYearList.map((item) => {
        return {
          prop: item.year,
          name: item.year
        }
      })
      console.log(Th)
      Th.unshift({ prop: 'name', name: '年份' })
      this.twelTh = Th
      const Td = []
      // 添加总计对象
      Td.push({
        name: '总计',
        ...salesYearList.reduce((acc, item) => {
          acc[item.year] = item.total
          return acc
        }, {})
      })

      // 添加每个月份的对象
      for (let i = 1; i <= 12; i++) {
        const monthName = i + '月'
        const monthData = {}

        salesYearList.forEach((item) => {
          monthData[item.year] = item.normalAmount[i - 1]
        })

        Td.push({
          name: monthName,
          ...monthData
        })
      }
      this.twelTd = Td
      console.log(Td)
    },
    // 纳税信息提示
    initTenData() {
      const dataObj = this.dataObj.coreTaxFinanceIndex
      const daObj = this.dataObj.baseinfoVo
      this.tenTd = [
        {
          name: '近12月应税销售收入合计（万元）',
          value: dataObj.totalTaxSalesAmountRec12Mon
        },
        {
          name: '近12月应税销售收入为0的月份数',
          value: dataObj.noSalesMonths
        },
        {
          name: '近12月应纳税额合计（万元）',
          value: dataObj.totalTaxPayAmountRec12Mon
        },
        {
          name: '近12月实缴金额合计（万元）',
          value: dataObj.totalSjje12Mon
        },
        {
          name: '最近一次实缴税距今月数',
          value: dataObj.lastSjjePurMonths
        },
        {
          name: '近12个月连续0申报月数',
          value: dataObj.taxNoDeclareMonthRec12Mon
        },
        {
          name: '近36个月最长连续零申报月数',
          value: dataObj.longestPersistNoSales36Months
        },
        {
          name: '近13-24个月纳税额（万元）',
          value: dataObj.totalSjje13To24Mon
        },
        {
          name: '近6个月销售额同比增长率',
          value: dataObj.saleAmountRec6MonTB
        },
        {
          name: '近12个月销售额同比增长率',
          value: dataObj.saleAmountRec12MonTB
        },
        {
          name: '当前有无欠税记录',
          value: daObj.taxCurrPayUpSys
        },
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
    // td数据处理
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
    //各种税申报信息
    initEightData() {
      const taxAnalysisList = this.dataObj.taxAnalysisList
      const Th = taxAnalysisList.map((item) => {
        return {
          prop: item.year,
          name: item.year,
          rate: 'rate'
        }
      })
      Th.unshift({ prop: 'title', name: '年份' })
      this.eightTh = Th
      const Td = []
      for (let j = 0; j < taxAnalysisList.length; j++) {
        let items = taxAnalysisList[j].items
        for (let i = 0; i < items.length; i++) {
          let obj = {
            [taxAnalysisList[j].year]: {
              rate: items[i].rate,
              taxpayAmount: items[i].taxpayAmount,
              title: items[i].dproject
            }
          }
          Td.push(obj)
        }
      }
      const processedData = {}

      Td.forEach((entry) => {
        const year = Object.keys(entry)[0]
        const { rate, taxpayAmount, title } = entry[year]

        if (!processedData[title]) {
          processedData[title] = {}
        }

        processedData[title][year] = { rate, taxpayAmount }
      })

      const result = Object.entries(processedData).map(([title, years]) => ({
        title,
        ...years
      }))
      this.eightTd = result
    },
    //每年应税销售收入情况
    initTwoData() {
      const taxDeclareAmountByYear = this.dataObj.taxDeclareAmountByYear
      const twoTh = taxDeclareAmountByYear.map((item) => {
        return {
          prop: item.year,
          name: item.year
        }
      })
      twoTh.unshift({ prop: 'title', name: '年份' })
      this.twoTh = twoTh
      this.twoTd = [
        taxDeclareAmountByYear.reduce((result, obj) => {
          result[obj.year] = obj.total
          return result
        }, {})
      ]
      this.twoTd[0].title = '应税销售额'
    },
    //近三年每月应税销售收入
    initThreeData() {
      let taxDeclareAmountByYear = this.dataObj.taxDeclareAmountByYear.slice(-3)
      const threeTh = taxDeclareAmountByYear.map((item) => {
        return {
          prop: item.year,
          name: item.year
        }
      })
      threeTh.unshift({ prop: 'name', name: '年份' })
      this.threeTh = threeTh
      const threeTd = []
      // 添加总计对象
      threeTd.push({
        name: '总计',
        ...taxDeclareAmountByYear.reduce((acc, item) => {
          acc[item.year] = item.total
          return acc
        }, {})
      })

      // 添加每个月份的对象
      for (let i = 1; i <= 12; i++) {
        const monthName = i + '月'
        const monthData = {}

        taxDeclareAmountByYear.forEach((item) => {
          monthData[item.year] = item.declareAmount[i - 1]
        })

        threeTd.push({
          name: monthName,
          ...monthData
        })
      }
      this.threeTd = threeTd
    },
    //近三年每月应税销售收入趋势图
    initOneLine() {
      const taxDeclareAmountByYear = this.dataObj.taxDeclareAmountByYear
      this.oneLine = taxDeclareAmountByYear.map((item) => {
        return {
          year: item.year,
          data: item.declareAmount
        }
      })
      const salesYearList = this.dataObj.salesYearList
      this.twoLine = salesYearList.map((item) => {
        return {
          year: item.year,
          data: item.normalAmount
        }
      })
    },
    //每年实缴税额合计
    initSixData() {
      const taxDeclareSjjeByYear = this.dataObj.taxDeclareSjjeByYear
      const Th = taxDeclareSjjeByYear.map((item) => {
        return {
          prop: item.year,
          name: item.year
        }
      })
      Th.unshift({ prop: 'title', name: '年份' })
      this.sixTh = Th
      this.sixTd = [
        taxDeclareSjjeByYear.reduce((result, obj) => {
          result[obj.year] = obj.total
          return result
        }, {})
      ]
      this.sixTd[0].title = '每年实缴税额合计'
    },
    //每年应纳税额合计
    initFourData() {
      const taxPayAmountByYear = this.dataObj.taxPayAmountByYear
      const fourTh = taxPayAmountByYear.map((item) => {
        return {
          prop: item.year,
          name: item.year
        }
      })
      fourTh.unshift({ prop: 'title', name: '年份' })
      this.fourTh = fourTh
      this.fourTd = [
        taxPayAmountByYear.reduce((result, obj) => {
          result[obj.year] = obj.total
          return result
        }, {})
      ]
      this.fourTd[0].title = '每年应纳税额合计'
    },
    //近三年每月应纳税额
    initFiveData() {
      let taxPayAmountByYear = this.dataObj.taxPayAmountByYear.slice(-3)
      const fiveTh = taxPayAmountByYear.map((item) => {
        return {
          prop: item.year,
          name: item.year
        }
      })
      fiveTh.unshift({ prop: 'name', name: '年份' })
      this.fiveTh = fiveTh
      const fiveTd = []
      // 添加总计对象
      fiveTd.push({
        name: '总计',
        ...taxPayAmountByYear.reduce((acc, item) => {
          acc[item.year] = item.total
          return acc
        }, {})
      })

      // 添加每个月份的对象
      for (let i = 1; i <= 12; i++) {
        const monthName = i + '月'
        const monthData = {}

        taxPayAmountByYear.forEach((item) => {
          monthData[item.year] = item.taxpayAmount[i - 1]
        })

        fiveTd.push({
          name: monthName,
          ...monthData
        })
      }
      this.fiveTd = fiveTd
    },
    //近三年每月实缴税额
    initSevenData() {
      const taxDeclareSjjeByYear = this.dataObj.taxDeclareSjjeByYear
      const Th = taxDeclareSjjeByYear.map((item) => {
        return {
          prop: item.year,
          name: item.year
        }
      })
      Th.unshift({ prop: 'name', name: '年份' })
      this.sevenTh = Th
      const Td = []
      // 添加总计对象
      Td.push({
        name: '总计',
        ...taxDeclareSjjeByYear.reduce((acc, item) => {
          acc[item.year] = item.total
          return acc
        }, {})
      })

      // 添加每个月份的对象
      for (let i = 1; i <= 12; i++) {
        const monthName = i + '月'
        const monthData = {}

        taxDeclareSjjeByYear.forEach((item) => {
          monthData[item.year] = item.taxpayAmount[i - 1]
        })

        Td.push({
          name: monthName,
          ...monthData
        })
      }
      this.sevenTd = Td
    },
    //每年开票收入情况
    initEleData() {
      const salesYearList = this.dataObj.salesYearList
      const Th = salesYearList.map((item) => {
        return {
          prop: item.year,
          name: item.year
        }
      })
      Th.unshift({ prop: 'title', name: '年份' })
      this.eleTh = Th
      this.eleTd = [
        salesYearList.reduce((result, obj) => {
          result[obj.year] = obj.total
          return result
        }, {})
      ]
      this.eleTd[0].title = '每年开票收入情况'
    }
  }
}
</script>

<style lang="scss" scoped>
.module {
  background-color: #fff;
  margin-top: 24rpx;
}
</style>
