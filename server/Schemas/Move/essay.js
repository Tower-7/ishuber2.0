var mongoose = require('mongoose')

var essaySchema = new mongoose.Schema({
	coverPic:String,
	content: String,
	author: String,
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
essaySchema.pre('save',function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else {
		this.meta.updateAt = Date.now()
	}
	next()
})
essaySchema.statics = {
	findAll: async Essay=> {
		return Essay
		.find({})
		.sort({'meta.createAt':-1})
	}, 
	findById: async(Essay,id) => {
		return Essay
		.find({_id:id})
	}, 
	findByName: async(Essay,name)=> {
		return Essay
		.find({author:name})
		.sort({'meta.createAt':-1})
	},
	updateById: async(Essay,id,author,coverPic,content)=> {
		return Essay
		.update({_id: id},{$set:{author:author,coverPic:coverPic,content:content}})
	},
	deletById: async(Essay,id)=> {
		return Essay
		.remove({_id:id})
	},
	deletByCheck: async(Essay,check)=> {
		return Essay
		.remove({check:ture})
	}
}
module.exports = essaySchema