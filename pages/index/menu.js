// pages/index/menu.js
Page({
  data: {
    PageCur: 'menu'
  },

  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  
})