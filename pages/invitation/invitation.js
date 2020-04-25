// pages/invitation/invitation.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneInfo:[],
    mask: false,
    sHeight:0,
    wheight:''
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
          mask: true,
          showOrder: true
        })
      }
    });
    let phoneInfo = wc.data.phoneInfo
    var windowHeight = phoneInfo.windowHeight, windowWidth = phoneInfo.windowWidth
    wc.setData({
      windowHeight: windowHeight,
      windowWidth: windowWidth,
      wheight: windowHeight  * 0.6
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
      }),
      wxGetImageInfo({
        src: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1898297765,3486952215&fm=26&gp=0.jpg'
      })
    ]).then(res => {
      console.log(res)
      if (res[0].errMsg == "getImageInfo:ok" && res[1].errMsg == "getImageInfo:ok") {
        const ctx = wx.createCanvasContext('shareCanvas')
        ctx.setFillStyle('#fff')
        ctx.fillRect(0, 0, windowWidth - 160, 800)
        // 底图
        ctx.drawImage(res[0].path, 0, 0, windowWidth - 160,200)

        //写入文字
        // ctx.setTextAlign('center')    // 文字居中
        ctx.setFillStyle('#000')  // 文字颜色：黑色
        ctx.setFontSize(16)         // 文字字号：22px
        ctx.fillText("作者：墜夢—Eric",20, 240)

        // 小程序码
        const qrImgSize = 100
        ctx.drawImage(res[2].path, (windowWidth - qrImgSize - 160) / 2, 250, qrImgSize, qrImgSize)

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
  },
  closeTo:function(){
    this.setData({
      mask: false,
      showOrder: false
    })
  },
  createMM:function(){
    let that = this
    let ACCESS_TOKEN = "32_3n-crEiJj5cSbmmcHCSv7k_pE089AZYLKO4dhYWFyAju4d0EILhOObB2uqJw89vu1MWR9GydiXSPdj85wQi_30rWGsk9aVxaK4Z7g3KchFnVLECMcpyubMzlVn-M7yMT458eIpRsv-x-UdkEYSLeAHADXQ"
    wx.request({
      url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + ACCESS_TOKEN,
      method: 'post',
      data:{
        scene:1,
        page:'pages/index/index'
      },
      success:function(res){

        let qrImg = res.data
        console.log(qrImg)
        that.setData({
          simg: qrImg
        })
      }
    })
  }
})