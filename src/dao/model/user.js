/**
 * 包含以下功能
 * 1.定义Schema的基本数据类型
 * 2.定义个别属性的不能为空
 * 3.使用虚拟属性
 * 4.使用验证方法
 * 5.添加hock函数
 * 6.定义Schema的静态方法
 * 7.定义Model方法
 */
'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

/**
 *
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
const validatePresenceOf = value => value && value.length;
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
 * Pre-save hook
 */
UserSchema.pre('save', function (next) {
	if (!this.isNew) return next();
	if (!validatePresenceOf(this.password)) {
		next(new Error('Invalid password'));
	} else {
		next();
	}
});

/**
 * UserSchema的静态方法
 * */
UserSchema.statics = {

	/**
	 * Load
	 *
	 * @param {Object} options
	 * @param {Function} cb
	 * @api private
	 */

	load: function (options, cb) {
		options.select = options.select || 'name username';
		return this.findOne(options.criteria)
			.select(options.select)
			.exec(cb);
	}
};

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