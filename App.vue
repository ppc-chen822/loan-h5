<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {},
  onHide: function () {}
}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import 'uview-ui/index.scss';
// 引入和风天气字体图标
@import url('./icon/qweather-icons.css');
view {
  font-family: $fontFamily;
}
</style>
