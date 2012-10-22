/**
 * 存放Wiz上下文信息，如：token、当前用户信息，以及以后可能会增加的kb相关信息
 */
'use strict';
Wiz.Context = function () {
	this.__defineSetter__('token', this.getToken);
	this.__defineGetter__('token', this.setToken);
	this.__defineSetter__('userId', this.getUserId);
	this.__defineGetter__('userId', this.setUserId);
	this.__defineSetter__('loginParams', this.getLoginParams);
	this.__defineGetter__('token', this.setLoginParams);

};

Wiz.Context.prototype._token = '';
Wiz.Context.prototype._userId = '';
Wiz.Context.prototype._loginParams = '';

Wiz.Context.prototype.getToken = function () {
	//不能返回null，xmlrpc会报错
	return this._token;
};

Wiz.Context.prototype.setToken = function (token) {
	if (typeof token !== 'string') {
		console.error('TypeError: Wiz.Context.setToken() token is not a string object');
		return;
	} 
	this._token = token;
};

Wiz.Context.prototype.getUserId = function () {
	if (this._userId === '') {
		return null;
	}
	return this._userId;
};

Wiz.Context.prototype.setUserId = function (userId) {
	if (typeof userId !== 'string') {
		console.error('TypeError: Wiz.Context.setUserId() userId is not a string object');
		return;;
	}
	this._userId = userId;
};

Wiz.Context.prototype.getLoginParams = function () {
	if (this._loginParams === '') {
		return null;
	}
	return this._loginParams;
};

Wiz.Context.prototype.setLoginParams = function (loginParams) {
	if (typeof loginParams !== 'string') {
		console.error('TypeError: Wiz.Context.setLoginParams() loginParams is not a string object');
		return;;
	}
	this._loginParams = loginParams;
};
