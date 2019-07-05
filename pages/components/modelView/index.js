// 弹出框自定义
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        showModel: {
            type: Boolean,
            value: false
        },
        modelTitle: {
            type: String,
            value: '标题'
        },
        modelContent: {
            type: String,
            value: '提示内容'
        },
        cancelName: {
            type: String,
            value: '取消'
        },
        ensureName: {
            type: String,
            value: '确定'
        },
    },
    /**
     * 组件的初始数据
     */
    data: {
        cancelVal: true,
    },

    /**
     * 组件生命周期
     */
    lifetimes: {
        attached() {
        },
        detached() {
            // 在组件实例被从页面节点树移除时执行
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        cancelEvent() {
            var cancelVal = this.data.cancelVal;
            this.triggerEvent("getCancelVal", {cancelVal});
        },
        bindgetuserinfo(e) {
            if (e.detail.userInfo) {
                wx.reLaunch({
                    url: './index'
                })
                var cancelVal = false
                this.triggerEvent("getCancelVal", {cancelVal});
            }else {
                var cancelVal = this.data.cancelVal;
                this.triggerEvent("getCancelVal", {cancelVal});
            }
        }
    }
})