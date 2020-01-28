; (() => {
    // 设置全屏模式
    try {
        let haPanelIframe = top.document.body
            .querySelector("home-assistant")
            .shadowRoot.querySelector("home-assistant-main")
            .shadowRoot.querySelector("app-drawer-layout partial-panel-resolver ha-panel-iframe").shadowRoot
        let ha_card = haPanelIframe.querySelector("iframe");
        ha_card.style.position = 'absolute'
        if (this.query('show_mode') === 'fullscreen') {
            haPanelIframe.querySelector('app-toolbar').style.display = 'none'
            ha_card.style.top = '0'
            ha_card.style.height = '100%'
        }
    } catch (ex) {
        
    }
})();
