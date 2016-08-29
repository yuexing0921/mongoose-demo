//用于判断是否登录
exports.requiresLogin = function (req, res, next) {
	if (req.isAuthenticated()) return next();
	if (req.method == 'GET') req.session.returnTo = req.originalUrl;
	res.redirect('/user/login');
};

exports.article = {
	hasAuthorization: function (req, res, next) {
		if (req.article.user.id != req.user.id) {
			req.flash('info', 'You are not authorized');
			return res.redirect('/articles/' + req.article.id);
		}
		next();
	}
};