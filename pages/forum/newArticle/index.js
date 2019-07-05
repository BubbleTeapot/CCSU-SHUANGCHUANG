const { saveTopic } = require('../../../api/forum')
const app = getApp()

/**
 * 帖子详情
 * 作者 cxs
 */
Page({
  data: {
    topicTitle: '', // 标题
    topicContent: ''  // 内容
  },
  onLoad(e) {
    this.data.params = e
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
  // 获取用户输入标题
  getTitle(e) {
    this.data.topicTitle = e.detail.value
  },
  // 获取用户输入内容
  getTopic(e) {
    this.data.topicContent = e.detail.value
  },
  /**
   * 发表主题
   */
  SaveTopic() {
    var sessionId = wx.getStorageSync("sessionId")
    if (!this.data.topicContent) {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 1000,
        mask: false
      })
    }
    if (!this.data.topicTitle) {
      wx.showToast({
        title: '标题不能为空',
        icon: 'none',
        duration: 1000,
        mask: false
      })
    }
    if (this.data.topicTitle && this.data.topicContent) {
      var data = { content: this.data.topicContent, tag: '文章', title: this.data.topicTitle }
      saveTopic({ data, sessionId }).then(res => {
        if (res.data) {
          wx.showToast({
            title: '发表成功',
            icon: 'none',
            duration: 1000,
            mask: false
          })
          wx.reLaunch({
            url: '../index',
          })
        } else {
          wx.showToast({
            title: '发表失败',
            icon: 'none',
            duration: 1000,
            mask: false
          })
        }
      })
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    app.mshowLoading(this)
    this.GetTopicDetail(this.data.params)
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

  }

})