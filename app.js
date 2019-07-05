App({
    onLaunch() {
        // 小程序加载完成时触发一次
        wx.hideTabBar(); //隐藏原生tabbar
        // 如果openId不存在,就获取登陆凭证
        let sessionId = wx.getStorageSync('sessionId')
        if (!sessionId) {
            this.getUserInfo()
        }
    },
    onShow() {
        wx.hideTabBar(); //隐藏原生tabbar
        // 小程序从后台进入前台时触发
    },
    onHide() {
        // 小程序前台从进入后台时触发
    },
    onError(msg) {
        // 小程序错误监听函数
    },
    onPageNotFound() {
        // 进入的页面不存在时触发
    },
    /**
     * 获取用户信息
     */
    getUserInfo: function (cb) {
        wx.login({
            success: function (res) {
                // 登录成功
                var code = res.code // 登录凭证
                wx.setStorage({ key: 'code', data: code })
            }
        })
    },
    // 显示加载中
    mshowLoading(pageObj) {
        wx.stopPullDownRefresh()
        var that = pageObj
        that.setData({
            showLoading: true
        })
    },
    // 隐藏加载中
    mhideLoading(pageObj) {
        var that = pageObj
        that.setData({
            showLoading: false
        })
    },
    // baseURL
    globaData: {
        userInfo: '',
        personInfo: ''
    }
});