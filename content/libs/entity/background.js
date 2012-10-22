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
    var userId = Wiz.storageManager.get(Wiz.Constant.Default.STORAGE_USERID);
    var authority = Wiz.storageManager.get(Wiz.Constant.Default.AUTHORITY);

    console.log('authority: ' + authority);
    if ( authority !== null) {
        Wiz.context.userId = userId;
        Wiz.context.authority = authority;
    }
}

function messageHandler(event) {
    var data = event.data;
    var requestName = data.name;


    ShowObjProperty(event);
}

function onLoadHandler() {
    toolbarButton = Wiz.opera.addToolbarButton();
    Wiz.opera.addContextMenuButton(CONTEXTMENU_NAME, contextMenuClickHandler);
}

window.addEventListener("load", onLoadHandler, false);
opera.extension.onmessage = messageHandler;
wiz_initialize_background();
