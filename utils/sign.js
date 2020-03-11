//密码验证
export const sign = (data) => {

  //参数没传值时,该参数不参与签名
  for (let key in data) {
    
    if (null == data[key] && data[key] !== 0) {
      delete data[key]
    }


  }









}