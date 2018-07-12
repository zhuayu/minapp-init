import API from './api.js';
import { DataStore } from './DataStore.js';

/*
** @params[success]  成功获取用户信息
** @params[fail]     获取用户信息失败
** @params[authfail] 用户不授权
*/

export class userModel{
  constructor(param) {

  }

  static getUserInfo(config = {}) {
    let success = config.success;
    let fail  = config.fail;
    let authfail = config.authfail;

    // 缓存获取
    const userInfoInDataStore = DataStore.getInstance().get('userInfo');
    if(userInfoInDataStore){
      typeof success === 'function' && success(userInfoInDataStore)
      return
    }

    // 本地存储获取
    var storageUserInfo = wx.getStorageSync('userInfo')
    if (storageUserInfo) {
      DataStore.getInstance().put('userInfo',storageUserInfo);
      typeof success === 'function' && success(storageUserInfo)
      return
    }

    // 登录获取
    this.login({
      success:(userInfo)=>{
        typeof success === 'function' && success(userInfo)
      },
      fail:(err)=>{
        typeof fail === 'function' && fail(err)
      },
      authfail:(err)=>{
        typeof authfail === 'function' && authfail(err)
      }
    })
  }

  static login(config = {}){
    let success = config.success;
    let fail  = config.fail;
    let authfail = config.authfail;

    wx.login({
      success:(loginRes)=> {
        // 获取用户头像及昵称
        wx.getUserInfo({
          //授权登录
          success: (userinfo_res)=> {
            let id  = API.appid;
            let code  = loginRes.code;
            let iv  = userinfo_res.iv ;
            let encrypted_data = userinfo_res.encryptedData;
            wx.showLoading({ title: '登录中', mask: true })
            wx.request({
              url: API.login,
              method:'POST',
              data:{
                id, code, iv, encrypted_data
              },
              success: (res)=> {
                if(res.statusCode === 200){
                  let userInfo = userinfo_res.userInfo;
                  userInfo.token   = res.data.token;
                  userInfo.isLogin = true;
                  DataStore.getInstance().put('userInfo',userInfo);
                  wx.setStorage({ key: 'userInfo', data: userInfo })
                  typeof success === 'function' && success(userInfo)
                }else{
                  typeof fail === 'function' && fail(res.data)
                }
              },
              fail: (err)=> {
                typeof fail === 'function' && fail(err)
              },
              complete:()=>{
                wx.hideLoading()
              }
            })
          },
          //没授权提示授权
          fail: ()=>{
            typeof authfail === 'function' && authfail()
          }
        })
      },
      fail:()=>{
        typeof fail === 'function' && fail()
      }
    })
  }
}
