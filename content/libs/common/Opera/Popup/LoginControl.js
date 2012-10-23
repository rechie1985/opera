/**
 * @author rechie
 */
// 'use strict';
var ztreeControl = new ZtreeController();
function LoginControl(bgProcess) {

	var isAutoLogin = false;
	//add click listener to login button
	$('#login_button').bind('click', loginSubmit);

	$('#user_id').blur(checkEmail);
	$('#password').blur(checkPassword);

	function doLogin() {
		var loginingMsg = 'waiting login';//chrome.i18n.getMessage('logining');
		PopupView.showWaiting(loginingMsg);

		var loginParam = new Object();
		loginParam.user_id = user_id.value;
		loginParam.password = 'md5.' + hex_md5(password.value);
		loginParam.rememberMe = keep_passoword.checked;
		
		bgProcess.popup_request_login(loginParam);
	}

	/**
	 * 点击登陆按钮触发事件
	 */
	function loginSubmit() {
		if (checkEmail() && checkPassword()) {
			doLogin();
		}
	}

	function checkEmail() {
		$('#userid_error_tip').hide();
		var email = $('#user_id').val();
		var valid = verifyEmail(email);
		if (!valid) {
			$('#userid_error_tip').html('email error').show(100);
		}
		return valid;

	}

	function verifyEmail(str_email) {
		if (str_email && str_email.trim().length > 1) {
			return true;
		}
		return false;
	}

	function checkPassword() {
		$('#password_error_tip').hide();
		var password = $('#password').val();
		if (password.trim().length < 1) {
			$('#password_error_tip').html('password error').show(100);
			return false;
		}
		return true;

	}

	function initCreateAccountLink() {
		$('#create_acount').bind('click', function(evt) {
			window.open('http://service.wiz.cn/wizkm/a/signup');
		});
	}
	this.initCreateAccountLink = initCreateAccountLink;
}