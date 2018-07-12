Component({
    properties: {
        active: {
            type: Boolean,
            value: false
        },
        align: {
            type: String,
            value: 'bottom'
        }
    },
    data: {
    },
    methods: {
        toggleMask:function(){
            let active = !this.data.active;
            let options = { active }
            this.triggerEvent('toggleMask', options )
        },
    }
})
