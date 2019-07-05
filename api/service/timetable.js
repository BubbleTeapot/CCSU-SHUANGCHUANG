const { ajax } = require('../../utils/ajax.js')

var url = {
    getCourse: '/school/course/getCourseByWeek'
}

module.exports = {
    // 获取课表
    getCourse({ data, sessionId }) {
        return ajax({
            url: url.getCourse,
            method: 'GET',
            sessionId,
            data
        })
    }
}