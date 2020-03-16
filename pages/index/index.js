//index.js
//获取应用实例
const app = getApp()
const http = require('../../utils/http.js')
const ui = require('../../utils/ui.js')


Page({
  data: {
    trainCity: '',
    show:false,
    mask:false
  },
  onLoad: function (options) {

  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  bindCityView: function () {
    this.setData({
      show:true,
      mask:true
    })
  },
  closeView: function () {
    this.setData({
      show: false,
      mask: false
    })
  },
  onShow: function () {
  }
})
