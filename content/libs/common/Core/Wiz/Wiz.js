if (typeof Wiz === 'undefined') {
	'use strict';
	var Wiz = {
	};

	Wiz.getNotification = function () {
		if (!this._notification) {
			this._notification = new Wiz.Notification();
		}
		return this._notification;
	};
}
Wiz.__defineGetter__('notification', Wiz.getNotification);
