import os
import logging
import uuid
import base64
import json
import string
from aiohttp import web
import voluptuous as vol
from homeassistant.components.weblink import Link
from homeassistant.components.http import HomeAssistantView
from .api_config import ApiConfig

_LOGGER = logging.getLogger(__name__)

DOMAIN = 'ha_ylui'
VERSION = '1.1.3'
URL = '/ha_ylui-api'
ROOT_PATH = URL + '/' + VERSION

def setup(hass, config):
    cfg  = config[DOMAIN]
    _name = cfg.get('name', 'Web桌面')
    _icon = cfg.get('icon', 'mdi:windows')
    # 注册静态目录
    local = hass.config.path("custom_components/ha_ylui/local")
    if os.path.isdir(local):
        hass.http.register_static_path(ROOT_PATH, local, False)

    hass.components.frontend.async_register_built_in_panel(
        "iframe",
        _name,
        _icon,
        DOMAIN,
        {"url": ROOT_PATH + "/index.html?ver=" + VERSION},
        require_admin=True)

    hass.http.register_view(HassGateView)
    hass.app[DOMAIN] = ApiConfig(hass.config.path('./.storage'))
    # 显示插件信息
    _LOGGER.info('''
-------------------------------------------------------------------
    Web桌面【作者QQ：635147515】
    
    版本：''' + VERSION + '''    
        
    项目地址：https://github.com/shaonianzhentan/ha_ylui
-------------------------------------------------------------------''')
    return True

class HassGateView(HomeAssistantView):

    url = URL
    name = DOMAIN
    requires_auth = True
    
    async def post(self, request):
        hass = request.app["hass"]
        api = hass.app[DOMAIN]
        cfg_file = 'ha_ylui.config'
        try:
            res = await request.json()            
            _type = res['type']
            if _type == 'set':
                api.write(cfg_file, res['data'])
                return self.json({'code': 0, 'msg': '保存成功'})
            elif _type == 'get':
                res = api.read(cfg_file)
                if res is None:
                    return self.json({
                        'code': 1,
                        'msg': '没有配置'
                    })
                else:
                    return self.json({
                        'code': 0,
                        'data': res
                    })
        except Exception as e:
            print(e)
            return self.json({'code':1, 'msg': '出现异常'})