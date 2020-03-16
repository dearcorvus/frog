// pages/visaCity/visaCity.js
const app = getApp()
const http = require('../../utils/http.js')
const ui = require('../../utils/ui.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    trainCity: '',
    mask: false,
    showNotice: false,
    showCity: false
  },
  /**
   * 公告信息
  */
  showNotice:function(){
    this.setData({
      mask: true,
      showNotice: true
    })
  },
  /**
  * 居住地信息
  */
  showCity: function () {
    this.setData({
      mask: true,
      showCity: true
    })
  },
  /**
   * 关闭弹窗
   */
  closeActionSheet:function(){
    this.setData({
      mask: false,
      showNotice: false,
      showCity: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let country = app.globalData.trainCity 
    wx.setNavigationBarTitle({
      title: country+"签证",
    })
    
    this.setData({ trainCity: country })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})