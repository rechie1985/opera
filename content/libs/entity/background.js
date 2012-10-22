'use strict';
var CONTEXTMENU_NAME = 'save to wiznote';

if ( !Wiz ) {
    console.error('could not find Wiz object');
}
var toolbarButton;

function contextMenuClickHandler(event) {
    //test  request originating tab to preview
    event.source.postMessage({'message': 'preview'});
}



function wiz_initialize_background () {
    //获取保存在localstorage中的user信息
    var userId = Wiz.storageManager.get(Wiz.Default.STORAGE_USERID);
    var authority = Wiz.storageManager.get(Wiz.Default.AUTHORITY);
    if ( authority !== null) {
        Wiz.context.userId = userId;
        Wiz.context.authority = authority;
    }
}

function messageHandler(event) {
    var data = event.data;
    var requestName = data.name;
    var info = data.info;
    switch (requestName) {
    case 'login' :
        Wiz.remote.clientLogin(info.user_id, info.password, info.rememberMe, Wiz.remote.getAllCategory);
        break;
    case 'getCategory':
        bg_getCategory();
        break;
    case 'saveDocument':
        
        break;
    }
}

function bg_getCategory() {

}

function onLoadHandler() {
    toolbarButton = Wiz.opera.addToolbarButton();
    Wiz.opera.addContextMenuButton(CONTEXTMENU_NAME, contextMenuClickHandler);
}

window.addEventListener("load", onLoadHandler, false);
opera.extension.onmessage = messageHandler;
wiz_initialize_background();
