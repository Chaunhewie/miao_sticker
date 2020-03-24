// pages/menu/me/me.js
//获取应用实例
import wxCharts from '../../../utils/wxcharts'
import storeManager from '../../../store/storeManager'

const app = getApp()

Page({
  data: {
    windowWidth: app.globalData.windowWidth,
    statusBarHeight: app.globalData.statusBarHeight,
    customBarHeight: app.globalData.customBarHeight,

    userInfo: null,
    hasUserInfo: false,

    // 是否展示头像上面的性别小标：0不展示，1展示男，2展示女
    showGenderFlag: 0,

    todolistCount: 0,
    todolistUncompletedCount: 0,
    todolistCompletedCount: 0,
    stickersCount: 0,

    ringChart: null
  },

  onLoad: function() {
    if (app.globalData.hasUserInfo) {
      console.log("用户信息已获取")
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        showGenderFlag: app.globalData.userInfo.gender,
      })
      this.showGenderTag()
    } else {
      console.log("重新获取用户信息")
      wx.getUserInfo({
        success: res => {
          console.log("用户信息获取成功")
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            showGenderFlag: app.globalData.userInfo.gender,
          })
          app.globalData.userInfo = res.userInfo
          app.globalData.hasUserInfo = true
          // 登录
          app.login()
        }
      })
    }
    // update
    this.update()
  },

  onShow() {
    this.syncData()
  },

  onReady() {
    this.renderCharts()
  },

  linkToTodolist() {
    wx.redirectTo({
      url: '../todolist/home'
    })
  },

  linkToSticker() {
    wx.redirectTo({
      url: '../stickerlist/home'
    })
  },

  syncData() {
    let todolistStore = storeManager.getTodolistStore()
    let stickerlistStore = storeManager.getStickerlistStore()
    // 获取清单笔记信息
    this.data.todolistCount = todolistStore.getItemlist().length
    this.data.todolistCompletedCount = todolistStore.getCompletedItemlist().length
    this.data.todolistUncompletedCount = todolistStore.getUncompletedItemlist().length
    this.data.stickersCount = stickerlistStore.getItemlist().length

    // update
    this.update()
  },

  update(data) {
    data = data || this.data
    this.setData(data)
    this.updateCharts()
  },

  updateCharts: function() {
    this.data.ringChart && this.data.ringChart.updateData({
      title: {
        name: [Math.round((this.data.todolistCompletedCount / this.data.todolistCount) * 100), '%'].join('')
      },
      series: [{
        name: '进行中',
        data: this.data.todolistUncompletedCount,
        stroke: false
      }, {
        name: '已完成',
        data: this.data.todolistCompletedCount,
        stroke: false
      }]
    })
  },

  renderCharts() {
    this.data.ringChart = new wxCharts({
      animation: true,
      canvasId: 'charts_todolist_info',
      type: 'ring',
      extra: {
        ringWidth: 25,
        pie: {
          offsetAngle: -45
        }
      },
      title: {
        name: [Math.round((this.data.todolistCompletedCount / this.data.todolistCount) * 100), '%'].join(''),
        color: '#7cb5ec',
        fontSize: 25
      },
      subtitle: {
        name: '完成率',
        color: '#666666',
        fontSize: 15
      },
      series: [{
        name: '进行中',
        data: this.data.todolistUncompletedCount,
        stroke: false
      }, {
        name: '已完成',
        data: this.data.todolistCompletedCount,
        stroke: false
      }],
      disablePieStroke: true,
      width: this.data.windowWidth,
      height: 200,
      dataLabel: false,
      legend: true,
      background: '#f5f5f5',
      padding: 0
    })
  },

  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  },
})