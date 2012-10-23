$(document).ready(function () {
	'use strict';
	//使用bgProcess的Wiz上下文，可以免去一些消息传输的时间
	try {
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
		'loginSuccess': loginSuccessHandler,
		'contentVeilShow': clipPageCtrl.initClipPageListener
			
	};

	function loginSuccessHandler() {
		PopupView.showClipPage();
	}

	wiz_popup_initialize();
	opera.extension.onmessage = function (event) {
		var requestName = event.data.name;
		if (typeof requestName === 'string') {
			handlers[requestName](event.data.info);
		}
	};
});