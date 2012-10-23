// 'use strict';
var PopupView = {
	changeSubmitDisplayByType : function () {
		var type = $('#submit-type').val();
		$('#note_submit').html(type);
	},
	showCategoryTreeFromLoading : function (animate_time_ms) {
		$('#category_loading').hide();
		$('#ztree_container').show(animate_time_ms);
	},
	showCategoryLoading : function (msg) {
		$('#category_loading').show();
		$('#category_loading label').html(msg);
	},
	hideCategoryLoading : function () {
		$('#category_loading').hide();
	},

	showClipPage : function () {
		$('#wiz_clip_detail').show();
		$('#waiting').hide();
		$('#wiz_login').hide();
	},
	showClipFailure : function (msg) {
		$('#waiting_div').hide();
		$('#errorpage_tip label').html(msg);
		$('#errorpage_tip').show();
	},
	showLoginError : function (msg) {
		$('#wiz_login').show();
		$('#wiz_clip_detail').hide();
		$('#div_error_validator').html(msg);
		$('#waiting').hide();

		PopupView.showLogoffDiv();
	},
	showWaiting : function (msg) {	
		$('#waiting').show();
		$('#waiting-label').html(msg);
		$('#wiz_login').hide();
		$('#wiz_clip_detail').hide();
	},
	showLogin : function () {
		$("#waiting").hide();
		$("#wiz_login").show();
		$("#wiz_clip_detail").hide();

		PopupView.showLogoffDiv();
	},
	hideCategoryTreeAfterSelect : function (display, delay_ms) {
		$("#category_info").html(display);
		$("#ztree_container").hide(delay_ms);
	},
	hideWaiting : function () {
		$('#waiting').hide();
	},
	hideLoginDiv : function () {
		$('#login_div').hide();
	},
	hideLogoffDiv: function () {
		$('#loginoff_div').hide();
	},
	showLoginDiv: function () {
		$('#loginoff_div').hide();
		$('#login_div').show();
	},
	showLogoffDiv: function () {
		$('#loginoff_div').show();
		$('#login_div').hide();
	},
	showCreateAccountDiv: function () {
		$('#create_acount').bind('click', function(evt) {
			window.open('http://service.wiz.cn/wizkm/a/signup');
		});
	},
	initPopupPage : function () {
		PopupView.showCreateAccountDiv();
	},
	setTitle : function (title) {
		$('#wiz_note_title').val(title);
	},
	resize : function (operaPopupObj, width, height) {
		try {
			operaPopupObj.width = width;
			operaPopupObj.height = height;
		} catch (err) {
			console.error('popupEntity.resize() Error: ' + err);
		}
	}
};