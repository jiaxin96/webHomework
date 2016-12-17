var express = require('express');
var router = express.Router();
var querysing = require('querystring');
var url = require('url');
var debug = require('debug')('signin:index');

module.exports = function(db) {
	var dbMgr = require('../controllers/dbMgr')(db);
	var CurrentUser = "";
	var visitUserName;
	// var users = db.collection('users');
	// debug("Users Set from db:",users);

	/* GET home page. */
	router.get('/', function(req, res, next) {
		debug(CurrentUser);
		visitUserName = querysing.parse(url.parse(req.url).query).username;
		debug("Visit user is ", visitUserName);
		if (visitUserName) {
			res.redirect('/detile');
		} else  {
			if (CurrentUser) {
				req.session.user = CurrentUser;
				res.render('detile', { title: '详情' , user: req.session.user, error : ""});
			}
			else {
				debug('Get in Signin');
				res.render('signIn', { title: '登录' });
			}
		}
	});
	router.get('/signIn', function(req, res, next) {
		if (CurrentUser) {
			req.session.user = CurrentUser;
			visitUserName = CurrentUser.username;
			res.render('detile', { title: '详情' , user: req.session.user, error : ""});
		}
		else
			res.render('signIn', { title: '登录' });
	});


	router.post('/detile', function(req, res, next) {
		delete req.session.user;
		CurrentUser = "";
		res.redirect('/signIn');
	});


	router.post('/signIn', function(req, res, next) {
		// var user = req.body;
		dbMgr.queryUserByIdAndPasswd(req.body.id, req.body.passwd)
		.then(function (user) {
			debug("query user end");
			CurrentUser = req.session.user = user;
			visitUserName = CurrentUser.username;
			res.redirect('/detile');
		}).catch(function (error) {
			debug("This"+error);
			res.render('signIn', {title : '登录', error: error});
		});
	});

	router.post('/', function(req, res, next) {
		dbMgr.queryUserByIdAndPasswd(req.body.id, req.body.passwd)
		.then(function (user) {
			debug("query user end");
			CurrentUser = req.session.user = user;
			visitUserName = CurrentUser.username;
			res.redirect('/detile');
		}).catch(function (error) {
			debug("This"+error.message);
			res.render('signIn', {title : '登录', error: error});
		});
	});




	router.post('/userRepeatDataCheck', function(req, res, next) {
		debug("receive check unique post");
		var user = req.body;
		debug(user);
		dbMgr.checkDataUnique(user).then(function(val){
			debug("resolve return " + val);
			res.end('ok');
		}).catch(function(error) {
			debug("rejiect " + error);
			res.end(error);
		});
	});

	router.post('/regist', function(req, res, next) {
		var user = req.body;
		debug("Regist user info without encryption" , req.body);
		dbMgr.RegistUser(user)
		.then(function(user) {
			// userController.showAllUsers();
			debug('Regist succeed jump to detail');
			debug(user);
			CurrentUser = req.session.user = user;
			visitUserName = CurrentUser.username;
			debug(req.session.user.username);
			res.redirect('/detile');
		})
		.catch(function(error) {
			debug('signup failed');
			debug(error);
			res.render('regist', { title: '注册'});
		});
	});






	router.get('/regist', function(req, res, next) {
		res.render('regist', { title: '注册' });
	});




	router.get('/detile', function(req, res, next) {
		// debug(req.session.user);
		if (CurrentUser) {
			if (CurrentUser.username != visitUserName) {
				res.render('detile', { title: '详情' , user: CurrentUser, error : "invilid visit"});
			} else {
				req.session.user = CurrentUser;
				res.render('detile', { title: '详情' , user: req.session.user, error : ""});
			}
		}
		else
			res.redirect('/signIn');
	});






	router.all('*', function(req, res, next) {
		CurrentUser ? function () {	
			req.session.user = CurrentUser;
			visitUserName = CurrentUser.username;
			next();
		} : function () {
			error = "FeiFa"
			res.render('signIn', {title : '登录', error: error});
		}
	});


	return router;
}
