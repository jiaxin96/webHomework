var querysing = require('querystring');
var fileManager = require("./fileManager");

function isFormValid(user) {
	console.log("Check Form Start");
	if (user["username"] == "" || user["phone"] == "" || user["email"] == "" || user["id"] == "") return false;
	if (user["username"].length < 1 || user['username'].length > 10 ) return false;
	if (!(/^[1-9][0-9]{7,7}$/.test(user["id"]))) {return false;}
	// 提交的时候已经验证所以服务端没有全部验证信息
	if (!(/^[a-z0-9]([\-_\.]?[a-z0-9]+)*@([a-z0-9_\-]+\.)+[a-zA-Z]{2,4}$/.test(user["email"]))) {console.log("Email Fail") ; return false;}
	console.log("Form OK");
	return true;
}

function isInformationVaild(user) {
	console.log("Check Information start");
	for (var i = 0; i < fileManager.database.length; i++) {
		if (fileManager.database[i]['username'] == user['username'] || fileManager.database[i]['id'] == user["id"] ||
			fileManager.database[i]['email'] == user["email"] || fileManager.database[i]['phone'] == user["phone"]) {
			return false;
	}
}
console.log("Information OK");
return true;
}


function isRegistedUser(userName) {
	for (var i = 0; i < fileManager.database.length; i++) {
		if (userName == fileManager.database[i]["username"]) return true;
	}
	return false;
}
function hasBeenRegist(user, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	var isNoRepeat;
	for (var i = 0; i < fileManager.database.length; i++) {
		if (fileManager.database[i]['username'] == user['username']) {
			res.end('name');
			console.log("name fail");
			return;
		}
		else if (fileManager.database[i]['phone'] == user['phone']) {
			res.end('phone');
			console.log("phone fail");
			return;
		}
		else if (fileManager.database[i]['email'] == user['email']) {
			res.end('phone');
			console.log("email fail");
			return;
		}
		else if (fileManager.database[i]['id'] == user['id']) {
			res.end('id');
			console.log("id fail");
			return;
		}
	}
	res.end("ok");
}

exports.isFormValid = isFormValid;
exports.isInformationVaild = isInformationVaild;
exports.isRegistedUser = isRegistedUser;
exports.hasBeenRegist = hasBeenRegist;