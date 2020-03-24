// pages/menu/stickerlist/home.js
import Sticker from '../../../models/Sticker'
import storeManager from '../../../store/storeManager'

Page({
  data: {
    // 笔记列表
    stickerlist: [],

    // 是否动画延迟
    delay: true
  },

  onShow: function() {
    // 为了新建后列表能更新，此逻辑必须写在 onShow 事件
    this.syncData()
  },

  onHide: function() {
    this.syncData()
  },


  /**
   * 分享
   */
  onShareAppMessage: function(options) {

  },

  syncData() {
    // 获取列表
    this.data.stickerlist = storeManager.getStickerlistStore().getItemlist()
    this.update()
    // 动画结束后取消动画队列延迟
    setTimeout(() => {
      this.setData({
        delay: false
      })
    }, 2000)
  },

  update(data) {
    data = data || this.data
    // todolistStore备份
    storeManager.getStickerlistStore().save()
    this.setData(data)
  },

  // 点击事件
  handleStickerTap(e) {
    // 判断锁
    if (this.disableTap) return
    // todo 在这里执行点击事件
  },

  // 长按事件
  handleStickerLongTap(e) {
    // 加锁 tap 事件
    this.disableTap = true
    // 在这里执行长按操作
  },

  // Touch End 事件
  handleStickerTouchEnd() {
    // 解锁 tap 事件
    setTimeout(() => this.disableTap = false, 300)
  },

  /**
   * 新建按钮点击事件
   */
  handleAddSticker() {
    wx.navigateTo({
      url: '../sticker/create'
    })
  },

  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  }
})