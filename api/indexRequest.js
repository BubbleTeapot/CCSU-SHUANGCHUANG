const { ajax } = require('../utils/ajax')

var url = {
    feedHot: '/feed/hot',
    feedLatest: '/feed/latest',
    listByCategory: '/feed/listByCategory',
    information: '/information/getInformationById',
    applyActivity: '/information/applyActivity'
}

module.exports = {
    // 最新
    getFeedLatest(params) {
        return ajax({
            url: url.feedLatest,
            method: 'GET',
            sessionId: params.sessionId
        })
    },
    // 热搜
    getFeedHot(params) {
        return ajax({
            url: url.feedHot,
            method: 'GET',
            sessionId: params.sessionId
        })
    },
    // 按类别
    getFeedListByCategory({ list, sessionId }) {
        return ajax({
            url: url.listByCategory,
            method: 'GET',
            sessionId,
            data: list
        })
    },
    // 文章详情
    getInformation({ data, sessionId }) {
        return ajax({
            url: url.information,
            method: 'GET',
            sessionId,
            data
        })
    },
    // 申请参加
    applyActivity({ data, sessionId }) {
        return ajax({
            url: url.applyActivity,
            method: 'POST',
            sessionId,
            data
        })
    }
}