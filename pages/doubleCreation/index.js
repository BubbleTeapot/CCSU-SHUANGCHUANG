const { getTeamList, getMyTeamList } = require('../../api/doubleCreation')
const app = getApp()

Page({
  data: {
    menusList: [
      { index: 0, name: '双创团队' },
      { index: 1, name: '双创导师' }
    ],
    teamList: [],
    myteamList: '',
    projectList: [],
    teamTeacher: [
      {
        name: '付细楚',
        present: '付细楚，高级工程师、计算机软件系统分析师，主要从事软件开发过程与开发方法及体系结构研究。近二十年软件开发经验，负责多项大型企业项目开发。主持数项省市纵向项目，湖南省青年教学能手。',
        avatar: '../../static/images/fudaoshi.jpg'
      },
      {
        name: '何文德',
        present: '何文德，研究方向为无线传感器网络、嵌入式系统、物联网。主持科研项目5项、教研项目2项，以第一作者发表科研论文7篇、教研论文2篇，指导大学生创新项目3项，获湖南省科技进步二等奖1项（排名第二）。指导学生获得湖南省大学生程序设计竞赛一等奖2项、二等奖3项、三等奖1项，指导学生获得湖南省大学生物联网应用创新设计大赛一等奖1项、二等奖2项。现指导学生团队研究开发内容：1.Android应用开发技术;2.微信公众号、小程序开发技术;3.单片机开发技术（51单片机系列、Cortex M系列）;4.Java Web、.Net应用开发技术;5.嵌入式系统应用开发技术；6.人工智能应用技术',
        avatar: '../../static/images/hedaoshi.jpg'
      },
      {
        name: '李文皓',
        present: '李文皓，男，1981年9月生，湖南省长沙人。分别就读于华中科技大学与中南大学，并获理学硕士学位与理学博士学位。工作以来主要从事应用数学与计算数学的科研与教学工作。科研上先后获得湖南省自然科学基金青年项目与国家自然科学基金青年项目资助。给本科生讲授的课程包括 《高等数学》、《线性代数》、《数据结构》、《概率论与数理统计》、《运筹与优化》以及《离散数学》等课程，且准备新开设《数据建模》课程。数学建模竞赛培训班中向学生讲授智能算法与机器学习方法. 带队参加各项数学建模竞赛，数次取得省级奖项。',
        avatar: '../../static/images/lidaoshi.jpg'
      },
      {
        name: '刘巍',
        present: '刘巍，湖南大学博士，主要从事数值代数、数学建模等方面的研究，主持教研教改项目5项，先后在INT J COMPUT MATH、Filomat、LINEAR ALGEBRA APPL、数学研究与评论等学术期刊上发表论文多篇。主讲课程有《高等代数》、《数学建模》、《高等数学》等。指导学生参加大学生数学建模竞赛和数学竞赛，获美国大学生数学建模竞赛一等奖1项，二等奖3项，全国大学生数学建模竞赛二等奖4项，全国大学生电工杯数学建模竞赛一等奖1项、三等奖4项，全国大学生数学竞赛三等奖1项，省级奖项20余项。',
        avatar: '../../static/images/liudaoshi.jpg'
      },
      {
        name: '刘欣',
        present: '刘欣，男，1978年出生，国防科技大学计算机专业，工学博士。现任长沙学院计算机科学与技术系专职教师，中国计算机学会会员。02年至09年从事互联网骨干路由与互联网域间路由安全技术领域的科研工作。在互联网骨干路由结构、域间路由安全态势分析、IP源伪造、路由劫持、伪造与防范等方面有深入的研究，取得了一定的研究成果。在多年科研活动中，积累了丰富的研究经验，主持多项省级及以上课题，在国际会议、国内期刊发表20多篇学术论文，其中有6篇被SCI、EI检索，发明专利1项，软件著作权1项。09年至12年从事大规模物联网技术的产业化研究工作。对大规模物联网的实施、部署与运营等方面有深入的研究，取得了一定的研究成果。主持中国联通资助课题一项“运营级智能交通物联网平台项目”，并基于该平台推出“沃看路况”、“掌上交通”等一系列收入型3G亮点业务。作为重要成员参与“中国联通物联网研发环境项目”，参与制定《中国联通物联网体系架构总体规范》等企业标准。参与并指导湖南联通开展多个“大规模校园物联网”项目。',
        avatar: '../../static/images/liuxindaoshi.jpg'
      },
      {
        name: '孟志刚',
        present: '孟志刚，长期从事人工智能和图形图像的教学和科研工作，以一作或通讯作者发表国内外学术论文十来篇，主持省市级科研项目四项，获得软件著作权两项，作为指导老师指导学生获得湖南省大学生程序设计竞赛应用类三等奖累计三项，包括手游及与人工智能算法结合的APP作品。另外，与企业合作紧密，曾于2017年被阿凡提信息科技（湖南）股份有限公司聘为首席技术顾问，并先后在长沙多家人工智能公司担任兼职或进行项目合作，推荐多名学生去中科院宁波所、湖南某上市公司及其他公司实习或就业。',
        avatar: '../../static/images/mengdaoshi.jpg'
      },
      {
        name: '潘怡',
        present: '潘怡老师，女，中共党员，博士，教授，从事《数据库系统原理》、《商务智能》等课程教学及相关科研工作。近5年来潘老师主持湖南省本科质量工程2项，湖南省教育厅教改项目2项，湖南省教育科学规划课题1项，发表教研教改论文6篇。在创新创业教育的道路上，潘怡老师注重发挥每个学生的主观能动性，发扬传帮带优良传统，不断完善双创人才的成长模式，近年来潘老师指导学生团队完成省、学院大学生科研立项和创新训练项目8项，其中有2项作品获得国家级大学生创新训练项目资助；获得湖南省大学生程序竞赛及物联网应用创新设计大赛一等奖4项，二等奖5项，三等奖5项；指导本科生发表学术论文3篇，申报实用新型专利2项，申报软件著作权14项；学生团队完成了我校第一款校园专属APP—“掌上长大”，被湖南教育电视台、长沙晚报等媒体宣传报导；多名学生毕业后在阿里巴巴、腾旭等国内知名企业就职。',
        avatar: '../../static/images/pandaoshi.jpg'
      },
      {
        name: '彭向阳',
        present: '彭向阳，教授，主要从事数值代数、数学建模等方面的研究，主持长沙市科技计划项目以及湖南省教育厅项目各1项，先后在LINEAR ALGEBRA APPL、J COMPUT APPL MATH、数学学报、中国科学学报、数学物理学报、高校计算数学学报、工程数学学报、模糊系统与数学等学术期刊上发表论文多篇。主讲课程有《数学分析》、《数学建模》、《线性代数》等。指导学生参加大学生数学建模竞赛和数学竞赛，获全国大学生数学建模竞赛二等奖1项，全国大学生电工杯数学建模竞赛三等奖1项，省级奖项10余项。',
        avatar: '../../static/images/pengdaoshi.jpg'
      },
      {
        name: '魏歌',
        present: '魏歌，指导竞赛14年，先后获得湖南省大学生程序设计竞赛一等奖六项，二等奖十余项；ACM-ICPC国际大学生程序设计竞赛亚洲区域赛铜奖七项，2018年获ICPC亚洲区总决赛（EC-final）铜奖一项。其指导的团队正专注于人工智能与物联网的结合的应用领域。',
        avatar: '../../static/images/weidaoshi.jpg'
      },
      {
        name: '杨凤年',
        present: '杨凤年，研究方向为无线传感器网络、嵌入式系统、物联网。主持科研项目5项、教研项目7项，以第一作者发表科研论文9篇、教研论文7篇，主编教材1本，指导大学生创新项目7项，获长沙学院教学成果二等奖1项。指导学生获得湖南省大学生程序设计竞赛一等奖1项、二等奖3项、三等奖1项，指导学生获得湖南省大学生物联网应用创新设计大赛二等奖1项、三等奖1项。现指导学生团队研究开发内容：1.Android应用开发技术;2.微信公众号、小程序开发技术;3.单片机开发技术（51单片机系列、Cortex M系列）;4.Java Web、.Net应用开发技术;5.嵌入式系统应用开发技术；6.人工智能应用技术。',
        avatar: '../../static/images/yangdaoshi.jpg'
      },
      {
        name: '张逵',
        present: '张逵，主要从事随机过程及其应用、数学建模等方面的研究，主持教改及科研项目共4项，公开发表专业学术论文多篇。主讲课程有《数学建模》、《运筹学》、《高等数学》以及《概率论与数理统计》等，先后获长沙学院青年教师赛课一等奖、湖南省普通高校教学能手称号。指导学生参加大学生数学建模竞赛，获美国大学生数学建模竞赛一等奖1项，二等奖3项，全国大学生数学建模竞赛一等奖1项、二等奖4项，全国大学生电工杯数学建模竞赛三等奖2项，省级奖项10余项。',
        avatar: '../../static/images/zhangtingdaoshi.jpg'
      },
      {
        name: '张志宏',
        present: '张志宏，副教授，主要从事大数据处理、图像处理等方面的研究，主持科研项目4项，教研项目1项，教学成果1项，先后以第一作者或通讯作者国内外高水平期刊发表SCI论文10篇，EI论文2篇，CSCD论文1篇。现指导学生团队参与计算机视觉等方面的研究，获得省级学科竞赛一等奖1项，二等奖5项，三等奖2项；大学生创新创业训练计划项目2项。',
        avatar: '../../static/images/zhangzhihongdaoshi.jpg'
      },
      {
        name: '张作政',
        present: '张作政，男，1979年6月出生，博士，副教授，数学教研室主任.2009年博士毕业于湖南师范大学计算数学专业. 2009年来长沙学院工作以来，一直担任计算方法与软件，复变函数等专业课程以及经济数学，工程数学等公共课程的教学工作，教学效果良好，获得了同事和学生的肯定，多次获得教学质量A等. 指导学生参加全国数学建模竞赛获获全国二等奖和省一等奖。科研方面主要研究方向为微分方程数值解，主持省教育厅自然科学研究项目(对流扩散方程的超收敛和一致收敛性，编号10C0410),湖南师范大学省部共建实验室开放课题项目(DG方法求解对流扩散方程的超收敛,编号：HS201110)，主持长沙市科技计划项目（流体动力学中奇异摄动对流扩散方程的数值模拟计算研究）。',
        avatar: '../../static/images/zhangzuozhengdaoshi.jpg'
      }
    ],
    menuIndex: 0, //菜单下标
  },
  onLoad(e) {
    app.mshowLoading(this)
    Promise.all([this.GetTeamList(), this.GetMyTeamList()]).then(() => {
      app.mhideLoading(this)
    })
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
   * 获取双创团队信息
   */
  GetTeamList() {
    var sessionId = wx.getStorageSync('sessionId');
    var data = {}
    var offset = 10,
      start = 0
    data = { offset, start }
    return getTeamList({ data, sessionId }).then(res => {
      if (res.data) {
        var teamList = res.data.map(res => {
          var honor = '暂无'
          var projects = '暂无'
          if (res.honor) {
            honor = res.honor.length
          }
          if (res.projects) {
            projects = res.projects.length
          }
          return {
            name: res.name,
            avatar: res.avatar,
            advisor: res.advisor,
            groupMemberVOS: res.groupMemberVOS,
            projects,
            honor,
            id: res.id
          }
        })
        this.setData({
          teamList
        })
      } else {
        //数据为空
      }
    }).catch(err => {
    })
  },
  // 获取我的团队
  GetMyTeamList() {
    var sessionId = wx.getStorageSync('sessionId')
    return getMyTeamList({ sessionId }).then(res => {
      if (res.data) {
        var myteamList = res.data.map(res => {
          var honor = '暂无'
          var projects = '暂无'
          if (res.honor) {
            honor = res.honor.length
          }
          if (res.projects) {
            projects = res.projects.length
          }
          return {
            name: res.name,
            avatar: res.avatar,
            advisor: res.advisor,
            groupMemberVOS: res.groupMemberVOS,
            projects,
            honor,
            id: res.id
          }
        })
        this.setData({
          myteamList
        })
      } else {
        //数据为空
      }
    }).catch(err => {
    })
  },
  // 菜单切换
  menuClick(e) {
    var menuIndex = e.target.dataset.index
    this.setData({
      menuIndex
    })
  },
  // 成员信息跳转
  myTeamNavigateTo(e) {
    wx.navigateTo({
      url: './teamDetail/index?id=' + e.currentTarget.dataset.id
    })
  },
  // 双创导师
  navigateToteacher(e) {
    wx.navigateTo({
      url: './teacherDetail/index?name=' + e.currentTarget.dataset.name
    })
  },
  // tabbar传值(适配iponeX底部tabbar)
  getIsIphoneX(e) {
    this.setData({
      isIphoneX: e.detail.isIphoneX
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    app.mshowLoading(this)
    Promise.all([this.GetTeamList(), this.GetMyTeamList()]).then(() => {
      app.mhideLoading(this)
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },
})