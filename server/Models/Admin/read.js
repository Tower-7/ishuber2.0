var mongoose = require('mongoose')
var ReadSchema = require('../../Schemas/Admin/read')
var Read = mongoose.model('Read',ReadSchema)

module.exports = Read