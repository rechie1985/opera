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
    Wiz.remote.clientLogin(info.user_id, info.password, info.rememberMe, Wiz.remote.getAllCategory);
}

function messageHandler(event) {
    ShowObjProperty(toolbarButton);
    ShowObjProperty(toolbarButton.popup);
    ShowObjProperty(toolbarButton.popup.window);
    console.log(toolbarButton.popup.width);
    console.log(typeof toolbarButton.popup);
    console.log(toolbarButton.popup.constructor);
    event.source.close()
    var data = event.data;
    var requestName = data.name;
    var info = data.info;
    if (typeof requestName === 'string' && requestName.length > 0) {
        handlers[requestName](info);
    }
}

function popup_request_getCategory() {

}

function getCategory() {
    var nativeCategories = Wiz.native.getCategory();
    var cacheCategories = background_getCacheCategories();
}



function contextMenuClickHandler(event) {
    event.source.postMessage({'message': 'preview'});
}

function onLoadHandler() {
    toolbarButton = Wiz.opera.addToolbarButton();
    Wiz.opera.addContextMenuButton(CONTEXTMENU_NAME, contextMenuClickHandler);
}

window.addEventListener("load", onLoadHandler, false);
opera.extension.onmessage = messageHandler;
wiz_initialize_background();
