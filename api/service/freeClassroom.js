const { ajax } = require('../../utils/ajax')

var url = {
    getFreeClassroom: '/school/getFreeClassroom'
}

module.exports = {
  // 获取成绩
  getFreeClassroom({ data, sessionId }) {
    return ajax({
      url: url.getFreeClassroom,
      method: 'GET',
      sessionId: sessionId,
      data:data
    })
  },
}