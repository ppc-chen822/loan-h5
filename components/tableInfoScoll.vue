<template>
  <view class="table_info">
    <empty
      v-if="th.length == 0"
      text="暂无数据"
      iconSize="70"
      mode="data"
      :isFull="false"
    />
    <view class="table_con" v-else>
      <table
        class="table"
        width="100%"
        cellspacing="0"
        bordercolor="#efefef"
        cellpadding="10"
        frame="solid"
        rules="solid"
      >
        <thead class="tablehead">
          <tr class="table_th">
            <th style="width: 100rpx" v-for="(item, index) in th" :key="index">
              {{ item.name }}
            </th>
          </tr>
        </thead>
        <tbody align="center" class="tableBody">
          <tr
            :class="trBorder ? 'table_bb_tr' : ''"
            v-for="(item, index) in newTd"
            :key="index"
          >
            <td
              :class="tdBorder ? 'table_td' : ''"
              v-for="(val, inx) in th"
              :key="inx"
            >
              {{ item[val.prop] == null ? '--' : item[val.prop] }}
            </td>
          </tr>
          <tr v-if="td.length > 6">
            <td colspan="4" class="text-gray-900 f14">
              <loadMore @toggle="toggle" />
            </td>
          </tr>
        </tbody>
      </table>
    </view>
  </view>
</template>

<script>
import loadMore from './loadMore.vue'
export default {
  components: { loadMore },
  props: {
    isTitle: {
      type: Boolean,
      default: false
    },
    thLeft: {
      type: String,
      default: ''
    },
    tdBorder: {
      type: Boolean,
      default: true
    },
    trBorder: {
      type: Boolean,
      default: false
    },
    isMore: {
      type: Boolean,
      default: false
    },
    th: {
      type: Array,
      default: () => []
    },
    td: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    td(newValue) {
      if (newValue.length > 6) {
        this.newTd = [...newValue].slice(0, 6) // 在原始数组变化时更新新数组
      } else {
        this.newTd = [...newValue] // 在原始数组变化时更新新数组
      }
    }
  },
  data() {
    return {
      newTd: []
    }
  },
  mounted() {
    this.newTd = [...this.td]
  },
  methods: {
    //展开收收起
    toggle(e) {
      const { td } = this
      e ? (this.newTd = td) : (this.newTd = td.slice(0, 6))
    }
  }
}
</script>

<style lang="scss" scoped>
.table_info {
  background-color: #fff;
  padding: 20rpx;
  font-size: 24rpx;
}
.table_con {
  overflow-y: auto;
}
.table {
  border: 1rpx solid #efefef;
  border-collapse: collapse;
}
.tablehead {
  background-color: #f1f5f8;
  border: 1rpx solid #efefef;
}
th {
  border: 1rpx solid #efefef;
  white-space: nowrap;
}
td {
  white-space: nowrap;
}
.table_bb_tr {
  border-bottom: 1rpx solid #efefef !important;
}
.table_td {
  border: 1rpx solid #efefef;
}
</style>
