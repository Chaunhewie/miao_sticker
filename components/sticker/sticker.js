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
    // 加锁还是删除按钮
    lockOrDeleteIcon: '', // 控制图标的变量
    // 加锁按钮和删除按钮的动画
    lockOrDeleteAnimation: '',
    LOCK_ICON: 'lock', // 加锁图标名字
    DELETE_ICON: 'close', // 删除图标名字

  },

  /**
   * 组件的生命周期(https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/lifetimes.html)
   */
  lifetimes: {
    attached: function () {
      // console.log("attached", this.data.sticker.disabled)
      this.setData({
        lockOrDeleteIcon: this.data.sticker.disabled ? this.data.LOCK_ICON : this.data.DELETE_ICON
      })
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTitleTap(e){
      this.handleStickerTap(e)
    },

    handleContentTap(e) {
      this.handleStickerTap(e)
    },

    handleStickerTap(e) {
      if (this.data.sticker.disabled) {
        return
      }
      this.triggerEvent('stickerTap', this)
    },
    
    handleStickerDeleteTap(e){
      if(this.data.sticker.disabled) return
      // 处理删除逻辑
      this.triggerEvent('delete', this)
    },

    handleStickerLongPress(e) {
      this.data.sticker.disabled = !this.data.sticker.disabled
      this.setData({
        sticker: this.data.sticker,
      })
      this.hideAndShowIcon(this.data.sticker.disabled)
      this.triggerEvent('change', this)
    },

    // 渐变切换锁图标和删除图标
    hideAndShowIcon(disabled) {
      let that = this
      var animation = wx.createAnimation({
        duration: 600,
        timingFunction: 'linear',
      })
      animation.opacity(0).step().opacity(1).step()
      setTimeout(function() {
        that.setData({
          lockOrDeleteIcon: disabled ? that.data.LOCK_ICON : that.data.DELETE_ICON
        })
      }, 600)
      that.setData({
        lockOrDeleteAnimation: animation.export()
      })
    },
  }
})