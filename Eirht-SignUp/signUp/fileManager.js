var fs = require("fs");
var database = new Array();



function addUser(user) {
	var message = user['username']+","+user["id"]+","+user["phone"]+","+user["email"]+"\r\n";
	database[database.length] = new Array();
	database[database.length-1]['username'] = user['username'];
	database[database.length-1]['id'] = user['id'];
	database[database.length-1]['email'] = user['email'];
	database[database.length-1]['phone'] = user['phone'];
	fs.appendFileSync("./database/data.txt", message, 'utf-8');
}


function getUserByName(username) {
	for (var i in database) {
		if (database[i]['username'] == username) return database[i];
	}
	return {};
}


function getUserByStr(message) {
	console.log(message);
	var params = message.match(/username=(.+)&id=(.+)&phone=(.+)&email=(.+)/);
	console.log(params[1]);
	params[4] = params[4].replace('%40', '@');
	console.log(params[4]);
	var user = {username:params[1],id:params[2],phone:params[3],email:params[4]};
	return user;
}

function reader() {
	var data = fs.readFileSync("./database/data.txt", 'utf-8');
	var tem = data.toString().split("\r\n");
	var temp;
	for (var i = 0; i < tem.length - 1; i++) {
		temp = tem[i].split(',');
		database[i] = {};
		database[i]['username'] = temp[0];
		database[i]['id'] = temp[1];
		database[i]['phone'] = temp[2];
		database[i]['email'] = temp[3];
	}
}




exports.database = database;
exports.reader = reader;
exports.addUser = addUser;
exports.getUserByStr = getUserByStr;
exports.getUserByName = getUserByName;