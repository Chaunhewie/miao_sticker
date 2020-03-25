// pages/menu/stickerlist/home.js
import Sticker from '../../../models/Sticker'
import storeManager from '../../../store/storeManager'

Page({
  data: {
    // 笔记列表
    stickerlist: [],

    // 是否动画延迟
    delay: true,
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
    // stickerlistStore备份
    storeManager.getStickerlistStore().save()
    this.setData(data)
  },

  handleAddSticker() {
    wx.navigateTo({
      url: './create'
    })
  },

  handleStickerTap(e) {
    this.editSticker(e)
  },

  handleStickerChange(e){
    let index = e.currentTarget.dataset.index
    let sticker = e.detail.data.sticker
    let item = this.data.stickerlist[index]
    Object.assign(item, sticker)
    this.update()
  },

  editSticker(e) {
    var uuid = e.currentTarget.dataset.uuid
    wx.navigateTo({
      url: './create?uuid=' + uuid
    })
  },

  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  }
})