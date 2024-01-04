<template>
  <view class="market_info">
    <view class="module">
      <!-- <com-title title="纳税信息总览" :icon="titleIconB" /> -->
      <!-- <subTitle title="每年应税销售收入情况" unit="单位：万元" />
      <table-info :th="twoTh" :td="twoTd" /> -->
      <view class="bu_cell">
        <view class="title"> 银税初筛汇总 </view>
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
              <td style="width: 30%">纳税信用等级（2022）</td>
              <td style="width: 20%">
                {{ dataObj.evaluationResult }}
              </td>
              <td style="width: 30%">285</td>
              <td style="width: 20%">
                {{ '--' }}
              </td>
            </tr>
            <tr>
              <td style="width: 30%">违法违章</td>
              <td style="width: 20%">
                {{ dataObj.coreTaxFinanceIndex.inspectionTimesRec12Mon }}
              </td>
              <td style="width: 30%">欠税记录</td>
              <td style="width: 20%">
                {{ dataObj.baseinfoVo.taxCurrPayUpSys }}
              </td>
            </tr>
            <tr>
              <td style="width: 30%">2023年应税销售额(万)</td>
              <td style="width: 20%">
                {{ sale_2023 }}
              </td>
              <td style="width: 30%">2023年申报税额(万)</td>
              <td style="width: 20%">
                {{ sb_2022 }}
              </td>
            </tr>
            <tr>
              <td style="width: 30%">2022年应税销售额(万)</td>
              <td style="width: 20%">
                {{ sale_2022 }}
              </td>
              <td style="width: 30%">2023年申报税额(万)</td>
              <td style="width: 20%">
                {{ sb_2023 }}
              </td>
            </tr>
          </table>
        </view>
      </view>
      <view class="bu_cell">
        <view class="title"> 开票 </view>
        <view class="table_lr kai">
          <table
            class="table"
            width="100%"
            cellspacing="0"
            bordercolor="#efefef"
            cellpadding="10"
            frame="solid"
            rules="solid"
          >
            <tr class="th_bg">
              <td>开票对比分析</td>
              <td>近3个月</td>
              <td>近6个月</td>
              <td>近12个月</td>
              <td>13-24个月</td>
            </tr>
            <tr>
              <td>开票金额</td>
              <td>{{ dataObj.basicStatistics.totalAmountFor3 }}</td>
              <td>
                {{ dataObj.tax_bill_info.sales_analysis.sales_amt_sum_6mon }}
              </td>
              <td>{{ dataObj.basicStatistics.totalAmountFor12 }}</td>
              <td>{{ '--' }}</td>
            </tr>
            <tr>
              <td>同比</td>
              <td>{{ dataObj.invoiceInfoPrompt.rec3MonthTb }}</td>
              <td>
                {{ dataObj.invoiceInfoPrompt.rec6MonthTb }}
              </td>
              <td>
                {{
                  dataObj.tax_bill_info.sales_analysis.sales_amt_tb_12mon ||
                  '--'
                }}
              </td>
              <td>{{ '--' }}</td>
            </tr>
            <tr>
              <td>环比</td>
              <td>{{ '--' }}</td>
              <td>
                {{ '--' }}
              </td>
              <td>
                {{ dataObj.invoiceInfoPrompt.rec12MonthHB || '--' }}
              </td>
              <td>{{ '--' }}</td>
            </tr>
            <tr>
              <td>0开票月</td>
              <td>{{ '0' }}</td>
              <td>
                {{ '0' }}
              </td>
              <td>
                {{ dataObj.invoiceInfoPrompt.noSalesRec12Mon || '--' }}
              </td>
              <td>{{ '0' }}</td>
            </tr>
            <tr>
              <td>发票张数</td>
              <td>{{ '0' }}</td>
              <td>
                {{ '0' }}
              </td>
              <td>
                {{ '0' }}
              </td>
              <td>{{ '0' }}</td>
            </tr>
            <tr>
              <td>废票张数占比</td>
              <td>{{ '0' }}</td>
              <td>
                {{ '0' }}
              </td>
              <td>
                {{ dataObj.invoiceInfoPrompt.voidNegativeRate12Mon || '--' }}
              </td>
              <td>{{ '0' }}</td>
            </tr>
            <tr>
              <td>红冲张数占比</td>
              <td>{{ '0' }}</td>
              <td>
                {{ '0' }}
              </td>
              <td>
                {{ '0' }}
              </td>
              <td>{{ '0' }}</td>
            </tr>
          </table>
        </view>
      </view>
      <!-- <subTitle title="近三年每月应税销售收入" unit="单位：万元" /> -->
      <!-- <table-info :th="threeTh" :td="threeTd" :isMore="true" :isTitle="true" /> -->
      <!--  -->
      <!-- <subTitle title="近三年每月应税销售收入趋势图" unit="单位：万元" /> -->
      <!-- <lineChart v-if="oneLine.length > 0" :chartData="oneLine" /> -->
      <!--  -->
      <!-- <subTitle title="每年应纳税额合计" unit="单位：万元" />
      <table-info :th="fourTh" :td="fourTd" /> -->
      <!--  -->
      <!-- <subTitle title="近三年每月应纳税额" unit="单位：万元" /> -->
      <!-- <table-info :th="fiveTh" :td="fiveTd" :isMore="true" :isTitle="true" /> -->
      <!--  -->
      <!-- <subTitle title="每年实缴税额合计" unit="单位：万元" />
      <table-info :th="sixTh" :td="sixTd" :isMore="true" :isTitle="true" /> -->
      <!--  -->
      <!-- <subTitle title="近三年每月实缴税额" unit="单位：万元" /> -->
      <!-- <table-info :th="sevenTh" :td="sevenTd" :isMore="true" :isTitle="true" /> -->
      <!--  -->
      <!-- <subTitle title="各税种申报信息" unit="单位：万元" /> -->
      <!-- <tableInfoDou :th="eightTh" :td="eightTd" :isTitle="true" /> -->
      <!--  -->
      <!-- <subTitle title="违法违章信息" unit="单位：万元" />
      <table-info :th="nineTh" :td="nineTd" /> -->
    </view>
    <!-- <view class="module">
      <com-title title="纳税信息提示" :icon="titleIconA" />
      <table-info :th="oneTh" :td="tenTd" :trBorder="true" :tdBorder="false" />
    </view> -->
    <view class="module">
      <!-- <com-title title="开票收入总览" :icon="titleIconA" />
      <table-info :th="eleTh" :td="eleTd" /> -->
      <!--  -->
      <subTitle title="开票数据" unit="单位：万元" />
      <table-info :th="twelTh" :td="twelTd" :isMore="true" :isTitle="true" />
      <view class="bu_cell">
        <view class="title"> 纳税汇总 </view>
        <view class="table_lr kai">
          <table
            class="table"
            width="100%"
            cellspacing="0"
            bordercolor="#efefef"
            cellpadding="10"
            frame="solid"
            rules="solid"
          >
            <tr class="th_bg">
              <td>涉税指标分析</td>
              <td>近3个月</td>
              <td>近6个月</td>
              <td>近12个月</td>
              <td>13-24个月</td>
            </tr>
            <tr>
              <td>申报总额</td>
              <td>{{ dataObj.basicStatistics.totalAmountFor3 }}</td>
              <td>
                {{ dataObj.tax_bill_info.sales_analysis.sales_amt_sum_6mon }}
              </td>
              <td>{{ dataObj.basicStatistics.totalAmountFor12 }}</td>
              <td>{{ '--' }}</td>
            </tr>
            <tr>
              <td>增值税申报</td>
              <td>{{ dataObj.invoiceInfoPrompt.rec3MonthTb }}</td>
              <td>
                {{ dataObj.invoiceInfoPrompt.rec6MonthTb }}
              </td>
              <td>
                {{
                  dataObj.tax_bill_info.sales_analysis.sales_amt_tb_12mon ||
                  '--'
                }}
              </td>
              <td>{{ '--' }}</td>
            </tr>
            <tr>
              <td>环比</td>
              <td>{{ '--' }}</td>
              <td>
                {{ '--' }}
              </td>
              <td>
                {{ dataObj.invoiceInfoPrompt.rec12MonthHB || '--' }}
              </td>
              <td>{{ '--' }}</td>
            </tr>
            <tr>
              <td>0开票月</td>
              <td>{{ '0' }}</td>
              <td>
                {{ '0' }}
              </td>
              <td>
                {{ dataObj.invoiceInfoPrompt.noSalesRec12Mon || '--' }}
              </td>
              <td>{{ '0' }}</td>
            </tr>
            <tr>
              <td>企业所得税申报</td>
              <td>{{ '0' }}</td>
              <td>
                {{ '0' }}
              </td>
              <td>
                {{ '0' }}
              </td>
              <td>{{ '0' }}</td>
            </tr>
            <tr>
              <td>0申报月</td>
              <td>{{ '0' }}</td>
              <td>
                {{ '0' }}
              </td>
              <td>
                {{ dataObj.coreTaxFinanceIndex.persistNoSales12Months || '--' }}
              </td>
              <td>{{ '0' }}</td>
            </tr>
            <tr>
              <td>滞纳金</td>
              <td>{{ '0' }}</td>
              <td>
                {{ '0' }}
              </td>
              <td>
                {{ dataObj.coreTaxFinanceIndex.znjTimesRec12Mon || '--' }}
              </td>
              <td>{{ '0' }}</td>
            </tr>
          </table>
        </view>
      </view>
      <!--  -->
      <!-- <subTitle title="近三年每月开票收入趋势图" unit="单位：万元" /> -->
      <!-- <lineChart v-if="oneLine.length > 0" :chartData="twoLine" /> -->
      <!--  -->
      <!-- <subTitle title="每年开票张数情况" />
      <table-info :th="sixTTh" :td="sixTTd" /> -->
      <!--  -->
      <!-- <subTitle title="每月开票张数情况" />
      <table-info :th="sevenTTh" :td="sevenTTd" /> -->
      <!--  -->
      <!-- <subTitle title="近1年红冲废票情况" unit="单位：万元" />
      <table-info :th="redTh" :td="redTd" /> -->
      <!--  -->
      <!-- <subTitle title="近三年每月实缴税额" unit="单位：万元" /> -->
      <view class="btn_item">
        <view
          v-for="(item, index) in sbtabs"
          :key="index"
          :class="isA == index ? 'active' : ''"
          @click="changeTab(index)"
          >{{ item.name }}</view
        >
      </view>
      <table-info :th="sevenTh" :td="sevenTd" :isMore="true" :isTitle="true" />
    </view>
    <!-- <view class="module">
      <com-title title="开票信息" :icon="titleIconA" />
      <table-info :th="oneTh" :td="fiftTd" :trBorder="true" :tdBorder="false" />
    </view> -->
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
  computed: {
    //2023近三年每月应税销售
    sale_2023() {
      const taxDeclareAmountByYear = this.dataObj.taxDeclareAmountByYear
      // 过滤年份为2023的数据
      const filteredData = taxDeclareAmountByYear.filter(
        (item) => item.year === '2023'
      )
      if (filteredData.length > 0) {
        return filteredData[0].total
      }
    },
    sale_2022() {
      const taxDeclareAmountByYear = this.dataObj.taxDeclareAmountByYear
      // 过滤年份为2023的数据
      const filteredData = taxDeclareAmountByYear.filter(
        (item) => item.year === '2022'
      )
      if (filteredData.length > 0) {
        return filteredData[0].total
      }
    },
    sb_2022() {
      const taxAnalysisList = this.dataObj.taxAnalysisList
      // 过滤年份为2023的数据
      const filteredData = taxAnalysisList.filter(
        (item) => item.year === '2022'
      )
      if (filteredData.length > 0) {
        return filteredData[0].items[3].taxpayAmount
      }
    },
    sb_2023() {
      const taxAnalysisList = this.dataObj.taxAnalysisList
      // 过滤年份为2023的数据
      const filteredData = taxAnalysisList.filter(
        (item) => item.year === '2023'
      )
      if (filteredData.length > 0) {
        return filteredData[0].items[3].taxpayAmount
      }
    }
  },
  data() {
    return {
      sbtabs: [
        {
          name: '实缴'
        },
        {
          name: '申报'
        }
      ],
      isA: 0,
      titleIconA: require('@/static/a1.png'),
      titleIconB: require('@/static/a3.png'),
      icA: require('@/static/ic01.png'),
      icB: require('@/static/ic02.png'),
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
    // this.initFiveData()
    this.initEightData()
    this.initEleData()
    this.initTwelData()
    this.initTaskData()
    this.initTaskYear()
    this.initTaskMonth()
    this.initSixData()
    this.initSevenData()
  },
  methods: {
    //
    changeTab(index) {
      this.isA = index
      index ? this.initFiveData() : this.initSevenData()
    },
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
      if (this.dataObj.monthTotal.length > 0) {
        const Th = monthTotal.map((item) => {
          return {
            prop: item.year,
            name: item.year
          }
        })
        Th.unshift({ prop: 'name', name: '年份' })
        this.sevenTh = sevenTh
        const Td = []
        // 添加总计对象
        Td.push({
          name: '总计',
          ...monthTotal.reduce((acc, item) => {
            acc[item.year] = item.total
            return acc
          }, {})
        })

        // 添加每个月份的对象
        for (let i = 1; i <= 12; i++) {
          const monthName = i + '月'
          const monthData = {}

          monthTotal.forEach((item) => {
            monthData[item.year] = item.taxpayAmount[i - 1]
          })

          fiveTd.push({
            name: monthName,
            ...monthData
          })
        }
        this.sevenTd = sevenTd
      }
    },
    //近三年每月实缴税额
    initSevenData() {
      const taxDeclareSjjeByYear = this.dataObj.taxDeclareSjjeByYear
      if (taxDeclareSjjeByYear.length == 0) return
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
.kai {
  td {
    padding: 20rpx 0 !important;
  }
  .th_bg {
    background-color: #e7f6ff !important;
  }
  & td:nth-child(odd) {
    background-color: transparent !important;
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
.module {
  background-color: #fff;
  margin-top: 24rpx;
}
.card_client {
  padding: 0 32rpx 40rpx 32rpx;
  background-color: #e7f6ff;
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
.active {
  border: 2rpx solid #3d54a2 !important;
}
.btn_item {
  display: flex;
  padding: 20rpx;
  view {
    border-radius: 8rpx 8rpx 8rpx 8rpx;
    padding: 6rpx 20rpx;
    opacity: 1;
    border: 2rpx solid #eaeaea;
    font-size: 28rpx;
    font-weight: 400;
    color: #666666;
  }
}
</style>
