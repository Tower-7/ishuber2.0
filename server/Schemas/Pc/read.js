var mongoose = require('mongoose')

var viewReadSchema = new mongoose.Schema({
	title: String,
	type: String,
	coverPic:String,
	content: String,
	author: String,
	check: Boolean,
	meta: {
		createAt: {
			type:Date,
			default:Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})
viewReadSchema.pre('save',function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else {
		this.meta.updateAt = Date.now()
	}
	next()
})
viewReadSchema.statics = {
	findAll: function(cb) {
		return this
		.find({})
		.sort({'meta.createAt':-1})
		.exec(cb)
	}, 
	findById: function(id,cb) {
		return this
		.find({_id:id})
		.exec(cb)
	},
	findByName: function(name,cb) {
		return this
		.find({author: name})
		.exec(cb)
	},
	updateById: function(id,title,type,coverPic,content,cb) {
		return this
		.update({_id: id},{$set:{title:title,type:type,coverPic:coverPic,content:content}})
		.exec(cb)
	},
	deletById: function(id,cb) {
		return this
		.remove({_id:id})
		.exec(cb)
	},
	deletByCheck: function(check,cb) {
		return this
		.remove({check:ture})
		.exec(cb)
	}
}
module.exports = viewReadSchema