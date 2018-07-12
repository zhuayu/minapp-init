import API from './api.js';
import { DataStore } from './DataStore.js';
import { userModel } from './userModel.js';
const app = getApp()

const safeRequest = (params = {})=>{
    let url      = params.url;
    let success  = params.success;
    let fail     = params.fail;
    let complete = params.complete;
    let data     = params.data || {};
    let method   = params.method || 'GET';
    let failModal = ( params.failModal === false ) ? false : true;
    let userInfo = DataStore.getInstance().get('userInfo');
    data.app_id = API.appid;

    wx.request({
        url,
        method,
        data,
        header:{
            'Authorization': userInfo ? `Bearer ${userInfo.token}` : '',
        },
        success: (res)=> {
            if(res.statusCode === 200){
                typeof success === 'function' && success(res.data)
            }else{
                if(res.statusCode === 401){
                    console.log('401,重新登录获取token')
                    userModel.login({
                        success:(userInfo)=>{
                            console.log('重新登录获取token成功!')
                            safeRequest(params);
                        },
                        fail:(login_err)=>{
                            typeof fail === 'function' && fail(login_err)
                        },
                    })
                }else{
                    failModal && app.errorModal('注意',res.data.message);
                    typeof fail === 'function' && fail(res.data)
                }
            }
        },
        fail: (err)=> {
            app.errorModal('网络',err.errMsg);
            typeof fail === 'function' && fail(err)
        },
        complete: ()=>{
            typeof complete === 'function' && complete()
        }
    })
}

const proRequest = (params ={}) => {
    return new Promise((resolve,reject)=>{
        params.success = (res)=> resolve(res)
        params.fail = (res)=> reject(res)
        safeRequest(params);
    })
}

module.exports = {
  safeRequest,
  proRequest
}