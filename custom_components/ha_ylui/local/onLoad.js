/**
 * 读取配置示例文件
 * 修改此文件来实现持久化
 * YL.init(data) 中的data必须是ylui接受的数据格式
 * 开发者可以自行决定从静态文件读取（如basic.json）还是从远程服务器拉取（如ajax请求）
 */

YL.onLoad(function () {
  // 读取url中load参数，如localhost/ylui/index.html?load=basic
  var load = Yuri2.parseURL().params.load;
  var file;
  // 当load === 'ylui-storage'时，尝试加载浏览器缓存
  if (load === YL.static.localStorageName && localStorage.getItem(YL.static.localStorageName)) {
    console.log('loading')
    YL.init();
    return;
  } else if (load === YL.static.localStorageName) {
    file = 'basic';
  }
  console.log('初始化配置数据')
    ; (() => {
      // 设置全屏模式
      try {
        let haPanelIframe = top.document.body
          .querySelector("home-assistant")
          .shadowRoot.querySelector("home-assistant-main")
          .shadowRoot.querySelector("app-drawer-layout partial-panel-resolver ha-panel-iframe").shadowRoot
        let ha_card = haPanelIframe.querySelector("iframe");
        ha_card.style.position = 'absolute'
        haPanelIframe.querySelector('app-toolbar').style.display = 'none'
        ha_card.style.top = '0'
        ha_card.style.height = '100%'
      } catch (ex) {

      }
      // 监听数据变化
      top.window.addEventListener('storage', function (e) {
        // console.log(e);
        if (e.key === 'ylui-storage') {
          if (e.oldValue != e.newValue) {
            // 更新
            this.fetch(`${top.location.pathname}-api`, {
              method: 'post',
              body: JSON.stringify({
                type: 'set',
                data: e.newValue
              })
            }).then(res => res.json()).then(res => {
              console.log(res)
            })
          }
        }
      });
    })();
  fetch(`${top.location.pathname}-api`, {
    method: 'post',
    body: JSON.stringify({
      type: 'get'
    })
  }).then(res => res.json()).then(res => {
    if (res.code === 0) {
      let obj = JSON.parse(res.data)
      YL.init(obj)
    } else {
      // 从json文件读取
      file = file || load || 'basic';
      var save = /^\w+$/.test(file) ? './saves/' + file + '.json' : file;
      Yuri2.loadContentFromUrl(save, 'GET', function (err, text) {
        if (!err) {
          var data = JSON.parse(text);
          YL.init(data);
        } else {
          alert('YLUI读取配置错误，初始化失败');
        }
      });
    }
  })

});
