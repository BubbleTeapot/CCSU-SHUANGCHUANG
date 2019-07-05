const { getUserInfo, getPersonInfo } = require('../../api/personal')
const app = getApp()
Page({
  data: {
    userInfo: "",
    personInfoList: [
      {
        personTitle: '院系',
        personValue: '数计系'
      },
      {
        personTitle: '年级',
        personValue: '大二'
      },
      {
        personTitle: '综测',
        personValue: '25分'
      },
      {
        personTitle: '素拓',
        personValue: '5分'
      }
    ],
    funcList: [
      {
        iconfont: 'iconActivity',
        myActive: '我参与的活动',
        navigateTo: './userActivity/index'
      },
      {
        iconfont: 'iconMessger',
        myActive: '我的消息',
        navigateTo: './userMessages/index'
      },
    ]
  },
  onLoad(e) {
    app.mshowLoading(this)
    // 获取用户微信信息
    var userInfo = {}
    var appUserInfo = {}
    if (!app.globaData.userInfo) {
      this.showUserInfo()
    } else {
      appUserInfo = app.globaData.userInfo
      userInfo.avatarUrl = appUserInfo.avatarUrl
      userInfo.nickName = appUserInfo.nickName
      // 获取用户个人信息
      this.showPersonInfo(userInfo)
    }
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
   * 获取用户微信信息
   */
  showUserInfo() {
    var sessionId = wx.getStorageSync('sessionId')
    let userInfo = {}
    getUserInfo({ sessionId }).then(res => {
      // console.log(res)
      userInfo.avatarUrl = res.data.avatarUrl
      userInfo.nickName = res.data.nickName
      // 获取用户个人信息
      this.showPersonInfo(userInfo)
    })
  },
  /**
   * 获取用户个人信息
   */
  showPersonInfo(userInfo) {
    var sessionId = wx.getStorageSync('sessionId')
    getPersonInfo({ sessionId }).then(res => {
      // console.log(res)
      if (res.data.jwcAccount == '未绑定') {
        app.mhideLoading(this)
        wx.navigateTo({
          url: '../login/index'
        })
      } else {
        app.globaData.personInfo = res.data
        userInfo.jwcAccount = res.data.jwcAccount
        this.setData({
          userInfo
        })
        app.mhideLoading(this)
      }
    }).catch(res => {
      app.mhideLoading(this)
    })
  },
  // 跳转
  navigateToMy(e) {
    wx.navigateTo({
      url: './userInfo/index?userInfo=' + e.currentTarget.dataset.userinfo
    })
  },
  navigateToF(e) {
    var index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: this.data.funcList[index].navigateTo
    })
  },
  // tabbar传值(适配iponeX底部tabbar)
  getIsIphoneX(e) {
    this.setData({
      isIphoneX: e.detail.isIphoneX
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    app.mshowLoading(this)
    this.showUserInfo()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },
  /**
   * 当前是 tab 页时，点击 tab 时触发
   */
  onTabItemTap() {

  }
})