<template>
  <view class="table_info">
    <empty
      v-if="th.length == 0"
      text="暂无数据"
      iconSize="70"
      mode="data"
      :isFull="false"
    />
    <table
      v-else
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
          <!-- <th class="tiltLine" width="25%">
            <span class="year">年份</span><span class="month">月份</span>
          </th> -->

          <template v-if="isTitle">
            <th
              :class="index == 0 ? 'tiltLine' : ''"
              v-for="(item, index) in th"
              :key="index"
              :style="index == 0 ? 'width:25%' : ''"
            >
              <template v-if="index != 0">
                <view>
                  {{ item.name }}
                </view>
              </template>
              <view v-else class="tiltLine" width="25%">
                <span class="year">年份</span><span class="month">税种</span>
              </view>
            </th>
          </template>
          <template v-else>
            <th v-for="(item, index) in th" :key="index">
              {{ item.name }}
            </th>
          </template>
          <!-- <th>2022</th>
          <th>2023</th> -->
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
            <view v-if="inx == 0">{{ item[val.prop] }} </view>
            <view>
              {{ item[val.prop].rate }}<br />
              {{ item[val.prop].taxpayAmount }}
            </view>
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
.table {
  border: 1rpx solid #efefef;
  border-collapse: collapse;
}
.tiltLine {
  position: relative;
  background: linear-gradient(
    20deg,
    transparent 48.5%,
    #efefef 49.5%,
    #efefef 36.5%,
    transparent 51.5%
  );
  .year {
    position: absolute;
    right: -10rpx;
    top: -30rpx;
  }
  .month {
    position: absolute;
    left: -10rpx;
    bottom: -30rpx;
  }
}
.tablehead {
  background-color: #e7f6ff;
  border: 1rpx solid #efefef;
}
th {
  border: 1rpx solid #efefef;
}
.table_bb_tr {
  border-bottom: 1rpx solid #efefef !important;
}
.table_td {
  border: 1rpx solid #efefef;
}
// .table_tr {
//   border-bottom: 1rpx solid #efefef !important;
// }
// tr {
//   border-bottom: 1rpx solid #efefef !important;
// }
.table_tr {
  & td:first-child {
    // text-align: left;
  }
}
.table_th {
  & th:first-child {
    // text-align: left;
  }
}
</style>
