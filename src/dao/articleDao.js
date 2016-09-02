/**
 *
 */
let ArticleModel  = require('../dao/model').Article;
const Util = require('../common/Util');
const { wrap: async } = require('co');

exports.load = async(function* (req, res, next, id) {
	try {
		req.article = yield ArticleModel.load(id);
		if (!req.article) return next(new Error('Article not found'));
	} catch (err) {
		return next(err);
	}
	next();
});

exports.getList = async(function* (page,limit) {

	const options = {
		limit: limit,
		page: page
	};
	//const articles = yield ArticleModel.list(options);
	//const count = yield ArticleModel.count();
	return yield {
		articles: Promise.resolve(ArticleModel.list(options)),
		count: Promise.resolve(ArticleModel.count())
	};
});

exports.createArticle = async(function* (article){
	if(Util.isEmptyObject(article)){
		return  new TypeError('参数不合法');
	}
	let articleModel  = new ArticleModel(article);
	return yield  articleModel.save();
});