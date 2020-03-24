// pages/about/about/about.js
const app = getApp();

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },

  onLoad: function() {},

  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});