// ajax
const baseUrl = "http://39.106.96.220:8080"    //项目服务器地址
const appPlatform = 'MiniProgram'   // 类别
const appVersion = "1.0.0"  // 小程序版本

const ajax = (response) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + response.url,  // 请求地址
            data: response.data,  // 请求数据
            header: response.header || { 'content-type': 'application/x-www-form-urlencoded', 'sessionId': response.sessionId, 'appPlatform': appPlatform, 'appVersion': appVersion },//请求头
            method: response.method,  // 请求方法
            dataType: response.dataType,  // 预期返回数据类型
            responseType: response.responseType,  //设置返回数据的类型
            success: (res) => {
                // console.log(res)
                // 先判断状态码
                if (res.statusCode == 200) {
                    // 判断服务器错误代码
                    if (res.data.code == 0) {
                        resolve(res.data)
                    } else if (res.data.code == -10008) {
                        // 登录态过期
                        wx.login({
                            success: res => {
                                let code = res.code
                                wx.setStorageSync('code', code);
                                wx.setStorageSync('sessionId', "");
                                wx.showToast({
                                    title: '用户信息过期',
                                    icon: 'none',
                                    duration: 1000,
                                    mask: false
                                })
                                wx.reLaunch({
                                    url: '/pages/home/index'
                                })
                            }
                        })
                    }else if(res.data.code == -10010) {
                        wx.navigateTo({
                            url: '/pages/login/index'
                        })
                    } else {
                        resolve(res.data.msg)
                    }
                }
            },
            //  断网、域名解析出错、url格式不正确、参数类型有误 
            fail: (e) => {
                wx.showToast({
                    title: '网络出错',
                    icon: 'none',
                    duration: 1500,
                    mask: false
                })
                reject(e)
            }
        });
    })
}

module.exports = {
    ajax: ajax
}