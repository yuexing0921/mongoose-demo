
const express = require('express');
const router = express.Router();
const articles = require('../action/article');
const passport = require('passport');
const pauth = passport.authenticate.bind(passport);
const auth = require('../middlewares/authorization');
const articleAuth = [auth.requiresLogin, auth.article.hasAuthorization];


app.param('id', articles.load);
app.get('/', articles.index);
app.get('/articles', articles.index);
app.get('/articles/new', auth.requiresLogin, articles.new);
module.exports = router;