/**
 * 这是一个认证授权的组件，可以拓展各个社交软件
 * */

const User = require('../../dao/model').User;

const local = require('./local');
/**c
 * Expose
 */

module.exports = function (passport) {

	// serialize sessions
	//序列化一个User对象或者保存一个User对象
	passport.serializeUser((user, cb) => {
		cb(null, user.id)
	});
	//注册一个函数用于用户的会话中的对象进行反序列化
	passport.deserializeUser((id, cb) =>{
		User.load({ criteria: { _id: id } }, cb)
	});

	// use these strategies
	passport.use(local);
};
