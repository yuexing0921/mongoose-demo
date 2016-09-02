
/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;
const getTags = tags => tags.join(',');
const setTags = tags => tags.split(',');
/**
 * Article Schema
 */

const ArticleSchema = new Schema({
	title: { type : String, default : '', trim : true },//文章名称
	body: { type : String, default : '', trim : true },//文章主体
	user: { type : Schema.ObjectId, ref : 'User' },//用户名称 引用User的id
	comments: [{
		body: { type : String, default : '' },//
		user: { type : Schema.ObjectId, ref : 'User' },
		createdAt: { type : Date, default : Date.now }
	}],
	tags: { type: [], get: getTags, set: setTags },
	image: {
		cdnUri: String,
		files: []
	},
	createdAt  : { type : Date, default : Date.now },
	updatedAt  : { type : Date, default : Date.now }
},{timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }});



/**
 * Validations
 */

ArticleSchema.path('title').required(true, 'Article title cannot be blank');
ArticleSchema.path('body').required(true, 'Article body cannot be blank');

/**
 * Pre-remove hook
 */

ArticleSchema.pre('remove', function (next) {
	// const imager = new Imager(imagerConfig, 'S3');
	// const files = this.image.files;

	// if there are files associated with the item, remove from the cloud too
	// imager.remove(files, function (err) {
	//   if (err) return next(err);
	// }, 'article');

	next();
});

/**
 * Methods
 */

ArticleSchema.methods = {

	/**
	 * Save article and upload image
	 *
	 * @param {Object} images
	 * @api private
	 */

	uploadAndSave: function (image) {
		const err = this.validateSync();
		if (err && err.toString()) throw new Error(err.toString());
		return this.save();

		/*
		 if (images && !images.length) return this.save();
		 const imager = new Imager(imagerConfig, 'S3');

		 imager.upload(images, function (err, cdnUri, files) {
		 if (err) return cb(err);
		 if (files.length) {
		 self.image = { cdnUri : cdnUri, files : files };
		 }
		 self.save(cb);
		 }, 'article');
		 */
	},

	/**
	 * Add comment
	 *
	 * @param {User} user
	 * @param {Object} comment
	 * @api private
	 */

	addComment: function (user, comment) {
		this.comments.push({
			body: comment.body,
			user: user._id
		});

		//if (!this.user.email) this.user.email = 'email@product.com';

		//notify.comment({ 去除邮件通知
		//	article: this,
		//	currentUser: user,
		//	comment: comment.body
		//});

		return this.save();
	},

	/**
	 * Remove comment
	 *
	 * @param {commentId} String
	 * @api private
	 */

	removeComment: function (commentId) {
		const index = this.comments
			.map(comment => comment.id)
			.indexOf(commentId);

		if (~index) this.comments.splice(index, 1);
		else throw new Error('Comment not found');
		return this.save();
	}
};

/**
 * Statics
 */

ArticleSchema.statics = {

	/**
	 * Find article by id
	 *
	 * @param {ObjectId} id
	 * @api private
	 */

	load: function (_id) {
		return this.findOne({ _id })
			.populate('user', 'email username')
			.populate('comments.user')
			.exec();
	},

	/**
	 * List articles
	 *
	 * @param {Object} options
	 * @api private
	 */

	list: function (options) {
		const criteria = options.criteria || {};
		const page = options.page || 0;
		const limit = options.limit || 30;
		return this.find(criteria)
			.populate('user', 'name username')
			.sort({ createdAt: -1 })
			.limit(limit)
			.skip(limit * page)
			.exec();
	}
};

module.exports = mongoose.model('Article', ArticleSchema);
