/**
 * Created by yuexing on 2016/8/13.
 */

const users = require('./users');
//const users = require('../action/users');
module.exports = function (app,passport) {
	const pauth = passport.authenticate.bind(passport);
	/* users */
	//app.get('/user', users.signup);
	//app.post('/user/signup', users.create);
	//app.get('/user/login', users.login);
	//app.post('/user/session',
	//	pauth('local', {
	//		failureRedirect: '/user/login',
	//		failureFlash: 'Invalid email or password.'
	//	}), users.session);

	app.use('/user', users);

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		if(app.get('env') === 'development'){
			next(err);
		}
	});

// error handlers

// development error handler
// will print stacktrace
	if (app.get('env') === 'development') {
		app.use(function(err, req, res, next) {
			res.status(err.status || 500);
			res.render('error', {
				message: err.message,
				error: err
			});
		});
	}

// production error handler
// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
};