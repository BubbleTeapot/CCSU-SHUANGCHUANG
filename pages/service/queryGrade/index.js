// pages/service/queryGrade/index.js
const { getMyGrade } = require('../../../api/service/queryGrade')

const app = getApp(); //获取app实例

Page({

  /**
   * 页面的初始数据
   */
  data: {
    semeterArray: ['2018-2019-1', '2017-2018-2', '2017-2018-1', '2016-2017-2', '2016-2017-1', '2015-2016-2', '2015-2016-1', '2014-2015-2', '2014-2015-1'],
    index: 0,
    semeter: '',//当前学期
    showModel: false,
    noData: '您在本学期无成绩信息'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    app.mshowLoading(this)
    this.getMyGradeDta()
  },

  // 选择学期
  bindPickerChange: function (e) {
    app.mshowLoading(this)
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      semeter: this.data.semeterArray[e.detail.value]
    })
    this.getMyGradeDta()
  },

  // 获取成绩数据
  getMyGradeDta: function () {
    var sessionId = sessionId || wx.getStorageSync('sessionId')
    var semeter = { semeter: this.data.semeter }
    // console.log(semeter)
    getMyGrade({ sessionId, semeter }).then(res => {
      if (!res.data) {
        app.mhideLoading(this)
        wx.showToast({
          title: '暂无数据',
          icon: 'none',
          duration: 1000,
          mask: false
        })
      } else {
        var grade = res.data.map(data => {
          if (!data.score.trim()) {
            data.score = '无'
          }
          if (data.property == '正常') {
            data.property = false
          } else {
            data.property = true
          }
          return {
            category: data.category,
            courseName: data.courseName,
            credit: data.credit,
            property: data.property,
            score: data.score
          }
        })
        let showModel = res.data[0] ? false : true
        this.setData({
          grade,
          showModel,
          semeter: this.data.semeterArray[0]
        })
        app.mhideLoading(this)
      }
    }).catch(err => {
      app.mhideLoading(this)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})