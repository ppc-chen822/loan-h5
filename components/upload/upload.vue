<template>
  <view class="upload-content">
    <uv-upload
      :fileList="fileList"
      @afterRead="afterRead"
      @delete="deletePic"
      name="uploadZW"
      multiple
      :maxCount="max"
      width="184rpx"
      height="184rpx"
    >
      <image
        :src="iconUrl"
        mode="widthFix"
        style="width: 100rpx; height: 100rpx"
      ></image>
    </uv-upload>
  </view>
</template>

<script>
export default {
  props: {
    iconUrl: {
      type: String,
      default: ''
    },
    max: {
      type: Number,
      default: 1
    },
    imgList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      iconC: require('@/static/img01.png'),
      fileList: []
    }
  },
  watch: {
    imgList: {
      handler(newValue) {
        this.fileList = newValue
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 删除图片
    deletePic(event) {
      this.fileList.splice(event.index, 1)
    },
    // 新增图片
    async afterRead(event) {
      // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file)
      let fileListLen = this.fileList.length
      lists.map((item) => {
        this.fileList.push({
          ...item,
          status: 'uploading',
          message: '上传中'
        })
        console.log(item)
      })
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url)
        let item = this.fileList[fileListLen]
        this.fileList.splice(
          fileListLen,
          1,
          Object.assign(item, {
            status: 'success',
            message: '',
            ...result
          })
        )
        fileListLen++
      }
    },
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        uni.uploadFile({
          url: `http://api.huokexinxi.com/api/storage/pictures`,
          filePath: url,
          name: 'file',
          header: {
            Authorization: `Bearer ${uni.getStorageSync('token')}`
          },
          formData: {
            // #ifdef H5
            open: true,
            // #endif
            // #ifdef MP-WEIXIN
            open: 'true'
            // #endif
          },
          success: (res) => {
            console.log(res)
            if (res.statusCode === 200) {
              resolve(JSON.parse(res.data))
            } else {
              resolve({
                status: 'failed',
                message: '上传失败'
              })
            }
            uni.hideLoading()
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-content {
  margin-top: 28rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .upload-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 184rpx;
    height: 184rpx;
    background: #fafafa;
    border: 1px solid #e8e9ec;
    border-radius: 8rpx;
  }
  .fileName {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 28rpx;
    color: #222222;
  }
}
</style>
