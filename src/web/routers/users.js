
const express = require('express');
const router = express.Router();
const users = require('../action/users');
const passport = require('passport');
const pauth = passport.authenticate.bind(passport);
/* users */
router.get('/', users.signup);
router.post('/signup', users.create);
router.get('/login', users.login);
router.post('/session',
	pauth('local', {
		failureRedirect: '/user/login',
		failureFlash: 'Invalid email or password.'
	}), users.session);//这里会调用local的验证方法

module.exports = router;