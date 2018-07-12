# 提示组建
顶部提示，可自定义文案、颜色、展示时间

1. 引入

```json
{
  "usingComponents": {
    "custom-tips": "/components/tips/tips"
  }
}
```

2. 使用

```xml
<custom-tips id="custom-tips"></custom-tips>
<button bindtap="tipsEvent">触发事件</button>
```

3. 触发

```js
Page({
  onLoad: function() {
    this.tips = this.selectComponent('#custom-tips');
  },
  tipsEvent: function() {
    // 普通提示可自定义颜色，展示时间
    // 成功和错误提示，可自定义展示时间
    this.tips.show('普通提示');
    // this.tips.success('成功提示');
    // this.tips.error('错误提示');
    // this.tips.show('普通提示','#333',2000);
    // this.tips.success('成功提示',2000);
  }
})
```