
//提示信息
export const showToast = function(content,duration){
  if (!duration) duration = 2000

  wx.showToast({
    title: content,
    icon:'none',
    duration:duration
  })

}

//加载
var isShowLoading = false
export const showLoading = function(title){
  if(isShowLoading) return;

  wx.showLoading({
    title: title?title:'',
    mask:true,
    success:()=>{
      isShowLoading =true
    }
  })
}
//关闭加载
export const hideLoading = function(){
  if(!isShowLoading) return
  isShowLoading = false
  wx.hideLoading()
}
//跳转
var isChick = false
export const navigateTo = (url)=>{
  if(isChick) return
  isChick = true
  wx.navigateTo({
    url: url
  })
  setTimeout(()=>{isChick = false},500)
}

export const toDetail = (url)=>{
  wx.setClipboardData({
    data: url,
    success(res){
      wx.getClipboardData({
        success(res){
          showToast('链接已复制，请在浏览器中打开')
        }
      })
    }
  })
}