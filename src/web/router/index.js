const express = require('express');
const router = express.Router();
const index = require('../action/index');
/* GET home page. */
router.get('/', index.home);
module.exports = router;