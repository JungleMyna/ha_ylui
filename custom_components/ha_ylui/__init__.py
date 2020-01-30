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
VERSION = '1.0.1'
URL = '/ha-ylui-api-' + str(uuid.uuid4())
ROOT_PATH = URL + '/' + VERSION

def setup(hass, config):
    cfg  = config[DOMAIN]
    _name = cfg.get('name', 'Web桌面')
    _icon = cfg.get('icon', 'mdi:map-marker-radius')
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
    requires_auth = False
    
    async def post(self, request):
        hass = request.app["hass"]
        try:
            res = await request.json()  
            local = hass.config.path(".storage")
            if os.path.isdir(local) == False:
                fd = open(local + '/ha_ylui-config.json', mode="w", encoding="utf-8")
                fd.close()
            return self.json(res)
        except Exception as e:
            print(e)
            return self.json({'code':1, 'msg': '出现异常'})