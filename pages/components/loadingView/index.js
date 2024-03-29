// 加载组件
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        showLoading: {
            type: Boolean,
            value: false
        },
        loadingContent: {
            type: String,
            value: '提示内容'
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
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
        
    }
})