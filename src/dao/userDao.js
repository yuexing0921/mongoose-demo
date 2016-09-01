/**
 *
 */
let UserModel  = require('../dao/model').User;
const Util = require('../common/Util');
const { wrap: async } = require('co');

exports.load = async(function* (_id){
	const options = {
		criteria: { _id: _id }
	};
	return yield UserModel.load(options);
});
exports.createUser = async(function* (user){
	if(Util.isEmptyObject(user)){
		return yield new TypeError('用户参数不合法');
	}
	let userModel  = new UserModel(user);
	//let keys = Object.keys(userModel._doc);
	//keys = keys.slice(0,keys.length-1);
	//userModel = Util.pick(user,userModel, keys);
	return yield  userModel.save();
});

exports.passportStrategy = async(function* (email){
	const options = {
		criteria: { email: email },
		select: 'username email hashed_password salt'
	};
	return yield UserModel.load(options);
	//也可以用下面这种方式。看业务需求
	//result = yield UserModel.load(options);
	//if(result){
	//	return Promise.resolve(result)
	//}else{
	//	return Promise.reject(false);
	//}
});