# 手机绑定

参数：

- @parmas[btnText] String 按钮文字
- @parmas[btnWidth] String 按钮宽度 
- @parmas[btnColor] String 按钮颜色
- @parmas[defaultPhone] Number 默认手机号

方法：

- bottom 内容在底部 DEFAULT

事件：

- errorEvent   错误提示
- smsEvent     短信提示
- successEvent 成功提示

1. 引入

```json
{
  "usingComponents": {
    "custom-phone": "/components/phone/phone"
  }
}
```

2. 使用

```xml
<view class="page-container">
  <pd-phone 
    id="custom-bindphone" 
    btn-text="{{bindphoneBtnText}}" 
    btn-width="{{bindphoneBtnWidth}}" 
    btn-color="{{bindphoneBtnColor}}" 
    default-phone="13511111111"
    bind:errorEvent="errorEvent" 
    bind:smsEvent="smsEvent" 
    bind:successEvent="successEvent">
  </pd-phone>
</view>
```

3. 触发

```js
Page({
  data:{
    bindphoneBtnText: '确认',
    bindphoneBtnColor: '#3977f4',
    bindphoneBtnWidth: '690rpx;'
  },
  onReady: function(){
    this.bindphone = this.selectComponent('#custom-bindphone');
  },
  errorEvent:function(e){
    const { message } = e.detail;
    console.log(message)
  },
  smsEvent: function(e){
    const { phone, times } = e.detail;
    this.bindphone.countDown();
  },
  successEvent: function(e) {
    const { phone, code } = e.detail;
    console.log(phone, code)
  }
})
```