var urlStore = './res/apps/app-store/';
function getAppDataTemplate() {
  return {
    "addressBar": false,
    "autoRun": 0,
    "background": false,
    "badge": 0,
    "desc": '',
    "icon": {
      "type": "fa",
      "content": "wpforms",
      "bg": 'green'
    },
    "openMode": "normal",
    "plugin": false,
    "position": {
      "autoOffset": true,
      "left": true,
      "top": true,
      "x": "x*0.05",
      "y": "y*0.05"
    },
    "version": "1.0.0",
    "poweredBy": "",
    "resizable": true,
    "single": false,
    "size": {
      "height": "y*0.8-80",
      "width": "x*0.8"
    },
    "title": "",
    "url": "",
    "customTile": "",
    "urlRandomToken": true
  };
}
YLApp.onReady(function () {
  var apps = {
    './apps/mdi-font': {
      title: 'MDI图标',
      desc: 'Material Design Icons，这里修改了点击复制的时候自动转成HA里使用的格式',
      open: _.merge(getAppDataTemplate(), {
        title: 'MDI字体图标',
        url: urlStore + '/apps/mdi-font/index.html',
        "icon": {
          "type": "fa",
          "content": "flag",
          "bg": "#2296f3"
        },
      }),
      setup: {
        apps: {
          'ylui-apps-mdifont': _.merge(getAppDataTemplate(), {
            title: 'MDI图标',
            url: urlStore + '/apps/mdi-font/index.html',
            "icon": {
              "type": "fa",
              "content": "flag",
              "bg": "#2296f3"
            },
            desc: 'Material Design Icons',
            "poweredBy": "Google",
          }),
        },
        shortcuts: ['ylui-apps-mdifont'],
        menu: {
          'ylui-apps-mdifont': {
            "app": "ylui-apps-mdifont",
            "title": "MDI图标",
            "params": {},
            "hash": ""
          },
        },
      }
    },
    './apps/webui-aria2': {
      title: 'Aria2',
      desc: 'Aria2下载管理，开启服务命令：aria2c --enable-rpc --rpc-listen-all --rpc-secret=密码令牌',
      open: _.merge(getAppDataTemplate(), {
        title: 'Aria2',
        url: urlStore + '/apps/webui-aria2/index.html',
        "icon": {
          "type": "fa",
          "content": "cloud-download",
          "bg": "#00897b"
        },
      }),
      setup: {
        apps: {
          'ylui-apps-aria2': _.merge(getAppDataTemplate(), {
            title: 'Aria2',
            url: urlStore + '/apps/webui-aria2/index.html',
            "icon": {
              "type": "fa",
              "content": "cloud-download",
              "bg": "#00897b"
            },
            desc: 'Aria2下载管理',
            "poweredBy": "baidu",
          }),
        },
        shortcuts: ['ylui-apps-aria2'],
        menu: {
          'ylui-apps-aria2': {
            "app": "ylui-apps-aria2",
            "title": "Aria2",
            "params": {},
            "hash": ""
          },
        },
      }
    },
    './apps/baidu': {
      title: '百度一下',
      desc: '百度一下，你就知道。',
      open: _.merge(getAppDataTemplate(), {
        title: '百度一下',
        url: 'https://www.baidu.com',
        "icon": {
          "type": "fa",
          "content": "search",
          "bg": "#1588F5"
        },
      }),
      setup: {
        apps: {
          'ylui-apps-baidu': _.merge(getAppDataTemplate(), {
            title: '百度一下',
            url: 'https://www.baidu.com',
            "icon": {
              "type": "fa",
              "content": "search",
              "bg": "#1588F5"
            },
            desc: '百度一下，你就知道。',
            "poweredBy": "baidu",
          }),
        },
        shortcuts: ['ylui-apps-baidu'],
        menu: {
          'ylui-apps-baidu': {
            "app": "ylui-apps-baidu",
            "title": "百度一下",
            "params": {},
            "hash": ""
          },
        },
      }
    },
    './apps/calculator': {
      title: '科学计算器',
      desc: '这是一款jquery实现简单计算器代码。该jquery计算器使用 Bootstrap 4进行布局，并结合math.js数学库，实现简单的加减乘除和平方，开方等数学计算。',
      open: _.merge(getAppDataTemplate(), {
        title: '科学计算器',
        url: urlStore + '/apps/calculator/index.html',
        "icon": {
          "type": "fa",
          "content": "calculator",
          "bg": "#375980"
        },
        "size": {
          "height": "496",
          "width": "324"
        },
      }),
      setup: {
        apps: {
          'ylui-apps-calculator': _.merge(getAppDataTemplate(), {
            title: '科学计算器',
            url: urlStore + '/apps/calculator/index.html',
            "icon": {
              "type": "fa",
              "content": "calculator",
              "bg": "#375980"
            },
            "size": {
              "height": "496",
              "width": "324"
            },
            "desc": "这是一款jquery实现简单计算器代码。该jquery计算器使用 Bootstrap 4进行布局，并结合math.js数学库，实现简单的加减乘除和平方，开方等数学计算。",
            "poweredBy": "素材来源于网络",
          }),
        },
        shortcuts: ['ylui-apps-calculator'],
        menu: {
          'ylui-apps-calculator': {
            "app": "ylui-apps-calculator",
            "title": "科学计算器",
            "params": {},
            "hash": ""
          },
        },
      }
    },
    './apps/qrcode': {
      title: '二维码生成器',
      desc: '这是一款可自定义logo的jQuery生成二维码插件。该插件可以实现二维码的生成，定义在二维码上显示的logo，以及logo的位置，文字颜色、字体等多种属性，非常实用。',
      open: _.merge(getAppDataTemplate(), {
        title: '二维码生成器',
        url: urlStore + '/apps/qrcode/index.html',
        "icon": {
          "type": "fa",
          "content": "qrcode",
          "bg": "#adadad"
        },
      }),
      setup: {
        apps: {
          'ylui-apps-qrcode': _.merge(getAppDataTemplate(), {
            title: '二维码生成器',
            url: urlStore + '/apps/qrcode/index.html',
            "desc": "这是一款可自定义logo的jQuery生成二维码插件。该插件可以实现二维码的生成，定义在二维码上显示的logo，以及logo的位置，文字颜色、字体等多种属性，非常实用。",
            "poweredBy": "素材来源于网络",
            "icon": {
              "type": "fa",
              "content": "qrcode",
              "bg": "#adadad"
            },
          }),
        },
        shortcuts: ['ylui-apps-qrcode'],
        menu: {
          'ylui-apps-qrcode': {
            "app": "ylui-apps-qrcode",
            "title": "二维码生成器",
            "params": {},
            "hash": ""
          },
        },
      }
    },

  };
  var eShop = $('.page-shop');
  for (var path in apps) {
    (function () {
      var appData = apps[path];
      var app = $('<div class="app">');
      var cover = $('<img class="cover">');
      var title = $('<div class="title">');
      var desc = $('<div class="desc">');
      var btns = $('<div class="btn-group">\n' +
        '        <div class="open">打开</div>\n' +
        '        <div class="setup">安装</div>\n' +
        '      </div>');
      cover.attr('src', path + '/cover.png');
      title.text(appData.title);
      desc.text(appData.desc);
      app.append(cover, title, desc, btns);
      app.find('.open').click(function () {
        YLApp.eval('open', appData.open)
      });
      app.find('.setup').click(function () {
        YLApp.eval('setup', appData.setup)
      });
      eShop.append(app);
    }())
  }
});
