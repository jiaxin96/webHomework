var http = require('http');
var url = require('url');
var querysing = require('querystring');
var fileManager = require("./fileManager");
var checker = require("./checker");
var router = require("./router");
var fs = require('fs');

function start() {

	fileManager.reader();
	http.createServer(function (req, res) {
		req.setEncoding('utf8');
		console.log("Get an req with url " + req.url);
		switch(req.url) {
			case '/hasBeenRegist':
			checkRepate(req,res);
			break;
			case '/assets/js/signUp.js':
			sendFile(res, './assets/js/signUp.js','text/javascript');
			break;
			case '/checker.js':
			sendFile(res, './checker.js','text/javascript');
			break;
			case '/assets/css/style.css':
			sendFile(res, './assets/css/style.css', 'text/css');
			break;
			default:
			req.method === 'POST' ? registUser(req,res) : dealWithReq(req, res);
		}
	}).listen(8000);
	console.log("Server is listening at 8000");

	function checkRepate(req,res) {
		req.setEncoding('utf8');
		req.on('data', function (chunk) {
			if (chunk.toString() != 'username=&id=&phone=&email=') {
				var user = fileManager.getUserByStr(chunk.toString());
				checker.hasBeenRegist(user, res);
			} else {
				res.writeHead(301, {Location: ''});
				res.end();
				
			}
		});
	}

	function sendFile(res, filepath, mime) {
		res.writeHead(200, {"Content-Type":mime});
		res.end(fs.readFileSync(filepath));
	}


	function registUser(req, res) {
		req.setEncoding('utf8');
		console.log("Regist User.");
		var tr  = req.url;
		console.log(req.method + req.url);
		req.on('data', function (chunk) {
			console.log('Get an req with url '+ chunk.toString());
			if (chunk.toString() != 'username=&id=&phone=&email=') {
				var user = fileManager.getUserByStr(chunk.toString());
				if (checker.isFormValid(user) && checker.isInformationVaild(user)) {
					console.log("Check pass Add an user");
					fileManager.addUser(user);
				}
				res.writeHead(301, {Location: '?username=' + user.username});
				res.end();
			} else {
				res.writeHead(301, {Location: ''});
				res.end();
			}
		});
	}

	function dealWithReq(req, res) {
		req.setEncoding('utf8');
		var username = getUserName(req);
		if (!username || !checker.isRegistedUser(username)) {
			router.SignUpHtml(res, req.url);
		} else {
			console.log("Show " + username + "'s detile");
			router.ShowDetile(res, username, req.url);
		}
	}

	function getUserName(req) {
		req.setEncoding('utf8');
		return querysing.parse(url.parse(req.url).query).username;
	}
}


exports.start = start;