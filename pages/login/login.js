// pages/login/login.js
const http = require('../../utils/http')
const ui = require('../../utils/ui')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    system: {},
    currentPage: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          system: res
        })
      }
    })
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
  /**
   * 切换
   */
  switchSwiper: function (e) {
    this.setData({
      currentPage: e.currentTarget.id
    })
  },
  swiperChange: function (e) {
    if (e.detail.current == this.data.currentPage) return
    setTimeout(function () {
      this.setData({
        currentPage: e.detail.current
      })
    }.bind(this), 300)
  },
  login:function(e){
    let username = e.detail.value.username;
    let password = e.detail.value.password;
    
    if (ui.phone(username) && ui.password(password)){
      http.post({
        url: 'login/login',
        data: {
          username: username,
          password: password
        }
      })

    }
  },
  register:function(e){
    let username = e.detail.value.username;
    let password = e.detail.value.password;
    let confirmPassword = e.detail.value.confirmPassword;

    if (ui.phone(username) && ui.password(password)) {

      if (password != confirmPassword){
        ui.showToast('两次密码不同,请重新输入!')
        return false
      }

      http.post({
        url:'login/register',
        data:{
          username: username,
          password: password,
          confirmPassword: confirmPassword
        }
      })
    }
  }
})