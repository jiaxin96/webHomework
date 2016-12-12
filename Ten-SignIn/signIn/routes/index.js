var express = require('express');
var router = express.Router();
var debug = require('debug')('signin:index');

module.exports = function(db) {
	var dbMgr = require('../controllers/dbMgr')(db);

	var users = db.collection('users');
	debug("Users Set from db:",users);

	/* GET home page. */
	router.get('/', function(req, res, next) {
		res.render('signIn', { title: '登录' });
	});
	router.get('/signIn', function(req, res, next) {
		res.render('signIn', { title: '登录' });
	});

	router.post('/signIn', function(req, res, next) {
		// var user = req.body;
		dbMgr.queryUserByIdAndPasswd(req.body.id, req.body.passwd)
		.then(function (user) {
			debug("query user end");
			req.session.user = user;
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
			req.session.user = user;
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
			req.session.user = user;
			debug(req.session.user.username);
			res.redirect('/detile');
		})
		.catch(function(error) {
			debug('signup failed');
			debug(error);
			res.render('regist', { title: '注册'});
		});
	});

	router.post('/detile', function(req, res, next) {
		delete req.session.user;
		res.redirect('/signIn');
	});




	router.get('/regist', function(req, res, next) {
		res.render('regist', { title: '注册' });
	});




	router.get('/detile', function(req, res, next) {
		debug(req.session.user);
		res.render('detile', { title: '详情' , user: req.session.user});
	});






	router.all('*', function(req, res, next) {
		req.session.user ? next() : res.redirect('/signIn');
	});


	return router;
}
