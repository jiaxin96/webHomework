window.onload = function() {
	var user = {
		'username':"",
		'id':"",
		'phone':"",
		'email':"",
		'passwd' : "",
		'rpasswd' : "",
	};
	$(function() {
		var vaildTruth = {
			'username' : false,
			'id' : false,
			'phone' : false,
			'email' : false,
			'passwd' : false,
			'rpasswd' : false
		};
		$(".reset").click(function (event) {
			$("#username,#id,#phone,#email").val("");
			$(".error").hide();
			$(".errorMs").html("");
		});
		function getUser() {
			var exp;
			$("#username").blur(function() {
				exp = /^[a-zA-Z][0-9a-zA-Z_]{5,17}$/;
				check("username", $(this).val(), ".usernameErrMes", ".nameEr", exp);
			});
			$("#id").blur(function() {
				exp = /^[1-9][0-9]{7,7}$/;
				check("id", $(this).val(), ".idErrMes", ".idEr", exp);
			});
			$("#phone").blur(function() {
				exp = /^[1-9][0-9]{10,10}$/;
				check("phone", $(this).val(), ".phoneErrMes", ".phoneEr", exp);
			});
			$("#email").blur(function() {
				exp = /^[a-z0-9]([\-_\.]?[a-z0-9]+)*@([a-z0-9_\-]+\.)+[a-zA-Z]{2,4}$/;
				check("email", $(this).val(), ".emailErrMes", ".emailEr", exp);
			});
			$('#passwd').blur(function () {
				exp = /^[0-9a-zA-Z_\-]{6,12}$/;
				console.log("ffffff");
				check("passwd", $(this).val(), ".passwdErrMes", ".passwdEr", exp);
			});
			$('#rpasswd').blur(function () {
				exp =  /^[0-9a-zA-Z_\-]{6,12}$/;
				repasswdCheck("rpasswd", $(this).val(), ".rpasswdErrMes", ".rpasswdEr", exp);
			})
		};

		getUser();

		function isOk(){
			for (var i in vaildTruth) {
				if (vaildTruth[i] == false) return false;
			}
			return true;
		}
		function setPostMethodAbleOrUnable(trval) {
			$(".regist").attr("disabled",trval);
		}

		function repasswdCheck(key, val, ErrMes, Er, exp) {
			user[key] = val;
			if (user[key] == "") {
				$(ErrMes).html("请确认您的密码");
				$(Er).show();
				vaildTruth[key] = false;
			} else {
				if (user['passwd'] == "") {
					$(ErrMes).html("请先输入密码");
					$(Er).show();
					vaildTruth[key] = false;
				} else {
					if (vaildTruth['passwd'] == true)
					{
						if (val != user['passwd'])
						{
							$(ErrMes).html("两次密码不匹配");
							$(Er).show();
							vaildTruth[key] = false;
						}
						else
						{
							$(ErrMes).html("");
							$(Er).hide();
							console.log("pass");
							vaildTruth[key] = true;
						}
					}
					else
					{
						$(ErrMes).html("请先输入正确密码");
						$(Er).show();
						vaildTruth[key] = false;
					}
				}
			}
			checkAllInfo();
		}


		function checkAllInfo() {
			if (isOk()) {
				// alert("Can Do");
				$.post('/userRepeatDataCheck', user, function(data) {
					if (data == 'name') {
						$(".usernameErrMes").html("用户名已经被使用");
					} else if (data == 'phone') {
						$(".phoneErrMes").html("电话已经被使用");
					} else if (data == 'email') {
						$(".emailErrMes").html("邮箱已经被使用");
					} else if (data == 'id') {
						$(".idErrMes").html("学号已经被使用");
					} else if (data == 'ok') {
						$('.errorMs').html("");
						$('.error').hide();
						console.log("Can post");
						setPostMethodAbleOrUnable(false);
					}
				});
			} else {
				setPostMethodAbleOrUnable(true);
			}
		}

		function check(key, val, ErrMes, Er, exp) {
			user[key] = val;
			if (user[key] == "") {
				$(ErrMes).html("不能为空");
				$(Er).show();
				vaildTruth[key] = false;
			} else if (!(exp.test(user[key]))) {
				$(ErrMes).html("格式错误");
				$(Er).show();
				vaildTruth[key] = false;
			} else {
				$(ErrMes).html("");
				$(Er).hide();
				vaildTruth[key] = true;
			}
			checkAllInfo();
		}
	});
}