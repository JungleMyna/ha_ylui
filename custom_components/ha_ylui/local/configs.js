YL.static = {
  /** “关于”信息 */
  softwareName: 'HA YLUI', //网站名。请在此处填写您自己的网站名，如王小明的博客。
  version: "1.0.0", // 网站版本号
  iconBtnStart: 'html5', //主图标
  author: 'ylui',//作者
  contactInformation: 'qq:635147515',//联系方式
  officialWebsite: 'https://github.com/shaonianzhentan/ha_ylui',//软件官网
  welcome: '本网站UI由 YLUI 强力驱动\n更多信息：//ylui.yuri2.cn',//加载完毕控制台提示信息
  copyrightDetail: 'ylui',//版权详细信息
  otherStatements: '',//其他信息（可留空）

  /**————————————————————————————————————————————————————————————————————————————————————————————*/
  /** YLUI基础设置 */
  lang: 'zh-cn', //语言
  localStorageName: "ylui-storage", //ls存储名
  lockedApps: ['yl-system', 'yl-color-picker', 'ylui-fa', 'yl-browser', 'yl-server', 'yl-app-store'], // 锁定的应用（不允许被脚本修改）
  trustedApps: ['yl-server'], // 受信任的应用（可以使用敏感API）
  debug: false,//启用更多调试信息
  beforeOnloadEnable: false,//启用关闭前询问（打包app时请关闭防止出错）
  WarningPerformanceInIE: true,//在IE下提示体验不佳信息
  languages: {}, //推荐留空，自动从文件加载
  changeable: true,//存档数据是否可被普通用户修改
  dataCenter: true,//是否展示数据管理中心

  /**————————————————————————————————————————————————————————————————————————————————————————————*/
  /** YLUI注册信息 */
  authorization: '社区版',//授权类型
  serialNumber: null,//序列号
  async post(data) {
    try {
      let hass = null
      let ha = top.document.querySelector('home-assistant')
      if (ha) {
        hass = ha.hass
      } else {
        let h = localStorage['ylui-hass']
        if (h) {
          hass = JSON.parse(h)
        } else {
          location.href = 'login.html'
        }
      }
      let auth = hass.auth
      let authorization = ''
      if (auth._saveTokens) {
        // 过期
        if (auth.expired) {
          await auth.refreshAccessToken()
        }
        authorization = `${auth.data.token_type} ${auth.accessToken}`
      } else {
        authorization = `Bearer ${auth.data.access_token}`
      }
      return fetch(`${top.location.pathname}-api`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          authorization
        },
        body: JSON.stringify(data)
      }).then(res => res.json()).then(res => {
        if (res.code === 401) {
          top.location.href = 'login.html'
        }
        return res
      })
    } catch (ex) {
      return Promise.reject(ex)
    }

  }
};
