import storeManager from './store/storeManager'

//app.js
App({
  config:{
    //host: 'http://miaosticker.cn:14488/'  // 通讯域名
    host: 'http://192.168.0.123:14488/'  // 通讯域名
  },

  onLaunch: function () {
    // 读取数据
    storeManager.read()
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.userInfo = res.userInfo
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
         	this.globalData.Custom = capsule;
        	this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
        	this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },

  /**
  * 小程序隐藏事件
  */
  onHide() {
    storeManager.save()
  },

  /**
   * 小程序错误事件
   */
  onError() {
    storeManager.save()
  },

  globalData: {
    userInfo: null,
  }
})