// pages/menu/me/me.js
//获取应用实例
import wxCharts from '../../../utils/wxcharts'
import storeManager from '../../../store/storeManager'

const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userInfo: Object.assign({
      avatarUrl: '../../../assets/img/MiaoLogo.png',
      nickName: 'yh57231902'
    }),
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    todolistCount: 0,
    todolistUncompletedCount: 0,
    todolistCompletedCount: 0,
    stickersCount: 0,
    
    ringChart: null
  },

  onLoad: function () {
    if (app.globalData.hasUserInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
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

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  linkToTodolist() {
    wx.redirectTo({
      url: '../todolist/home'
    })
  },

  linkToSticker() {
    wx.redirectTo({
      url: '../sticker/home'
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

  updateCharts: function () {
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
      canvasId: 'charts',
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
  }
})
