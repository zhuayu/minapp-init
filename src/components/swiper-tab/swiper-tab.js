Component({
    properties: {
        // 数据数组
        // datas[name] // 文本
        // [{ name: 'HTML'},{ name: 'CSS'}]
        datas: {
            type: Array,
            value: [],
        },
        // 当前展示第几项目
        activeIndex: {
            type: Number,
            value: 0,
            observer: function(newVal, oldVal){
                let index = newVal;
                let tabWidth = this.properties.tabWidth;
                let sliderOffset = ( index * tabWidth );
                this.setData({ sliderOffset }) 
            }
        },
        // 每一项目的宽度（单位：px）
        tabWidth: {
            type: Number,
            value: 120,
        },
        // 滑条颜色
        sliderColor: {
            type: String,
            value: '#FF5F5F'
        }
     },
    data: {
        sliderOffset: ''
    },
    ready: function(){
        let index = this.properties.activeIndex;
        let tabWidth = this.properties.tabWidth;
        let sliderOffset = ( index * tabWidth );
        this.setData({ sliderOffset })
    },
    methods: {
        checkoutTab: function (e) {
            this.setData({
                sliderOffset: e.currentTarget.offsetLeft,
                activeIndex: e.currentTarget.dataset.index
            });
            let options = {
                index: e.currentTarget.dataset.index
            }
            this.triggerEvent('checkoutTab', options )
        },
    }
})
