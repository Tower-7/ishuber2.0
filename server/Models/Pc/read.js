var mongoose = require('mongoose')
var viewReadSchema = require('../../Schemas/Pc/read')
var viewRead = mongoose.model('viewRead',viewReadSchema)

module.exports = viewRead