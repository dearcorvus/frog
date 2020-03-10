const ui = require("../utils/ui.js")
const base_url = ""

const request = function(method){

  return (obj)=>{

    console.log('require obj')
    console.log(obj)

    if(!obj || !obj.url) return;

    if (obj.showLoading != false){
      ui.showLoading('加载中...')
    }

    try{
      var value = wx.getStorageSync('cookie')
      if(value){
        header['cookie'] = value
      }
    } catch(e){

    }

    wx.request({
      url: encodeURL(obj.url),
      method:method,
      data:data,
      header:header,
      success:(res)=>{
        console.log(res)
        if(!res.data || res.statusCode >= 300 || res.statusCode < 200){
          ui.showToast("接口请求失败,稍后重试!")
          if(obj.fail){
            obj.fail()
          }
          return
        }

        if(res.data.errorCode < 0){
          ui.showToast(res.data.errMsg)
          if(obj.fail){
            obj.fail()
          }
          return
        }

        if(res.success){
          if (obj.obtainResponse){
            obj.success(res)
          }else{
            obj.success(res.data.data)
          }
        }
      },
      fail: () => {
        ui.showToast("接口请求失败, 请稍后重试!")
        if (obj.fail) {
          obj.fail()
        }
      },
      complete: () => {
        ui.hideLoading()
      }
    })
  }
}

module.exports = {
  get: request('GET'),
  post: request('POST'),
  delete: request('DELETE'),
  put: request('PUT')
}