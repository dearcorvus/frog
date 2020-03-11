var base64 = require('../utils/base64');

//密码验证
export const sign = (data) => {

  //参数没传值时,该参数不参与签名
  for (let key in data) {
    
    if (null == data[key] && data[key] !== 0) {
      delete data.key
    }
    return getSign(data)
    
  }
}

    /*
     *  生成sign签名
     */
  
export const getSign = (data) =>{
        ksort(data);
        let StrData  =  formatBizQueryParaMap(data,  false);
        StrData = StrData + "&key=wudishiduomojimo";
        let result_ = base64.encode(StrData).toUpperCase();
        return  result_;
}

    //将数组转成uri字符串

export const formatBizQueryParaMap = (paraMap, urlencode) => {
        let buff  =  "";
        ksort(paraMap);
        for (let k in paraMap) 
        {
          buff  = buff + k  +  "="  +  paraMap.k + "&";
        }
        let reqPar = "";
        if  (buff.length  >  0)         {
                      reqPar =  buff.substr( 0, buff.length - 1);
        }
        return  reqPar
}

export const ksort = (o) => {
  let sorted = {},
    keys = Object.keys(o);
  keys.sort();
  keys.forEach((key) => {
    sorted[key] = o[key];
  })
  return sorted;
}
