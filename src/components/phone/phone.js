Component({
    properties: {
        btnText: {
            type: String,
            value: '确定'
        },
        btnWidth: {
            type: String,
            value: '690rpx'
        },
        btnColor: {
            type: String,
            value: '#3977f4'
        },
        defaultPhone: {
            type: Number,
        }
    },
    ready: function(){
        let defaultPhone = this.properties.defaultPhone;
        defaultPhone && this.setData({ mobile: defaultPhone })
    },
    data: {
        title: '',
        mobile: '',
        vcode: '',
        vcodeLock: true,
        submitLock: true,
        vcodeTips:'获取验证码',
        vcodeTimes: 0,
    },
    timeEvent:null,
    methods: {
        phoneInputEvent:function(e){
            let mobile = e.detail.value;
            this.setData({mobile})
        },
        vcodeInputEvent:function(e){
            let vcode = e.detail.value;
            this.setData({vcode})
        },
        getVcodeEvent:function(){
            let mobile = this.data.mobile;
            let vcodeTimes = this.data. vcodeTimes;

            if(!this.data.vcodeLock){
                this.triggerEvent('errorEvent', { message:'请在倒计时完毕后再尝试'})
                return
            }

            if(!mobile){
                this.triggerEvent('errorEvent', { message:'手机不能为空'})
                return
            }

            if(!this.isMobile(mobile)){
                this.triggerEvent('errorEvent', { message:'手机格式错误'})
                return
            }

            this.triggerEvent('smsEvent', { phone: mobile, times:vcodeTimes})
        },
        interval:null,
        countDown:function(){
            let vcodeLock = this.data.vcodeLock;
            let vcodeTimes = this.data.vcodeTimes;
            vcodeTimes ++
            vcodeLock = false;
            this.setData({ vcodeLock, vcodeTimes })

            let times = 60;
            this.interval = setInterval(()=>{
                let vcodeTips = `( ${times} ) s`;
                this.setData({ vcodeTips })

                if(times === 0 ){
                    this.clearInterval();
                }else{
                    times --
                }

            },1000);
        },
        clearInterval:function(){
            clearInterval(this.interval);
            let vcodeTips  = '获取验证码';
            let vcodeLock = true;
            this.setData({ vcodeLock, vcodeTips});
        },
        submitMobile:function(){
            let mobile = this.data.mobile;
            let code = this.data.vcode;
            let submitLock = this.data.submitLock;
            let vcodeTimes = this.data. vcodeTimes;

            if(!submitLock){
                return
            }

            if(!mobile){
                this.triggerEvent('errorEvent', { message:'手机不能为空'})
                return
            }

            if(!this.isMobile(mobile)){
                this.triggerEvent('errorEvent', { message:'手机格式错误'})
                return
            }

            if(!code){
                this.triggerEvent('errorEvent', { message:'验证码不能为空'})
                return
            }


            if(!vcodeTimes){
                this.triggerEvent('errorEvent', { message:'请获取验证码'})
                return
            }


            this.triggerEvent('successEvent', { phone: mobile, code: code})
        },
        isMobile: function(source) {
            return /^((\(\d{2,3}\))|(\d{3}\-))?(1[34578]\d{9})$/.test(source);
        },
    }
})
