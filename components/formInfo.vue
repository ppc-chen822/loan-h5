<template>
  <view class="form_data">
    <com-title title="企业概况" :icon="titleIcon" />
    <u-cell-group :border="false">
      <u-cell
        v-for="(item, index) in formData"
        :key="index"
        :title="item.name"
        :value="item.value"
      >
        <view slot="value" v-if="!item.value" class="u-slot-title"></view>
      </u-cell>
    </u-cell-group>
    <view class="load_more_com">
      <load-more @toggle="toggle" />
    </view>
  </view>
</template>

<script>
import comTitle from './comTitle.vue'
import loadMore from './loadMore.vue'
export default {
  components: { comTitle, loadMore },
  data() {
    return {
      titleIcon: require('@/static/a1.png'),
      formDataArr: [
        {
          name: '企业名称',
          value: '深圳****有限公司'
        },
        {
          name: '税号',
          value: '91543************'
        },
        {
          name: '成立时间',
          value: '2008-08-08'
        },
        {
          name: '纳税人种类',
          value: '一般纳税人'
        },
        {
          name: '企业类型',
          value: '有限责任公司(自然人投资或控股)'
        },
        {
          name: '税号',
          value: '91543************'
        },
        {
          name: '企业名称',
          value: '深圳****有限公司'
        }
      ],
      formData: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化数据
    init() {
      const { formDataArr } = this
      this.formData = formDataArr.slice(0, 6)
    },
    //展开收收起
    toggle(e) {
      const { formDataArr } = this

      e
        ? (this.formData = formDataArr)
        : (this.formData = formDataArr.slice(0, 6))
    }
  }
}
</script>

<style lang="scss" scoped>
.form_data {
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
