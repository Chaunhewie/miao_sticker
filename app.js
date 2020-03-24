//app.js
import storeManager from './store/storeManager'

const config = require('config.js');

App({
  globalData: {
    serverUrl: config.serverUrl, // 接口地址
    loginUrl: config.loginUrl, // 登录接口地址

    windowWidth: 0,
    statusBarHeight: 0,
    customBarHeight: 0,
    // colorui cu-cumtom 组件所需变量
    Custom: null,
    CustomBar: 0, // 等于customBarHeight
    StatusBar: 0, // 等于statusBarHeight

    userInfo: null,
    hasUserInfo: false,
    userCode: "",
    isUserLogin: false,
  },

  onLaunch: function() {
    // 获取用户信息授权并获取用户信息并登录
    this.getUserInfoAuth()
    // 读取数据
    storeManager.read()
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.windowWidth = e.windowWidth // 可使用窗口宽度，单位px
        this.globalData.statusBarHeight = e.statusBarHeight // 状态栏的高度，单位px
        let capsule = wx.getMenuButtonBoundingClientRect() // 右上角胶囊控件，以左上角为原点
        if (capsule) {
          this.globalData.customBarHeight = capsule.bottom + capsule.top - e.statusBarHeight
        } else {
          this.globalData.customBarHeight = e.statusBarHeight + 50
        }
        this.globalData.Custom = capsule
        this.globalData.CustomBar = this.globalData.customBarHeight
        this.globalData.StatusBar = this.globalData.statusBarHeight
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

  getUserInfoAuth() {
    console.log("获取用户信息授权")
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序获取用户信息，后续调用 wx.getUserInfo 接口不会弹窗询问
              console.log("用户信息授权成功！")
              this.getUserInfoAndLogin()
            }
          })
        } else {
          console.log("用户信息已授权")
          this.getUserInfoAndLogin()
        }
      }
    })
  },

  getUserInfoAndLogin() {
    console.log("获取用户信息！")
    wx.getUserInfo({
      success: res => {
        console.log("用户信息获取成功")
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        // 登录
        this.login()
      }
    })
  },

  login() {
    console.log("用户进行登录")
    wx.login({
      success(res) {
        if (res.code) {
          this.setData({
            userCode: res.code,
          })
          //发起网络请求
          wx.request({
            url: config.loginUrl,
            method: "POST",
            data: {
              type: "login",
              code: res.code,
              nick_name: this.globalData.userInfo.nickName,
              avatar_url: this.globalData.userInfo.avatarUrl,
              gender: this.globalData.userInfo.gender,
            },
            success: function(res) {
              if (res.success) {
                console.log('登录成功！' + res.msg)
                this.setData({
                  isUserLogin: true,
                })
              } else {
                console.log('登录失败！' + res.msg)
                this.setData({
                  isUserLogin: false,
                })
              }
            }
          })
        } else {
          console.log('网络连接失败！')
        }
      }
    })
  }
})