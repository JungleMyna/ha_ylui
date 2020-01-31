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

_LOGGER = logging.getLogger(__name__)

DOMAIN = 'ha_ylui'
VERSION = '1.1.2'
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
    # Return boolean to indicate that initialization was successfully.
    return True

class HassGateView(HomeAssistantView):

    url = URL
    name = DOMAIN
    requires_auth = True
    
    async def post(self, request):
        hass = request.app["hass"]
        try:
            res = await request.json()
            local = hass.config.path(".storage")
            cfg_file = local + '/ha_ylui.config'
            _type = res['type']
            if _type == 'set':
                fd = open(cfg_file, mode="w", encoding="utf-8")
                fd.write(res['data'])
                fd.close()
                return self.json({'code': 0, 'msg': '保存成功'})
            elif _type == 'get':
                fd = open(cfg_file, mode="r", encoding="utf-8")
                _str = fd.read()
                fd.close()
                return self.json({
                    'code': 0,
                    'data': json.loads(_str)
                })
            elif _type == 'get_listdir':
                _path = hass.config.path("./")
                files = os.listdir(_path)
                _list = []
                for f in files:
                    _list.append({
                        'name': f,
                        'isdir': os.path.isdir(_path+ '/' + f)
                    })
                return self.json({
                    'code': 0,
                    'data': _list
                })
        except Exception as e:
            print(e)
            return self.json({'code':1, 'msg': '出现异常'})