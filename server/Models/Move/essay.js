var mongoose = require('mongoose')
var essaySchema = require('../../Schemas/Move/essay')
var essay = mongoose.model('essay',essaySchema)

module.exports = essay