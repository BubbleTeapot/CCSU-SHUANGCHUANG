const { getFreeClassroom } = require('../../../api/service/freeClassroom')
const { dateFormation, getCountDays } = require('../../../utils/timeShift')
const app = getApp()
Page({
  data: {
    freeClassroom: [
      {
        name: '涵虚楼'
      },
      {
        name: '致远楼'
      },
      {
        name: '宁静楼'
      },
      {
        name: '理工楼'
      }
    ],
    date: {
      hours: '',
      semester: '2018-2019-2', // 学期
      startSemster: '2019-02-25', //开学日期
      week: '',
      weekDay: ''
    }
  },
  onLoad(e) {
    app.mshowLoading(this)
    this.getDay()
    this.showFreeClassroom()
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
   * 获取空闲教室
   */
  showFreeClassroom() {
    var sessionId = wx.getStorageSync("sessionId")
    var section = ''
    if (this.rangeTime(this.data.date.hours, '08:00', '09:40')) {
      section = '1-2'
    } else if (this.rangeTime(this.data.date.hours, '10:00', '11:40')) {
      section = '3-4'
    } else if (this.rangeTime(this.data.date.hours, '14:00', '15:40')) {
      section = '5-6'
    } else if (this.rangeTime(this.data.date.hours, '16:00', '17:40')) {
      section = '7-8'
    } else if (this.rangeTime(this.data.date.hours, '19:00', '20:40')) {
      section = '9-10'
    } else if (this.rangeTime(this.data.date.hours, '21:00', '22:40')) {
      section = '11-12'
    }
    var data = { section, semester: this.data.date.semester, week: this.data.date.week, weekDay: this.data.date.weekDay }
    getFreeClassroom({ data, sessionId }).then(res => {
      // console.log(res)
      let hxlarr = []
        , zylarr = []
        , lglarr = []
        , njlarr = []
      if (res.data) {
        res.data.forEach(elem => {
          if (elem.indexOf('涵虚楼') != -1) {
            hxlarr.push(elem.split('涵虚楼')[1])
            this.data.freeClassroom[0].freeArr = hxlarr
          } else if (elem.indexOf('致远楼') != -1) {
            zylarr.push(elem.split('致远楼')[1])
            this.data.freeClassroom[1].freeArr = zylarr
          } else if (elem.indexOf('宁静楼') != -1) {
            njlarr.push(elem.split('宁静楼')[1])
            this.data.freeClassroom[2].freeArr = njlarr
          } else if (elem.indexOf('理工楼') != -1) {
            lglarr.push(elem.split('理工楼')[1])
            this.data.freeClassroom[3].freeArr = lglarr
          }
        })
        this.setData({
          freeClassroom: this.data.freeClassroom
        })
      } else {
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
    this.showFreeClassroom()
  },
  // 计算周
  getDay() {
    var date = getCountDays(this.data.date.startSemster)
    var time = new Date();
    var weekDay = time.getDay();
    var hours = dateFormation('hh/mm')
    var week = Math.ceil(date.day / 7)
    this.setData({
      ['date.week']: week,
      ['date.weekDay']: weekDay,
      ['date.hours']: hours
    })
  },
  // 判断某个时间是否在某个时间段内
  rangeTime(time, startTime, endTime) {
    var timeArr = time.split(":")
    var startTimeArr = startTime.split(":")
    var endTimeArr = endTime.split(":")
    if (timeArr.length != 2) {
      return false;
    }
    if (startTimeArr.length != 2) {
      return false;

    }
    if (endTimeArr.length != 2) {
      return false;
    }
    var tm = new Date()
    var sm = new Date()
    var em = new Date()

    tm.setHours(timeArr[0])
    tm.setMinutes(timeArr[1])
    sm.setHours(startTimeArr[0])
    sm.setMinutes(startTimeArr[1])
    em.setHours(endTimeArr[0])
    em.setMinutes(endTimeArr[1])

    if (tm.getTime() - sm.getTime() > 0 && tm.getTime() - em.getTime() < 0) {
      return true
    } else {
      return false
    }
  }
})