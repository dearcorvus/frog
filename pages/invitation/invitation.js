// pages/invitation/invitation.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneInfo:[],
    mask: false,
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

  },
  createImg: function(){
    let wc = this
    //获取手机宽高 
    wx.getSystemInfo({
      success: function (res) {
        wc.setData({
          phoneInfo:res,
          mask:true
        })
      }
    });
    let phoneInfo = wc.data.phoneInfo
    var windowHeight = phoneInfo.windowHeight, windowWidth = phoneInfo.windowWidth
    wc.setData({
      windowHeight: windowHeight,
      windowWidth: windowWidth
    })

    //在这段代码中，我们通过使用wx.getImageInfo这个API来下载一个网络图片到本地（并可获取该图片的尺寸等其他信息），然后调用ctx.drawImage方法将图片绘制到画布上，填满画布。
    //图片的src地址，请使用小程序内合法域名生成的图片地址。
    const wxGetImageInfo = util.promisify(wx.getImageInfo)
    //绘制二维码
    Promise.all([
      //背景图
      wxGetImageInfo({
        src: 'https://img13.360buyimg.com/n1/jfs/t1/99613/1/7936/137083/5e008c6bE5e54878b/8875b79af4c50f08.jpg'
      }),
      //二维码
      wxGetImageInfo({
        src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1898297765,3486952215&fm=26&gp=0.jpg'
      })
    ]).then(res => {
      console.log(res)
      if (res[0].errMsg == "getImageInfo:ok" && res[1].errMsg == "getImageInfo:ok") {
        const ctx = wx.createCanvasContext('shareCanvas')

        // 底图
        ctx.drawImage(res[0].path, 0, 0, windowWidth, windowHeight)

        //写入文字
        ctx.setTextAlign('center')    // 文字居中
        ctx.setFillStyle('#f3a721')  // 文字颜色：黑色
        ctx.setFontSize(22)         // 文字字号：22px
        ctx.fillText("作者：墜夢—Eric", windowWidth / 2, windowHeight / 2)

        // 小程序码
        const qrImgSize = 150
        ctx.drawImage(res[1].path, (windowWidth - qrImgSize) / 2, windowHeight / 1.8, qrImgSize, qrImgSize)

        ctx.stroke()
        ctx.draw()
      } else {
        wx.showToast({
          title: '邀请卡绘制失败!',
          image: '../../public/img/qw.png'
        })
      }
    })

  },
  saveInviteCard: function () {
    console.log('保存图片')
    const wxCanvasToTempFilePath = util.promisify(wx.canvasToTempFilePath)
    const wxSaveImageToPhotosAlbum = util.promisify(wx.saveImageToPhotosAlbum)

    wxCanvasToTempFilePath({
      canvasId: 'shareCanvas'
    }, this).then(res => {
      return wxSaveImageToPhotosAlbum({
        filePath: res.tempFilePath
      })
    }).then(res => {
      wx.showToast({
        title: '已保存到相册'
      })
    })
  }
})