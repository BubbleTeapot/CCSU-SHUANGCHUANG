const { getTopic, topicPraise } = require('../../api/forum')
const app = getApp()
Page({
  data: {
    // hotArticleTitleList: [
    //   {
    //     hotArticleTitle: '非常真诚的，希望在大学',
    //   },
    //   {
    //     hotArticleTitle: '毕业结婚问题',
    //   },
    //   {
    //     hotArticleTitle: '求推荐小说',
    //   }
    // ],
    articleList: ''
  },
  onLoad() {
    app.mshowLoading(this)
    this.GetTopic()
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
   * 获取帖子列表
   */
  GetTopic() {
    var sessionId = wx.getStorageSync('sessionId')
    getTopic({ sessionId }).then(res => {
      if (res.data.content) {
        app.mhideLoading(this)
      }
      this.setData({
        articleList: res.data.content
      })
    }).catch(err => {
      app.mhideLoading(this)
    })
  },
  navigateToArticle(e) {
    wx.navigateTo({
      url: './articleDetail/index?id=' + e.currentTarget.dataset.id + '&nick_name=' + e.currentTarget.dataset.nick_name + '&avatar_url=' + e.currentTarget.dataset.avatar_url
    })
  },
  /**
   * 新建主题
   */
  navigateToNewArticle() {
    wx.navigateTo({
      url: './newArticle/index'
    })
  },
  // tabbar传值(适配iponeX底部tabbar)
  getIsIphoneX(e) {
    this.setData({
      isIphoneX: e.detail.isIphoneX
    })
  },
  /**
   * 主题点赞
   */
  savePraise(e) {
    var sessionId = wx.getStorageSync('sessionId')
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var article = this.data.articleList[index]
    if(typeof article.up_ids == 'string' ) {
      var upIdsList = article.up_ids.split(',')
    }else {
      var upIdsList = article.up_ids
    }
    if (upIdsList.indexOf(article.open_id) == -1) {
      // 没有点过赞
      topicPraise({ id, sessionId }).then(res => {
        if (res.data) {
          // 点赞成功
          upIdsList.push(article.open_id)
          article.up += 1
          let upIdsArr = 'articleList[' + index + '].up_ids'
          let up = 'articleList[' + index + '].up'
          this.setData({
            [upIdsArr]: upIdsList,
            [up]: article.up
          })
        } else {
          // 失败
          wx.showToast({
            title: res,
            icon: 'none',
            duration: 1000,
            mask: false
          })
        }
      })
    } else {
      // 已点赞
      topicPraise({ id, sessionId }).then(res => {
        if (res.data) {
          // 点赞成功
          upIdsList.splice(upIdsList.indexOf(article.open_id), 1)
          article.up -= 1
          let upIdsArr = 'articleList[' + index + '].up_ids'
          let up = 'articleList[' + index + '].up'
          this.setData({
            [upIdsArr]: upIdsList,
            [up]: article.up
          })
        } else {
          // 失败
        }
      })
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    app.mshowLoading(this)
    this.GetTopic()
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