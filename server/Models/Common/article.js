var mongoose = require('mongoose')
var articleSchema = require('../../Schemas/Common/article')
var article = mongoose.model('article',articleSchema)

module.exports = article