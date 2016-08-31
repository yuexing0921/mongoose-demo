/**
 * Created by yuexing on 2016/8/13.
 */
//以下是用express命令生成加载的模块
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');

//这是非express命令额外添加的模块
const compression = require('compression');
const cors = require('cors');
const csrf = require('csurf');
const cookieSession = require('cookie-session');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
//connect-flash和view-helpers结合，可以方便的展示info、errors、success、warning信息
const flash = require('connect-flash');
const helpers = require('view-helpers');

const config = require('../config');
const pkg = require('../../package.json');
module.exports = function(app,passport){

	app.use(compression({threshold: 512}));//压缩和处理静态内容
	app.use(cors());//解决跨域请求CORS


	app.use(express.static(path.join(__dirname, 'cdn')));
// view engine setup
	app.set('views', path.join(__dirname, './views'));
	app.set('view engine', 'ejs');
	app.engine('ejs', require('ejs-mate'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser({ secret: 'secret' }));

	app.use(cookieSession({ secret: 'secret' }));//简单的基于Session的cookie中间件
	app.use(session({//设置通过mongod管理session，当然也可以设置其他的方式，比如redis
		resave: false,
		saveUninitialized: true,
		secret: pkg.name,
		store: new mongoStore({
			url: config.mongodb.uri,
			collection : 'sessions'
		})
	}));
	app.use(flash());
	app.use(helpers(pkg.name));
	// use passport session
	app.use(passport.initialize());
	app.use(passport.session());

	app.use(csrf());//安全中间件
	app.use(function (req, res, next) {
		res.locals.csrf_token = req.csrfToken();
		next();
	});
};