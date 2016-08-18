/**
 * Created by yuexing on 2016/8/15.
 */
'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

/**
 * User Schema
 */

const UserSchema = new Schema({
	name: { type: String, default: '' },//姓名
	email: { type: String, default: '' },//邮箱
	username: { type: String, default: '' },//用户名
	provider: { type: String, default: '' },//来源
	hashed_password: { type: String, default: '' },//加密后的密码
	salt: { type: String, default: '' }
});
/**
 * 指定不能为空的字段，并且添加msg
 * */
UserSchema.path('name').required(true, '姓名不能为空');
UserSchema.path('email').required(true, '邮箱地址不能为空');

/**
 * 定义一个虚拟属性
 * 这个属性不会存入数据库中
 * */
UserSchema
	.virtual('password')
	.set(function (password) {
		this._password = password;
		this.salt = this.makeSalt();
		this.hashed_password = this.encryptPassword(password);
	})
	.get(function () {
		return this._password;
	});

/**
 * 指定字段名称，添加验证方法
 * */
//验证是否是一个新的用户，或者是否是修改原来的
UserSchema.path('email').validate(function (email,fn) {
	const UserModel = mongoose.model('User');
	if (this.isNew || this.isModified('email')) {
		UserModel.find({ email: email }).exec(function (err, users) {
			fn(!err && users.length === 0);
		});
	} else fn(true);
}, 'Email已经被占用！');
/**
 * UserSchema的各类方法
 */
UserSchema.methods = {
	/**
	 * 验证密码是否和数据库一致
	 *
	 * @param {String} plainText
	 * @return {Boolean}
	 * @api public
	 */
	authenticate: function (plainText) {
		return this.encryptPassword(plainText) === this.hashed_password;
	},

	/**
	 * 制造随机盐
	 *
	 * @return {String}
	 * @api public
	 */
	makeSalt: function () {
		return Math.round((new Date().valueOf() * Math.random())) + '';
	},

	/**
	 * 对密码进行加密
	 *
	 * @param {String} password
	 * @return {String}
	 * @api public
	 */
	encryptPassword: function (password) {
		if (!password) return '';
		try {
			return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
		} catch (err) {
			return '';
		}
	}
};
module.exports = mongoose.model('User', UserSchema);