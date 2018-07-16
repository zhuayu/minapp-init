Page({
  data:{
    pageShow: false,
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    num: 0,
    swiperCurrent: 0,
    goods: [{
      id:1
    },{
      id:2
    },{
      id:3
    }]
  },
  //轮播图的切换事件
  swiperChange: function (e) {
    const {
      current
    } = e.detail;

    this.setData({
      swiperCurrent: current,
      num: current
    });
  },
})