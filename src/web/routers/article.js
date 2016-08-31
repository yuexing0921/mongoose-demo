
const express = require('express');
const router = express.Router();
const articles = require('../action/article');
const passport = require('passport');
const pauth = passport.authenticate.bind(passport);
const auth = require('../middlewares/authorization');
const articleAuth = [auth.requiresLogin, auth.article.hasAuthorization];


router.param('id', articles.load);
router.get('/', articles.index);
router.get('/articles', articles.index);
router.get('/articles/new', auth.requiresLogin, articles.new);
module.exports = router;