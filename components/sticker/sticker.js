// components/sticker/sticker.js
import Sticker from '../../models/Sticker'

Component({
  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    sticker: {
      type: Sticker,
      default: new Sticker()
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 长按加锁，防止同时触发tap
    longTapLock: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleStickerTap(e) {
      // 如果是长按触发的tap，直接忽略
      if(this.judgeTapAfterLongTap()){
        return
      }
      // 正常tap逻辑
      if (this.data.sticker.disabled){
        return
      }
      this.triggerEvent('stickerTap', this)
    },
    
    handleStickerLongTap(e) {
      this.data.sticker.disabled = !this.data.sticker.disabled
      this.setData({
        sticker: this.data.sticker,
        longTapLock: true
      })
      this.triggerEvent('change', this)
    },

    judgeTapAfterLongTap(){
      if (this.data.longTapLock) {
        this.setData({
          longTapLock: false
        })
        return true
      }
      return false
    }
  }
})