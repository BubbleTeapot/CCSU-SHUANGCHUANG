const { setJwcAccount } = require('../../api/login')
Page({
    data: {
      jwcAccount: '',
      backUrl:''
    },
    onLoad() {
      var pages = getCurrentPages()
      this.data.backUrl = pages[pages.length-2]
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
  
    },
    onShow() {
  
    },
    onHide() {
  
    },
    onUnload() {
  
    },
    // 获取输入框学号
    getJwcAccount(e) {
        this.data.jwcAccount = e.detail.value
    },
    /**
     * 绑定学号
     */
    bindJwcAccount() {
      if(!this.data.jwcAccount) {
        wx.showToast({
          title: '输入不能为空',
          icon: 'none',
          duration: 1000,
          mask: false,
        })
      }
      var sessionId = wx.getStorageSync('sessionId')
      var data = {jwcAccount: this.data.jwcAccount}
      setJwcAccount({ data, sessionId }).then( res => {
        if(res.code == 0) {
          wx.showToast({
            title: '绑定成功',
            icon: 'none',
            duration: 1000,
            mask: false,
          })
          wx.navigateBack({
            success: function() {
              this.data.backUrl.onLoad(); // 执行前一个页面的onLoad方法
            },
            fail: ()=>{
              wx.reLaunch({
                url: '/' + this.data.backUrl.route,
              })
            },
          })
        }else {
          wx.showToast({
            title: '绑定失败',
            icon: 'none',
            duration: 1000,
            mask: false,
          })
        }
      })
    }
  })