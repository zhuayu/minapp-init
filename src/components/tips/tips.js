Component({
    properties: {

    },
    data: {
        title: '',
        color: '',
    },
    timeEvent:null,
    methods: {
        show: function(title, color="#00a7ff" ,duration = 2000) {
            if(!title){
                console.log('缺乏必要参数：title')
                return
            }
            this.setData({ title, color });
            this.times = setTimeout(()=> this._hide(), duration);
        },
        success: function(title, duration = 2000) {
            if(!title){
                console.log('缺乏必要参数：title')
                return
            }
            let color = "#35b558";
            this.setData({ title, color });
            this.times = setTimeout(()=> this._hide(), duration);
        },
        error: function(title, duration = 2000) {
            if(!title){
                console.log('缺乏必要参数：title')
                return
            }
            let color = "#E64340";
            this.setData({ title, color });
            this.times = setTimeout(()=> this._hide(), duration);
        },
        _hide:function(){
            let title = '';
            let color = '';
            this.setData({ title, color });
        }
    }
})
