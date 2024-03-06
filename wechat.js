// #ifdef H5
const wx = require("jweixin-module"); //引入JSSDK
export default {
  /**
   * 判断是否在微信中
   */
  isWechat() {
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/micromessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  },
  initJssdk: function (callback) {
    const baseURL = 'http://api.huokexinxi.com' /* 根域名 */
    const url = encodeURIComponent(window.location.href.split('#')[0]);//获取当前url然后传递给后台获取授权和签名信息  
    uni.request({
      url: `${baseURL}/api/user/jssdk`,//你的接口地址  
      data: {
        url: url
      },
      success: (res) => {
        //返回需要的参数appId,timestamp,noncestr,signature等  
        //注入config权限配置  
        console.log(res);
        wx.config({
          debug: false,
          appId: res.data.data.appId,
          timestamp: res.data.data.timestamp,
          nonceStr: res.data.data.nonceStr,
          signature: res.data.data.signature,
          jsApiList: [//这里是需要用到的接口名称  
            'checkJsApi',//判断当前客户端版本是否支持指定JS接口  
            'updateAppMessageShareData',//分享接口  
          ]
        });
        if (callback) {
          callback(res.data);
        }

      }
    })
  },
  /**
   * 唤起微信分享
   * @param {Object} sharedata 分享需要的参数
   * @param {Object} cb 成功回调
   * @param {Object} errorCb 失败回调
   */
  callWexinShare(sharedata = shareOptionsDefalut, cb = () => { }, errorCb = () => { }) {
    this.initJssdk(() => {
      wx.ready(() => {
        console.log('---config注入成功---，开始使用sdk接口')
        // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
        wx.updateAppMessageShareData({
          title: sharedata.title || shareOptionsDefalut.title,
          desc: sharedata.desc || shareOptionsDefalut.desc,
          // 微信对分享图有限制，具体看踩坑
          // imgUrl: (sharedata.imgUrl || shareOptionsDefalut.imgUrl) + '?x-oss-process=image/resize,w_120,m_lfit/format,png/quality,q_80',
          link: window.location.href,
          success: (res) => {
            cb(res)
          },
          cancel: (cancelMsg) => {
            errorCb(cancelMsg)
          }
        })
        // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
        wx.updateTimelineShareData({
          title: sharedata.title || shareOptionsDefalut.title,
          // imgUrl: (sharedata.imgUrl || shareOptionsDefalut.imgUrl) + '?x-oss-process=image/resize,w_120,m_lfit/format,png/quality,q_80',
          link: window.location.href,
          success: (res) => {
            cb(res)
          },
          cancel: (cancelMsg) => {
            errorCb(cancelMsg)
          }
        })
      });
      wx.error((res) => {
        console.log('---注入失败，查看失败原因---', res)
      });
    })
  }
}
// #endif
