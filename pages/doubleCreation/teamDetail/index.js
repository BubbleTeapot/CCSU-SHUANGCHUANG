const { getTeamById } = require('../../../api/doubleCreation')
const app = getApp()
Page({
    data: {
        teamId: '', // 团队id
        teamName: '',   // 团队名
        memberList: '', // 团队成员
        projects: '',   // 项目列表
        advisor: '',    // 导师
        honorList: '',  // 荣誉列表
        teamLog: '', //团队日志
        showTeammember: false,   // 显示团队成员
        showTeamLog: false,   // 显示团队日志
        memberLists:[
            {
              avatar:'../../../static/images/ccsu/007.jpg',
            },
            {
              avatar: '../../../static/images/ccsu/008.jpg',
            },
            {
              avatar: '../../../static/images/ccsu/33.jpg',
            }
          ],
    },
    onLoad(e) {
        app.mshowLoading(this)
        this.data.teamId = e.id
        this.GetTeamById()
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
     * 获取团队详情
     */
    GetTeamById() {
        var sessionId = wx.getStorageSync('sessionId')
        var data = { teamId: this.data.teamId }
        getTeamById({ data, sessionId }).then(res => {
            // console.log(res)
            if (res.data) {
                res.data.groupMemberVOS = res.data.groupMemberVOS.map(data => {
                    if(data.title.indexOf('学生') != -1) {
                        return {
                            title: data.title.split('学生')[0],
                            name: data.name,
                            role: data.role
                        }
                    }else {
                        return {
                            title: data.title,
                            name: data.name,
                            role: data.role
                        }
                    }
                })
                this.setData({
                    teamName: res.data.name,
                    memberList: res.data.groupMemberVOS,
                    projects: res.data.projects,
                    advisor: res.data.advisor,
                    honorList: res.data.honor,
                    teamLog: res.data.teamLog
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
     * 跳转项目详情
     */
    myProjectNavigateTo(e) {
        wx.navigateTo({
            url: '../projectDetail/index?id=' + e.currentTarget.dataset.id + '&teamName=' + e.currentTarget.dataset.teamname
        })
    },
    /**
     * 显示（隐藏）团队成员
     */
    ctrMember() {
        var showTeammember = !this.data.showTeammember
        this.setData({
            showTeammember
        })
    },
    /**
     * 显示（隐藏）团队日志
     */
    ctrTeamLog() {
        var showTeamLog = !this.data.showTeamLog
        this.setData({
            showTeamLog
        })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        app.mshowLoading(this)
        this.GetTeamById()
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },
})