//app.js
const CONFIG = require('config.js')
const auth = require('utils/auth')
var  frog 


App({
  onLaunch: function () {
    frog = CONFIG // 从根目录的 config.js 文件中读取
    const that = this;

    //检测版本
    const updateManager = wx.getUpdateManager()

    updateManager.onUpdateReady( function ( ) {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    /**
     * 初次加载判断网络情况
     * 无网络状态下根据实际情况进行调整
     */
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        if (networkType === 'none') {
          that.globalData.isConnected = false
          wx.showToast({
            title: '当前无网络',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    });
    /**
     * 监听网络状态变化
     * 可根据业务需求进行调整
     */
    wx.onNetworkStatusChange(function (res) {
      if (!res.isConnected) {
        that.globalData.isConnected = false
        wx.showToast({
          title: '网络已断开',
          icon: 'loading',
          duration: 2000,
          complete: function () {
            that.goStartIndexPage()
          }
        })
      } else {
        that.globalData.isConnected = true
        wx.hideToast()
      }
    });

    // 自动登录
    auth.checkHasLogined().then(isLogined => {
      if (!isLogined) {
        auth.login()
      }
    })
  },
  wxlogin:function(){
    
  },
  globalData: {
    isConnected: true,
    launchOption: undefined,
    vipLevel: 0
  }
})