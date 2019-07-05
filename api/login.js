const { ajax } = require('../utils/ajax.js')

var url = {
    login: '/user/login',
    setJwcAccount: '/user/bind'
}

module.exports =  {
    // 用户登陆
    loginIn (params) {
        return ajax({
            url: url.login,
            method: 'POST',
            data: params
        })
    },
    // 绑定学号
    setJwcAccount ({data, sessionId}) {
        return ajax({
            url: url.setJwcAccount,
            method: 'POST',
            sessionId: sessionId,
            data: data
        })
    }
}