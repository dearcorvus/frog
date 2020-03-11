
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

//返回上一页
var isChick = false
export const navigateBack = (page) => {
  if (isChick) return
  isChick = true

  var pages = getCurrentPages();//页面指针数组
  var prepage = pages[pages.length - page];//上一页面指针

  wx.navigateBack({
    delta: prepage,
  });//返回上一页面

  setTimeout(() => { isChick = false }, 500)
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

//密码验证
export const password = (password)=> {
  if (!password.trim()) {
    showToast('密码不可以为空!')
    return false
  }else{
    if (password.trim().length < 6 || password.trim().length > 20 ){
      showToast('密码不正确!')
      return false
    }
  }
  return true;
}

//手机号验证
export const phone = (phone) => {
  if (!phone.trim()) {
    showToast('手机号不可以为空!')
    return false
  } else {
    if (phone.trim().length != 11 ) {
      showToast("手机号码有误，请重填");
      return false
    }else{
      if (!(/^1[3456789]\d{9}$/.test(phone))) {
        showToast("手机号码有误，请重填");
        return false;
      } 
    }
  }
  return true;
}