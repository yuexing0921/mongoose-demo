/**
 * 这是user的action
 * 1. 增加一个用户
 * 2. 登录校验
 * 3. 登出
 * */
const articleDao = require('../../dao/articleDao');

exports.load =  (req, res, next, _id) =>{
	articleDao.load(_id).then((article)=>{
		req.article = article;
		if (!req.article) return next(new Error('User not found'));
	}).catch((err)=>{
		return next(err);
	});
	next();
};

exports.index = (req, res ) => {
	const page = (req.query.page > 0 ? req.query.page : 1) - 1;
	const limit = 30;
	articleDao.getList(page,limit).then((data)=>{
		return res.render('articles/index', {
			title: 'Articles',
			articles: data.articles,
			page: page + 1,
			pages: Math.ceil(data.count / limit)
		});
	}).catch(err =>{
		const errors = Object.keys(err.errors).map(field => err.errors[field].message);
		return res.render('articles/index', {
			title: 'Articles',
			errors:errors
		});
	});
};

exports.new = function (req, res){
	res.render('articles/new', {
		title: 'New Article',
		article: new Article()
	});
};