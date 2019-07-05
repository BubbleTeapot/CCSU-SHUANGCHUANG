const { getInformation, applyActivity } = require('../../../api/indexRequest')
const app = getApp()
Page({
  data: {
    id: '', //文章id
    information: {},  // 文章详情
  },
  onLoad(e) {
    app.mshowLoading(this)
    this.data.id = e.id
    this.GetInformation(e.id)
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
   * 获取文章详情
   */
  GetInformation(id) {
    var sessionId = wx.getStorageSync('sessionId')
    var data = { id }
    getInformation({ data, sessionId }).then(res => {
      this.setData({
        information: res.data
      })
      app.mhideLoading(this)
    }).catch( err => {
      app.mhideLoading(this)
    })
  },
  /**
   * 申请活动
   */
  ApplyActivity() {
    var informationId = this.data.id
    var sessionId = wx.getStorageSync('sessionId')
    var data = { informationId }
    applyActivity({ data, sessionId }).then(res => {
      if(res.code) {
        wx.showToast({
          title: '申请成功',
          icon: 'success',
          duration: 1000,
          mask: false,
        })
      }else {
        wx.showModal({
          title: '',
          content: res,
          showCancel: false,
          confirmText: '确定',
        });
      }
    })
  },
  // 返回按钮
  navigaBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    app.mshowLoading(this)
    this.GetInformation(this.data.id)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },
  /**
   * 页面滚动触发事件的处理函数
   */
  onPageScroll() {

  },
  /**
   * 页面尺寸改变时触发
   */
  onResize() {

  },
  /**
   * 当前是 tab 页时，点击 tab 时触发
   */
  onTabItemTap() {

  }
})