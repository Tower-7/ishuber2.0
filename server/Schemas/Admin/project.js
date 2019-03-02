var mongoose = require('mongoose')

var ProjectSchema = new mongoose.Schema({
	title: String,
	imgUrl: String,
	content: String,
	meta: {
		createAt: {
			type: Date,
			default:Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})
ProjectSchema.pre('save',function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else {
		this.meta.updateAt = Date.now()
	}
	next()
})
ProjectSchema.statics = {
	findAll: function(cb) {
		return this
		.find({})
		.exec(cb)
	},
	updateById: function(id,content,cb) {
		return this
		.update({_id :id},{$set:{content:content}})
		.exec(cb)
	},
	deletById: function(id,cb) {
		return this
		.remove({_id:id})
		.exec(cb)
	}
}
module.exports = ProjectSchema