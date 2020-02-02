/**
 * 读取配置示例文件
 * 修改此文件来实现持久化
 * YL.init(data) 中的data必须是ylui接受的数据格式
 * 开发者可以自行决定从静态文件读取（如basic.json）还是从远程服务器拉取（如ajax请求）
 */

YL.onLoad(function () {
  // 加载数据
  YL.static.post({
    type: 'get'
  }).then(res => {
    if (res.code === 0) {
      YL.init(res.data)
    } else {
      throw new Error('没有配置文件')
    }
  }).catch(ex => {
    Yuri2.loadContentFromUrl(`./saves/basic.json`, 'GET', function (err, text) {
      if (!err) {
        var data = JSON.parse(text);
        YL.init(data);
      } else {
        alert('YLUI读取配置错误，初始化失败');
      }
    });
  })

});
