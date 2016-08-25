/**
 *
 */
let UserModel  = require('../dao/model').User;
const Util = require('../common/Util');
const { wrap: async } = require('co');

exports.createUser = async(function* (user){
	if(Util.isEmptyObject(user)){
		yield new TypeError('用户参数不合法');
	}
	let userModel  = new UserModel(user);
	//let keys = Object.keys(userModel._doc);
	//keys = keys.slice(0,keys.length-1);
	//userModel = Util.pick(user,userModel, keys);
	try{
		yield  userModel.save();
	}catch(err){
		yield err;
	}

});

exports.passportStrategy = async(function* (email,callback){
	const options = {
		criteria: { email: email },
		select: 'username email hashed_password salt'
	};
	yield User.load(options,callback);
});
exports.load = async(function* (_id){
	const options = {
		criteria: { _id: _id }
	};
	var result = yield User.load(options);
	if(result){
		Promise.resolve(result);
	}else{
		Promise.reject();
	}
});