const { getProjectById } = require('../../../api/doubleCreation')
const app = getApp()
Page({
    data: {
        projectId: '',
        teamName: '',   // 团队名
        project: '' // 项目详情
    },
    onLoad(e) {
        app.mshowLoading(this)
        this.data.projectId = e.id
        this.setData({
            teamName: e.teamName
        })
        this.GetProjectById()
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
     * 获取项目详情
     */
    GetProjectById() {
        var sessionId = wx.getStorageSync('sessionId')
        var data = { projectId: this.data.projectId }
        getProjectById({ data, sessionId }).then(res => {
            if (res.data) {
                this.setData({
                    project: res.data
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
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        app.mshowLoading(this)
        this.GetProjectById()
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    }
})