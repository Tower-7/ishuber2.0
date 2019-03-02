var mongoose = require('mongoose')

var articleSchema = new mongoose.Schema({
	title: String,
	type: String,
	coverPic: String,
	content: String,
	author: String,
	check: Boolean,
	public: Boolean,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})
articleSchema.pre('save',function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else {
		this.meta.updateAt = Date.now()
	}
	next()
})
articleSchema.statics = {
	findAll: function(cb) {
		return this
		.find({})
		.sort({'meta.createAt':-1})
		.exec(cb)
	}, 
	findAllPublic: function(cb) {
		return this
		.find({public:true})
		.sort({'meta.createAt':-1})
		.exec(cb)
	}, 
	findById: async(Article,id) => {
		return Article
		.find({_id: id})
	},
	findByName: async(Article,name) => {
		return Article
		.find({author: name})
		.sort({'meta.createAt':-1})
	},
	updateById: async(Article,id,_article) => {
		return Article
		.findByIdAndUpdate(id,_article)
	},
	deletById: async(Article,id) => {
		return Article
		.remove({_id:id})
	},
	deletByCheck: function(check,cb) {
		return this
		.remove({check:ture})
		.exec(cb)
	}
}
module.exports = articleSchema