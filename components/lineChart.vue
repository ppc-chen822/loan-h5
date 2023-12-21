<template>
  <view class="line_chart" style="height: 600rpx">
    <l-echart ref="chart"></l-echart>
  </view>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: {
    chartData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      option: {
        tooltip: {
          left: 0,
          trigger: 'axis'
        },
        legend: {
          left: 20,
          textStyle: {
            fontStyle: '10'
          }
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '5%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ]
        },
        yAxis: {
          type: 'value'
        },
        series: []
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const { chartData } = this
      console.log(chartData)
      this.option.series = chartData.map((res) => {
        return {
          name: res.year,
          type: 'line',
          smooth: true,
          data: res.data
        }
      })
      this.$refs.chart.init(echarts, (chart) => {
        chart.setOption(this.option)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.line_chart {
  padding: 32rpx 0;
}
</style>
