var fileManager = require('./fileManager');
var fs = require('fs')

function SignUpHtml(res, url) {

	console.log("SINGGGGG");
	switch(url) {
		case '/assets/js/signUp.js':
		sendFile(res, './assets/js/signUp.js','text/javascript');
		console.log("Send a js");
		break;
		case '/assets/js/jquery.js':
		sendFile(res, './assets/js/jquery.js','text/javascript');
		console.log("Send a js");
		break;
		case '/assets/css/style.css':
		sendFile(res, './assets/css/style.css', 'text/css');
		console.log("Send a css");
		break;
		case '/assets/css/detile.css':
		sendFile(res, './assets/css/detile.css', 'text/css');
		console.log("Send a css");
		break;
		case'/favicon.ico':
		break;
		default:
		sendFile(res, './index.html', 'text/html');
		console.log("Send a html");
	}
}

function sendFile(res, filepath, mime) {
	res.writeHead(200, {"Content-Type":mime});
	res.end(fs.readFileSync(filepath));
}

function ShowDetile(res, username, url) {
	console.log("Start Load Detile");
	switch(url) {
		case '/assets/css/detile.css':
		res.writeHead(200, {"Content-Type":"text/css"});
		res.end(fs.readFileSync('./assets/css/detile.css'));
		console.log("Send a css");
		break;
		default:
		res.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
		var file = fs.readFileSync('./detile.html','utf-8');
		var user = fileManager.getUserByName(username);
		console.log("Detile With " + user.username);
		for (var i in user) {
			file = file.replace('[' + i + ']', user[i]);
		}
		res.write(file,'utf-8');
		res.end();
		console.log("Send a html");
	}
}


exports.SignUpHtml = SignUpHtml;
exports.ShowDetile = ShowDetile;