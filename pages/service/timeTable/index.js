const { getCourse } = require('../../../api/service/timetable')
const { dateFormation, getCountDays } = require('../../../utils/timeShift')
const app = getApp()
Page({
  data: {
    courseDate: {
      month: '5',
      courseFirstCol: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    },
    weekdayName: ['一', '二', '三', '四', '五', '六', '日'],
    weekdayDate: [],  // 本周的日期
    courseList: [],
    semester: '2018-2019-2', // 学期
    week: '', //第几周
    allWeek: 20, // 一共多少周
    startSemster: '2019-02-25', //开学日期
    touch: '',
    index: 0  // 表示当前
  },
  onLoad(e) {
    app.mshowLoading(this)
    this.getDay()
    this.GetCourse()
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
   * 获取每周课表
   */
  GetCourse() {
    var sessionId = wx.getStorageSync("sessionId")
    var data = { semester: this.data.semester, week: this.data.week }
    getCourse({ data, sessionId }).then(res => {
      if (res.data) {
        var courseList = res.data.map(data => {
          var weekday,
            section
          switch (data.weekday) {
            case '1': weekday = 0;
              break;
            case '2': weekday = 1;
              break;
            case '3': weekday = 2;
              break;
            case '4': weekday = 3;
              break;
            case '5': weekday = 4;
              break;
            case '6': weekday = 5;
              break;
            case '7': weekday = 6;
              break;
          }
          switch (data.section) {
            case '1-2': section = 0;
              break;
            case '3-4': section = 1;
              break;
            case '5-6': section = 2;
              break;
            case '7-8': section = 3;
              break;
            case '9-10': section = 4;
              break;
            case '11-12': section = 5;
              break;
          }
          return {
            weekday,
            courseDetail: [
              {
                location: data.location,
                subjectName: data.subjectName,
                teacher: data.teacher,
                section
              }
            ]
          }
        })
        // 对象去重后相同属性合并
        var newList = []
        var newData = {}
        courseList.forEach((data, i) => {
          if (!newData[data.weekday]) {
            newList.push(data);
            newData[data.weekday] = true;
          } else {
            newList.forEach(data1 => {
              if (data1.weekday === courseList[i].weekday) {
                // data1.courseDetail = data1.courseDetail.concat(courseList[i].courseDetail);
                data1.courseDetail = [...data1.courseDetail, ...courseList[i].courseDetail];   // es6语法
              }
            })
          }
        })
        // 按index将对象排序
        newList.sort((a, b) => {
          return a['weekday'] - b['weekday']
        })
        this.setData({
          courseList: newList
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
    this.GetCourse()
  },
  /**
   * 用户手势判断(左右)，我的做法较为简单.[用斜率较为精确]
   */
  touchStart(e) {
    this.data.touch = { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY }
  },
  touchEnd(e) {
    var start = this.data.touch
    var end = { clientX: e.changedTouches[0].clientX, clientY: e.changedTouches[0].clientY }
    if (end.clientX - start.clientX > 50 && Math.abs(end.clientY - start.clientY) < 50) {
      // 右划
      app.mshowLoading(this)
      this.data.index -= 1
      if (this.data.index + this.data.week < 0) {
        this.setData({
          week: 1
        })
        app.mhideLoading(this)
        wx.showToast({
          title: '施主止步',
          icon: 'none',
          duration: 1000,
          mask: false
        })
      } else {
        this.getDay()
        this.GetCourse()
      }
    } else if (end.clientX - start.clientX < -50 && Math.abs(end.clientY - start.clientY) < 50) {
      // 左划
      app.mshowLoading(this)
      this.data.index += 1
      if (this.data.index + this.data.week > 20) {
        this.setData({
          week: 20
        })
        app.mhideLoading(this)
        wx.showToast({
          title: '施主止步',
          icon: 'none',
          duration: 1000,
          mask: false
        })
      } else {
        this.getDay()
        this.GetCourse()
      }
    }
  },
  // 计算日期和周
  getDay() {
    var offset = 7 * this.data.index
    var date = getCountDays(this.data.startSemster, offset)
    var week = Math.ceil(date.day/7) + this.data.index
    this.setData({
      ['courseDate.month']: date.month,
      week,
      weekdayDate: date.days
    })
  }
})