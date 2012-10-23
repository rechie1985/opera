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
			opera.extension. postMessage({'name': 'getCategory', 'from': 'popup'});
		} else {
			PopupView.showLogin();
		}
	}

	

	wiz_popup_initialize();
});