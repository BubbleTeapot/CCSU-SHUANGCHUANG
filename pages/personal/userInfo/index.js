const { getPersonInfo, saveUserInfo } = require('../../../api/personal')
const app = getApp()
Page({
  data: {
    departmentList: ['未选择', '计数院', '机电院', '土木院', '生环院', '经管院', '电气院', '法学院', '影传院', '艺术学院', '音乐学院'], // 学院
    index: '',  // 院系下标
    userInfoList: {
      avatarUrl: '头像',
      nickName: '昵称',
      jwcAccount: '学号',
      department: '院系',
      comprehensiveFraction: '综测',
      qualityFraction: '素质拓展'
    },
    avatarUrl: '',  // 用户头像
    userInfo: '', // 用户信息
    department: '',  // 院系
    nickName: '', //用户姓名
    jwcAccount: ''  // 用户学号
  },
  onLoad(e) {
    app.mshowLoading(this)
    this.data.avatarUrl = e.userInfo
    this.showPersonInfo()
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
   * 获取用户信息
   */
  showPersonInfo() {
    var sessionId = wx.getStorageSync('sessionId')
    getPersonInfo({ sessionId }).then(res => {
      // console.log(res)
      if (res.data) {
        var userInfo = res.data
        userInfo.avatarUrl = this.data.avatarUrl
        var index = 0
        if (res.data.department && this.data.departmentList.indexOf(res.data.department) != -1) {
          index = this.data.departmentList.indexOf(res.data.department)
        }
        // 默认值
        this.data.department = userInfo.department
        this.data.nickName = userInfo.nickName
        this.data.jwcAccount = userInfo.jwcAccount
        this.setData({
          userInfo,
          index
        })
        app.mhideLoading(this)
      } else {
        // 暂无数据
      }
    }).catch(res => {
      app.mhideLoading(this)
    })
  },
  // 获取选择的学院
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
    this.data.department = this.data.departmentList[e.detail.value]
  },
  // 获取用户输入姓名
  getNickName(e) {
    this.data.nickName = e.detail.value
  },
  // 获取用户输入姓名
  getJwcAccount(e) {
    this.data.jwcAccount = e.detail.value
  },
  /**
   * 保存修改
   */
  SaveUserInfo() {
    if(!this.data.nickName) {
      wx.showToast({
        title: '昵称不能为空',
        icon: 'success',
        duration: 1000,
        mask: false
      })
    }
    if(!this.data.jwcAccount) {
      wx.showToast({
        title: '学号不能为空',
        icon: 'success',
        duration: 1000,
        mask: false
      })
    }
    var sessionId = wx.getStorageSync('sessionId')
    var data = { department: this.data.department, jwcAccount: this.data.jwcAccount, nickName: this.data.nickName }
    saveUserInfo({ data, sessionId }).then(res => {
      if(res.code == 0)  {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 1000,
          mask: false
        })
        this.showPersonInfo()
      }else {
        wx.showToast({
          title: '修改失败',
          icon: 'loading',
          duration: 1000,
          mask: false
        })
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    app.mshowLoading(this)
    this.showPersonInfo()
  }
})