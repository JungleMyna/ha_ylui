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
from homeassistant.helpers import config_validation as cv, intent

_LOGGER = logging.getLogger(__name__)

DOMAIN = 'ha_ylui'
VERSION = '1.0'
URL = '/ha-ylui-api-' + str(uuid.uuid4())
ROOT_PATH = URL + '/' + VERSION

def setup(hass, config):
    cfg  = config[DOMAIN]
    _name = cfg.get('name', 'WebOS')
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
    # Return boolean to indicate that initialization was successfully.
    return True
