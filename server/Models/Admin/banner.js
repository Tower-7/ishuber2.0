var mongoose = require('mongoose')
var BannerSchema = require('../../Schemas/Admin/banner')
var Banner = mongoose.model('Banner',BannerSchema)

module.exports = Banner