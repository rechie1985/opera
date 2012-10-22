// "use strict";
Wiz.Remote = function () {
	this.initialize();
};

Wiz.Remote.prototype.initialize = function () {
	this.initCommon();
};

Wiz.Remote.prototype.initCommon = function () {

};

Wiz.Remote.getPostObj = function () {
	var data = {
		'client_type' : 'webclip_firefox',
		'api_version' : 3,
	    'program_type' : 'normal'
	};
	return data;
};

Wiz.Remote.autoKeepAliveProc = null;
Wiz.Remote.autoLoginTimes = 0;
Wiz.Remote.autoLoginLimit = 3;


Wiz.Remote.prototype.clientLogin = function (username, password, rememberMe, callSuccess, callError) {
};

Wiz.Remote.prototype.getAllCategory = function (callSuccess, callError) {
};

Wiz.Remote.prototype.getAllTag = function (callSuccess, callError) {
};

Wiz.Remote.prototype.postDocument = function (docInfo) {
};

/**
 * 自动登陆处理
 * @param  {[type]} cookie      [保存在cookie中的auth信息]
 * @param  {[type]} callSuccess [description]
 * @param  {[type]} callError   [description]
 * @return {[type]}             [description]
 */
Wiz.Remote.prototype.loginByCookie = function (cookie, callSuccess, callError) {
};

Wiz.Remote.prototype.autoLogin = function () {
};
