<template>
  <view class="product_info">
    <!-- <com-title title="产品匹配" :icon="titleIcon" :isBorder="false" /> -->
    <good-product />
  </view>
</template>

<script>
import comTitle from '@/components/comTitle.vue'
import goodProduct from '@/components/goodProduct.vue'
export default {
  components: { goodProduct, comTitle },
  data() {
    return {
      titleIcon: require('@/static/a1.png')
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.product_info {
  // margin-top: 24rpx;
}
</style>
