const { ajax } = require('../../utils/ajax')

var url = {
  myGrade: '/school/getGrade'
}

module.exports = {
  // 获取成绩
  getMyGrade(params) {
    return ajax({
      url: url.myGrade,
      method: 'GET',
      sessionId: params.sessionId,
      data:params.semeter
    })
  },
}