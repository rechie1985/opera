if (typeof Wiz === 'undefined') {
	'use strict';
	var Wiz = {
		_notification: null,
		_context: null
	};

	Wiz.getNotification = function () {
		if (this._notification === null) {
			this._notification = new Wiz.Notification();
		}
		return this._notification;
	};

	Wiz.getContext = function () {
		if (this._context === null) {
			this._context = new Wiz.Context();
		}
		return this._context;
	};

	Wiz.setContext = function (context) {
		if (context typeof Wiz.Context) {
			this._context = context;
		}
	}	

}
Wiz.__defineGetter__('notification', Wiz.getNotification);
Wiz.__defineGetter__('context', Wiz.getContext);
WIz.__defineSetter__('context', Wiz.setContext);
