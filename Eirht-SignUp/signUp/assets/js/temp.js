window.onload = function() {
	var user = {
		'username':"",
		'id':"",
		'phone':"",
		'email':""
	};
	$(function() {
		var vaildTruth = {
			'username' : false,
			'id' : false,
			'phone' : false,
			'email' : false
		};
		$(".reset").click(function (event) {
			$("#username,#id,#phone,#email").val("");
		});
		function getUser() {
			var exp;
			$("#username").blur(function() {
				exp = /^[a-zA-Z]\w+[0-9a-zA-Z_]{5,17}$/;
				check("username", $(this).val(), ".usernameErrMes", ".nameEr", exp);
			});
			$("#id").blur(function() {
				exp = /^[1-9]+[0-9]{7}$/;
				check("id", $(this).val(), ".idErrMes", ".idEr", exp);
			});
			$("#phone").blur(function() {
				exp = /^[1-9]+\\d{10}$/;
				check("phone", $(this).val(), ".phoneErrMes", ".phoneEr", exp);
			});
			$("#email").blur(function() {
				exp = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
				check("email", $(this).val(), ".emailErrMes", ".emailEr", exp);
			});
		};
		getUser();

		function isOk(){
			for (var i in vaildTruth) {
				if (vaildTruth[i] == false) return false;
			}
			return true;
		}
		function setPostMethod() {
			$(".regist").attr('disabled','false');
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
		}
	});
}