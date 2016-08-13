
const express = require('express');
const router = express.Router();
const users = require('../action/users');
/* GET home page. */
router.get('/', users.sendData);
module.exports = router;