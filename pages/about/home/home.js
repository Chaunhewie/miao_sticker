// pages/about/home/home.js

const app = getApp()

Component({
  options: {
    addGlobalClass: true,
  },

  data: {
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
  },

  attached() {
    console.log("About home page, attached success")
    let that = this;
    that.setData({
      starCount: "...",
      forksCount: "...",
      visitTotal: "..."
    })
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })

    function numDH() {
      wx.request({
        url: app.globalData.serverUrl,
        timeout: 1000,
        method: "GET",
        data: {
          type: "repo_info",
        },
        success: function(res) {
          console.log("About home page, github info request success")
          console.log(res.data)
          if (res.data["success"]) {
            that.setData({
              starCount: that.coutNum(res.data["stargazers_count"]),
              forksCount: that.coutNum(res.data["forks_count"]),
              visitTotal: that.coutNum(res.data["watchers_count"])
            })
          } else {
            that.setData({
              starCount: "...",
              forksCount: "...",
              visitTotal: "..."
            })
          }
        },
        fail: function(res) {
          console.error("About home page, github info request failed")
          that.setData({
            starCount: "...",
            forksCount: "...",
            visitTotal: "..."
          })
        },
        complete: function(res) {
          wx.hideLoading()
        }
      })
    }
    numDH();
  },

  methods: {
    coutNum(e) {
      if (e > 1000 && e < 10000) {
        e = (e / 1000).toFixed(1) + 'k'
      }
      if (e > 10000) {
        e = (e / 10000).toFixed(1) + 'W'
      }
      return e
    },

    CopyLink(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.link,
        success: res => {
          wx.showToast({
            title: '已复制',
            duration: 1000,
          })
        }
      })
    },

    showQrcode() {
      wx.previewImage({
        urls: ['https://raw.githubusercontent.com/Chaunhewie/miao_sticker/master/assets/img/ShareQRCode.jpg'],
        current: 'https://raw.githubusercontent.com/Chaunhewie/miao_sticker/master/assets/img/ShareQRCode.jpg' // 当前显示图片的http链接      
      })
    },
  }
})