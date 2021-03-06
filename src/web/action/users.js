/**
 * 这是user的action
 * 1. 增加一个用户
 * 2. 登录校验
 * 3. 登出
 * */
const userDao = require('../../dao/userDao');

exports.load =  (req, res, next, _id) =>{
	userDao.load(_id).then((profile)=>{
		req.profile = profile;
		if (!req.profile) return next(new Error('User not found'));
	}).catch((err)=>{
		return next(err);
	});
	next();
};
exports.signup = (req, res) => {
	res.render('users/signup', {
		title: '注册'
	});
};
exports.create = (req, res,next) => {
	const user = req.body;
	user.provider = 'local';
	userDao.createUser(user).then(()=>{
		return res.render('users/signup', {
			title: 'Sign up',
			info:"注册成功"
		});
	}).catch(err =>{
		const errors = Object.keys(err.errors).map(field => err.errors[field].message);
		return res.render('users/signup', {
			title: '注册',
			errors:errors
		});
	});
};

exports.login = (req, res) => {
	res.render('users/login', {
		title: '登录'
	});
};
exports.session = (req, res,next) => {
	const redirectTo = req.session.returnTo
		? req.session.returnTo
		: '/';
	delete req.session.returnTo;
	res.redirect(redirectTo);
};