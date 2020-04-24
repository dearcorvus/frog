// pages/map/map.js
let that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    head_img:''
  },
  getImageInfo:function(url) {    //  图片缓存本地的方法
    let that = this
    if (typeof url === 'string') {
      wx.getImageInfo({   //  小程序获取图片信息API
        src: url,
        success: function (res) {
          that.setData({
            head_img: res.path
          })
        },
        fail(err) {
          console.log(err)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =this
    wx.getUserInfo({    //获取微信用户信息
      success: function (res) {
        console.log(res)
        that.getImageInfo(res.userInfo.avatarUrl);  //  调取图片处理方法
        that.setData({
          userName: res.userInfo.nickName
        });
      }
    })
  },
  handlePoster:function(e) {
    let that = this
    wx.getSetting({  // 获取用户设置
      success(res) {
        console.log(res.authSetting['scope.userInfo'])
        if (!res.authSetting['scope.userInfo']) {  // 如果用户之前拒绝了授权
          wx.openSetting({
            success(tag) {
              if (tag.authSetting["scope.writePhotosAlbum"]) {  // 用户在设置页选择同意授权
                // wx.showLoading({
                //   title: '正在生成...',
                // })
              }
            }
          });
        } else {   //  用户已经授权
          wx.showLoading({
            title: '正在生成...',
          })
          that.createCanvas();
          console.log(12111)
        }
      }
    })
  },
  createCanvas:function(){
    const that = this
    const ctx = wx.createCanvasContext('myCanvas');
    ctx.drawImage('../../public/img/123.png', 0, 0, 690, 1085)

    let headImg = new Promise(function (resolve) {
      wx.getImageInfo({
        src: `${app.globalData.baseUrl2}${that.data.currentChildren.headImg}`,
        success: function (res) {
          resolve(res.path)
        },
        fail: function (err) {
          console.log(err)
          wx.showToast({
            title: '网络错误请重试',
            icon: 'loading'
          })
        }
      })
    })

    let avatarurl_width = 60, //绘制的头像宽度
      avatarurl_heigth = 60, //绘制的头像高度
      avatarurl_x = 28, //绘制的头像在画布上的位置
      avatarurl_y = 36; //绘制的头像在画布上的位置

    ctx.save(); // 先保存状态 已便于画完圆再用
    ctx.beginPath(); //开始绘制
    //先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
    ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);
    ctx.clip(); //画了圆 再剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
    ctx.drawImage(result[0], avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth); // 推进去图片






    // ctx.clearRect(0, 0, 0, 0);
    // const arr2 = ['../../public/img/123.png', '../../ public / img / 123.png'];    // 有图片海报背景图&&海报正文图片
    // const WIDTH = 750;
    // const HEIGHT = 1334;
    // //  绘制图片模板的 底图
    // ctx.drawImage(arr2[0], 0, 0, WIDTH, HEIGHT);
    // ctx.drawImage(arr2[1], 40, 40, 670, 580);
    // // 绘制头像
    // ctx.save();
    // let r = 32;
    // let d = r * 2;
    // let cx = 102;
    // let cy = 1172;
    // ctx.arc(cx + r, cy + r, r, 0, 2 * Math.PI);
    // ctx.clip();
    // ctx.drawImage(that.data.head_img, cx, cy, d, d);
    // ctx.restore();

    // ctx.setFontSize(32);
    // let contentHh = 32 * 1.3;

    // //  绘制 出处
    // ctx.setTextAlign('right')
    // ctx.setFontSize(32);
    // ctx.fillText('——', 710, 996, 710);
    // //  绘制二维码右边说明
    // ctx.setTextAlign('left')
    // ctx.setFontSize(28);
    // ctx.setFillStyle('rgba(34,34,34,.64)')
    // ctx.fillText('长按小程序码', 250, 1174);
    // ctx.fillText(`${that.data.userName}邀你进入掌阅读好书`, 250, 1230);
    ctx.draw();

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

  }
})