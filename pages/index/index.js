//index.js
//获取应用实例
const app = getApp()
const http = require('../../utils/http.js')
const ui = require('../../utils/ui.js')


Page({
  data: {
    movies:[{
      img: "http://hefu2000.com:81/img/20200416/e0cb334c477b498fe2398c8cc33a5d4b.jpg",
      type:1
    },{
      img: "http://hefu2000.com:81/img/20200416/e0cb334c477b498fe2398c8cc33a5d4b.jpg",
      type:1
    }],
    activities: [{
      price:5,
      money:200
    }, {
        price: 5,
        money: 200
    }, {
      price: 5,
      money: 200
    }]
  },
  onLoad: function (options) {

  },
  onShow: function () {
    // app.slideupshow(this, 'slide_up1',-200, 1)
  },
  setContainerHeight: function (e) {

    var imgWidth = e.detail.width;

    var imgHeight = e.detail.height;

    var sysinfo = wx.getSystemInfoSync();

    var screenWidth = sysinfo.screenWidth;

    var scale = screenWidth / imgWidth;

    this.setData({
      height: imgHeight * scale
    })
  },
})
