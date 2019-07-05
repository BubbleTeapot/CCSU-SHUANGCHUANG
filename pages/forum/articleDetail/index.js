const { getTopicDetail, getcommentList, saveComment, commentPraise } = require('../../../api/forum')
const app = getApp()

/**
 * 帖子详情
 * 作者 cxs
 */
Page({
  data: {
    topic: '',  //文章信息
    author: '', //作者信息
    params: '', //传入参数
    commentList: '', //评论列表
    userComment: ''
  },
  onLoad(e) {
    // console.log(e)
    app.mshowLoading(this)
    this.data.params = e
    this.GetTopicDetail(e)
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
   * 获取主题及评论详情
   */
  GetTopicDetail(topicObj) {
    var sessionId = wx.getStorageSync("sessionId")
    var id = topicObj.id
    var data = { topicId: topicObj.id }
    var author = {}
    author.nick_name = topicObj.nick_name
    author.avatar_url = topicObj.avatar_url
    Promise.all([getTopicDetail({ id, sessionId }), getcommentList({ data, sessionId })]).then(res => {
      if (res[0].data && res[1].data) {
        author.in_time = res[0].data.topic.inTime
        this.setData({
          topic: res[0].data.topic,
          commentList: res[1].data,
          author
        })
      }
      app.mhideLoading(this)
    }).catch(err => {
      app.mhideLoading(this)
    })
  },
  navigateToComment() {
    // wx.navigateTo({
    //   url: './commentDetail/index'
    // })
  },
  // 获取用户输入的评论
  getComment(e) {
    this.data.userComment = e.detail.value
  },
  /**
   * 发表评论
   */
  SaveComment() {
    app.mshowLoading(this)
    var sessionId = wx.getStorageSync('sessionId')
    var data = { content: this.data.userComment, topicId: this.data.params.id }
    if (!this.data.userComment) {
      wx.showToast({
        title: '评论不能为空',
        icon: 'none',
        duration: 1000,
        mask: false,
      })
    }
    saveComment({ data, sessionId }).then(res => {
      if (res.data) {
        app.mhideLoading(this)
        wx.showToast({
          title: '评论成功',
          icon: 'success',
          duration: 1000,
          mask: false
        })
        app.mshowLoading(this)
        let data = { topicId: this.data.params.id }
        getcommentList({ data, sessionId }).then(res => {
          if (res.data) {
            this.setData({
              commentList: res.data,
            })
          }
          app.mhideLoading(this)
        }).catch(err => {
          app.mhideLoading(this)
        })
      } else {
        wx.showToast({
          title: '发表失败',
          icon: 'success',
          duration: 1000,
          mask: false
        })
        app.mhideLoading(this)
      }
    }).catch(err => {
      app.mhideLoading(this)
    })
  },
  /**
   * 给评论点赞
   */
  savePraise(e) {
    var sessionId = wx.getStorageSync('sessionId')
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var article = this.data.commentList[index]
    if (typeof article.up_ids == 'string') {
      var upIdsList = article.up_ids.split(',')
    } else {
      var upIdsList = article.up_ids
    }
    if (upIdsList.indexOf(article.open_id) == -1) {
      // 没有点过赞
      commentPraise({ id, sessionId }).then(res => {
        if (res.data) {
          // 点赞成功
          upIdsList.push(article.open_id)
          article.up += 1
          let upIdsArr = 'commentList[' + index + '].up_ids'
          let up = 'commentList[' + index + '].up'
          console.log(article.up)
          console.log(upIdsList)
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
      commentPraise({ id, sessionId }).then(res => {
        if (res.data) {
          // 点赞成功
          upIdsList.splice(upIdsList.indexOf(article.open_id), 1)
          article.up -= 1
          let upIdsArr = 'commentList[' + index + '].up_ids'
          let up = 'commentList[' + index + '].up'
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