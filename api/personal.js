const { ajax } = require('../utils/ajax.js')

var url = {
    userInfo: '/user/getUserInfo',
    personInfo: '/user/personCenter',
    notification: '/notification/getNotifications',
    personInfoByopenid: '/user/getUserInfoByOpenId',
    saveUserInfo: '/user/modifyStudentInfo',
    getMyActivity: '/information/myActivity'
}

module.exports = {
    // 获取用户微信信息
    getUserInfo(params) {
        return ajax({
            url: url.userInfo,
            method: 'GET',
            sessionId: params.sessionId
        })
    },
    // 获取用户个人信息
    getPersonInfo(params) {
        return ajax({
            url: url.personInfo,
            method: 'GET',
            sessionId: params.sessionId
        })
    },
    // 通过openid取用户信息
    getPersonInfoByopenId({ data, sessionId }) {
        return ajax({
            url: url.personInfoByopenid,
            method: 'GET',
            sessionId,
            data
        })
    },
    // 获取个人消息
    getNotification({ sessionId }) {
        return ajax({
            url: url.notification,
            method: 'GET',
            sessionId
        })
    },
    // 保存个人信息修改
    saveUserInfo({ data, sessionId }) {
        return ajax({
            url: url.saveUserInfo,
            method: 'GET',
            sessionId,
            data
        })
    },
    // 获取个人参与活动的信息
    getMyActivity({ sessionId }) {
        return ajax({
            url: url.getMyActivity,
            method: 'GET',
            sessionId
        })
    }
}