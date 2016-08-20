
const express = require('express');
const router = express.Router();
const users = require('../action/users');

/* users */
router.get('/', users.signup);
router.post('/signup', users.create);
module.exports = router;