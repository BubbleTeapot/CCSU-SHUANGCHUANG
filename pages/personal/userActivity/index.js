const { getMyActivity } = require('../../../api/personal')
const app = getApp()
Page({
    data: {
      userActivityList: "",
      userImage:[
        {
          avatar:'../../../static/images/ccsu/007.jpg',
        },
        {
          avatar: '../../../static/images/ccsu/111.jpg',
        },
        {
          avatar: '../../../static/images/ccsu/33.jpg',
        }
      ],
    },
    onLoad(e) {
      app.mshowLoading(this)
      this.showMyActivity()
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
    /**
     * 获取个人参与活动的信息
     */
    showMyActivity() {
      var sessionId = wx.getStorageSync('sessionId')
      getMyActivity({ sessionId }).then(res => {
        if(res.data) {
          this.setData({
            userActivityList: res.data
          })
        }else {
          // 暂无数据
        }
        app.mhideLoading(this)
      }).catch(err => {
        app.mhideLoading(this)
      })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
      app.mshowLoading(this)
      this.showMyActivity()
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
  
    },
  })