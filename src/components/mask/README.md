# 遮罩

@parmas[active] Boolean 显示或者隐藏
@parmas[align] String bottom/center 

- bottom 内容在底部 DEFAULT
- align 内容在中间

1. 引入

```json
{
  "usingComponents": {
    "custom-mask": "/components/mask/mask"
  }
}
```

2. 使用

```xml
<button bindtap="toggleMask">触发事件</button>
<custom-mask active="{{maskShow}}" bind:toggleMask="toggleMask" align="bottom">
  <view wx:for="{{[1,2,3]}}">
    <view bindtap="toggleMask">{{item}}</view>
  </view>
</custom-mask>
```

3. 触发

```js
Page({
  data: {
    maskShow: false,
  },
  openMask:function(){
    let maskShow = true;
    this.setData({ maskShow })
  },
  toggleMask:function(){
    let maskShow = !this.data.maskShow;
    this.setData({ maskShow })
  }
})
```
