$(document).ready(function () {
	'use strict';
	//使用bgProcess的Wiz上下文，可以免去一些消息传输的时间
	try {
		var bClipPageShowing = false;
		var bgProcess = (new Wiz.OperaBgProcess()).process;
		var loginCtrl = new LoginControl(bgProcess);
		var clipPageCtrl = new ClipPageControl(bgProcess);
		var bgWiz = bgProcess.Wiz;
	} catch (err) {
		console.error('popupPage opera.extension.bgProcess Errpr: ' + err);
	}

	function wiz_popup_initialize() {
		if (bgWiz.context.authority !== null) {
			bgProcess.popup_request_initialize();// opera.extension. postMessage({'name': 'getCategory', 'from': 'popup'});
		} else {
			PopupView.showLogin();
		}
	}

	var handlers = {
		'showClipPage': showClipPage
	};

	function showClipPage(info) {
		if (bClipPageShowing === false) {
			PopupView.showClipPage();
			clipPageCtrl.initSubmitGroup(info);
			clipPageCtrl.initClipPageListener();
			bClipPageShowing = true;
		}
	}

	wiz_popup_initialize();
	opera.extension.onmessage = function (event) {
		var requestName = event.data.name;
		console.log('popup: ' + requestName);
		if (typeof requestName === 'string' && handlers[requestName]) {
			handlers[requestName](event.data.info);
		}
	};
});