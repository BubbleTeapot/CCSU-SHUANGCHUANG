const { loginIn } = require('../../api/login')
const { getFeedHot, getFeedLatest, getFeedListByCategory } = require('../../api/indexRequest')
const { getUserInfo } = require('../../api/personal')
const app = getApp(); //获取app实例

Page({
  data: {
    // 图片
    imgUrls: [
      '../../static/images/1.png',
      '../../static/images/2.png',
      '../../static/images/3.png',
      '../../static/images/4.png'
    ],
    CampusEventMenuList: [
      '最新',
      '最热',
      '活动',
      '通知',
      '招聘',
      '公示'
    ],
    funcGroup: [
      {
        funcs: [
          {
            icon: "iconTimetable",
            text: "课表",
            navigateTo: '../service/timeTable/index'
          },
          {
            icon: "iconGrades",
            text: "成绩查询",
            navigateTo: '../service/queryGrade/index'
          },
          {
            icon: "iconEmptyClassroom",
            text: "空闲教室",
            navigateTo: '../service/freeClassroom/index'
          },
          {
            icon: "iconStudy",
            text: "在线学习"
          }
        ]
      },
      {
        funcs: [
          {
            icon: "iconMenuBtn",
            text: "课表"
          },
          {
            icon: "iconMenuBtn",
            text: "功能二"
          },
          {
            icon: "iconMenuBtn",
            text: "功能三"
          },
          {
            icon: "iconMenuBtn",
            text: "功能四"
          }
        ]
      }
    ],
    CampusEvent: '',
    x: 1, // 下拉加载次数
    showLoading: false,  //加载中
    bannarIndex: 0,//轮播图下标
    CampusEventMenuIndex: 0, //校园动态菜单栏下标,
    isIphoneX: false, //iPhone适配
    empower: 0, //用户是否授权
    showMore: false,  //显示更多按钮
    showModel: false  //显示授权提示框
  },
  onLoad(options) {
    wx.hideTabBar(); //隐藏原生tabbar
    // 判断是否授权
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          // 如果没有授权,那么清楚缓存
          wx.getStorageSync("sessionId", '')
          if (!this.showModel) {
            this.setData({
              showModel: true
            })
          }
        } else {
          let sessionId = wx.getStorageSync('sessionId')
          let code = wx.getStorageSync('code')
          if (!sessionId) {
            this.login({ code })
          }
          this.setData({
            showModel: false,
            empower: 2
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    var sessionId = wx.getStorageSync('sessionId')
    if (sessionId) {
      app.mshowLoading(this)
      this.getLatest()
      this.showUserInfo()
    }
  },
  onShow() {

  },
  onHide() {

  },
  onUnload() {

  },
  /**
   * 用户登陆
   */
  login({ code }) {
    wx.getUserInfo({
      success: res => {
        app.globaData.userInfo = res.userInfo
        let data = { code: code, rawData: res.rawData }
        loginIn(data).then(resp => {
          if (!resp.sessionId) {
            console.error("errmsg:" + resp.msg)
          } else {
            wx.setStorage({ key: 'sessionId', data: resp.sessionId })
            this.getLatest(resp.sessionId)
          }
          app.mhideLoading(this)
        }).catch( res => {
          app.mhideLoading(this)
        })
      }
    })
  },
  /**
   * 获取用户微信信息
   */
  showUserInfo() {
    var sessionId = wx.getStorageSync('sessionId');
    getUserInfo({sessionId}).then(res => {
      app.globaData.userInfo = res.data
      if(this.data.CampusEvent) {
        app.mhideLoading(this)
      }
    }).catch( res => {
      if(this.data.CampusEvent) {
        app.mhideLoading(this)
      }
    })
  },
  /**
   * 获取最新
   */
  getLatest(sessionId) {
    var sessionId = sessionId || wx.getStorageSync('sessionId')
    getFeedLatest({ sessionId }).then(res => {
      if(!res.data) {
        wx.showToast({
          title: '暂无数据',
          icon: 'none',
          duration: 1000,
          mask: false
        })
      }else {
        this.setData({
          CampusEvent: res.data
        })
      }
      if(app.globaData.userInfo) {
        app.mhideLoading(this)
      }
    }).catch( err =>{
      if(app.globaData.userInfo) {
        app.mhideLoading(this)
      }
    })
  },
  /**
   * 获取热搜
   */
  getHot() {
    var sessionId = wx.getStorageSync('sessionId')
    getFeedHot({ sessionId }).then(res => {
      if(!res.data) {
        wx.showToast({
          title: '暂无数据',
          icon: 'none',
          duration: 1000,
          mask: false
        });
      }else {
        this.setData({
          CampusEvent: res.data
        })
      }
      app.mhideLoading(this)
    }).catch( err =>{
      app.mhideLoading(this)
    })
  },
  /**
   * 按类别搜索
   */
  getActiveList(category, x) {
    var sessionId = wx.getStorageSync('sessionId')
    var list = {}
    var x = x || 1
    list.offset = 10 * x
    list.start = 0
    list.category = category
    getFeedListByCategory({ list, sessionId }).then(res => {
      if (res.data) {
        this.setData({
          CampusEvent: res.data
        })
        app.mhideLoading(this)
      } else {
        app.mhideLoading(this)
        wx.showToast({
          title: '已经到底了',
          icon: 'none',
          duration: 1000,
          mask: false
        })
      }
    }).catch( err =>{
      app.mhideLoading(this)
    })
  },
  // 轮播图实时下标
  swiperChange(e) {
    this.setData({
      bannarIndex: e.detail.current
    })
  },
  CampusEventMenuClick(e) {
    app.mshowLoading(this)
    this.data.x = 1
    var index = e.currentTarget.dataset.index
    var category = ''
    if(this.data.CampusEventMenuIndex != index) {
      this.setData({
        CampusEventMenuIndex: index
      })
      switch (index) {
        case 0: this.getLatest(); break;
        case 1: this.getHot(); break;
        case 2: category = 'ACTIVITY';
                this.getActiveList(category); break;
        case 3: category = 'NOTIFY';
                this.getActiveList(category); break;
        case 4: category = 'RECRUITMENT';
                this.getActiveList(category); break;
        case 5: category = 'PUBLIC';
                this.getActiveList(category); break;
      }
    }
  },
  // tabbar传值(适配iponeX底部tabbar)
  getIsIphoneX(e) {
    this.setData({
      isIphoneX: e.detail.isIphoneX
    })
  },
  // 文章跳转
  navigaTo(e) {
    wx.navigateTo({
      url: './articleDetial/index?id=' + e.currentTarget.dataset.id
    })
  },
  // 取消授权事件
  getCancelVal(e) {
    if (e.detail.cancelVal) {
      this.setData({
        showModel: false
      })
      this.setData({
        empower: 1
      })
      wx.showModal({
        title: '提示',
        content: '您没有允许微信授权，导致您无法正常使用小程序，请您重新授权！',
        showCancel: false,
      })
    } else {
      this.setData({
        empower: 2
      })
    }
  },
  // 授权回调
  bindgetuserinfo(e) {
    if (e.detail.userInfo) {
      wx.reLaunch({
        url: './index'
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '您没有允许微信授权，导致您无法正常使用小程序，请您重新授权！',
        showCancel: false,
      })
    }
  },
  // 显示更多菜单
  menuDown(e) {
    let showMore = e.target.dataset.showmore
    showMore = !showMore
    this.setData({
      showMore
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    app.mshowLoading(this)
    var category = ''
    var index = this.data.CampusEventMenuIndex
    switch (index) {
      case 0: this.getLatest(); break;
      case 1: this.getHot(); break;
      case 2: category = 'ACTIVITY';
              this.getActiveList(category, this.data.x); break;
      case 3: category = 'NOTIFY';
              this.getActiveList(category, this.data.x); break;
      case 4: category = 'RECRUITMENT';
              this.getActiveList(category, this.data.x); break;
      case 5: category = 'PUBLIC';
              this.getActiveList(category, this.data.x); break;
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    app.mshowLoading(this)
    var category = ''
    var index = this.data.CampusEventMenuIndex
    this.data.x += 1
    switch (index) {
      case 2: category = 'ACTIVITY';
              this.getActiveList(category, this.data.x); break;
      case 3: category = 'NOTIFY';
              this.getActiveList(category, this.data.x); break;
      case 4: category = 'RECRUITMENT';
              this.getActiveList(category, this.data.x); break;
      case 5: category = 'PUBLIC';
              this.getActiveList(category, this.data.x); break;
    }
  },
  // 菜单跳转
  menuNavigateTo(e) {
    var url = e.currentTarget.dataset.url
    wx.navigateTo({
      url
    })
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