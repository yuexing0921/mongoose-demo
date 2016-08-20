/**
 *
 */
let UserModel  = require('../dao/model').User;
const Util = require('../common/Util');
const { wrap: async } = require('co');

exports.createUser = async(function* (user,callback){
	if(Util.isEmptyObject(user)){
		return callback(new TypeError('用户参数不合法'));
	}
	let userModel  = new UserModel(user);
	//let keys = Object.keys(userModel._doc);
	//keys = keys.slice(0,keys.length-1);
	//userModel = Util.pick(user,userModel, keys);
	yield  userModel.save(callback);
});