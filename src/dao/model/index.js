/**
 * Created by yuexing on 2016/8/15.
 */
var mongoose = require('mongoose');

// models
require('./user');

exports.User = mongoose.model('User');
