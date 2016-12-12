var bcrypt = require('bcrypt-as-promised');
var debug = require('debug')('signin:dbMgr');
var bcrypt = require('bcrypt-as-promised');



module.exports = function (db) {

	var users = db.collection('users');

	debug('Clearing database');

	users.remove({}).then(function() {
		users.find().toArray().then(function(users) {
			debug('current document in database: ', users);
		}).catch(function (error) {
			debug('DataBase document errors as:' + error);
		})
	});



	// main control
	var dbMgr = {

		RegistUser: function (user) {
			debug('Regist user is ' + user.username);
			return new Promise(function (resolve, reject) {
				bcrypt.hash(user.passwd, 10)
				.then(function(passwd) {
					user.passwd = passwd;
					if (user.rpasswd) delete user.rpasswd;
					if (user.submit) delete user.submit;
					resolve(user);
					return users.insert(user);
				})
				.catch(function (error) {
					reject(error);
				});
			});
		},

		queryUserByIdAndPasswd: function (userId, passwd) {
			debug("Signin user is " + userId);
			return new Promise(function (resolve, reject) {
				dbMgr.queryUserById(userId).then(function (foundUser) {
					debug(foundUser.id + " is exit");
					bcrypt.compare(passwd, foundUser.passwd)
					.then(function () {
						debug(foundUser.id + "\'s password is correct");
						resolve(foundUser);
					}).catch(function (error) {
						debug(foundUser.id + '\'s password is incorrect');
						reject('passwdEr');
					});
				})
				.catch(function (error) {
					debug(userId+ 'is not exit');
					reject('idEr');
				});
			});
		},


		queryUserById: function(userId) {
			debug('getting document id');
			return new Promise(function(resolve, reject) {
				debug("Start query " + userId+" by id")
				users.findOne({id: userId}).then(function(foundUser) {
					debug(foundUser);
					debug("Has found");
					foundUser ? resolve(foundUser) : reject('No such user exists');
				});
			});
		},


		checkDataUnique: function (user) {
			debug('Start check unique');
			// return users.findOne(user).then(function(foundUser) {
			// 	return foundUser ? Promise.reject('Data is not unique'): Promise.resolve('ok');
			// });
			return new Promise(function(resolve, reject) {
				debug("Get in check");
				users.findOne({username: user.username})
				.then(function (foundUser) {
					debug("search name");
					if (foundUser) {
						debug(foundUser);
						return reject('name');
					}
				})
				.then(function () {
					debug("search id")
					return users.findOne({id: user.id})
					.then(function (foundUser) {
						if (foundUser) {
							return reject('id');
						}
						else {
							return users.findOne({phone : user.phone})
							.then(function (foundUser) {
								if (foundUser) {
									return reject('phone');
								} else {
									return users.findOne({email : user.email})
									.then(function (foundUser) {
										if (foundUser) {
											return reject('email');
										} else {
											return users.findOne({username : user.username})
											.then(function (foundUser) {
												if (foundUser) {
													return reject('name');
												} else {
													resolve('ok');
												}
											});
										}
									});
								}
							});
						}
					});
				});

			});
			// 	.then(function () {
			// 		users.findOne({id: user.id})
			// 		.then(function (foundUser) {
			// 			if (foundUser) {
			// 				reject('id');
			// 			}
			// 		})
			// 	})
			// 	.then(function () {
			// 		users.findOne({phone: user.phone})
			// 		.then(function (foundUser) {
			// 			if (foundUser) {
			// 				reject('phone');
			// 			}
			// 		})
			// 	})
			// 	.then(function () {
			// 		users.findOne({email: user.email})
			// 		.then(function (foundUser) {
			// 			if (foundUser) {
			// 				reject('email');
			// 			}
			// 		})
			// 	})
			// 	.then(function () {
			// 		resolve('ok');
			// 	});
			// });
		}



	}








	return dbMgr;
}