//index.js
//获取应用实例
const app = getApp()
const http = require('../../utils/http.js')
const ui = require('../../utils/ui.js')
Page({
  data: {
    showActionsheet: false,
    logo:'../../public/img/zf.jpg',
    titleActionsheet:'nihao',
  },
  btnClick:function(){
   let data =  wx.setStorageSync()
  console.log(data)

    // let that = this;



    // that.setData({
    //   showActionsheet:true
    // })
  },
  agreeActionSheet:function(){
    console.log(123);
  }
})