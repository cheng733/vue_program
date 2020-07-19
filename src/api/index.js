import ajax from './ajax'

/*根据经纬度获取位置详情*/
export const reqAddress = (geohash) => ajax('/api/position',{geohash})
/*获取食品分类列表*/
export const reqFoodsCategory = () => ajax('/api/index_category')
/*根据经纬度获取商铺列表*/
export  const reqShopsCategory = (latitude,longitude) => ajax('/api/shops',{latitude,longitude})
/*根据经纬度和关键字搜索商铺列表*/
export  const reqShopList = (geohash,keyword) => ajax('/api/search_shops',{geohash,keyword})
/*获取一次性验证码*/
export  const reqCaptcha = () => ajax('/api/captcha')
/*用户名密码登录*/
export const reqLoginPwd = ({name,pwd,captcha}) =>ajax('/api/login_pwd',{name,pwd,captcha},'Post')
/*发送短信验证码*/
export  const reqSendCode = (phone) => ajax('/api/sendcode',{phone})
/*手机号验证码登录*/
export const reqLoginSms = ({phone,code}) => ajax('/api/login_sms',{phone,code},'Post')
/*根据会话获取用户信息*/
export  const reqUserInfo = () => ajax('/api/userinfo')
/*用户登出*/
export const reqLogout = () => ajax('/api/logout')
/*mockjs的接口*/
//食品列表
export const reqGoods = () => ajax('/goods')
//评价
export const reqRatings = () => ajax('/ratings')
//商家信息
export const reqInfo = () => ajax('/info')
