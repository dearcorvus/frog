//index.js
//获取应用实例
const app = getApp()
const http = require('../../utils/http.js')
const ui = require('../../utils/ui.js')


Page({
  data: {
    trainCity: ''
  },
  onLoad: function (options) {

  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  bindCityView: function () {
    wx.navigateTo({
      url: '../citys/citys',
    })
  },
  onShow: function () {
    this.setData({ trainCity: app.globalData.trainCity })
  }
})
