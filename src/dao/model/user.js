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
	password: { type: String, default: '' },//加密后的密码
	salt: { type: String, default: '' }
});
mongoose.model('User', UserSchema);