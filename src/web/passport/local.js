/**
 * 用户名和密码认证登陆
 */

const LocalStrategy = require('passport-local').Strategy;
const UserDao = require('../../dao/userDao');

/**
 * Expose
 */
module.exports = new LocalStrategy({
		passwordField: 'password',
		usernameField: 'email'//这是设置用户名和密码的别名，默认情况下是username和password
	},(email, password, done) =>{
		//查找数据库，查看是否有相应的信息
		UserDao.passportStrategy(email, (err, user) => {
			if (err) return done(err);
			if (!user) {
				return done(null, false, { message: '没有此用户' });
			}
			if (!user.authenticate(password)) {
				return done(null, false, { message: '密码错误' });
			}
			return done(null, user);
		});
	}
);
