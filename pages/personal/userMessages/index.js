const { getNotification } = require('../../../api/personal')
const app = getApp()
// 我的消息
Page({
  /**
   * 页面的初始数据
   */
  data: {
    messages: ""
  },
  onLoad(){
    app.mshowLoading(this)
    this.GetNotification()
  },
  /**
   * 获取个人消息
   */
  GetNotification() {
    var sessionId = wx.getStorageSync("sessionId")
    getNotification({ sessionId }).then(res => {
      if(res.data) {
        this.setData({
          messages: res.data.content
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
    this.GetNotification()
  },
})