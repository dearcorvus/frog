// pages/user/user.js
const app = getApp()
const auth = require('../../utils/auth')
const ui = require('../../utils/ui')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showActionsheet: false,
    title:"青蛙旅行申请",
    logo:"../../public/img/user.jpg",
    groups: []
  },
  close: function () {
    this.setData({
      showActionsheet: false
    })
  },
  btnClick: function () {
    let that = this;
    that.setData({
      showActionsheet: true
    })
    // ui.navigateTo('../loginModel/loginModel');

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

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

  },
})