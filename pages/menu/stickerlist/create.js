// pages/menu/stickerlist/create.js
import util from '../../../utils/util'
import Sticker from '../../../models/Sticker'
import storeManager from '../../../store/storeManager'

Page({
  data: {
    // sticker
    sticker: new Sticker(),
    // 区分新建还是编辑
    isNew: false,
  },

  onLoad: function (options) {
    if (options.uuid) {
      this.setData({
        sticker: storeManager.getStickerlistStore().getItem(options.uuid)
      })
    } else {
      this.setData({
        sticker: new Sticker(),
        isNew: true
      })
    }
  },

  /**
   * 标题输入事件
   */
  handleTitleChange(e) {
    this.data.sticker.title = e.detail.value
    this.update()
  },

  /**
   * 内容输入事件
   */
  handleContentChange(e) {
    this.data.sticker.content = e.detail.value
    this.update()
  },

  /**
   * 取消按钮点击事件
   */
  handleCancelTap(e) {
    wx.navigateBack()
  },

  /**
   * 保存按钮点击事件
   */
  handleSaveTap(e) {
    let stickerlistStore = storeManager.getStickerlistStore()
    if (this.data.isNew) {
      stickerlistStore.addItem(this.data.sticker)
    }
    stickerlistStore.save()
    wx.navigateBack()
  },

  /**
   * 更新数据
   */
  update(data) {
    data = data || this.data
    this.data.sticker.lastChangeAt = util.formatTime(new Date())
    this.setData(data)
  },

  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  }
})