/**
 * 这是user的action
 * 1. 增加一个用户
 * 2. 登录校验
 * 3. 登出
 * */
const userDao = require('../../dao/userDao');

exports.signup = (req, res) => {
	res.render('users/signup', {
		title: '注册'
	});
};
exports.create = (req, res,next) => {
	const user = req.body;
	user.provider = 'local';
	try {
		userDao.createUser(user,err =>{
			if (err){
				const errors = Object.keys(err.errors)
					.map(field => err.errors[field].message);
				return res.render('users/signup', {
					title: '注册',
					errors:errors
				});
			}
			return res.render('users/signup', {
				title: 'Sign up',
				info:"注册成功"
			});
		});
	} catch (err) {
		const errors = Object.keys(err.errors)
			.map(field => err.errors[field].message);

		res.render('users/signup', {
			title: 'Sign up',
			errors,
			user
		});
	}
};