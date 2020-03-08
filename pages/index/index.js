/* pages/index/index.js */
//获取应用实例
const app = getApp()

Page({
  data: {
  },

  //事件处理函数
  bindViewTap: function() {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(() => {
      // 打开菜单页面
      this.openPage()
    }, 1000)
  },

  /**
   * 导航到菜单页面
   */
  openPage(replace) {
    // 导航
    wx.navigateTo({
      url: '../index/menu',
    })
  }
})
