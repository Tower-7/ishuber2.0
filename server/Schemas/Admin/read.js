var mongoose = require('mongoose')

var ReadSchema = new mongoose.Schema({
	title: String,
	type: String,
	link: String,
	imgUrl: String,
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
ReadSchema.pre('save',function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else {
		this.meta.updateAt = Date.now()
	}
	next()
})
ReadSchema.statics = {
	findAll: function(cb) {
		return this
		.find({})
		.exec(cb)
	},
	updateById: function(id,title,type,link,imgUrl,cb) {
		return this
		.update({_id: id},{$set:{title:title,type:type,link:link,imgUrl:imgUrl}})
		.exec(cb)
	},
	deletById: function(id,cb) {
		return this
		.remove({_id:id})
		.exec(cb)
	}
}
module.exports = ReadSchema