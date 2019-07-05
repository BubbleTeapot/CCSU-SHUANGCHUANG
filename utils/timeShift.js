const date = new Date()
var year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds()

module.exports = {
    // 转换时间格式
    dateFormation(data) {
        var arr = data.split('/')
        var time1 = [],
            time2 = [],
            str = ''
        if (month < 10) {
            month = '0' + month
        }
        if (day < 10) {
            day = '0' + day
        }
        if (hours < 10) {
            hours = '0' + hours
        }
        if (minutes < 10) {
            minutes = '0' + minutes
        }
        if (seconds < 10) {
            seconds = '0' + seconds
        }
        arr.forEach(el => {
            switch (el) {
                case 'YYYY': time1.push(year); break;
                case 'MM': time1.push(month); break;
                case 'DD': time1.push(day); break;
                case 'hh': time2.push(hours); break;
                case 'mm': time2.push(minutes); break;
                case 'ss': time2.push(seconds); break;
            }
        })
        str = time1.join('-')
        str += ' ' + time2.join(':')
        return str
    },
    // 获取某个时间到现在的天数,获取本周日期月份
    getCountDays(startTime, offset) {
        //日期格式化 
        var start_date = new Date(startTime.replace(/-/g, "/"))
        var endTime = new Date()
        //转成毫秒数，两个日期相减
        var days = endTime.getTime() - start_date.getTime()
        //转换成天数
        var day = parseInt(days / (1000 * 60 * 60 * 24))
        // 获取当前周的月份,和本周日期
        var num = day % 7
        var date = new Date(endTime.getTime() + (offset - num) * (1000 * 60 * 60 * 24))
        var month = date.getMonth() + 1
        var days = []
        for(let i = 0; i < 7; i++) {
            date = new Date(endTime.getTime() + (offset - num + i) * (1000 * 60 * 60 * 24))
            days.push(date.getDate())
        }
        return { day, month, days }
    }
}