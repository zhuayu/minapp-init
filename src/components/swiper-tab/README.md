# 滑动tab切换

配置

- 滑块颜色 tabWidth
- 项目宽度 tabWidth
- 高亮第几项 activeIndex
- 点击回调函数 checkoutTab

1. 引入

```json
{
  "usingComponents": {
    "custom-swiper-tab": "/components/swiper-tab/swiper-tab"
  }
}
```

2. 使用

```xml
<custom-swiper-tab 
  tabWidth="120" 
  activeIndex="{{activeIndex}}" 
  datas="{{swiperData}}" 
  sliderColor="#295fcc"
  bind:checkoutTab="checkoutTab">
</custom-swiper-tab>
```

3. 触发

```js
Page({
  data: {
    swiperData:[{
      id:1,
      name:'HTML'
    },{
      id:2,
      name: 'CSS'
    },{
      id:3,
      name: 'JavaScript'
    },{
      id:4,
      name: 'Nodejs'
    }],
    activeIndex:0
  },
  // 点击回调事件，获取到当前点击了第几个
  checkoutTab:function(e){
    let { index } = e.detail;
    this.setData({ activeIndex:index })
  }
})
```