
const express = require('express');
const router = express.Router();
const users = require('../action/users');

const pauth = passport.authenticate.bind(passport);
/* users */
router.get('/', users.signup);
router.post('/signup', users.create);
router.get('/login', users.login);
app.post('/session',
	pauth('local', {
		failureRedirect: '/login',
		failureFlash: 'Invalid email or password.'
	}), users.session);

module.exports = router;