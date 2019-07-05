const { ajax } = require('../utils/ajax.js')

var url = {
    teamList: '/team/getAllTeam',
    myTeamList: '/team/getTeamByUserId',
    getTeamById: '/team/getTeamByTeamId',
    getProjectById: '/project/getProjectByProjectId'
}

module.exports = {
    // 获取所有团队
    getTeamList({ data, sessionId }) {
        return ajax({
            url: url.teamList,
            method: 'GET',
            sessionId,
            data
        })
    },
    // 获取我的团队
    getMyTeamList({ sessionId }) {
        return ajax({
            url: url.myTeamList,
            method: 'GET',
            sessionId
        })
    },
    // 查询团队详情
    getTeamById({ data, sessionId }) {
        return ajax({
            url: url.getTeamById,
            method: 'GET',
            sessionId,
            data
        })
    },
    // 查询项目详情
    getProjectById({ data, sessionId }) {
        return ajax({
            url: url.getProjectById,
            method: 'GET',
            sessionId,
            data
        })
    },
}