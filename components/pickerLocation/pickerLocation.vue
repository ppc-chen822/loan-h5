<template>
  <view class="locationPicker-content">
    <view class="input-con" @click="show">
      <view class="value-con" :style="{ color }">{{
        location || placeholder
      }}</view>
      <u-icon name="arrow-down-fill" :color="color" size="14" />
    </view>

    <u-popup :show="popupShow" round="10" @close="popupShow = false">
      <view class="tree-content">
        <view class="title">
          <common-title title="选择准入区域" :isMore="false" />
        </view>
        <view class="inner-content">
          <luyj-tree
            :trees="locationTree"
            :props="treeProps"
            :search-if="true"
            :is-check="true"
            check-active-color="#f45249"
            @change="save"
            @sendValue="confirm"
          />
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
// 该组件暂时无法使用
import { getCityTreeApi } from '@/api/home.js'
import commonTitle from '@/components/commonTitle/commonTitle.vue'
export default {
  components: {
    commonTitle
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: String | Object,
      default: ''
    },
    color: {
      type: String,
      default: '#fff'
    },
    placeholder: {
      type: String,
      default: '行政区划'
    },

    // name:只返回地区名称(默认)
    // code:只返回地区编码
    // all: 全部返回
    // strAll
    returnType: {
      type: String,
      default: 'name'
    },

    defaultId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      location: '',
      popupShow: false,
      inputStyle: {
        inputAlign: 'right',
        border: 'none',
        confirmType: 'next'
      },
      locationTree: [],
      allCity: [],
      treeProps: {
        id: 'id',
        label: 'name',
        children: 'children',
        multiple: true,
        checkStrictly: false,
        nodes: false
      }
    }
  },
  watch: {
    value: {
      handler(newValue) {
        this.showDefault()
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.getLocationFun()
  },
  methods: {
    show() {
      this.popupShow = true
      uni.hideKeyboard()
    },
    // 回显默认值
    showDefault() {
      const { value } = this
      if (value) {
        console.log('pickerLocation回显默认值', value)
        const { returnType } = this
        if (returnType === 'all') {
          this.location = value.name
        } else if (returnType === 'name') {
          this.location = value
        }
      }
    },
    confirm(data) {
      console.log(data)
      this.getLocationById(35)
      return
      const chooseArr = data
      let result = []
      chooseArr.forEach((element) => {
        const { parentId, name, id } = element
        if (parentId === '0') {
          let obj = {
            name,
            id
          }
          result.push(obj)
        } else {
        }
      })
      console.log(result)
    },
    // 确认选择
    save(data) {
      console.log(data)

      // if (data.length === 0) {
      //   uni.$u.toast('请选择行政区划')
      //   return
      // }
      // const { returnType } = this
      // const { name, id } = data[0]
      // this.location = name
      // if (returnType === 'code') {
      //   // 返回地区编码
      //   this.$emit('input', id)
      // } else if (returnType === 'name') {
      //   // 返回地区名称
      //   this.$emit('input', name)
      // } else if (returnType === 'strAll') {
      //   this.$emit('input', id + '-' + name)
      // }
      // if (returnType === 'all') {
      //   // 返回全部
      //   const obj = {
      //     code: id,
      //     name: name
      //   }
      //   this.$emit('input', obj)
      // }
      // this.popupShow = false
    },
    // 根据id查询地区
    getLocationById(id) {
      const { allCity } = this
      return (result = allCity.filter((item) => item.id === id))
    },
    // =============== API ===============
    // 查询行政区划 树形数据
    getLocationFun() {
      getCityTreeApi()
        .then((res) => {
          this.locationTree = res
          this.allCity = res
          // 在数组头部手动增加一个名字叫[全部]的选项, 该选项的id为0, 为写死的值
          // const firstOption = [
          //   {
          //     id: '',
          //     name: '全部'
          //   }
          // ]
          // this.locationTree = [...firstOption, ...this.locationTree]
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.input-con {
  display: flex;
  justify-content: center;
  align-items: baseline;
  .value-con {
    color: #ffffff;
    padding-right: 10rpx;
    padding-bottom: 6rpx;
    max-width: 300rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 28rpx;
  }
}

.tree-content {
  height: 1200rpx;

  .title {
    margin: 30rpx;
  }
}

.inner-content {
  height: 1000rpx;
  overflow-y: auto;
}
</style>
