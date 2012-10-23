'use strict';
var CONTEXTMENU_NAME = 'save to wiznote';

if ( !Wiz ) {
    console.error('could not find Wiz object');
}
var toolbarButton;
var handlers = {
    'login': popup_request_login,
    'getCategory': popup_request_getCategory,
    'saveDocument': saveDocument,
};


/**
 * 初始化保存的user信息，方便popup页面调用
 * TODO：读取option页面信息
 * @return {[type]} [description]
 */
function wiz_initialize_background () {
    //获取保存在localstorage中的user信息
    var userId = Wiz.storageManager.get(Wiz.Default.STORAGE_USERID);
    var authority = Wiz.storageManager.get(Wiz.Default.AUTHORITY);
    if ( authority !== null) {
        Wiz.context.userId = userId;
        Wiz.context.authority = authority;
    }
}

function saveDocument(info) {
    if (info.isNative) {
        Wiz.native.saveDocument(info);
    } else {
        Wiz.remote.postDocument(info);
    }
}

/**
 * 处理来自popup页面的登陆请求
 * @return {[type]} [description]
 */
function popup_request_login(info) {
    Wiz.remote.clientLogin(info.user_id, info.password, info.rememberMe, requestPreview);
}

function messageHandler(event) {
    var data = event.data;
    var requestName = data.name;
    var info = data.info;
    if (typeof requestName === 'string' && requestName.length > 0) {
        handlers[requestName](info);
    }
}

/**
 * popup页面初始化调用方法，需要登陆过
 * @return {[type]} [description]
 */
function popup_request_initialize() {
    Wiz.remote.autoLogin(requestPreview);
}

function requestPreview (previewOp) {
    if (!previewOp) {
        previewOp = 'url';
    }
    opera.extension.broadcastMessage({'name': 'preview', 'op': previewOp});
}

function popup_request_getCategory() {
    var categories = null;
    if (Wiz.native.isInstalled()) {
        categories = Wiz.native.getCategory();
    } else {
        categories = Wiz.background.getCacheCategories();
    }
    //如果都没有取到，直接向服务器发请求
    if (categories === null) {
        Wiz.remote.getCategory(Wiz.background.sendCategoryToPopup);
        return;
    }
    Wiz.background.sendCategoryToPopup(categories);
}



function contextMenuClickHandler(event) {
    ShowObjProperty(event);
    var type = 'native';
    event.source.postMessage({'name': 'preview', 'op': 'submit', 'type': 'native'});
}

function onLoadHandler() {
    toolbarButton = Wiz.opera.addToolbarButton();
    Wiz.opera.addContextMenuButton(CONTEXTMENU_NAME, contextMenuClickHandler);
}

window.addEventListener("load", onLoadHandler, false);
opera.extension.onmessage = messageHandler;
wiz_initialize_background();
