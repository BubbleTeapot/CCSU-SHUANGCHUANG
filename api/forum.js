const { ajax } = require('../utils/ajax.js')

var url = {
    topicList: '/api/topic/index',
    topicDetail: '/api/topic/',
    commentList: '/api/comment/list',
    saveComment: '/api/comment/save',
    saveTopic: '/api/topic/save',
    topicPraise: '/api/topic/',
    commentPraise: '/api/comment/'
}

module.exports = {
    // 获取用户微信信息
    getTopic({ sessionId }) {
        return ajax({
            url: url.topicList,
            method: 'GET',
            sessionId
        })
    },
    // 获取主题详情
    getTopicDetail({ id, sessionId }) {
        return ajax({
            url: url.topicDetail + id,
            method: 'GET',
            sessionId
        })
    },
    // 获取主题所有评论
    getcommentList({ data, sessionId }) {
        return ajax({
            url: url.commentList,
            method: 'GET',
            sessionId,
            data
        })
    },
    // 发表评论
    saveComment({ data, sessionId }) {
        return ajax({
            url: url.saveComment,
            method: 'POST',
            sessionId,
            data
        })
    },
    // 发表主题
    saveTopic({ data, sessionId }) {
        return ajax({
            url: url.saveTopic,
            method: 'GET',
            sessionId,
            data
        })
    },
    // 为主题点赞
    topicPraise({id, sessionId}) {
        return ajax({
            url: url.topicPraise + id + '/vote',
            method: 'GET',
            sessionId
        })
    },
    // 给评论投票
    commentPraise({id,sessionId}) {
        return ajax({
            url: url.commentPraise + id + '/vote',
            method: 'GET',
            sessionId
        })
    }
}